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
                        協會章程
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-4">
                        <img src="/images/a1.jpg" alt="" className="rounded-lg overflow-hidden"  width="70%"/>
                        <img src="/images/a2.jpg" alt="" className="rounded-lg overflow-hidden"  width="70%"/>
                        <img src="/images/a3.jpg" alt="" className="rounded-lg overflow-hidden"  width="70%"/>
                        <img src="/images/a4.jpg" alt="" className="rounded-lg overflow-hidden"  width="70%"/>
                        <img src="/images/a5.jpg" alt="" className="rounded-lg overflow-hidden"  width="70%"/>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default AboutUs