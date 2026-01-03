/**
 * 生成正確的照片對應表
 * 根據原始檔案順序重新建立 TEMPLE_PHOTOS 資料
 */

const fs = require('fs');
const path = require('path');

// 原始資料夾路徑
const sourceFolder = 'C:\\Users\\Roy\\Downloads\\25';

// 讀取檔案
const files = fs.readdirSync(sourceFolder);
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const imageFiles = files
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  })
  .sort(); // 按照檔名排序

console.log('按照檔名排序的照片列表:\n');

imageFiles.forEach((file, index) => {
  const fileName = path.basename(file, path.extname(file));
  
  // 解析檔名
  let title = fileName;
  let date = '';
  
  // 嘗試提取日期
  const dateMatch = fileName.match(/(\d{8}|\d{6})/);
  if (dateMatch) {
    date = dateMatch[1];
    title = fileName.replace(dateMatch[0], '').replace(/_0$/, '').trim();
  } else {
    title = fileName.replace(/_0$/, '').trim();
  }
  
  // 移除數字開頭
  title = title.replace(/^\d+/, '');
  
  const publicId = `daoyi-web/temples/photo_1767408433429_785_${String(index + 1).padStart(3, '0')}`;
  
  console.log(`${index + 1}. ${fileName}`);
  console.log(`   標題: ${title}`);
  console.log(`   日期: ${date}`);
  console.log(`   Public ID: ${publicId}`);
  console.log('');
});

console.log(`\n總共 ${imageFiles.length} 張照片`);
