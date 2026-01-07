import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { getYoutubeThumbnail } from "../../BLOG_CONSTANTS/_VIDEOS_LIST";

interface VideoThumbnailProps {
  videoId: string;
  title: string;
  onClick: () => void;
}

/**
 * 影片縮圖元件
 * 顯示 YouTube 影片縮圖、播放按鈕和標題
 */
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoId, title, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
    >
      <div className="aspect-video w-full">
        <img 
          src={getYoutubeThumbnail(videoId, 'medium')} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* 播放按鈕 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FontAwesomeIcon icon={faPlay} className="text-white text-sm md:text-lg ml-0.5" />
        </div>
      </div>
      
      {/* 影片標題 - 底部 */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* 灰色半透明底層 */}
        <div className="absolute inset-0 bg-gray-900/60"></div>
        {/* 黑色漸層 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* 文字內容 */}
        <p className="relative text-white text-xs font-medium truncate text-left px-2 py-1.5">
          {title}
        </p>
      </div>
    </button>
  );
};

export default VideoThumbnail;
