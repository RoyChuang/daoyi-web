import { PageLayout, Text, LinkTo } from '../src/components';
import { MAYUR, DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const VideoPage = () => {
    return (
        <PageLayout home>
            <NextSeo
                title="影音分享 | 社團法人新北市道一關懷協會"
                description="道一關懷協會影音分享"
                {...DEFAULT_SEO}
            />
            <section className='container px-3 pb-10 pt-6'>
                <h1 className='text-3xl font-bold py-6 text-[#334155] flex items-center gap-3'>
                    <FontAwesomeIcon icon={faVideo} className="text-[#334155]" />
                    影音分享
                </h1>
                <div className='py-5 grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className='aspect-video w-full rounded-xl overflow-hidden shadow-lg'>
                        <iframe
                            className='w-full h-full'
                            src="https://www.youtube.com/embed/QefFeDgybhs?feature=oembed"
                            title="善歌丨但願丨活佛師尊 慈訓丨白陽小徒兒"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className='aspect-video w-full rounded-xl overflow-hidden shadow-lg'>
                        <iframe
                            className='w-full h-full'
                            src="https://www.youtube.com/embed/xeBZjbmTlv0?feature=oembed"
                            title="10聖賢腳步柳烱堯"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default VideoPage;
