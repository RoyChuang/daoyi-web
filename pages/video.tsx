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
                <div className='py-5 grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className='aspect-video w-full rounded-xl overflow-hidden shadow-lg'>
                        <iframe
                            className='w-full h-full'
                            src="https://www.youtube.com/embed/QefFeDgybhs"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className='aspect-video w-full rounded-xl overflow-hidden shadow-lg'>
                        <iframe
                            className='w-full h-full'
                            src="https://www.youtube.com/embed/xeBZjbmTlv0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default VideoPage;
