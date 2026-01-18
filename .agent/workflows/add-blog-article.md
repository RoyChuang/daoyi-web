---
description: 增加新活動文章（自動上傳雲端圖片並更新列表）
---

# 增加新活動文章工作流

當使用者想要新增活動文章時，請遵循以下步驟：

### 1. 資訊蒐集

確認使用者提供的資訊：

- **日期**：格式為 `YYYYMMDD` (如 20260111)。
- **文章內文**：用於 `shortIntro`。
- **照片資料夾**：本機存放照片的路徑。

### 2. 上傳照片到 Cloudinary

使用專案內的上傳腳本，將圖片上傳至指定資料夾：
// turbo

```powershell
node scripts/upload-to-cloudinary.js "<本機路徑>" "daoyi-web/blog/<YYYYMMDD>"
```

_注意：上傳後請紀錄輸出的 Public IDs，通常為 `daoyi-web/blog/<YYYYMMDD>/1` 到 `N`。_

### 3. 更新文章列表資料庫

編輯 `BLOG_CONSTANTS/_ARTICLES_LIST.tsx`：

- 將新文章加入 `ARTICLES_LIST` 的 **最上方**。
- **欄位規範**：
  - `id`: 使用 `YYMMDD` 格式。
  - `date`: 使用 `MM-DD-YYYY` 格式。
  - `thumbnail`: 設定為該文章的第一張圖片 ID (如 `daoyi-web/blog/20260111/1`)。
  - `images`: 建立包含所有上傳圖片 ID 的字串陣列。
  - `category`: 預設為 `"道一"` (或依內容調整為 `"經典班會"`、`"道務活動"`)。

### 4. 程式碼驗證

- 確保 `iArticle` 介面已支援 `images` 屬性。
- 確保 `getStaticProps` 在 `pages/blog/[id].tsx` 能正確解析雲端路徑。
- 預覽網站確認顯示正常（`npm run dev`）。

### 5. 完成回報

回報上傳成功的圖片數量、文章網址，並請使用者確認成果。
**注意：除非使用者明確要求（例如說「可以 push 了」），否則不要主動推送到 Git。**
