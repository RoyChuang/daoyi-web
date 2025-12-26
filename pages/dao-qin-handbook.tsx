import { PageLayout, Text } from '../src/components';
import { DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const DaoQinHandbookPage = () => {
    // Google Drive PDF 嵌入連結
    const pdfUrl = "https://drive.google.com/file/d/1LhYOiGRLvwx6GrYdEZfKVkJp3xpkpDBZ/preview";

    return (
        <PageLayout home>
            <NextSeo
                title="道親手冊 | 社團法人新北市道一關懷協會"
                description="道一關懷協會道親手冊"
                {...DEFAULT_SEO}
            />
            <section className='container px-3 pb-10'>
                <h1 className='text-3xl font-bold py-6 text-[#1e1e1e] flex items-center gap-3'>
                    <FontAwesomeIcon icon={faBook} className="text-[#1e1e1e]" />
                    道親手冊
                </h1>
                <div 
                    className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'
                    style={{ height: '80vh', minHeight: '500px' }}
                >
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="100%"
                        allow="autoplay"
                        style={{ border: 'none' }}
                        title="道親手冊"
                    />
                </div>
            </section>
        </PageLayout>
    );
};

export default DaoQinHandbookPage;
