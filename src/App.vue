<script setup>
import {
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import ParticleOrb from "./components/ParticleOrb.vue";
import { projects, articles } from "./content";
import portrait from "../img/touxiang.jpg";
import resume from "../简历.md?url";

const categories = ["全部", "工程实践", "移动开发", "设备交互"];
const category = ref("全部");
const filteredArticles = computed(() =>
  articles.filter(
    (article) =>
      category.value === "全部" || article.category === category.value,
  ),
);
const navigation = [
  { id: "home", name: "首页" },
  { id: "work", name: "作品" },
  { id: "journal", name: "手记" },
  { id: "about", name: "关于" },
];
const menuOpen = ref(false);
const paused = ref(
  window.matchMedia("(prefers-reduced-motion: reduce)").matches,
);
const selected = ref(null);
const detailDialog = ref(null);
const copyLabel = ref("复制邮箱");
const activeSection = ref("home");
let sectionObserver,
  copyTimer,
  previousFocus,
  modalScrollY = 0;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
function motionChanged(event) {
  paused.value = event.matches;
}
function openDetail(item, kind) {
  const hash = `#${kind}/${item.id}`;
  if (location.hash === hash) syncHash();
  else location.hash = hash;
}
function unlockScroll() {
  document.body.style.overflow = "";
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  previousFocus = null;
}
async function syncHash() {
  const match = location.hash.match(/^#(project|article)\/([a-z-]+)$/);
  const item =
    match &&
    (match[1] === "project" ? projects : articles).find(
      (entry) => entry.id === match[2],
    );
  if (item) {
    if (!detailDialog.value.open) {
      previousFocus = document.activeElement;
      modalScrollY = window.scrollY;
    }
    selected.value = { ...item, kind: match[1] };
    const expectedHash = location.hash;
    await nextTick();
    if (location.hash !== expectedHash || !detailDialog.value) return;
    if (!detailDialog.value.open) detailDialog.value.showModal();
    detailDialog.value.scrollTop = 0;
    document.body.style.overflow = "hidden";
  } else {
    detailDialog.value?.close();
    selected.value = null;
    unlockScroll();
  }
}
function closeDetail() {
  const anchor = selected.value?.kind === "project" ? "#work" : "#journal";
  history.replaceState(
    null,
    "",
    `${location.pathname}${location.search}${anchor}`,
  );
  syncHash();
  window.scrollTo({ top: modalScrollY, behavior: "instant" });
}
function backdrop(event) {
  if (event.target === detailDialog.value) closeDetail();
}
async function copyEmail() {
  try {
    await navigator.clipboard.writeText("228999466@qq.com");
    copyLabel.value = "邮箱已复制 ✓";
  } catch {
    copyLabel.value = "请手动复制上方邮箱";
  }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyLabel.value = "复制邮箱";
  }, 3000);
}
watch(
  paused,
  (value) => {
    document.documentElement.dataset.motion = value ? "paused" : "running";
  },
  { immediate: true },
);
onMounted(() => {
  window.addEventListener("hashchange", syncHash);
  motionQuery.addEventListener("change", motionChanged);
  syncHash();
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) activeSection.value = entry.target.id;
    },
    { rootMargin: "-15% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main > section[id]")
    .forEach((section) => sectionObserver.observe(section));
});
onBeforeUnmount(() => {
  window.removeEventListener("hashchange", syncHash);
  motionQuery.removeEventListener("change", motionChanged);
  sectionObserver?.disconnect();
  clearTimeout(copyTimer);
  unlockScroll();
});
</script>

