/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../src/components";
import { CURRENT_YEAR } from "../src/constants/appConstants";
import { PRIMARY_NAV } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import { iSEO } from "../src/shared/interfaces";

const AboutUs = () => {
    const PAGE_SEO: iSEO = {
        title: '關於我們',
        description: `Hi we are WebExpe. This is an open source blog template which can help you start a simple static blog.`,
        keywords: 'webexpx, contact us, webexpe13@gmail.com, next js blog template',
        author: 'Mayur Nalwala, Rupali Yadav'
    }
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <section className='container px-3 md:pb-20 md:pt-10 pt-20'>
                <div className="">
                    <div className="block md:w-[15%] w-[50%] ">
                        <img src="/images/cropped-LOGO.png" alt="" className="rounded-lg overflow-hidden" />
                    </div>
                    <Text title className='mb-5 mt-10 dark:text-sky-400 text-sky-600'>
                        {PRIMARY_NAV.logo.text}
                    </Text>
                    
                    <div className="flex gap-2">
                        <img src="/images/about1.jpeg" alt="" className="rounded-lg overflow-hidden"  width="70%"/>
                        <img src="/images/about2.jpeg" alt="" className="rounded-lg overflow-hidden"  width="70%"/>
                    </div>

                    
        
                </div>
            </section>
        </PageLayout>
    )
}

export default AboutUs