<script setup>
import resumeText from "../../简历.md?raw";

// Keep the original file as the single source of resume content.
const lines = resumeText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
const [title, profile, intention, ...body] = lines;
const headings = new Set(["个人优势", "专业技能", "工作经历", "项目经历", "教育经历"]);
const sections = [];
for (const line of body) {
  if (headings.has(line)) {
    sections.push({ title: line, blocks: [] });
    continue;
  }
  const blocks = sections.at(-1).blocks;
  if (/^[•·]\s*/.test(line)) {
    if (blocks.at(-1)?.type !== "list") blocks.push({ type: "list", items: [] });
    blocks.at(-1).items.push(line.replace(/^[•·]\s*/, ""));
  } else {
    blocks.push({
      type: /^[一二三四五六七八九十]+、/.test(line) || line.includes("｜") ? "heading" : "paragraph",
      text: line,
      stack: line.startsWith("技术栈："),
    });
  }
}
</script>

<template>
  <article class="resume-paper">
    <header class="resume-header">
      <p class="resume-kicker">个人履历 · 职业经历与项目实践</p>
      <h2 id="detail-title">{{ title }}</h2>
      <p class="resume-profile">{{ profile }}</p>
      <p class="resume-intention">{{ intention }}</p>
    </header>
    <section v-for="(section, index) in sections" :key="section.title" class="resume-section">
      <h3><span aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>{{ section.title }}</h3>
      <div class="resume-section-body">
        <template v-for="(block, blockIndex) in section.blocks" :key="blockIndex">
          <ul v-if="block.type === 'list'">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
          <h4 v-else-if="block.type === 'heading'">{{ block.text }}</h4>
          <p v-else :class="{ 'resume-stack': block.stack }">{{ block.text }}</p>
        </template>
      </div>
    </section>
    <footer class="resume-footer">感谢阅读，期待与你交流。</footer>
  </article>
</template>