<template>
  <a class="skip-link" href="#main">跳到正文</a>
  <header class="header">
    <a
      href="#home"
      class="brand"
      aria-label="Jiangjiang 首页"
      @click="menuOpen = false"
      ><span class="brand-symbol">j.</span
      ><span>JIANGJIANG<span class="brand-dot">✳</span></span></a
    >
    <nav class="desktop-nav" aria-label="主导航">
      <a
        v-for="link in navigation"
        :key="link.id"
        :href="`#${link.id}`"
        :class="{ active: activeSection === link.id }"
        :aria-current="activeSection === link.id ? 'location' : undefined"
        >{{ link.name }}<span class="nav-dot"></span
      ></a>
    </nav>
    <div class="header-actions">
      <button
        class="motion-button"
        :aria-pressed="paused"
        :aria-label="paused ? '开启动效' : '暂停动效'"
        @click="paused = !paused"
      >
        <span>{{ paused ? "▷" : "Ⅱ" }}</span
        ><span class="motion-label">{{
          paused ? "动效已暂停" : "动效 ON"
        }}</span></button
      ><a class="contact-nav" href="#contact">聊聊想法 <span>↗</span></a
      ><button
        class="menu-toggle"
        aria-controls="mobile-nav"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? "关闭 −" : "菜单 ＋" }}
      </button>
    </div>
    <nav
      v-if="menuOpen"
      id="mobile-nav"
      class="mobile-nav"
      aria-label="移动端导航"
    >
      <a
        v-for="link in [...navigation, { id: 'contact', name: '联系' }]"
        :key="link.id"
        :href="`#${link.id}`"
        @click="menuOpen = false"
        >{{ link.name }} ↗</a
      >
    </nav>
  </header>
  <main id="main">
    <section id="home" class="hero section-shell">
      <div class="hero-top">
        <span
          ><i class="status-dot"></i> FRONTEND DEVELOPER / CREATIVE CODER</span
        ><span class="hero-index">PERSONAL SPACE — VOL. 01</span>
      </div>
      <div class="hero-content">
        <div class="hero-copy">
          <p class="eyebrow">你好，我是李大志 <span>AKA. JIANGJIANG</span></p>
          <h1>
            把想法<br />写进<span class="lime"
              >现实<span class="title-asterisk">✳</span></span
            ><span class="period">.</span>
          </h1>
          <p class="hero-description">
            在代码与真实世界的交界处，持续探索。<br />写前端，做产品，也记录每一次灵感发生。
          </p>
          <div class="hero-buttons">
            <a href="#work" class="button button-lime"
              >探索我的作品 <span>↗</span></a
            ><a href="#journal" class="text-link">读一些手记 <span>↗</span></a>
          </div>
          <div class="hero-tags">
            <span>VUE 3</span><span>UNI-APP</span
            ><span>CREATIVE DEVELOPMENT</span>
          </div>
        </div>
        <div class="hero-art">
          <div class="art-corner">[ EXPERIMENT_001 ]</div>
          <ParticleOrb :paused="paused" />
          <div class="orb-label">
            <span class="crosshair">＋</span> IDEAS INTO REALITY
          </div>
          <div class="art-caption">
            <span>1100 POINTS. INFINITE POSSIBILITIES.</span
            ><span class="live-label"
              ><i class="status-dot"></i
              >{{ paused ? "PAUSED" : "LIVE RENDER" }}</span
            >
          </div>
          <div class="orbit-coordinates">
            CREATIVE CODE<br />ALWAYS EXPLORING<br /><span>向理想的下一站</span>
          </div>
        </div>
      </div>
      <div class="hero-bottom">
        <a href="#work"><span class="scroll-icon">↓</span> SCROLL TO EXPLORE</a
        ><span>认真做事。保持好奇。<span class="tiny-star">✳</span></span
        ><span class="hero-bottom-right">CODE IS MY MEDIUM.</span>
      </div>
    </section>
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">
        <span v-for="i in 4" :key="i"
          >LESS ORDINARY <b>✳</b> MORE POSSIBILITY <b>✳</b> KEEP CREATING
          <b>✳</b></span
        >
      </div>
    </div>
    <section id="work" class="work section-shell section-space">
      <div class="section-heading">
        <div>
          <p class="eyebrow">
            <span class="section-number">01 /</span> SELECTED WORK
          </p>
          <h2>代码落地的地方<span class="lime">.</span></h2>
        </div>
        <p class="section-description">
          从业务系统到设备交互。<br />不止于屏幕，更关乎真实的问题。
        </p>
      </div>
      <div class="projects-grid">
        <button
          v-for="project in projects"
          :key="project.id"
          class="project"
          @click="openDetail(project, 'project')"
        >
          <div class="project-visual" :class="project.visual || project.id">
            <div class="visual-topline">
              <span>{{ project.english }}</span
              ><span>↗</span>
            </div>
            <div v-if="project.image" class="screenshot-wrap">
              <div class="window-chrome">
                <i></i><i></i><i></i
                ><span>{{ project.windowTitle }}</span>
              </div>
              <img
                :src="project.image"
                :alt="project.imageAlt"
                loading="lazy"
                width="840"
                height="390"
              />
            </div>
            <div
              v-else-if="project.visual === 'mes'"
              class="mes-illustration"
              aria-hidden="true"
            >
              <div class="diagram-node node-a">设备</div>
              <div class="diagram-node node-b">资产</div>
              <div class="diagram-center">
                MES<span>CONNECTED WORKFLOW</span>
              </div>
              <div class="diagram-node node-c">能源</div>
              <div class="diagram-node node-d">生产</div>
              <div class="diagram-orbit"></div>
            </div>
            <div v-else class="scan-illustration" aria-hidden="true">
              <div class="scan-bracket bracket-one"></div>
              <div class="scan-bracket bracket-two"></div>
              <div class="barcode">
                <i
                  v-for="n in 35"
                  :key="n"
                  :style="{ width: `${(n % 3) + 1}px` }"
                ></i>
              </div>
              <span>MATERIAL. CONNECTED.</span>
              <div class="scan-line"></div>
            </div>
            <span v-if="project.visual" class="concept-label"
              >业务概念可视化</span
            ><span class="project-open">查看项目 ↗</span>
          </div>
          <div class="project-info">
            <span class="project-number">/ {{ project.number }}</span>
            <div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="tag-list">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <span class="project-arrow">↗</span>
          </div>
        </button>
      </div>
    </section>
    <section id="journal" class="journal section-shell section-space">
      <div class="section-heading">
        <div>
          <p class="eyebrow">
            <span class="section-number">02 /</span> FIELD NOTES
          </p>
          <h2>想法，不止留在脑海<span class="lime">.</span></h2>
        </div>
        <span class="journal-count"
          >{{ String(articles.length).padStart(2, "0") }} ENTRIES ↙</span
        >
      </div>
      <div class="journal-toolbar">
        <div class="filter-tabs" aria-label="手记分类">
          <button
            v-for="tab in categories"
            :key="tab"
            :aria-pressed="category === tab"
            :class="{ selected: category === tab }"
            @click="category = tab"
          >
            {{ tab }}<span v-if="tab === '全部'"> / 03</span>
          </button>
        </div>
        <span>根据项目经历整理的实践手记</span>
      </div>
      <div class="article-list" aria-live="polite">
        <button
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-row"
          @click="openDetail(article, 'article')"
        >
          <span class="article-category">{{ article.category }}</span>
          <div class="article-summary">
            <h3>{{ article.title }}</h3>
            <p>{{ article.intro }}</p>
          </div>
          <span class="reading-time">{{ article.time }} READ</span
          ><span class="article-arrow">↗</span>
        </button>
      </div>
    </section>
    <section id="about" class="about section-shell section-space">
      <div class="about-photo">
        <img
          :src="portrait"
          alt="李大志的个人照片"
          loading="lazy"
          width="600"
          height="800"
        /><span class="photo-label">THE HUMAN BEHIND THE CODE.</span>
        <div class="photo-sticker">Hello,<br />world<span>↗</span></div>
      </div>
      <div class="about-copy">
        <p class="eyebrow">
          <span class="section-number">03 /</span> A LITTLE ABOUT ME
        </p>
        <h2>认真写代码，<br />也认真感受<span class="lime">世界。</span></h2>
        <p class="about-intro">
          我是李大志，你也可以叫我 Jiangjiang。<br />一名前端开发者，喜欢让复杂的事情变得清晰，<br
            class="desktop-break"
          />让屏幕里的交互，在真实世界里产生作用。
        </p>
        <p class="about-detail">
          从企业 PC 端到移动端，从数据看板到 PDA、RFID
          与蓝牙设备，我的日常是理解业务、连接接口、打磨体验。也在不断探索 AI
          辅助开发，让灵感更快走到实现。
        </p>
        <div class="about-stats">
          <div>
            <strong>3<span>+</span></strong
            ><span>年开发经历</span>
          </div>
          <div>
            <strong>Vue<span>3</span></strong
            ><span>主要技术栈</span>
          </div>
          <div><strong>∞</strong><span>对新事物的好奇</span></div>
        </div>
        <div class="experience">
          <span class="experience-dot"></span>
          <div>
            <strong>博鼎集团 · 力创科技</strong>
            <p>前端开发工程师</p>
          </div>
          <span>2023.07 — 至今</span>
        </div>
        <a
          :href="resume"
          download="李大志-简历.md"
          class="text-link resume-link"
          >下载我的简历 <span>↓</span></a
        >
      </div>
    </section>
    <section class="stack-section section-shell" aria-label="技术栈">
      <span class="eyebrow">TOOLS I THINK WITH</span>
      <div class="stack-items">
        <span>Vue<span class="lime">3</span></span
        ><span>uni-app</span><span>JavaScript</span><span>ECharts</span
        ><span>WebSocket</span><span>Git<span class="lime">↗</span></span>
      </div>
    </section>
    <section id="contact" class="contact section-shell section-space">
      <div class="contact-top">
        <p class="eyebrow">
          <span class="section-number">04 /</span> LET’S MAKE SOMETHING
        </p>
        <span><i class="status-dot"></i> 保持开放，期待交流</span>
      </div>
      <a href="mailto:228999466@qq.com" class="contact-title"
        >下一次灵感，<br /><span>一起实现。</span
        ><span class="contact-arrow">↗</span></a
      >
      <div class="contact-bottom">
        <div>
          <a href="mailto:228999466@qq.com" class="email">228999466@qq.com</a
          ><button class="copy-button" @click="copyEmail" aria-live="polite">
            {{ copyLabel }} <span>⧉</span>
          </button>
        </div>
        <a
          href="https://github.com/jiangjiang-hup"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
          >GITHUB ↗</a
        >
      </div>
    </section>
  </main>
  <footer class="footer section-shell">
    <span>© {{ new Date().getFullYear() }} JIANGJIANG</span
    ><span>用 Vue 3 构建 · 用好奇心驱动</span><a href="#home">BACK TO TOP ↑</a>
  </footer>
  <dialog
    ref="detailDialog"
    class="detail-dialog"
    aria-labelledby="detail-title"
    @click="backdrop"
    @cancel.prevent="closeDetail"
  >
    <div v-if="selected" class="detail-content">
      <div class="detail-toolbar">
        <span>{{
          selected.kind === "project"
            ? "SELECTED WORK / PROJECT"
            : "FIELD NOTES / ARTICLE"
        }}</span
        ><button
          class="close-button"
          autofocus
          aria-label="关闭详情"
          @click="closeDetail"
        >
          关闭 ×
        </button>
      </div>
      <p class="eyebrow lime">{{ selected.category }}</p>
      <h2 id="detail-title">{{ selected.name || selected.title }}</h2>
      <p class="detail-intro">{{ selected.description || selected.intro }}</p>
      <img
        v-if="selected.image"
        class="detail-image"
        :src="selected.image"
        :alt="selected.name"
      />
      <p v-if="selected.kind === 'article'" class="editorial-note">
        实践手记 · 根据个人项目经历整理，示例方法需结合实际业务验证。
      </p>
      <div
        v-for="(section, index) in selected.sections"
        :key="section[0]"
        class="detail-section"
      >
        <span>0{{ index + 1 }}</span>
        <div>
          <h3>{{ section[0] }}</h3>
          <p>{{ section[1] }}</p>
        </div>
      </div>
      <div class="detail-end">
        <span>THANKS FOR READING.</span
        ><button class="text-link" @click="closeDetail">
          {{ selected.kind === "project" ? "返回作品" : "返回手记" }} ↗
        </button>
      </div>
    </div>
  </dialog>
</template>
