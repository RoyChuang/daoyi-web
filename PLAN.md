# PLAN.md

## 下一步（等待用戶確認 wireframe 後執行）

### Step 1: 改寫 BlogIndexPage
檔案：`src/components/BlogIndexPage/index.tsx`

結構：
```
PageLayout home
  container
    Header（"班會報導" 標題）
    Category Tabs（全部 / 道一 / 經典班會 / 道務活動）
    [Featured Card] — 第一篇，圖左文字右，全寬
    [Grid 3欄] — 剩餘 11 篇
    ReactPaginate
```

待確認：
- Search bar 要加嗎？
- wireframe 設計方向用戶確認了嗎？

### Step 2: Phase 4（優先度較低）
- Swiper: `import { Navigation, Pagination } from 'swiper'` → `from 'swiper/modules'`
- prism-react-renderer: v1 API → v2 API

## 優先順序
P0 → BlogIndexPage 實作
P1 → Phase 4 套件升級
