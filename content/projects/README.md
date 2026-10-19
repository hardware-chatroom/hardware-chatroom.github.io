# Add a project / 添加项目文章

The homepage workbench stays hidden while this collection has no published articles. Do not add placeholders to fill it.

1. Create `content/projects/your-project/zh.md` and/or `en.md`.
2. Start with the frontmatter below. Set `draft: false` when ready.
3. Write the article in Markdown and commit/push to `main`.
4. GitHub Actions rebuilds the static site: the homepage, project list, detail route, sitemap, and offline cache update automatically.

```markdown
---
title: "项目名称"
summary: "一句话介绍问题或实验。"
date: "2026-10-19"
category: "Hardware Hacking"
status: "探索中"
draft: true
# cover: "/images/your-project.webp"
# discussion: "https://github.com/hardware-chatroom/hardware-chatroom.github.io/issues/123"
---

## 想验证什么

## 硬件与环境

## 如何开始

## 进展、结果与踩坑

## 需要什么帮助
```

Folder names become URL slugs and must use lowercase letters, numbers, and hyphens. Chinese and English translations share one folder. Only existing published translations are listed; language switching falls back to the other language's project list if a translation is missing. Dates must be quoted. Covers are optional and should be stored in `public/images/`. Link discussion only after a real issue exists.

This is build-time publishing. New GitHub issues do not automatically become website articles; select and write up material here before publication. No credentials, runtime server, or homepage edits are needed.
