/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";
import { HowToUseImageCode, HowToUseList, HowToUseSeperator, HowToUseTextCode } from "../../src/constants/codeBlocks";

const Activities = () => {
    return (
        // pass blogcentered as show below for article page centered layout
        <PageLayout blogcentered>
            <Text p>
                今日平溪「游氏佛堂」二十多年來再次辦道，壹位佛根深厚(吃素:因看到卡車上載滿很多活生生的豬，將到屠宰場，心生不忍之心、從此開始不吃豬肉--不久就不吃葷、改吃素食)的有緣人聞得孔孟聖道、性理心法。感謝辦道以及服務前賢慈悲了愿，感謝慈悲！
            </Text>
            <div className="flex flex-wrap">
                <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src="/public/images/blog/1/1.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src="/public/images/blog/1/2.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src="/public/images/blog/1/3.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src="/public/images/blog/1/4.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
                <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src="/public/images/blog/1/5.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
            </div>

        </PageLayout>
    )
}

export default Activities;