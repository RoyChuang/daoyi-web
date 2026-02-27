import LinkTo from "../LinkTo";
import { IArticleHeaderData } from "../../shared/interfaces";
import {
  combineClasses,
  transformImagePaths,
  transformThumbnailPath,
  transformPath,
} from "../../utils/utils";
import Image from "next/image";

interface IProp {
  article: IArticleHeaderData;
  path: string;
}

/**
 * 簡潔版文章卡片 - 用於首頁近期活動區塊
 * 只顯示：圖片、日期、標題
 */
const ArticleCardCompact = ({ article, path }: IProp) => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const imgLoader = ({ src, width, quality }: any) => {
    if (src.startsWith('http')) return src;
    return `${origin}${src.startsWith('/') ? src : '/' + src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className={"w-full lg:w-1/3 md:w-1/2 md:px-[15px] px-2 mb-[20px]"}>
      <LinkTo
        href={transformPath(path)}
        passHref
        className="block h-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-700 group"
      >
        {/* 圖片區塊 */}
        <div className="overflow-hidden h-[140px] relative">
          <Image
            src={transformThumbnailPath(article.thumbnail, 'compact')}
            alt={article.articleTitle}
            layout="fill"
            quality={80}
            objectFit="cover"
            objectPosition="center center"
            loader={imgLoader}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 內容區塊 */}
        <div className="px-3 py-3 h-[76px] flex flex-col">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {article.date}
          </p>
          <h3 className="text-sm font-bold text-[#334155] dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {article.articleTitle}
          </h3>
        </div>
      </LinkTo>
    </div>
  );
};

export default ArticleCardCompact;
