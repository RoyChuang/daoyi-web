import { PageLayout, Text } from '../src/components';
import { DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

// 動態載入 PDF Viewer（避免 SSR 問題）
const PDFViewer = dynamic(() => import('../src/components/PDFViewer'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-[600px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    ),
});

const DaoQinHandbookPage = () => {
    return (
        <PageLayout home>
            <NextSeo
                title="道親手冊 | 社團法人新北市道一關懷協會"
                description="道一關懷協會道親手冊"
                {...DEFAULT_SEO}
            />
            <section className='container px-3 pb-10'>
                <h1 className='text-3xl font-bold py-6 dark:text-white'>
                    道親手冊
                </h1>
                <div style={{ height: '700px' }}>
                    <PDFViewer fileUrl="/book/book1.pdf" />
                </div>
            </section>
        </PageLayout>
    );
};

export default DaoQinHandbookPage;
