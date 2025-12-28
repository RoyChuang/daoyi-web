import { SORTED_ARTICLES_BY_DATE } from "../../../BLOG_CONSTANTS/_ARTICLES_LIST"
import { iArticle } from "../../shared/interfaces"
import ArticleCardCompact from '../ArticleCards/ArticleCardCompact';
import LinkTo from "../LinkTo";

const HomeNonFeatureArticles = () => {
    const restArticles = SORTED_ARTICLES_BY_DATE.filter((article: iArticle) => !article.featureArticle);
    const articlesToDisplay = 6; // 減少顯示數量，更整齊
    return (
        <>
            {
                restArticles.length ?
                    restArticles.slice(0, articlesToDisplay).map((each, i) => (
                        <ArticleCardCompact article={each.preview} path={each.path} key={each.path + i} />
                    )) : null
            }

            {
                restArticles.length > articlesToDisplay ?
                    (
                        <div className="w-full flex items-center pt-2">
                            <LinkTo
                                href="/pages/blog"
                                className="
                                    w-auto h-auto text-sm py-2.5 px-8 
                                    text-center dark:bg-slate-800 
                                    bg-blue-500 rounded-full mx-auto text-white font-medium 
                                    hover:bg-blue-600 dark:hover:!text-slate-400 transition-all">
                                查看更多活動
                            </LinkTo>
                        </div>
                    ) : null
            }

        </>
    )
}

export default HomeNonFeatureArticles