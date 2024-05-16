/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider  } from "../src/components";
import { iSEO } from "../src/shared/interfaces";

const ContactUs = () => {
    const PAGE_SEO: iSEO = {
        title: '贊助本會',
        description: '社團法人新北市道一關懷協會',
        keywords: '社團法人新北市道一關懷協會',
    } 
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <section className='container px-3 pb-10 md:pt-20 pt-[80px] flex items-center gap-3'>
                <img src="/images/cropped-LOGO.png" alt="" className="rounded-lg overflow-hidden" width={100}/>
                <Text title className="!text-5xl text-[#717172]">
                    贊助本會
                </Text>
            </section>
            <section className={"dark:bg-slate-800 bg-blue-100 container py-3 md:px-20 px-5 rounded"}>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                新北市政府立案成立的協會，日後若要"繳會員年費"或"小額捐款"，請使用銀行轉帳，以便日後報稅用。
                </Text>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                戶名: 社團法人新北市道一關懷協會
                </Text>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                帳號: 第一銀行 樹林分行帳號: 20310056081
                </Text>
            </section>
            <section className={"dark:bg-slate-800 bg-blue-100 container py-3 md:px-20 px-5 rounded mt-4"}>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                在道務上的費用支出或協會工作上的費用支出，請開立收據或統一發票。
                </Text>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                署名: 社團法人新北市道一關懷協會
                </Text>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                統一編號: 91177786
                </Text>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                以便日後會計報帳用，感謝慈悲!
                </Text>
            </section>
        </PageLayout>
    )
}

export default ContactUs