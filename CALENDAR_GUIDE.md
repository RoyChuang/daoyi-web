# 本月行事曆功能說明

## 📋 功能概述

首頁新增了「**本月行事曆**」區塊,會自動從 Google Sheets 讀取並顯示當月的活動。

---

## 🔧 技術實作

### 1. 資料來源

- **Google Sheets**: https://docs.google.com/spreadsheets/d/1n6Dc0nq-4A7RZjdgG5_nzsYMK9KevNhht6w-5_zz2pU/edit
- **工作表**: 行事曆 (GID: 78728578)
- **API 格式**: CSV Export API

### 2. 運作方式

```
Build 時 (getStaticProps)
  ↓
從 Google Sheets 讀取 CSV 資料
  ↓
解析 CSV 並轉換為 CalendarEvent[]
  ↓
篩選出當前月份的活動
  ↓
傳遞給 MonthlyCalendar 組件顯示
```

### 3. 更新頻率

- **靜態生成**: 每次執行 `npm run build` 時會重新讀取 Google Sheets 資料
- **本地開發**: 每次重新啟動 dev server 時會重新讀取
- **建議**: 當 Google Sheets 有重大更新時,重新 build 並部署網站

---

## 📝 如何更新行事曆

### 方法 1: 直接在 Google Sheets 編輯 (推薦)

1. 開啟 Google Sheets: https://docs.google.com/spreadsheets/d/1n6Dc0nq-4A7RZjdgG5_nzsYMK9KevNhht6w-5_zz2pU/edit
2. 切換到「**行事曆**」分頁
3. 在對應的日期欄位填入活動資訊:
   - **國曆**: 日期 (格式: `2/16`)
   - **星期**: 星期幾
   - **農曆**: 農曆日期或節日名稱
   - **工作**: 活動名稱
   - **地點**: 活動地點
4. 儲存後,重新 build 網站即可看到更新

### 方法 2: 修改程式碼 (進階)

如果需要調整解析邏輯或活動類型,可以編輯:

- `src/utils/googleSheets.ts` - 資料讀取和解析邏輯
- `BLOG_CONSTANTS/_CALENDAR_DATA.ts` - 活動類型和顏色定義

---

## 🎨 活動類型與顏色

目前支援的活動類型:

| 類型     | 顏色   | 說明                 |
| -------- | ------ | -------------------- |
| 守壇     | 紫色   | 守壇活動             |
| 拜年     | 紅色   | 拜年活動             |
| 傳統節日 | 紅色   | 除夕、初一等傳統節日 |
| 悔過班   | 靛藍色 | 悔過班課程           |
| 道一經典 | 藍色   | 道一經典課程         |
| 青世代   | 青色   | 青世代活動           |
| 國定假日 | 粉紅色 | 國定假日             |
| 班會     | 綠色   | 班會活動             |
| 其他     | 灰色   | 其他活動             |

### 如何新增活動類型?

編輯 `BLOG_CONSTANTS/_CALENDAR_DATA.ts`:

```typescript
export const EVENT_TYPE_COLORS: Record<
  string,
  { bg: string; text: string; badge: string }
> = {
  // ... 現有類型
  新類型: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-500",
  },
};
```

---

## 🔍 測試與除錯

### 本地測試

```bash
# 啟動開發伺服器
npm run dev

# 訪問 http://localhost:3000
# 查看首頁的「本月行事曆」區塊
```

### 查看 Console 訊息

Build 時會在 console 顯示:

- ✅ 成功讀取 X 筆行事曆資料
- ❌ 讀取行事曆資料失敗 (如果有錯誤)

### 常見問題

**Q: 為什麼沒有顯示活動?**

- 檢查 Google Sheets 是否設為「知道連結的人可以檢視」
- 確認「行事曆」分頁中有填入當月的活動資料
- 查看 console 是否有錯誤訊息

**Q: 如何強制重新讀取資料?**

- 本地開發: 重新啟動 dev server (`Ctrl+C` 然後 `npm run dev`)
- 生產環境: 重新 build (`npm run build`)

**Q: 可以顯示其他月份的活動嗎?**

- 可以!修改 `pages/index.tsx` 中的 `MonthlyCalendar` 組件參數:
  ```tsx
  <MonthlyCalendar
    events={calendarEvents}
    year={2026}
    month={2} // 改成想要的月份
  />
  ```

---

## 📦 相關檔案

- `src/utils/googleSheets.ts` - Google Sheets 資料讀取工具
- `src/components/MonthlyCalendar.tsx` - 行事曆顯示組件
- `BLOG_CONSTANTS/_CALENDAR_DATA.ts` - 行事曆常數定義
- `BLOG_CONSTANTS/_MOCK_CALENDAR.ts` - 測試用資料 (可選)
- `pages/index.tsx` - 首頁 (整合行事曆)

---

## 🚀 部署注意事項

1. **確保 Google Sheets 權限正確**

   - 設定為「知道連結的人可以檢視」
   - 不要設為「私人」

2. **Build 前先測試**

   ```bash
   npm run dev
   # 確認行事曆正常顯示後再 build
   npm run build
   ```

3. **定期更新**
   - 建議每月初重新 build 一次,確保顯示最新的活動
   - 或設定 CI/CD 自動化 build

---

## 💡 未來改進建議

1. **自動化更新**: 設定 GitHub Actions 定期自動 build
2. **多月份顯示**: 可以加入月份切換功能
3. **活動詳情**: 點擊活動可以顯示更多詳細資訊
4. **日曆視圖**: 除了列表視圖,也可以加入月曆視圖
