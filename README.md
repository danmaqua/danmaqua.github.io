悬浮字幕网站
======

本网站使用 VuePress 构建，为[悬浮字幕](https://github.com/fython/danmaqua-android)提供介绍、下载、文档等页面，实际效果[页面链接](https://danmaqua.github.io)。

## 测试

```bash
npm run docs:dev
```

## 编译

```bash
npm run docs:build
```

在源码推送至 `raw` 分支后，会执行 GitHub Actions Workflow 对 VuePress 项目进行编译，如有差异将会提交变更至 GitHub Pages 所使用的 `master` 分支。
