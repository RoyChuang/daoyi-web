# CLAUDE.md — 道一關懷協會 daoyi-web

## 專案架構
- **框架**: Next.js 14 static export (`output: "export"`)
- **語言**: TypeScript 5.9 + React 18
- **樣式**: Tailwind CSS + SCSS modules（無 styled-components）
- **圖片**: Cloudinary（公開 cloud name）+ `next/image` with `unoptimized: true`
- **內容**: `BLOG_CONSTANTS/_ARTICLES_LIST.tsx` 靜態資料，1600+ 文章

## Coding Style 規則
- **禁止 emoji**：任何程式碼、JSX、UI 文字一律不使用（視為 AI slop）
- **禁止 left-border accent**（`border-l-4`）作為裝飾，視為 AI slop
- Tailwind 優先，非必要不寫 CSS
- 暗色模式：一律加 `dark:` variant
- 圖片使用 `transformThumbnailPath()` 取得 Cloudinary URL

## 不能碰的東西
- `BLOG_CONSTANTS/` 內容資料（只讀）
- `public/images/` 靜態圖檔
- `next.config.js` 中的 `output: "export"` 和 `images: { unoptimized: true }`
- 任何已部署的 Azure static web app 設定

## 重要 Utils
- `transformPath(path)` — 移除 /pages 前綴
- `transformThumbnailPath(path, 'compact'|'regular')` — Cloudinary 縮圖
- `transformImagePaths(path)` — 通用圖片路徑
- `getCategories()` — 從文章列表取得所有分類
- `combineClasses(...classes)` — classname 合併

## 文章分類（目前）
- 道一、經典班會、道務活動

## 元件路徑
- `src/components/BlogIndexPage/index.tsx` — 部落格首頁
- `src/components/ArticleCards/ArticleCardCompact.tsx` — 小卡片
- `src/components/Misc/ArticleMoreFromAuthor.tsx` — 側欄相關文章
- `src/layouts/PageLayouts/index.tsx` — 頁面 layout
