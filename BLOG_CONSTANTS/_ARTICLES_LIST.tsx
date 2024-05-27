import { iArticle } from "../src/shared/interfaces";

// Import author profiles, just type the name you have set in _BLOG_SETUP inside the curly brackets
import { MAYUR, RUPALI } from "./_BLOG_SETUP";

// main article list to display all atricles
/**
 * Example article object
 * 
 {
    path: '/pages/tutorial/tutorial/how-to-setup-blog',
    featureArticle: true,
    preview: {
        // the author object you created in _BLOG_SETUP file
        author: MAYUR,
        date: "March 03 2022",
        articleTitle: "How to setup this plog template",
        tags: "demo, blog setup",
        thumbnail: "/images/tutorials/demo-image.jpg",
        shortIntro: "These are the steps to setup your blog",
    },
    seo: {
        title: "These are the steps to setup your blog",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        keywords: "demo, blog setup",
        ogImage: "/images/tutorials/demo-image.jpg",
        twitterHandle: "@mayur_nalwala",
    }
}
 */

// clear this article list and add your own
const ARTICLES_LIST: iArticle[] = [
  {
    id: '24526',
    path: "/blog/24526",
    preview: {
      author: RUPALI,
      date: "5-26-2024",
      articleTitle: "泰國-上半年度「壇主人才班」",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24526/1.jpeg",
      shortIntro:
        "5/26(日)泰國-上半年度「壇主人才班」，從08:45獻供開始，感謝陳領導點傳師慈悲「致詞」和「結語」鼓勵大家，修道要把興毅精神傳承下來、辦道要能團結、扶圓補缺、活潑應事，我們才能更精進。感謝何點傳師慈悲成全，題目：「興毅重光、重光興毅」-「興毅重光」在台灣是永繼師尊師母道脈~(重建總壇接道脈-2008)，總壇是根(大家的根)，「重光興毅」要延續正法、興毅大生命不倒、自我完善。感謝黃伶珠點傳師慈悲鼓勵我們(台灣及新加坡道親)來泰國了愿服務和廚務。感謝諸位點傳師到堂關心，感謝楊登詠講師慈悲成全，題目:「光大興毅道風-誠、正、樸、毅、忠、信」，感謝王潤源講師慈悲成全，題目:「引保師關懷道親」。感謝翻譯:陳月嬌講師、呂佳憲講師、張錦城講師，大家法喜充滿、頗有所得。感謝劉美均講師慈悲輔導兒童學習道理，感謝台灣、新加坡前賢以誠心、用心、愛心與道心共同承擔完成任務。感謝慈悲!",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24526/1.jpeg",
    },
  },
  {
    id: '24525',
    path: "/blog/24525",
    preview: {
      author: RUPALI,
      date: "5-25-2024",
      articleTitle: "泰國-萬緣佛堂「講員培訓班」",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24525/1.jpeg",
      shortIntro:
        "5/25(六)泰國-萬緣佛堂「講員培訓班」，從08:45獻供開始，感謝陳材源領導點傳師慈悲致詞、感謝何明修點傳師慈悲成全、感謝黃伶珠點傳師做結語以及諸位點傳師到堂關心，感謝王潤源講師慈悲、楊登詠慈悲成全，感謝翻譯:張瑞妝講師、陳月嬌講師、呂佳憲講師、張錦城講師；至最後一堂課「綜合討論」，大家分組、心得報告，法喜充滿、頗有所得。感謝劉美均講師慈悲輔導兒童學習，感謝台灣、新加坡前賢以誠心、愛心與道心的了愿精神做服務工作和豐盛的餐食享用。感謝慈悲!",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24525/1.jpeg",
    },
  },
  {
    id: '24519',
    path: "/blog/24519",
    preview: {
      author: RUPALI,
      date: "5-19-2024",
      articleTitle: "興毅(忠信)北區全家福班",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24519/1.jpeg",
      shortIntro:
        "興毅(忠信)北區全家福班，於今日在道明聖堂與道弘舉行，道一聖道院多位壇主人才參與班會，諸多道親並了愿兒童班輔導員、青少年班輔導員以長青班、壇主人才班執禮、茶水毛巾、環境整理等各項服務工作，並從旁聞法，大家法喜充滿了愿快樂。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24519/1.jpeg",
    },
  },
  {
    id: '24518',
    path: "/blog/24518",
    preview: {
      author: RUPALI,
      date: "5-18-2024",
      articleTitle: "古坑「陳氏佛堂」班會",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24518/1.jpg",
      shortIntro:
        "古坑「陳氏佛堂」班會邀請何明修點傳師慈悲成全，題目:「認理實修」。內容「道真、理真、天命真」，吳老前人慈悲：「天道真正的原則,真正的精神,就是崇尚「真理」，也就是我們常講的:〔道真、理真、天命真。〕〔天命真〕非常非常重要，對第一寶來說，真天命可以給你點開(玄關竅、智慧門)，假天命點不開。〔理真〕，在天道叫做「性理心法」是以心印心之法。三教經典最精髓的地方，叫明心見性、修心煉性、存心養性，一個心，一個性。良心是本性的作用。「人之初，性本善」本性是一個靜，發出的作用，叫做良心，這個不用學。〔教化與真理〕、「你要做好人、不要做壞事、要順父母⋯這不是靠宗教力量，真正覺悟的話你會做，不需要特別講。若明白道理，您自己會做，這就是...良心、〔道〕。「靈性復活，良心再現」這是真理，叫「性理心法」。天道就是直接從「性理心法」入手。〔道真〕、真在什麼地方？〔道有道統〕我們應該是根據這條路走。所以知道真理以後、我們就要「認理實修」",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24518/1.jpg",
    },
  },
  {
    id: '2',
    path: "/blog/2",
    preview: {
      author: RUPALI,
      date: "5-4-2024",
      articleTitle: "道親聯誼暨母親節康乃馨獻花活動",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/2/1.jpeg",
      shortIntro:
        "社團法人新北市道一關懷協會」道一聖道院，今日於桃園市虎頭山公園舉辦「道親聯誼暨母親節康乃馨獻花活動」，感謝上天慈悲賜給我們一個風和日麗的好天氣，感謝兩位點傳師慈悲領導與關心，感謝彦宸講師和美均講師帶來輕鬆有趣的團康活動，感謝諸位道親準備咖啡、水果、點心、茶水及各式各樣美食饗宴，感謝諸位道親對道一各項班會活動的支持，希望未來協會與道一道務(壇務)能更順遂更宏展。感謝慈悲！",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/2/1.jpeg",
    },
  },
  {
    id: '3',
    path: "/blog/3",
    preview: {
      author: RUPALI,
      date: "4-28-2024",
      articleTitle: "彌勒家族歡喜樂團",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/3/1.jpg",
      shortIntro:
        "感謝「彌勒家族歡喜樂團」蒞臨「社團法人新北市道一關懷協會」道一聖道院，帶來蓬勃熱情、有道氣的帶動唱表演。感謝慈悲！",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/3/1.jpg",
    },
  },
  {
    id: '4',
    path: "/blog/4",
    preview: {
      author: RUPALI,
      date: "4-25-2024",
      articleTitle: "4/25(四)玄懋公司心靈成長班會",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/4/1.jpg",
      shortIntro:
        "4/25(四)玄懋公司心靈成長班會，邀請「黃啟山」講師慈悲成全，題目:「 智者樂水、仁者樂山」，內容：孔子曰:「智者若何?仁者若何?」子路對曰:「智者使人知己，仁者使人愛己。」子貢對曰:「智者知人，仁者愛人。」顏回對曰:「智者自知，仁者自愛。」知者樂水、仁者樂山。也知者動、仁者靜。知者樂、仁者壽。《論語離雍》。有山有水有遠景、能動能靜方為道、既樂且壽活神仙、智者仁者兩相兼。感謝陳點傳師慈悲蒞臨指導，感謝何點傳師慈悲結語：「天長地久」。感謝諸位道親同仁護持班會，感謝慈悲！",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/4/1.jpg",
    },
  },
  {
    id: '5',
    path: "/blog/5",
    preview: {
      author: RUPALI,
      date: "4-25-2024",
      articleTitle: "第四次「社團法人新北市道一關懷協會」會員大會",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/5/1.jpg",
      shortIntro:
        "今早10:30召開第一屆第四次「社團法人新北市道一關懷協會」會員大會，出席踴躍，會中討論並順利通過各項提案。稍後繼續開「道一道務會議」大家踴躍發言討論做了決議並確定多項道(事)務工作。感謝慈悲!",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/5/1.jpg",
    },
  },
  {
    id: '6',
    path: "/blog/6",
    preview: {
      author: RUPALI,
      date: "2-25-2024",
      articleTitle: "第一屆第十三次理監事聯席會議",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/6/1.jpg",
      shortIntro:
        "今早10:30本協會召開「第一屆第十三次理監事聯席會議」。出席、列席非常踴躍、經提案討論後做出最好決議案。之後開「道一道務會議」，道親提出很多、多項建設性的建議.感謝道一協會會員以及道親同修們參與會議。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/6/1.jpg",
    },
  }, 
];

export const SORTED_ARTICLES_BY_DATE = ARTICLES_LIST.sort((a, b) =>
  new Date(a.preview.date) > new Date(b.preview.date) ? -1 : 1
);
