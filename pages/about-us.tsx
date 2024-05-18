/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../src/components";
import { CURRENT_YEAR } from "../src/constants/appConstants";
import { PRIMARY_NAV } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import { iSEO } from "../src/shared/interfaces";

const AboutUs = () => {
    return (
        <PageLayout home>
            <section className='container px-3 md:pb-20 md:pt-10 pt-20'>
                <div className="">
                    <div className="block flex gap-3 w-full font-bold items-center text-5xl text-[#717172]">
                        <img src="/images/cropped-LOGO.png" alt="" className="rounded-lg overflow-hidden" width={100}/>
                        關於我們
                    </div>
                    <Text title className='mb-5 mt-10 dark:text-sky-400 text-sky-600'>
                        {PRIMARY_NAV.logo.text}
                    </Text>
                    
                    <div className="flex flex-wrap">
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/about1.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/about2.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default AboutUs