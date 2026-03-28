import { SORTED_ARTICLES_BY_DATE } from "../../../BLOG_CONSTANTS/_ARTICLES_LIST";
import { getCategories, transformPath, transformThumbnailPath } from "../../utils/utils";
import { useRouter } from "next/router";
import { PageLayout } from "../../components";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { iArticle } from "../../shared/interfaces";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = ['全部', ...getCategories()];

const BlogIndexPage = ({ articlesPerPage = 12 }: { articlesPerPage?: number }) => {
  const router = useRouter();
  const { category: queryCategory, author: queryAuthor } = router.query;

  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [itemOffset, setItemOffset] = useState(0);

  // Sync URL category param → local state
  useEffect(() => {
    setActiveCategory(
      queryCategory && typeof queryCategory === 'string' ? queryCategory : '全部'
    );
  }, [queryCategory]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setItemOffset(0);
  }, [activeCategory, queryAuthor]);

  // Compute filtered list inline (fast filter, ~1600 items)
  const filteredArticles = SORTED_ARTICLES_BY_DATE.filter(article => {
    const matchCategory = activeCategory === '全部' || article.preview.category === activeCategory;
    const matchAuthor = !queryAuthor || article.preview.author.name === queryAuthor;
    return matchCategory && matchAuthor;
  });

  const pageCount = Math.ceil(filteredArticles.length / articlesPerPage);
  const safeOffset = Math.min(itemOffset, Math.max(0, filteredArticles.length - 1));
  const currentItems = filteredArticles.slice(safeOffset, safeOffset + articlesPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setItemOffset((event.selected * articlesPerPage) % Math.max(filteredArticles.length, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const query = cat === '全部' ? {} : { category: cat };
    router.push({ pathname: '/blog', query }, undefined, { shallow: true });
  };

  // First item = featured, rest = grid
  const featuredArticle = currentItems[0];
  const gridArticles = currentItems.slice(1);

  return (
    <PageLayout home>
      <div className="container px-3 pt-6 pb-12">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#334155] dark:text-slate-100 flex items-center gap-3">
            <FontAwesomeIcon icon={faBullhorn} className="text-[#334155] dark:text-slate-300" />
            班會報導
          </h1>
        </div>

        {/* Category Tabs — touch target h-[44px], overflow-x-auto for mobile */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 -mx-3 px-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={[
                'flex-shrink-0 px-4 h-[44px] rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                activeCategory === cat
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-400'
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article — horizontal card, image left on desktop */}
        {featuredArticle && (
          <Link
            href={transformPath(featuredArticle.path)}
            className="group flex flex-col md:flex-row bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-slate-700 mb-6 cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full md:w-[55%] h-[220px] md:h-[260px] flex-shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-700">
              <Image
                src={transformThumbnailPath(featuredArticle.preview.thumbnail, 'regular')}
                alt={featuredArticle.preview.articleTitle}
                fill
                quality={85}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="group-hover:scale-[1.03] transition-transform duration-500"
              />
              {featuredArticle.preview.category && (
                <span className="absolute top-3 left-3 inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                  {featuredArticle.preview.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center px-6 py-5 flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {featuredArticle.preview.date}
              </p>
              <h2 className="text-lg font-bold text-[#334155] dark:text-slate-100 leading-snug mb-3 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {featuredArticle.preview.articleTitle}
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {featuredArticle.preview.shortIntro}
              </p>
              <span className="mt-4 text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                閱讀更多
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        )}

        {/* Article Grid — 1 col mobile / 2 col tablet / 3 col desktop */}
        {gridArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {gridArticles.map((article: iArticle, i: number) => (
              <Link
                key={i}
                href={transformPath(article.path)}
                className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-700 flex flex-col cursor-pointer"
              >
                <div className="relative h-[140px] overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                  <Image
                    src={transformThumbnailPath(article.preview.thumbnail, 'compact')}
                    alt={article.preview.articleTitle}
                    fill
                    quality={75}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  {article.preview.category && (
                    <span className="absolute top-2 left-2 inline-block bg-blue-500 text-white text-[11px] px-1.5 py-0.5 rounded">
                      {article.preview.category}
                    </span>
                  )}
                </div>
                <div className="px-4 py-3 flex-1 flex flex-col">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                    {article.preview.date}
                  </p>
                  <h3 className="text-sm font-bold text-[#334155] dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {article.preview.articleTitle}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-slate-400 dark:text-slate-500 text-sm">此分類目前沒有文章</p>
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName="pagination"
            activeClassName="active"
          />
        )}

      </div>
    </PageLayout>
  );
};

export default BlogIndexPage;
