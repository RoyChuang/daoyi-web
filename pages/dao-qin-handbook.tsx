import { PageLayout } from '../src/components';
import { DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import dynamic from 'next/dynamic';

// 動態載入 PdfFlipbook 元件，避免 SSR 問題
const PdfFlipbook = dynamic(
    () => import('../src/components/PdfFlipbook'),
    { 
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }
);

const DaoQinHandbookPage = () => {
    // 根據環境選擇 PDF 來源
    // 開發環境：使用本地路徑
    // 生產環境：使用 GitHub CDN（不佔 Azure 流量）
    const pdfUrl = process.env.NODE_ENV === 'production'
        ? "https://raw.githubusercontent.com/RoyChuang/daoyi-web/main/public/pdf/dao-qin-handbook.pdf"
        : "/pdf/dao-qin-handbook.pdf";

    return (
        <PageLayout home>
            <NextSeo
                title="道親手冊 | 社團法人新北市道一關懷協會"
                description="道一關懷協會道親手冊 - 翻書閱讀體驗"
                {...DEFAULT_SEO}
            />
            <section className='container px-3 pb-10'>
                <h1 className='text-xl font-bold pt-6 pb-2 text-[#334155] flex items-center gap-3'>
                    <FontAwesomeIcon icon={faBook} className="text-[#334155]" />
                    道親手冊
                </h1>
                
                {/* PDF 翻書閱讀器 */}
                <PdfFlipbook pdfUrl={pdfUrl} />
                

            </section>
        </PageLayout>
    );
};

export default DaoQinHandbookPage;
