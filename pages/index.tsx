/**These are necessary imports / components for the page */
import { PageLayout, Text, LinkTo } from "../src/components";
import ArticleCard from '../src/components/ArticleCards/ArticleCard';
import { SORTED_ARTICLES_BY_DATE } from '../BLOG_CONSTANTS/_ARTICLES_LIST';
import { DEFAULT_SEO } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import FeaturedArticleSection from "../src/components/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "../src/components/Misc/HomeNonFeatureAricles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUserCircle, faBookOpen, faBook } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// 書籍資料 - 未來新增書籍只需在這裡加入即可
const books = [
  {
    id: 1,
    title: "道親手冊",
    href: "/dao-qin-handbook",
    icon: faBook,
  },
  // 未來新增書籍範例：
  // {
  //   id: 2,
  //   title: "修道指南",
  //   href: "/xiu-dao-guide",
  //   icon: faBook,
  // },
];

const Home = () => {
  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
      <div className='w-full pb-20 mb-10 bg-slate-200 bg-cover bg-top h-[200px]' style={{backgroundImage: 'url(/images/top1.jpg)'}}>
      </div>
      <div className="container mx-auto lg:px-[15px] px-0">
        
        {/* 人物分享 + 好書閱讀 區塊 */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 px-3">
          
          {/* 左側：人物分享 */}
          <div>
            <h2 className='w-full mb-4 text-3xl font-bold text-[#334155] flex items-center gap-3'>
              <FontAwesomeIcon icon={faUserCircle} className="text-[#334155]" />
              人物分享
            </h2>
            <Link href="/he-qian-ren" passHref>
              <a className="block group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
                  <div className="sm:w-40 w-full h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                    <img 
                      src="/images/he-qian-ren/01-main-hero.jpg" 
                      alt="何紹棠前人" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-center">
                    <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2 w-fit">種籽人物志</span>
                    <h3 className="text-lg font-bold text-[#334155] group-hover:text-blue-600 transition-colors duration-300">
                      好學不倦，筆耕不輟 – 何紹棠前人
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">2024-12-15 | 編輯室</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>

          {/* 右側：好書閱讀 */}
          <div>
            <h2 className='w-full mb-4 text-3xl font-bold text-[#334155] flex items-center gap-3'>
              <FontAwesomeIcon icon={faBookOpen} className="text-[#334155]" />
              好書閱讀
            </h2>
            <div className="flex flex-wrap gap-3">
              {books.map((book) => (
                <Link key={book.id} href={book.href} passHref>
                  <a className="group inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-300 transition-all duration-300">
                    <FontAwesomeIcon icon={book.icon} className="text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium text-[#334155] group-hover:text-blue-600 transition-colors duration-300">
                      {book.title}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={'flex flex-wrap'}>
          {/* <FeaturedArticleSection />
          <h1 className='px-3 w-full mb-5 text-xl md:text-3xl font-medium'>Checkout the below articles on how to use different layouts and components</h1>
          <hr className='border-1 mb-5 w-[98%] mx-auto' /> */}
          <h1 className='px-3 w-full mb-5 text-3xl font-bold text-[#334155] flex items-center gap-3'>
            <FontAwesomeIcon icon={faCalendarDays} className="text-[#334155]" />
            近期活動
          </h1>
          <HomeNonFeatureArticles />
        </div>
      </div>
    </PageLayout>
  )
}

export default Home