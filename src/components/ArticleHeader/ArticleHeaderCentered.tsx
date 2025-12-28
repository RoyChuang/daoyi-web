import Link from "next/link"
import { IArticleHeaderData } from "../../shared/interfaces"
import { combineClasses } from "../../utils/utils"
import ArticleTags from "../Misc/ArticleTags"
import classes from './ArticleHeader.module.scss'

interface IProps {
    headerData: IArticleHeaderData
}

const ArticleHeaderCenter = ({ headerData }: IProps) => {
    return (
        <div className="mb-[30px] px-[40px]">
            {/* 主標題 - 靠左對齊 */}
            <h1 className={combineClasses(classes.articleTitle, "text-left text-xl md:text-2xl lg:text-[1.75rem] font-bold mt-[10px] mb-[15px] leading-relaxed text-gray-800")}>
                {headerData.articleTitle}
            </h1>
            
            {/* 日期與標籤區 - 靠左 */}
            <div className="flex flex-col items-start gap-3 mt-4">
                {/* 日期 */}
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{headerData.date}</span>
                </div>
                
                {/* 標籤 */}
                <div className="flex justify-start">
                    <ArticleTags tags={headerData.tags} />
                </div>
            </div>
            
            {/* 裝飾分隔線 */}
            <div className="flex items-center justify-start mt-6 mb-2">
                <div className="h-[2px] w-16 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            </div>
        </div>
    )
}

export default ArticleHeaderCenter