# Cloudinary 使用指南

## 📋 設定步驟

### 1. 環境變數設定

建立 `.env.local` 檔案 (如果還沒有):

```env
# Cloudinary 設定
CLOUDINARY_CLOUD_NAME=dklwgtmj2
CLOUDINARY_API_KEY=499387135334112
CLOUDINARY_API_SECRET=你的API密鑰

# Next.js 公開環境變數
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dklwgtmj2
```

---

## 📤 上傳圖片到 Cloudinary

### 方法 1: 使用上傳腳本 (推薦)

1. **從 Google Drive 下載照片**到本機資料夾,例如 `temp-images/`

2. **執行上傳腳本**:

   ```bash
   node scripts/upload-to-cloudinary.js ./temp-images
   ```

3. **指定 Cloudinary 資料夾** (選用):

   ```bash
   node scripts/upload-to-cloudinary.js ./temp-images daoyi-web/260103
   ```

4. **取得 public_id**,腳本會顯示所有上傳成功的圖片 ID

### 方法 2: 使用 Cloudinary 網頁介面

1. 登入 https://cloudinary.com
2. 進入 Media Library
3. 點擊 Upload
4. 拖曳圖片上傳
5. 複製 public_id

---

## 🖼️ 在網站中使用 Cloudinary 圖片

### 基本使用

```tsx
import { getCloudinaryUrl } from '../src/utils/cloudinary';

// 簡單使用
<img src={getCloudinaryUrl('daoyi-web/photo1')} alt="照片" />

// 自訂尺寸和優化
<img src={getCloudinaryUrl('daoyi-web/photo1', {
  width: 800,
  height: 600,
  crop: 'fill',
  quality: 'auto',
  format: 'auto'
})} alt="照片" />
```

### 縮圖

```tsx
import { getThumbnailUrl } from "../src/utils/cloudinary";

<img src={getThumbnailUrl("daoyi-web/photo1", 300)} alt="縮圖" />;
```

### 響應式圖片

```tsx
import { getResponsiveUrl } from "../src/utils/cloudinary";

<img
  src={getResponsiveUrl("daoyi-web/photo1", 1200)}
  srcSet={`
    ${getResponsiveUrl("daoyi-web/photo1", 400)} 400w,
    ${getResponsiveUrl("daoyi-web/photo1", 800)} 800w,
    ${getResponsiveUrl("daoyi-web/photo1", 1200)} 1200w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="響應式圖片"
/>;
```

---

## 🎨 圖片轉換選項

| 參數      | 說明      | 範例值                      |
| --------- | --------- | --------------------------- |
| `width`   | 寬度 (px) | `800`                       |
| `height`  | 高度 (px) | `600`                       |
| `crop`    | 裁切模式  | `'fill'`, `'fit'`, `'crop'` |
| `quality` | 品質      | `'auto'`, `80`, `90`        |
| `format`  | 格式      | `'auto'`, `'webp'`, `'jpg'` |

---

## 💡 最佳實踐

1. **使用 `quality: 'auto'`** - Cloudinary 會自動優化品質
2. **使用 `format: 'auto'`** - 自動選擇最佳格式 (WebP, AVIF 等)
3. **指定尺寸** - 避免載入過大的圖片
4. **使用資料夾分類** - 例如 `daoyi-web/260103/photo1`

---

## 📊 空間使用

- **免費額度**: 25 GB 儲存 + 25 GB 月流量
- **目前使用**: 可在 Cloudinary Dashboard 查看
- **優勢**: 不佔用 Azure Static Web Apps 的 250 MB 限制

---

## 🔗 相關連結

- Cloudinary Dashboard: https://cloudinary.com/console
- Media Library: https://cloudinary.com/console/media_library
- 文件: https://cloudinary.com/documentation
