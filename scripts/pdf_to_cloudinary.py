"""
PDF 頁面提取並上傳到 Cloudinary
每個 PDF 的每一頁渲染成圖片，上傳到 daoyi-web/books/<folder_name>/page_001 等路徑
"""

import fitz  # pymupdf
import cloudinary
import cloudinary.uploader
import os
import sys
import tempfile
from pathlib import Path

# Cloudinary 設定
cloudinary.config(
    cloud_name="dklwgtmj2",
    api_key="499387135334112",
    api_secret="sWBPeYakUK_N1uKdDwK-LVJQaVg",
)

# PDF 檔案與對應的 Cloudinary 資料夾名稱
PDF_FILES = {
    "A01君子謀道也.pdf": "a01",
    "A02學而君子乎.pdf": "a02",
    "A03君子三變乎.pdf": "a03",
    "A04365天的重量.pdf": "a04",
    "A05365天的重量.pdf": "a05",
    "B03道一淵源.pdf": "b03",
    "B04海外開荒.pdf": "b04",
    "B05海外開荒.pdf": "b05",
    "B06海外開荒.pdf": "b06",
    "B07海外開荒.pdf": "b07",
}

PDF_DIR = Path("d:/Code/daoyi-web/public/pdf")
CLOUDINARY_BASE_FOLDER = "daoyi-web/books"
DPI = 96  # 96 DPI，搭配 JPEG 壓縮控制在 10MB 以內


def upload_page(image_path: str, public_id: str) -> str:
    result = cloudinary.uploader.upload(
        image_path,
        public_id=public_id,
        overwrite=True,
        resource_type="image",
    )
    return result["secure_url"]


def process_pdf(pdf_filename: str, folder_name: str):
    pdf_path = PDF_DIR / pdf_filename
    if not pdf_path.exists():
        print(f"❌ 找不到檔案: {pdf_path}")
        return []

    print(f"\n[PDF] {pdf_filename}")
    doc = fitz.open(str(pdf_path))
    total_pages = len(doc)
    print(f"   {total_pages} pages")

    uploaded_ids = []

    with tempfile.TemporaryDirectory() as tmp_dir:
        for page_num in range(total_pages):
            page = doc[page_num]
            mat = fitz.Matrix(DPI / 72, DPI / 72)
            pix = page.get_pixmap(matrix=mat)

            img_filename = f"page_{str(page_num + 1).zfill(3)}.jpg"
            img_path = os.path.join(tmp_dir, img_filename)
            # 轉成 PIL 儲存，控制 JPEG 品質
            import PIL.Image
            import io
            img_data = pix.tobytes("png")
            pil_img = PIL.Image.open(io.BytesIO(img_data))
            pil_img.save(img_path, "JPEG", quality=82, optimize=True)

            public_id = f"{CLOUDINARY_BASE_FOLDER}/{folder_name}/page_{str(page_num + 1).zfill(3)}"

            print(f"   uploading {page_num + 1}/{total_pages}...", end=" ", flush=True)
            try:
                url = upload_page(img_path, public_id)
                print(f"OK {public_id}")
                uploaded_ids.append(public_id)
            except Exception as e:
                print(f"FAIL: {e}")

    doc.close()
    return uploaded_ids


def main():
    all_results = {}

    for pdf_filename, folder_name in PDF_FILES.items():
        ids = process_pdf(pdf_filename, folder_name)
        all_results[folder_name] = ids

    print("\n\nDone! Summary:")
    for folder, ids in all_results.items():
        print(f"  {folder}: {len(ids)} pages")

    print("\nPublic ID list:")
    for folder, ids in all_results.items():
        if ids:
            print(f"\n  # {folder}")
            for pid in ids:
                print(f'  "{pid}",')


if __name__ == "__main__":
    main()
