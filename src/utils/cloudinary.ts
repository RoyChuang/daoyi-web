/**
 * Cloudinary 圖片工具函數
 * 用於生成優化的圖片 URL
 */

// Cloudinary Cloud Name
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dklwgtmj2';

/**
 * 生成 Cloudinary 圖片 URL
 * @param publicId - 圖片的 public ID (上傳時的檔名,不含副檔名)
 * @param options - 圖片轉換選項
 * @returns 完整的圖片 URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
    quality?: number | 'auto';
    format?: 'auto' | 'jpg' | 'png' | 'webp';
  }
): string {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options || {};

  // 建立轉換參數
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformString = transformations.length > 0 
    ? `${transformations.join(',')}` 
    : '';

  // 生成完整 URL
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

/**
 * 生成縮圖 URL
 * @param publicId - 圖片的 public ID
 * @param size - 縮圖尺寸 (預設 300px)
 */
export function getThumbnailUrl(publicId: string, size: number = 300): string {
  return getCloudinaryUrl(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * 生成響應式圖片 URL
 * @param publicId - 圖片的 public ID
 * @param width - 圖片寬度
 */
export function getResponsiveUrl(publicId: string, width: number): string {
  return getCloudinaryUrl(publicId, {
    width,
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Cloudinary 圖片資料型別
 */
export interface CloudinaryImage {
  publicId: string;
  url: string;
  thumbnailUrl: string;
  width?: number;
  height?: number;
  format?: string;
}

/**
 * 建立 Cloudinary 圖片物件
 * @param publicId - 圖片的 public ID
 */
export function createCloudinaryImage(publicId: string): CloudinaryImage {
  return {
    publicId,
    url: getCloudinaryUrl(publicId),
    thumbnailUrl: getThumbnailUrl(publicId),
  };
}
