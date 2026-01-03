/**
 * Cloudinary 圖片上傳腳本
 * 用於批次上傳圖片到 Cloudinary
 * 
 * 使用方式:
 * node scripts/upload-to-cloudinary.js <資料夾路徑>
 * 
 * 範例:
 * node scripts/upload-to-cloudinary.js ./temp-images
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// 載入環境變數
require('dotenv').config({ path: '.env.local' });

// 設定 Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * 清理檔名,移除中文和特殊字元
 */
function sanitizeFileName(fileName) {
  // 移除副檔名
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  
  // 如果包含中文或特殊字元,使用時間戳記
  const hasChinese = /[\u4e00-\u9fa5]/.test(nameWithoutExt);
  const hasSpecialChars = /[^a-zA-Z0-9_-]/.test(nameWithoutExt);
  
  if (hasChinese || hasSpecialChars) {
    // 使用時間戳記作為檔名
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `photo_${timestamp}_${random}`;
  }
  
  return nameWithoutExt;
}

/**
 * 上傳單張圖片
 */
async function uploadImage(filePath, folder = 'daoyi-web', index = 0) {
  try {
    const originalFileName = path.basename(filePath, path.extname(filePath));
    const cleanFileName = sanitizeFileName(originalFileName);
    
    // 如果檔名被清理過,加上編號避免重複
    const publicId = cleanFileName !== originalFileName 
      ? `${cleanFileName}_${String(index + 1).padStart(3, '0')}`
      : cleanFileName;
    
    console.log(`📤 上傳中: ${originalFileName} → ${publicId}...`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      public_id: publicId,
      resource_type: 'image',
      // 自動優化
      quality: 'auto',
      fetch_format: 'auto',
    });

    console.log(`✅ 成功: ${result.public_id}`);
    console.log(`   URL: ${result.secure_url}`);
    
    return result;
  } catch (error) {
    console.error(`❌ 失敗: ${filePath}`);
    console.error(`   錯誤: ${error.message}`);
    return null;
  }
}

/**
 * 批次上傳資料夾中的所有圖片
 */
async function uploadFolder(folderPath, cloudinaryFolder = 'daoyi-web') {
  if (!fs.existsSync(folderPath)) {
    console.error(`❌ 資料夾不存在: ${folderPath}`);
    return;
  }

  const files = fs.readdirSync(folderPath);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  沒有找到圖片檔案');
    return;
  }

  console.log(`\n📁 找到 ${imageFiles.length} 張圖片\n`);

  const results = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const filePath = path.join(folderPath, file);
    const result = await uploadImage(filePath, cloudinaryFolder, i);
    if (result) {
      results.push(result);
    }
    // 避免 API 限制,稍微延遲
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✨ 完成! 成功上傳 ${results.length}/${imageFiles.length} 張圖片\n`);
  
  // 顯示所有圖片的 public_id
  console.log('📋 Public IDs (用於程式碼中):');
  results.forEach(result => {
    console.log(`   ${result.public_id}`);
  });
}

// 主程式
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
使用方式:
  node scripts/upload-to-cloudinary.js <資料夾路徑> [Cloudinary資料夾名稱]

範例:
  node scripts/upload-to-cloudinary.js ./temp-images
  node scripts/upload-to-cloudinary.js ./temp-images daoyi-web/260103

說明:
  1. 先從 Google Drive 下載照片到本機資料夾
  2. 執行此腳本上傳到 Cloudinary
  3. 取得 public_id 後就可以在網站中使用
  `);
  process.exit(0);
}

const folderPath = args[0];
const cloudinaryFolder = args[1] || 'daoyi-web';

uploadFolder(folderPath, cloudinaryFolder);
