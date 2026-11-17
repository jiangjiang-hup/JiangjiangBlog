# Jiangjiang · 个人博客

李大志的个人博客与作品集，使用 **Vue 3 + Vite**。黑色与荧光绿视觉，包含 Canvas 粒子球、项目展示、分类技术手记、个人介绍和联系入口。

## 本地开发

Node.js 20.19+ 或 22.12+：

```sh
npm install
npm run dev
```

## 源码检查

```sh
npm run check
```

检查 Vue 单文件组件脚本与模板、CSS 语法、本地组件资源引用，以及文章和项目内容结构。检查在内存中进行，不执行生产打包。

## 发布

本项目是纯静态前端，无需服务端或数据库。需要部署时，执行 `npm run build`，将生成的 `dist` 目录上传到静态服务器。Vite 使用相对资源路径，兼容 GitHub Pages 项目子路径。

在线地址：<https://jiangjiang-hup.github.io/JiangjiangBlog/>

`.github/workflows/deploy-pages.yml` 在 `main` 分支更新时自动检查源码、构建并部署到 GitHub Pages，也支持在 GitHub Actions 手动触发。访问者可直接打开网址，无需下载项目或登录 GitHub。首次部署状态可在仓库 Actions 中查看。

本地开发未执行打包命令；发布所需构建由 GitHub Actions 完成。

## 内容维护

- `src/content.js`：项目内容与资源引用。
- `src/articles.json`：9 篇技术手记及完整正文（工程实践 4 篇、移动开发 3 篇、设备交互 2 篇）。分类数量根据内容自动计算。
- `src/App.vue`：个人介绍、导航、联系方式、弹窗与筛选。
- `src/style.css`：布局、配色、响应式样式及动效。
- `src/components/ParticleOrb.vue`：Canvas 粒子球，支持暂停、离屏停绘和减少动态效果偏好。
- `img/`：提供的原始头像与项目界面素材，保留原图。
- `简历.md`：原始简历，点击“查看我的简历”在页面弹窗中阅读，弹窗内容直接读取此文件。

项目与个人介绍依据提供的简历整理。MES 和仓储项目的图形标明为概念可视化；技术手记依据项目经历整理，不包含虚构发布日期、访问量或项目演示地址。

文章与项目详情支持 `#article/organization`、`#project/energy` 等可分享链接。原生 `dialog` 支持键盘焦点管理、Escape 关闭与背景滚动锁定。页面提供动效暂停、系统减少动态效果支持和移动端菜单。

字体优先使用 Space Grotesk（Google Fonts），网络不可用时自动使用本机字体；主要图片和运行代码均在仓库中。
