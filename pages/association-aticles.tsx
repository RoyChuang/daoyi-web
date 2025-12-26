/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../src/components";
import { CURRENT_YEAR } from "../src/constants/appConstants";
import { PRIMARY_NAV } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import { iSEO } from "../src/shared/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
    return (
        <PageLayout home>
            <section className='container px-3 md:pb-20 md:pt-10 pt-20'>
                <div className="">
                    <h1 className='text-3xl font-bold py-6 text-[#1e1e1e] flex items-center gap-3'>
                        <FontAwesomeIcon icon={faScroll} className="text-[#1e1e1e]" />
                        協會章程
                    </h1>
                    
                    <div className="flex flex-wrap mt-4">
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/a1.jpg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/a2.jpg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/a3.jpg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/a4.jpg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/a5.jpg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default AboutUs