import { SORTED_ARTICLES_BY_DATE } from "../../../BLOG_CONSTANTS/_ARTICLES_LIST"
import { iArticle } from "../../shared/interfaces"
import { transformPath, transformThumbnailPath } from "../../utils/utils"
import Link from "next/link"
import Image from "next/image"

const HomeNonFeatureArticles = () => {
    const articles = SORTED_ARTICLES_BY_DATE.filter((article: iArticle) => !article.featureArticle).slice(0, 7);
    const featured = articles[0];
    const grid = articles.slice(1);

    if (!articles.length) return null;

    return (
        <div className="w-full">
            {/* Featured article */}
            {featured && (
                <Link
                    href={transformPath(featured.path)}
                    className="group flex flex-col md:flex-row bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-slate-700 mb-5 cursor-pointer"
                >
                    <div className="relative w-full md:w-[50%] h-[200px] md:h-[220px] flex-shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-700">
                        <Image
                            src={transformThumbnailPath(featured.preview.thumbnail, 'regular')}
                            alt={featured.preview.articleTitle}
                            fill
                            quality={85}
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            className="group-hover:scale-[1.03] transition-transform duration-500"
                        />
                    </div>
                    <div className="flex flex-col justify-center px-5 py-4 flex-1 min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{featured.preview.date}</p>
                        <h3 className="text-base font-bold text-[#334155] dark:text-slate-100 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {featured.preview.articleTitle}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                            {featured.preview.shortIntro}
                        </p>
                        <span className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                            閱讀更多
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </Link>
            )}

            {/* Grid */}
            {grid.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                    {grid.map((article, i) => (
                        <Link
                            key={article.path + i}
                            href={transformPath(article.path)}
                            className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-700 flex flex-col cursor-pointer"
                        >
                            <div className="relative h-[110px] md:h-[130px] overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                                <Image
                                    src={transformThumbnailPath(article.preview.thumbnail, 'compact')}
                                    alt={article.preview.articleTitle}
                                    fill
                                    quality={75}
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    className="group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="px-3 py-2.5 flex-1 flex flex-col">
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">{article.preview.date}</p>
                                <h3 className="text-xs font-bold text-[#334155] dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {article.preview.articleTitle}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* CTA */}
            <div className="w-full flex justify-center pt-2">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 py-2.5 px-8 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors duration-200"
                >
                    查看更多活動
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default HomeNonFeatureArticles
