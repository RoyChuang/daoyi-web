# SESSION.md

## 需求總結
重新設計 daoyi-web 部落格首頁 (`BlogIndexPage`)，符合 wireframe-blog.html 規劃。

## 已完成
- [x] Next.js 12→14 / React 17→18 / TS 4.6→5.9 升級
- [x] 7 個 breaking changes 修復（Link API、next/image、hydration 等）
- [x] ArticleMoreFromAuthor 重新設計（無 AI slop）
- [x] blog/[id].tsx 清理
- [x] commit + push（Azure 部署測試中）
- [x] wireframe-blog.html 建立完成

## 待辦 TODO
- [ ] **P0**: 實作 BlogIndexPage 新版面（根據 wireframe）
- [ ] **P1**: Phase 4 — Swiper v8→v11 import 修正、prism-react-renderer v1→v2

## 關鍵決策
- BlogIndexPage 版面：category tabs + featured 大卡 + 3欄格子 + 分頁
- Featured = currentPage 第一篇文章；articlesPerPage 維持 12（1 featured + 11 grid）
- Category tabs 使用 `getCategories()` 動態生成，加上「全部」
- 篩選透過 URL query `?category=xxx` 同步（`router.push` shallow）
- 是否加 search bar？**待確認**
- wireframe 用戶尚未確認 OK
