/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../src/components";
import { CURRENT_YEAR } from "../src/constants/appConstants";
import { PRIMARY_NAV } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import { iSEO } from "../src/shared/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
    return (
        <PageLayout home>
            <section className='container px-3 md:pb-20 pt-6'>
                <div className="">
                    <h1 className='text-3xl font-bold py-6 text-[#334155] flex items-center gap-3'>
                        <FontAwesomeIcon icon={faSitemap} className="text-[#334155]" />
                        組織架構
                    </h1>
                    
                    <div className="flex flex-col gap-2 mt-4">
                        <Image className="rounded-lg overflow-hidden shadow" src="/images/s1.jpg" alt="nextjs-simple-blog-template" size={ImageSize.DEFAULT} />
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default AboutUs