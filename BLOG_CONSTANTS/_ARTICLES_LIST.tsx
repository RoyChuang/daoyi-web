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
    id: '241001',
    path: "/blog/241001",
    preview: {
      author: RUPALI,
      date: "10-01-2024",
      articleTitle: "陳領導點傳師、何點傳師慈悲帶領台灣道親前往馬來西亞檳城了愿九皇齋義賣活動",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/241001/1.jpg",
      shortIntro:
        "陳領導點傳師、何點傳師慈悲帶領台灣道親前往馬來西亞檳城了愿九皇齋義賣活動，從06：30就有人購買，人潮開始增加早、午晚餐-宵夜更是絡繹不絕，餐桌客滿，無位，工作的前賢用餐只有就席而坐；青年精英更是用心經營，大家了愿歡喜，忙得不亦悅乎！辛苦了！",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/241001/1.jpg",
    },
  },
  {
    id: '24921',
    path: "/blog/24921",
    preview: {
      author: RUPALI,
      date: "9-21-2024",
      articleTitle: "道親聯誼9/21(六)-9/22(日)二日遊暨敬老活動",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24921/1.jpg",
      shortIntro:
        "道親聯誼9/21(六)-9/22(日)二日遊暨敬老活動-早上道一聖道院(巷口)出發→明德水庫-七里香玻瑰森林-午餐禪廚蔬食餐廳。感謝陳領導點傳師、何點傳師慈悲致詞鼓勵並祝福旅途愉快，大家平安、順利，感謝宏祥旅行社何奐毅先生、弘道彥宸講師精心籌劃安排、感謝財務劉前賢配合各項活動支援，感謝諸位前賢踴躍參與活動。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24921/1.jpg",
    },
  },
  {
    id: '24901',
    path: "/blog/24901",
    preview: {
      author: RUPALI,
      date: "9-01-2024",
      articleTitle: "土城胡氏佛堂班會，題目:「由六祖壇經論一貫道的修持」",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24901/1.jpg",
      shortIntro:
        "9/1(日)土城胡氏佛堂有班會，邀請李瑞慶師講師慈悲成全，題目:「由六祖壇經論一貫道的修持」。感謝何點傳師慈悲結語：三極一貫之理、性.心.身一貫、體.相.法(體.相.用)一貫。內容:《無相頌》非常重要，我們要在日常生活中去一點一點落實。「心平何勞持戒，行直何用修禪。恩則孝養父母，義則上下相憐。讓則尊卑和睦，忍則眾惡無喧。若能鑽木出火，淤泥定生紅蓮。苦口的是良藥，逆耳必是忠言。改過必生智慧，護短心內非賢。日用常行饒益，成道非由施錢。菩提只向心覓，何勞向外求玄。聽說依此修行，西方只在目前。」修道~心地無非自性戒，心地無痴自性慧，心地無亂自定。世間法若看不清楚、你如何修出世間法?壇經:「菩提自性本來清静、但用此心直了成佛。」修持定慧三大命題:無念為宗、無住為體、無住為本。感謝諸位前賢護持參加班會。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24901/1.jpg",
    },
  },
  {
    id: '24825',
    path: "/blog/24825",
    preview: {
      author: RUPALI,
      date: "8-25-2024",
      articleTitle: "道一經典班，題目:「皇母訓子十誡-6、7誡」",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24825/1.jpg",
      shortIntro:
        "道一經典班，邀請黃坤紅講師慈悲成全，題目:「皇母訓子十誡-6、7誡」感謝何點傳師慈悲致詞鼓勵：國內道場修辦大家都很用心、也很盡力，希望日後有機會也能至海外參加修辦。感謝鈞毅、良純、子薰慈悲引導兒童以及輔導幼幼小明友，感謝廚務林太太、劉太太、素柔姐與淑琴前賢慈悲用心準備午餐。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24825/1.jpg",
    },
  },
  {
    id: '24822',
    path: "/blog/24822",
    preview: {
      author: RUPALI,
      date: "8-22-2024",
      articleTitle: "福地福人居、心田心性栽」最好的風水是人",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24822/1.jpg",
      shortIntro:
        "玄懋公司心靈講座，感謝陳點傳師慈悲到堂指導，感謝何點傳師慈悲結語鼓勵,感謝胡壇主結緣，題目:「福地福人居、心田心性栽」最好的風水是人。人間最好的風水就是——行善積德。這個道理看似簡單，實際上「大道至簡」。改變不了外在的環境，何不改變自己的行為，從自身做起，每一個身、口、意不對別人造成傷害，多行善，這不是在改變自己身上的風水了嗎？結論:世人盡知穴在山，豈知穴在方寸間。好山好水世不欠，苟非其人尋不見。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24822/1.jpg",
    },
  },
  {
    id: '24818',
    path: "/blog/24818",
    preview: {
      author: RUPALI,
      date: "8-18-2024",
      articleTitle: "總壇經典班、長青班道一服務",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24818/1.jpg",
      shortIntro:
        "8/18(日)總壇經典班、長青班道一服務：有您們真好!感謝鄧浴華、吳真漢、劉茂炳、鄧琴健、洪憲郎、胡朝慶、陳麗珠、李素娥、李淑華等前慈悲以及青年精英:美均、沛玲、子萱、鈞毅、軍霆等前賢慈悲了愿，分工合作、盡心盡力、圓滿完成任務，大家了愿快樂，真的!有您們真好!感謝慈悲!",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24818/1.jpg",
    },
  },
  {
    id: '24811',
    path: "/blog/24811",
    preview: {
      author: RUPALI,
      date: "8-11-2024",
      articleTitle: "新北市道一關懷協會第一屆第15次理監事聯席會議以及道務會議",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24811/1.jpg",
      shortIntro:
        "今早舉行社團法人新北市道一關懷協會第一屆第15次理監事聯席會議以及道務會議。感謝各位理監事、諸位會員以及道親踴躍出席參與開會；同時並舉行中元普渡。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24811/1.jpg",
    },
  },
  {
    id: '24804',
    path: "/blog/24804",
    preview: {
      author: RUPALI,
      date: "8-04-2024",
      articleTitle: "胡氏佛堂今(8/4)日班會，邀請杜素華講師慈悲成全，題目:「三寶修持」與辛勝華講師慈悲分享「金剛波羅蜜經-莊嚴淨土分第十、無為福勝分第十一」。",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24804/1.jpg",
      shortIntro:
        "土城胡氏佛堂今(8/4)日班會，第一節課邀請杜素華講師慈悲成全，題目:「三寶修持」。第二節課邀請辛勝華講師慈悲分享「金剛波羅蜜經-莊嚴淨土分第十、無為福勝分第十一」。感謝李瑞慶壇主慈悲做結語。第一節課內容:佛法不是知識，它是智慧，知識是從分別心顯現出來的，智慧是從清淨心顯現出來的。自性三寳：皈依佛(覺)→覺而不迷，福慧雙修。皈依法(正)→正法無我，遠離煩惱。皈依僧(淨)→自性清淨，無欲無求。真正有智慧的人，永遠不會被困難所迷惑，更不會因為前行路上的障礙而停下向前遇進的脚步。第二節內容:第十分重點~離相度生、無住行施、無所住而生其心。佛告須菩提：「於意云何?如來昔在然燈佛所，於法有所得不?」「不也，世尊!如來在然燈佛所，於法實無所得。」「須菩提!於意云何?菩薩莊嚴佛土不?」「不也，世尊!何以故?莊嚴佛土者，即非莊嚴，是名莊嚴。」「是故，須菩提！諸菩薩摩訶薩應如是生清淨心，不應住色生心，不應住聲香味觸法生心，應無所住而生其心。無為福勝分第十一內容：「須菩提！如恆河中所有沙數，如是沙等恆河，於意云何？是諸恆河沙，寧為多不？」須菩提言：「甚多。世尊！但諸恆河，尚多無數，何況其沙？」~----感謝諸位前賢慈悲護持參加班。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24804/1.jpg",
    },
  },
  {
    id: '24728',
    path: "/blog/24728",
    preview: {
      author: RUPALI,
      date: "7-28-2024",
      articleTitle: "邀請辛勝華講師慈悲分享:「金剛般若波羅蜜經-持誦心得」",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24728/1.jpg",
      shortIntro:
        "7/28(日)早上道一聖道院綜合班，邀請辛勝華講師慈悲分享:「金剛般若波羅蜜經-持誦心得」。感謝何點傳師慈悲致詞；分享內容從「法會因由分第一」--「莊嚴淨土分第十」。感謝鈞毅前賢、純良前賢慈悲輔導兒童班，感謝廚務二位陳太、劉太、吳太、洪大嫂和二位女兒們慈悲準備豐盛的午餐。感謝諸位前賢護持會。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24728/1.jpg",
    },
  },
  {
    id: '247141',
    path: "/blog/247141",
    preview: {
      author: RUPALI,
      date: "7-14-2024",
      articleTitle: "「九皇齋義賣」工作協調座談會",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/247141/1.jpg",
      shortIntro:
        "今(14)日下午舉行「九皇齋義賣」工作協調座談會，感謝何點傳師慈悲重點提示；其各項工作有一、切高麗菜、蘿蔔絲餅、攪拌。二、包水煎包、紅豆餅。三、包蘿蔔絲餅。四、煎水煎包、蘿蔔絲餅、紅豆餅。五、煮紅豆餅以及炒餡料。六、準備包裝袋子(紙袋外裝塑膠袋)。七、麵粉攪拌等。感謝諸位前賢慈悲出席參與座談。感謝慈悲！",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/247141/1.jpg",
    },
  },
  {
    id: '24714',
    path: "/blog/24714",
    preview: {
      author: RUPALI,
      date: "7-14-2024",
      articleTitle: "邀請何美融講師慈悲分享講題:「菩提道次第廣論」-廣論入門基礎-（觀功念恩最幸福)",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24714/1.jpg",
      shortIntro:
        "道一綜合班，第一節邀請何美融講師慈悲分享講題:「菩提道次第廣論」-廣論入門基礎-（觀功念恩最幸福)。感謝何點傳師慈悲致詞：以亞歷山大的三個遺言-「第一、我的棺材必須由最忠心的醫生抬回去。」「第二、當我的棺材運向墳墓時，沿途的道路必須灑滿我寶庫里的金銀財寶。」「第三、我的雙手必須放在棺材外面，讓大家都看得見。」鼓勵同修；世上一切是虛空，無論你這一生積累了多少財富，有多麼了不起，終究還是回歸到虛空裡；所以同修要能共辦，真修實煉。内容：觀功念恩最幸福。快樂不是物質的享受而是是心靈上的自在。人之所以會痛苦，是因為想錯了，人之所以會快樂，是因為想對了。三種看待的人生:觀過念怨、觀光念閒、觀功念恩。觀:看見別人長處。恩:記住別人對我的好。找不到功德、看不到恩的時候，要從沙堆中撿金粉。觀功念恩的方法:一、找功德。二、學念恩。三、勤修隨喜。四、轉過患為功德。第二節邀請李瑞慶講師慈悲成全，無題-由「痛」說起「痛」除了肉體的「痛」、還有精神上的「痛」即是魔考。自心無非自性戒，傳承-傳統不可少。修行是要改變自己的習性、脾氣毛病。明「業識」-十二因緣(前世造因，今生受、今生造因，來世果)，所以要改變觀念、習性是天道的重點。定慧等持-「止、觀」，「心經」由「觀.」開始-觀自在菩薩---般若婆羅蜜多時---渡一切苦厄。安住心、別欲主宰業力；「隨緣消舊業，莫更造新殃」，我們要懂得，隨逆境、隨惡緣，消舊業；隨順境、隨善緣。感謝鈞毅前賢、良純前賢慈悲用心輔導兒童。感謝二位陳太太、洪太太、劉太太、吳太太慈悲準備豐盛的午餐。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24714/1.jpg",
    },
  },
  {
    id: '24708',
    path: "/blog/24708",
    preview: {
      author: RUPALI,
      date: "7-8-2024",
      articleTitle: "做「香椿醬」，準備馬來西亞北海「九皇齋」義賣水煎包及蘿蔔絲餅配料",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24708/1.jpg",
      shortIntro:
        "今早到古坑「陳氏佛堂」做「香椿醬」，準備馬來西亞北海「九皇齋」義賣水煎包及蘿蔔絲餅配料用，感謝陳明芳壇主夫妻一早就砍香椿待用。感謝慈悲！",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24708/1.jpg",
    },
  },
  {
    id: '24707',
    path: "/blog/24707",
    preview: {
      author: RUPALI,
      date: "7-7-2024",
      articleTitle: "胡氏佛堂班會邀請劉茂炳講師慈悲成全:題目:「羅漢道與菩薩道」",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24707/1.jpg",
      shortIntro:
        "今7/7(日)土城胡氏佛堂班會邀請劉茂炳講師慈悲成全:題目:「羅漢道與菩薩道」，感謝陳領導點傳師慈悲結語。前言：由十八羅漢說起-由阿羅漢(自覺、自渡-了脫生死)至菩薩道(渡人、覺他-求道是回天之路成佛、成菩薩)說起；四聖諦-八正道至修持(須陀洹、斯陀含、阿那含、阿羅漢這是小乘)佛法中修行次第的四個階段(果位)，合起來稱為「四果羅漢」。也就是說，要修到「阿羅漢」這個層次，要先後經過這四個階段。也就是修習佛法的人達到了脫生死，即不再生死輪迴就叫阿羅漢，佛經(教)塑有十八羅漢。從凡夫位開始發心修行，必須歷經十信、十住、十行、十迴向、十地、等覺、妙覺等，總共有五十二階位的菩薩修行，才能次第的圓滿佛道的修證。感謝諸位前賢護持參加班會。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24707/1.jpg",
    },
  },
  {
    id: '24627',
    path: "/blog/24627",
    preview: {
      author: RUPALI,
      date: "6-27-2024",
      articleTitle: "玄懋公司六月班會感謝廖文闊講師慈悲結緣（人生智慧）。",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24627/1.jpg",
      shortIntro:
        "玄懋公司六月班會感謝廖文闊講師慈悲結緣（人生智慧）感謝陳點傳師慈悲到班指導、感謝何點傳師慈悲結語，感謝公司夥伴們以及道親同修參加共修-護持班會。(資料來源-家慶壇主)",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24627/1.jpg",
    },
  },
  {
    id: '24623',
    path: "/blog/24623",
    preview: {
      author: RUPALI,
      date: "6-23-2024",
      articleTitle: "道一聖道院今日班會邀請胡朝慶講師講：「皇母十誡-第五誡與第一誡至第五誡的小結論。",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24623/1.jpg",
      shortIntro:
        "道一聖道院今日班會邀請胡朝慶講師講：「皇母十誡-第五誡與第一誡至第五誡的小結論。感謝陳領導點傳師慈悲致詞：「能忍為君子、堅忍為豪傑、化忍為聖賢、無生忍為佛」-前五誡小結。第一誡：靈性來源，回歸須「求真與力行」。第二誡：道脈傳承,超生了死，回歸本源。第三誡:道為尊，萬物皆由此生。第四誡：認清真假，借假修真，同登理天。第五誡：三期末劫，真道真解脫。感謝莊太太(春敏)、胡太太(素娥)、芳宜前賢和桂媚前賢準備豐盛午餐。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24623/1.jpg",
    },
  },
  {
    id: '24615',
    path: "/blog/24615",
    preview: {
      author: RUPALI,
      date: "6-15-2024",
      articleTitle: "李瑞慶講師慈悲心成全「六祖壇經」-般若品第二",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24615/1.jpg",
      shortIntro:
        "鶯歌劉氏佛堂今日班會，第一節課邀請李瑞慶講師慈悲心成全「六祖壇經」-般若品第二。續上次課程-諸佛剎土，盡同虛空。世人妙性本空，無一法可得；自性真空，亦復如是。真空是能容納一切、不取、不著、不染。心若不空則智慧不能增長也！善知識！莫聞吾說空便即著空。吳老前人慈語:「道親不親形同路人，道場分割正本立分，有辦無修本末不倒置，是非不辨所為何事。」第二節課邀請陳彦宸講師慈悲成全，題目：「溝通、合作和正向影響力」。溝通的重要性：一、良好的溝通傳達正確重要的訊息、提高效率。二、引發共鳴的溝通增進共識、促進和諧合作與團結(道務上要正向溝通、要能上下溝通，大家都能藉事來煉心，就能和諧與團結)。三、正向溝通增進彼此的了解、化解矛盾與衝突。有情緒的時候，運用STOP的原則，停下來、深呼吸、觀察自己、從新表達。感謝劉壇主夫妻慈悲招待與服務，感謝美均講師與懿萱前賢慈悲準備色香味豐盛的午餐。感謝諸位前賢參加護持班會，感謝慈悲!",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24615/1.jpg",
    },
  },
  {
    id: '246151',
    path: "/blog/246151",
    preview: {
      author: RUPALI,
      date: "6-15-2024",
      articleTitle: "古坑「陳氏佛堂」今日班會，邀請曾勇龍講師慈悲成全",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/246151/1.jpg",
      shortIntro:
        "古坑「陳氏佛堂」今日班會，邀請曾勇龍講師慈悲成全，題目:「微明集-道與教」-道與教相、教義。道之與教,好比一個成熟了的鮮桃，外層色香味俱佳是桃肉，這比作教，而具生機性能之桃仁,深藏在桃肉桃核裡面，故吃不掉桃肉、不見桃核,不剥掉桃核,不見桃仁，這桃仁便喻作不顯於相的道。我們修道都在參閱三教經典，做為道是教的中心文證，和修道進階之憑藉。教法非心法，語言文字皆非道，所以我們修道要以教法來圓滿心法，這便是事所必然的了。感謝陳壇主夫妻準備古坑有名的咖啡水果享用，以及豐盛的午餐。感謝慈悲!",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/246151/1.jpg",
    },
  },
  {
    id: '24609',
    path: "/blog/24609",
    preview: {
      author: RUPALI,
      date: "6-9-2024",
      articleTitle: "第一屆第十四次理監事會議暨「道一聖道院」召開道務會議",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24609/1.jpg",
      shortIntro:
        "今(6/9)日早上「社團法人新北市道一關懷協會」召開第一屆第十四次理監事會議暨「道一聖道院」召開道務會議。感謝諸位理監事、會員以及壇主人才踴躍出(列)席參加會議。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24609/1.jpg",
    },
  },
  {
    id: '24602',
    path: "/blog/24602",
    preview: {
      author: RUPALI,
      date: "6-2-2024",
      articleTitle: "土城「胡氏佛堂」班會邀請陳彦宸講師慈悲成全，題目：「道化人生」。",
      tags: "社團法人新北市道一關懷協會",
      thumbnail: "/public/images/blog/24602/1.jpeg",
      shortIntro:
        "土城「胡氏佛堂」班會邀請陳彦宸講師慈悲成全，題目：「道化人生」。感謝陳領導點傳師到堂指導、感謝何點傳師慈悲做結語：吳老前人慈語:『人生的關卡是名利情愛、生死跟放下，這是道化人生應該突破的地方」。道化人生-前言:想要有好的房子，更重要的是要有好的理念，身心要純正而不邪，房子要整潔而不亂。所以要能有「斷捨離」的心識與意念。如何「斷捨離？」從自己做起~用三步驟打造理想生活:一、要先「捨」:金碧峰禪師與玉缽，因執玉缽而不得解脫。要能捨去一些所執所愛的「有形與我(心物」的東西。二、進行「斷」:斷捨離做哪些準備？1.一日丟一物、一進一出。2.加入收納整理社團。3.先整理自己可以完全控制的區域。4.不先買收納用品。5.觀察自己的生活動線、使用習慣。三、體悟「離」：大限來時，要無牽無掛，能捨離這個「肉體」嗎？能體悟到「靈性」是、無形、無色、無味、無相，「自性」是無所染著的，要能「大澈大悟」進入「純淨」的體證。 結論：心量要廣大，要能繫緣修心、藉事練心、隨處養心。感謝諸位前賢護持參加班會。",
      category: "道一",
    },
    seo: {
      keywords:
        "社團法人新北市道一關懷協會",
      ogImage: "/public/images/blog/24602/1.jpeg",
    },
  },
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
