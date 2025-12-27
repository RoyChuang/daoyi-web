---
description: Next.js 靜態輸出注意事項
---

# Next.js 靜態輸出 (next export) 注意事項

此專案使用 `next export` 做靜態輸出，部署到 Azure Static Web Apps。

## 重要限制

### ❌ 不可使用 `getServerSideProps`

`getServerSideProps` 需要伺服器端執行，與 `next export` 不相容。

**錯誤訊息**：

```
Error: Error for page /: pages with `getServerSideProps` can not be exported.
```

### ✅ 替代方案

1. **使用 `getStaticProps`** - 在 build 時取得資料
2. **客戶端 state** - 使用 `useState` + `useEffect` 在瀏覽器端處理動態資料

### 範例：隨機圖片選取

**錯誤做法** (使用 getServerSideProps)：

```tsx
export const getServerSideProps = async () => {
  const randomImages = getRandomImages(allImages, 5);
  return { props: { randomImages } };
};
```

**正確做法** (使用 getStaticProps + 客戶端隨機化)：

```tsx
import { useState, useEffect } from "react";

const Home = ({ allImages }) => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 10));
  }, [allImages]);

  // ...
};

export const getStaticProps = async () => {
  const allImages = getAllBlogImages();
  return { props: { allImages } };
};
```

## 可用的資料取得方式

| 方法                     | 支援 next export | 說明         |
| ------------------------ | ---------------- | ------------ |
| `getStaticProps`         | ✅               | build 時執行 |
| `getStaticPaths`         | ✅               | 動態路由用   |
| `getServerSideProps`     | ❌               | 需要伺服器   |
| `useState` + `useEffect` | ✅               | 客戶端執行   |
| `useSWR`                 | ✅               | 客戶端 fetch |

## 相關連結

- [Next.js Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [getServerSideProps can not be exported](https://nextjs.org/docs/messages/gssp-export)
