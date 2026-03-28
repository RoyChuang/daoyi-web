import Link from "next/link";
import { iArticle, IAuthor } from "../../shared/interfaces";
import {
  transformImagePaths,
  transformPath,
} from "../../utils/utils";
import LinkTo from "../LinkTo";

const ArticleMoreFromAuthor = ({
  author,
  relatedArticles,
  articleGrid = false,
}: {
  author: IAuthor;
  relatedArticles: iArticle[];
  articleGrid?: boolean;
}) => {
  return (
    <>
      {relatedArticles.length ? (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-transparent shadow-md md:rounded-xl mb-[30px] overflow-hidden">

          {/* 標題列 */}
          <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">其他文章</h3>
          </div>

          {/* 文章列表 */}
          <div className={articleGrid
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 dark:bg-slate-700"
            : "divide-y divide-slate-100 dark:divide-slate-700"
          }>
            {relatedArticles.slice(0, 3).map((each, i) => (
              <Link
                href={transformPath(each.path)}
                key={i}
                className={
                  articleGrid
                    ? "flex items-center gap-3 p-3 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors group"
                    : "flex items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                }
              >
                {/* 圖片 */}
                <div className="w-[80px] h-[54px] flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={transformImagePaths(each.preview.thumbnail)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={each.preview.articleTitle}
                  />
                </div>

                {/* 標題 */}
                <p className="text-[13px] font-medium leading-snug line-clamp-2 min-w-0 text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {each.preview.articleTitle}
                </p>
              </Link>
            ))}
          </div>

          {/* CTA 按鈕 - 獨立區塊，有明顯分隔 */}
          {relatedArticles.length > 3 && (
            <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <LinkTo
                href={"/blog?author=" + author.name}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:hover:text-white transition-all duration-200"
              >
                顯示所有文章
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </LinkTo>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default ArticleMoreFromAuthor;
