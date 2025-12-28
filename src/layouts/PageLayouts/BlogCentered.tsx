import classes from './PageLayout.module.scss';
import { combineClasses, getArticleDetails, transformImagePaths, transformPath } from '../../utils/utils';
import { SORTED_ARTICLES_BY_DATE } from '../../../BLOG_CONSTANTS/_ARTICLES_LIST';
import Link from 'next/link';
import Seperator from '../../components/Seperator';
import ArticleHeader from '../../components/ArticleHeader';
import Avatar from '../../components/Misc/Avatar';
import ArticleMoreFromAuthor from '../../components/Misc/ArticleMoreFromAuthor';
import React from 'react';

interface CenteredProps {
    children: React.ReactNode;
    heroSlot?: React.ReactNode;
}

const Centered = ({ children, heroSlot }: CenteredProps) => {
    const ARTICLE_DETAILS = getArticleDetails();
    const author = ARTICLE_DETAILS.preview.author;
    const relatedArticles = SORTED_ARTICLES_BY_DATE.filter((each) => each.preview.author === author);

    return (
        <section className={combineClasses(classes.centered_article_wrapper, 'dark:bg-slate-900 dark:text-white')}>
            <div className="container px-0 md:px-[15px] pt-[50px] pb-[50px]">
                {/* 文章主體容器 - Hero + 內容統一包裝 */}
                <div className="max-w-[1000px] mx-auto overflow-hidden rounded-none md:rounded-[8px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)]">
                    {/* Hero 首圖區塊 */}
                    {heroSlot && (
                        <div className="w-full">
                            {heroSlot}
                        </div>
                    )}
                    {/* 文章內容區 */}
                    <article className={combineClasses(classes.article_content, 'pb-[30px] px-3 bg-white dark:bg-slate-800 dark:border-none dark:text-white pt-6 md:pt-8 font-regular text-lg leading-relaxed !max-w-none !rounded-none !shadow-none !border-0')}>
                        <ArticleHeader ARTICLE_DETAILS={ARTICLE_DETAILS} centered />
                        {children}
                    </article>
                </div>
                <Seperator />
                <div className={combineClasses(classes.author_and_more, 'mx-auto')}>
                    <ArticleMoreFromAuthor author={author} relatedArticles={relatedArticles} articleGrid />
                </div>

            </div>
        </section>
    )
}

export default Centered