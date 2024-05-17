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
    id: '1',
    path: "/blog/1",
    preview: {
      author: RUPALI,
      date: "5-11-2024",
      articleTitle: "今日平溪「游氏佛堂」二十多年來再次辦道",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/1/1.jpeg",
      shortIntro:
        "今日平溪「游氏佛堂」二十多年來再次辦道，壹位佛根深厚(吃素:因看到卡車上載滿很多活生生的豬，將到屠宰場，心生不忍之心、從此開始不吃豬肉--不久就不吃葷、改吃素食)的有緣人聞得孔孟聖道、性理心法。感謝辦道以及服務前賢慈悲了愿，感謝慈悲！",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/1/1.jpeg",
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
