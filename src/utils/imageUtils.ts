import fs from 'fs';
import path from 'path';

export interface BlogImage {
  src: string;
  blogPath: string;
}

// 取得 public/images/blog 下所有圖片的路徑以及對應的部落格連結
export function getAllBlogImages(): BlogImage[] {
  const blogDir = path.join(process.cwd(), 'public', 'images', 'blog');
  const images: BlogImage[] = [];
  
  try {
    const folders = fs.readdirSync(blogDir);
    
    for (const folder of folders) {
      const folderPath = path.join(blogDir, folder);
      const stat = fs.statSync(folderPath);
      
      if (stat.isDirectory()) {
        const files = fs.readdirSync(folderPath);
        
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            // 回傳圖片路徑和對應的部落格連結
            images.push({
              src: `/images/blog/${folder}/${file}`,
              blogPath: `/blog/${folder}`,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading blog images:', error);
  }
  
  return images;
}

// 隨機選取 n 張圖片
export function getRandomImages(images: BlogImage[], count: number): BlogImage[] {
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
