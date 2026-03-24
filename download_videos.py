import re
import os
import yt_dlp

ts_path = r"d:\Code\daoyi-web\BLOG_CONSTANTS\_VIDEOS_LIST.ts"
target_dir = r"C:\Users\Roy\Desktop\ty"

with open(ts_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract video IDs
matches = re.findall(r'id:\s*"([^"]+)"', content)

# Remove the example template ID if it is there
matches = [m for m in matches if m != "VIDEO_ID_HERE"]

# Remove duplicates
video_ids = list(dict.fromkeys(matches))
print(f"Found {len(video_ids)} videos to download.")

os.makedirs(target_dir, exist_ok=True)

ydl_opts = {
    'outtmpl': os.path.join(target_dir, '%(title)s.%(ext)s'),
    'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    'merge_output_format': 'mp4',
    'noplaylist': True,
    'ignoreerrors': True, # Ignore errors like video unavailable
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    urls = [f'https://www.youtube.com/watch?v={vid}' for vid in video_ids]
    ydl.download(urls)

print("Done downloading all videos.")
