# ✅ Cloudinary 照片上傳完成!

## 📊 上傳結果

- **上傳時間**: 2026-01-03
- **照片數量**: 59 張
- **來源**: C:\Users\Roy\Downloads\25
- **Cloudinary 資料夾**: `daoyi-web/temples`
- **照片類型**: 佛堂開壇歷史照片

---

## 🖼️ 如何使用這些照片

### 1. 查看示範頁面

訪問: http://localhost:3000/temple-photos

這個頁面展示了:

- ✅ Swiper 輪播
- ✅ 網格展示
- ✅ 點擊放大 (燈箱效果)
- ✅ 自動優化 (Cloudinary)

### 2. 在首頁加入佛堂照片輪播

編輯 `pages/index.tsx`:

```tsx
import { getRandomTemplePhotos } from "../BLOG_CONSTANTS/_TEMPLE_PHOTOS";
import { getCloudinaryUrl } from "../src/utils/cloudinary";

// 在元件中
const randomTemplePhotos = getRandomTemplePhotos(10);

// 在 JSX 中
{
  randomTemplePhotos.map((photo, index) => (
    <img
      key={index}
      src={getCloudinaryUrl(photo.publicId, {
        width: 800,
        quality: "auto",
        format: "auto",
      })}
      alt={photo.title}
    />
  ));
}
```

### 3. 單張照片使用

```tsx
import { getCloudinaryUrl } from "../src/utils/cloudinary";

<img
  src={getCloudinaryUrl("daoyi-web/temples/photo_1767408433429_785_001", {
    width: 1200,
    height: 800,
    crop: "fill",
    quality: "auto",
    format: "auto",
  })}
  alt="總壇開壇照"
/>;
```

---

## 📁 相關檔案

| 檔案                               | 說明                            |
| ---------------------------------- | ------------------------------- |
| `BLOG_CONSTANTS/_TEMPLE_PHOTOS.ts` | 所有照片的資料 (ID、標題、日期) |
| `pages/temple-photos.tsx`          | 示範頁面                        |
| `src/utils/cloudinary.ts`          | Cloudinary 工具函數             |
| `scripts/upload-to-cloudinary.js`  | 上傳腳本                        |

---

## 💡 優勢

### vs 放在 Azure (public/images/)

| 項目         | Cloudinary          | Azure Static Web Apps |
| ------------ | ------------------- | --------------------- |
| **空間使用** | 0 MB (不佔 Azure)   | 會佔用 250 MB 限制    |
| **流量**     | 25 GB/月 免費       | 100 GB/月             |
| **自動優化** | ✅ 自動轉 WebP/AVIF | ❌ 需手動優化         |
| **調整尺寸** | ✅ URL 參數即可     | ❌ 需預先準備         |
| **載入速度** | ✅ 全球 CDN         | ⚠️ 單一區域           |

### 這 59 張照片的空間節省

- **原始大小**: ~120 MB
- **Azure 剩餘空間**: 90 MB → **無法放入!**
- **使用 Cloudinary**: ✅ 完全不佔 Azure 空間

---

## 🎯 下一步建議

1. **測試頁面**:

   ```bash
   npm run start
   ```

   訪問 http://localhost:3000/temple-photos

2. **加入導航列**:
   編輯 `BLOG_CONSTANTS/_BLOG_SETUP.tsx`,加入連結

3. **整合到首頁**:
   可以在首頁加入「佛堂照片」區塊

4. **繼續上傳**:
   如果還有更多照片,繼續使用上傳腳本:
   ```bash
   node scripts/upload-to-cloudinary.js <資料夾路徑> daoyi-web/temples
   ```

---

## 📸 照片清單

所有 59 張照片已記錄在 `BLOG_CONSTANTS/_TEMPLE_PHOTOS.ts`,包含:

- 總壇開壇照
- 道一聖道院
- 東山聖堂
- 各地佛堂開壇照片
- 點傳師領命照片

---

## 🔗 Cloudinary 管理

- Dashboard: https://cloudinary.com/console
- Media Library: https://cloudinary.com/console/media_library/folders/daoyi-web/temples
- 使用量: https://cloudinary.com/console/usage

---

**恭喜!您的照片已成功上傳並可以在網站中使用了!** 🎉
