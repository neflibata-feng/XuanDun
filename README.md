# 玄盾开发者团队官网（XuanDun）[![Netlify Status](https://api.netlify.com/api/v1/badges/d78f7c5c-bae1-4517-8ba2-7c659ed10b47/deploy-status)](https://app.netlify.com/projects/xuandun/deploys)

本仓库是玄盾开发者团队官网开源仓库，玄盾开发者团队官网基于 **Astro 5** + **Tailwind CSS** 构建，并集成 **Decap CMS（原 Netlify CMS）** 作为内容管理后台。

---

## 技术栈

- 框架：Astro 5
- 样式：Tailwind CSS
- 内容：Markdown / MDX
- CMS：Decap CMS（Git Gateway）
- 部署：Netlify（推荐）
- 其他：站点地图（Sitemap）、压缩（astro-compress）、图标（astro-icon）

> 说明：项目基于 AstroWind 模板进行二次开发。

---

## 本地开发

### 环境要求

- Node.js：建议使用 Node 20（或满足 `package.json#engines`）
- 包管理：npm

### 安装与启动

```bash
npm install
npm run dev
```

- 本地预览地址通常为：<http://localhost:4321>

### 常用命令

```bash
npm run dev        # 本地开发
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物

npm run check      # 类型检查 + ESLint + Prettier
npm run fix        # 自动修复 ESLint/Prettier 可修复问题
```

---

## 项目结构速览

- `src/pages/`：页面路由（Astro）
- `src/layouts/`：布局
- `src/components/`：组件（含 widgets、blog、ui 等）
- `src/data/post/`：博客文章（Markdown）
- `src/assets/`：图片、样式等静态资源（会被构建处理）
- `public/`：原样拷贝到站点根目录的静态文件
  - `public/admin/`：Decap CMS 后台
  - `public/emails/`：Netlify Identity 邮件模板

---

## 内容发布（Markdown）

文章存放在：`src/data/post/`。

当前 CMS 对文章字段（frontmatter）约定为：

- `title`：标题
- `excerpt`：摘要
- `image`：封面图（建议放在 `src/assets/images`）
- `publishDate`：发布日期
- `body`：正文（Markdown）

你也可以直接手写 Markdown 文件并提交 PR；也可以通过 CMS 后台可视化编辑。

---

## CMS（Decap CMS）

### 访问路径与路由说明

- 正确访问：`/admin/` 或 `/admin/#/`
- **不要使用**：`/admin#/`（缺少斜杠会导致 Hash 路由拼接异常）

本仓库已加入两层兜底：

1) Netlify 重定向：`/admin` → `/admin/`
2) CMS 页面内前置脚本：当访问到 `/admin` 时自动替换到 `/admin/`

### 基础配置

CMS 配置在：`public/admin/config.yml`，使用 Git Gateway（通常配合 Netlify Identity）。

常见上线步骤（Netlify）：

1. 将仓库连接到 Netlify
2. Build command：`npm run build`
3. Publish directory：`dist`
4. 启用 Identity
5. 启用 Git Gateway
6. 设置邀请用户/重置密码等邮件模板（见下一节）

---

## Netlify Identity 邮件模板

邮件模板位于：`public/emails/`

- `confirmation.html`：注册确认/邮箱确认
- `invitation.html`：邀请加入（设置密码）
- `recovery.html`：找回/重置密码
- `email-change.html`：更换邮箱确认


## 部署说明（Netlify）

项目为静态输出（`astro.config.ts` 中 `output: 'static'`），构建产物在 `dist/`。

Netlify 推荐配置：

- Build command：`npm run build`
- Publish directory：`dist`
- Node version：20（仓库已有 `netlify.toml` 配置）

---

## 贡献指南

欢迎贡献：文案、文章、组件优化、可访问性、性能、Bug 修复等。

建议流程：

1. Fork 本仓库并创建分支
2. 本地运行 `npm install`、`npm run dev`
3. 提交前运行 `npm run check`
4. 提交 PR 并说明改动内容、截图/录屏（如涉及 UI）

代码风格：

- ESLint：`npm run check:eslint`
- Prettier：`npm run check:prettier`




---

## License

本项目使用 Apache License 2.0，详见 `LICENSE`。
