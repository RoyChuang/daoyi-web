import { PageLayout, Text, LinkTo } from '../src/components';
import { MAYUR, DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import { NextSeo } from 'next-seo';

const VideoPage = () => {
    return (
        <PageLayout home>
            <NextSeo
                title="影音作品 | 社團法人新北市道一關懷協會"
                description="道一關懷協會影音作品"
                {...DEFAULT_SEO}
            />
            <section className='container px-3 pb-10'>
                <div className='pt-10 pb-5'>
                    <Text title className='text-3xl'>
                        影音作品
                    </Text>
                </div>
                <div className='py-10 text-center text-gray-500 dark:text-gray-400'>
                    <p className='text-lg'>頁面建置中，敬請期待...</p>
                </div>
            </section>
        </PageLayout>
    );
};

export default VideoPage;
