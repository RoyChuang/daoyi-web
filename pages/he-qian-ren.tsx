import { PageLayout } from '../src/components';
import { useState } from 'react';
import { DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faImages } from "@fortawesome/free-solid-svg-icons";
import { TEMPLE_PHOTOS } from '../BLOG_CONSTANTS/_TEMPLE_PHOTOS';
import { getCloudinaryUrl } from '../src/utils/cloudinary';
import VideoThumbnail from '../src/components/VideoThumbnail';

// Swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeQianRenPage = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    // 影片 modal 狀態
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

    // 開啟影片 modal
    const openVideoModal = (videoId: string) => {
        setCurrentVideoId(videoId);
        setIsVideoModalOpen(true);
    };

    // 關閉影片 modal
    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setCurrentVideoId(null);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .temple-photo-swiper .swiper-button-next,
                .temple-photo-swiper .swiper-button-prev {
                    background: white;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: all 0.3s ease;
                }
                .temple-photo-swiper .swiper-button-next:hover,
                .temple-photo-swiper .swiper-button-prev:hover {
                    background: #f8fafc;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
                    transform: scale(1.1);
                }
                .temple-photo-swiper .swiper-button-next:after,
                .temple-photo-swiper .swiper-button-prev:after {
                    font-size: 18px;
                    color: #334155;
                    font-weight: bold;
                }
                .temple-photo-swiper .swiper-pagination-progressbar {
                    background: rgba(0, 0, 0, 0.1);
                    height: 4px;
                    bottom: 0;
                }
                .temple-photo-swiper .swiper-pagination-progressbar-fill {
                    background: #3b82f6;
                }
            `}} />
            <PageLayout home>
            <NextSeo
                title="何前人專輯 | 社團法人新北市道一關懷協會"
                description="好學不倦，筆耕不輟 – 何紹棠前人"
                {...DEFAULT_SEO}
            />
            <section className='container px-3 pb-10 pt-6'>
                <h1 className='text-3xl font-bold py-6 text-[#334155] flex items-center gap-3'>
                    <FontAwesomeIcon icon={faCompactDisc} className="text-[#334155]" />
                    何前人專輯
                </h1>
                
                {/* 主圖 + 影片區域 */}
                <div className='mb-8 flex flex-col lg:flex-row gap-6'>
                    {/* 左側：主圖 */}
                    <div className='flex-shrink-0'>
                        <img 
                            src="/images/he-qian-ren/index.jpg" 
                            alt="何紹棠前人" 
                            className='w-full max-w-2xl rounded-lg shadow-lg'
                        />
                    </div>

                    {/* 右側：兩個影片 */}
                    <div className='flex flex-col gap-3 w-full max-w-sm lg:max-w-none lg:w-64'>
                        <h3 className='text-sm font-bold text-[#334155]'>相關影片</h3>
                        <VideoThumbnail
                            videoId="LmekUzeZQTo"
                            title="何紹棠前人成道十五週年（生平簡介）"
                            onClick={() => openVideoModal("LmekUzeZQTo")}
                        />
                        <VideoThumbnail
                            videoId="WjpnezefGJI"
                            title="泰國道親與何前人的回憶"
                            onClick={() => openVideoModal("WjpnezefGJI")}
                        />
                        <VideoThumbnail
                            videoId="C4Jsi-Q66dM"
                            title="一家人(追思何前人)"
                            onClick={() => openVideoModal("C4Jsi-Q66dM")}
                        />
                        <VideoThumbnail
                            videoId="VX2cAMm4hNg"
                            title="前人的手"
                            onClick={() => openVideoModal("VX2cAMm4hNg")}
                        />
                    </div>
                </div>

                {/* 佛堂照片輪播區塊 */}
                <div className='my-8 p-6 bg-slate-50 rounded-xl'>
                    <h3 className='text-2xl font-bold text-[#334155] mb-4 flex items-center gap-3'>
                        <FontAwesomeIcon icon={faImages} className="text-[#334155]" />
                        歷年珍貴照片
                    </h3>
                    <p className='text-gray-600 mb-6'>
                        何前人一生為道務奔波,足跡遍及台灣、新加坡、馬來西亞、泰國、柬埔寨等地,以下是歷年珍貴照片記錄。
                    </p>
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            type: 'progressbar',
                        }}
                        navigation={true}
                        loop={true}
                        className="temple-photo-swiper pb-8"
                    >
                        {TEMPLE_PHOTOS.map((photo, index) => (
                            <SwiperSlide key={index}>
                                <div className="group cursor-pointer" onClick={() => setSelectedPhoto(index)}>
                                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                        <img
                                            src={getCloudinaryUrl(photo.publicId, {
                                                width: 600,
                                                height: 400,
                                                crop: 'fit',
                                                quality: 'auto',
                                                format: 'auto',
                                            })}
                                            alt={photo.title}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-semibold">
                                                {photo.order}
                                            </span>
                                            <h4 className="font-semibold text-gray-800 text-sm line-clamp-1 flex-1">
                                                {photo.title}
                                            </h4>
                                        </div>
                                        {photo.date && (
                                            <p className="text-xs text-gray-500 mt-1">{photo.date}</p>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 標題區 */}
                <div className='mb-8'>
                    <span className='bg-[#3b82f6] text-white px-3 py-1 rounded text-sm'>種籽人物志</span>
                    <h2 className='text-2xl md:text-3xl font-bold mt-4 text-[#334155]'>好學不倦，筆耕不輟 – 何紹棠前人</h2>
                    <p className='text-gray-500 mt-2'>2024-12-15 | 編輯室</p>
                </div>

                {/* 內容區 */}
                <article className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
                    
                    {/* 側面肖像 - 左上文繞圖 */}
                    <figure className='float-left mr-6 mb-4 w-48 md:w-64'>
                        <img 
                            src="/images/he-qian-ren/02-side-portrait.jpg" 
                            alt="何紹棠前人側面肖像" 
                            className='w-full rounded-lg shadow-md'
                        />
                        <figcaption className='text-center text-sm text-gray-600 mt-2'>何紹棠前人</figcaption>
                    </figure>

                    <h3 className='text-xl font-bold text-[#334155] mt-0 mb-4'>以「忠、信、傳習」傳世留芳</h3>

                    <p className='mb-6'>
                        坊間常見的筆記本，封面上清楚標記類別或名稱，兩、三百本整齊排列在架上，所記載的內容十分仔細，是他好學不倦、精進不已的證明。他對道務很發心，那時蓋佛堂沒錢，他沒有商量就決定賣房子，前後總共賣了三棟，需要人負責北、高的道務，他也是沒有多想就決定退休。
                    </p>

                    <h3 className='text-xl font-bold text-[#334155] mt-8 mb-4'>不斷學習是精進的基本功</h3>
                    
                    <p className='mb-6'>
                        在嘉義求道後，家中便設壇，民國五十四年清口，經引度就近在斗六張金城前人的佛堂學習。自認資質駑鈍，對於學習非常用心，每聽班便認真做筆記，回到家用心研習，就這麼一點一滴累積出豐厚的心得。
                    </p>



                    <p className='mb-6'>
                        坊間常見的筆記本，封面上清楚標記類別或名稱，兩、三百本整齊排列在架上，所記載的內容十分仔細，《道學心得》是他第一本印製出版，和大家分享的成果。他認為透過聽班、自修是道學進展最快的方式，當然，前輩者平日的成全、仙佛的訓文也羅列其中。
                    </p>

                    {/* 第三、四張：筆記與書籍並列 */}
                    <div className='my-8 grid grid-cols-1 md:grid-cols-2 gap-6 clear-both'>
                        <figure>
                            <img 
                                src="/images/he-qian-ren/03-handwritten-notes.jpg" 
                                alt="何紹棠前人手寫筆記" 
                                className='w-full rounded-lg shadow-md'
                            />
                            <figcaption className='text-center text-sm text-gray-600 mt-2'>
                                何前人退休後到海外辦道，仍勤學外國語言，此照是老人家的筆記，保留至今，較之今日學子，勤學猶有過之。
                            </figcaption>
                        </figure>
                        <figure>
                            <img 
                                src="/images/he-qian-ren/04-books-on-shelf.jpg" 
                                alt="何紹棠前人著作書籍" 
                                className='w-full rounded-lg shadow-md'
                            />
                            <figcaption className='text-center text-sm text-gray-600 mt-2'>
                                何前人生前每次聽講，都會詳細記錄課程每個字句，筆記字字工整，甚至還編有目錄，顯然是課後再次騰寫。此照是何前人所撰各類書籍，有的是筆記內容，有的是修辦道心得體會。
                            </figcaption>
                        </figure>
                    </div>

                    <p className='mb-6'>
                        「他很少在家，一旦在家，就是很認真坐在書桌前讀書寫字，所以他的著作非常多」，已領命的何明修點傳師娓娓道出父親平日在家的情況，為了將畢生所學傳世分享，他筆耕不輟，「最後那幾年他的視力狀況已經很不好了，還是持續在寫書，怎麼樣都阻止不了。」
                    </p>

                    <h3 className='text-xl font-bold text-[#334155] mt-8 mb-4'>面對官考自有祖德護佑</h3>
                    
                    <p className='mb-6'>
                        「那個時候家裡蓋房子，校長特地把我找去問家裡蓋那麼大的房子做什麼。」結褵數十載的傅靜開朗的提起當年，夫妻倆都在學校擔任教職，儘管行事低調，吃素、修道還是引起注目，因此被調查。
                    </p>

                    <h3 className='text-xl font-bold text-[#334155] mt-8 mb-4'>不慍不怒，天生的修道士</h3>
                    
                    <p className='mb-6'>
                        「他是天生的修道士，脾氣很好，從不和人相罵，每次我脾氣上來，大聲跟他說話的時候，他都默默的聽，根本就吵不起來」，人與人之間難免有摩擦，從處理的方式裡可以看出一個人的修養，傅靜對先生這點真的很感動，「他也不會嫌人家什麼，什麼都好，剛結婚時我家事都不會，有一次假日煮飯時飯燒焦了，我急得不得了，結果他跟我說沒關係，燒焦的比較香，我一聽眼淚就掉下來。」
                    </p>

                    <p className='mb-6'>
                        不動怒、不發脾氣，說話輕輕的、做事徐徐的，處理事情仔細又認真，在求道前，他的修養就為人所津津樂道，求道後讓他更上一層樓。
                    </p>

                    {/* 第五張：與夫人合照 */}
                    <figure className='my-8'>
                        <img 
                            src="/images/he-qian-ren/05-couple-photo.jpg" 
                            alt="何紹棠前人與夫人傅靜合照" 
                            className='w-full max-w-xl rounded-lg shadow-md'
                        />
                        <figcaption className='text-sm text-gray-600 mt-2 max-w-xl'>
                            受日本教育的何前人要求子女非常嚴格，和長輩講話的時候，要立正站好，未經允許是不可以亂動和坐下的。當孩子犯錯時，會先講理，再依情節輕重讓他們在佛堂叩首懺悔。
                        </figcaption>
                    </figure>

                    <h3 className='text-xl font-bold text-[#334155] mt-8 mb-4'>無怨無悔的財施精神</h3>
                    
                    <p className='mb-6'>
                        「他對道務很發心，那時蓋佛堂沒錢，他沒有商量就決定賣房子，前後總共賣了三棟，需要人負責北、高的道務，他也是沒有多想就決定退休。」
                    </p>

                    <p className='mb-6'>
                        「後學願意了愿。」民國六十一年，臺北的佛堂要建設時，開了一個仙佛班，鼓勵大家布施，第一天要布施十萬塊，他第一個舉手，回家後和妻子商量，把另外一棟無人居住的舊房子賣掉，這筆款項再添上手邊將近一萬的存款，總算是湊足了十萬。
                    </p>

                    {/* 第六張：總壇合影 */}
                    <figure className='my-8'>
                        <img 
                            src="/images/he-qian-ren/06-formal-meeting.jpg" 
                            alt="何前人與夫人傅靜、子何明修點傳師於興毅總壇合影" 
                            className='w-full max-w-xl rounded-lg shadow-md'
                        />
                        <figcaption className='text-sm text-gray-600 mt-2 max-w-xl'>
                            何紹棠前人與夫人傅靜結婚時，在何前人老家所攝。民國六十一年，臺北要建設佛堂，仙佛班中鼓勵大家布施，前人先後布施共數十萬，就是賣掉老屋後籌措資金。隔沒多久，為了道務申請退休，當時月退俸僅四千元不到。
                        </figcaption>
                    </figure>

                    <h3 className='text-xl font-bold text-[#334155] mt-8 mb-4'>為道務奔波，不捨晝夜</h3>
                    
                    <p className='mb-6'>
                        民國六十四年退休後常駐臺北，負責北部道務的開荒和高雄的道務，隔年二月領命後，更是新加坡、馬來西亞、泰國、美國……，四處為家。每到一個地方開荒，經營起來之後就會把道場交給新領命負責的點傳師，再前往下一個地區開荒。
                    </p>

                    {/* 第七張：老家婚禮照 */}
                    <figure className='my-8'>
                        <img 
                            src="/images/he-qian-ren/07-old-family-bw.jpg" 
                            alt="何紹棠前人與夫人傅靜結婚照" 
                            className='w-full max-w-xl rounded-lg shadow-md'
                        />
                        <figcaption className='text-sm text-gray-600 mt-2 max-w-xl'>
                            何前人(中)與夫人傅靜(左)、子何明修點傳師(右)於興毅總壇合影。當年他為佛堂賣第三棟房子，那些錢拿來替為佛堂掛名買地設壇的道親還債後，剩餘款還平均分配給該單位在新加坡、馬來西亞、泰國當作佛堂的建壇基金外，尚有一百萬是匯給總壇當作建設基金。
                        </figcaption>
                    </figure>

                    <h3 className='text-xl font-bold text-[#334155] mt-8 mb-4'>篤行一生的座右銘—忠、信、傳習</h3>
                    
                    <p className='mb-6'>
                        「吾日三省吾身：為人謀而不忠乎？與朋友交而不信乎？傳不習乎？」這是他堅持不變的信條，不但教導大家這麼做，自己也矢志篤行。
                    </p>

                    <p className='mb-6'>
                        隱於內的「忠」是最基本的，不論是人或事，都需忠誠以待。忠於事，則事不易流於偏頗；忠於人，則前人後學間的關係更加穩固。顯於外的「信」是最應該做的。信道是人一生的行事準則，誠信、守時是一個人人格的展現，讓人在處世上更趨圓融，人與人之間更加和諧。而能讓道念歷久不衰、傳承不斷的，就是實踐「傳習」。
                    </p>

                    <h3 className='text-xl font-bold text-[#334155] mt-8 mb-4'>仰之彌堅的修養境界</h3>
                    
                    <p className='mb-6'>
                        「他這一輩子一直在為道務付出，從來沒想過自己，讓我非常佩服」，共同走過將近一甲子的歲月，傅靜將他的一言一行看在眼裡，「一年到頭都在外面弘道、行道，這是別人不一定做得到的，但他卻能做到。」
                    </p>

                    <p className='mb-6'>
                        自領命迄歸空，卅年間，共出國七十二次，六千八百五十二天在國外，一年裡只有三分之一的時間在國內，且人在國內也不一定在家裡，其對道務用心之深，可見一斑。
                    </p>

                    {/* 第八張：講課 */}
                    <figure className='my-8'>
                        <img 
                            src="/images/he-qian-ren/08-lecture-blackboard.jpg" 
                            alt="何紹棠前人講課" 
                            className='w-full max-w-xl rounded-lg shadow-md'
                        />
                        <figcaption className='text-sm text-gray-600 mt-2 max-w-xl'>
                            中馬萬松佛堂開壇時吳前人慈悲：「沒有妙一就無道一，沒有道一就無妙一，一上加一等於三，信不信？請參此意。」
                        </figcaption>
                    </figure>

                    {/* 語錄區 */}
                    <div className='mt-10 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500'>
                        <p className='text-lg text-gray-700 italic mb-4'>
                            「飲食要清淡，生活要清簡；身體要清潔，心理要清閑。」
                        </p>
                        <p className='text-lg text-gray-700 italic'>
                            「聞道有所得，要立刻銘記；聞道有心得，要立刻掌握；聞道有實得，要立刻發愿。」
                        </p>
                    </div>
                </article>
            </section>

            {/* 燈箱效果 - 點擊放大照片 */}
            {selectedPhoto !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                        {/* 關閉按鈕 */}
                        <button
                            className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            ×
                        </button>
                        
                        {/* 大圖 */}
                        <img
                            src={getCloudinaryUrl(TEMPLE_PHOTOS[selectedPhoto].publicId, {
                                width: 1920,
                                quality: 'auto',
                                format: 'auto',
                            })}
                            alt={TEMPLE_PHOTOS[selectedPhoto].title}
                            className="w-full h-auto rounded-lg shadow-2xl"
                        />
                        
                        {/* 照片資訊 */}
                        <div className="text-white text-center mt-4 bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">
                                {TEMPLE_PHOTOS[selectedPhoto].title}
                            </h3>
                            {TEMPLE_PHOTOS[selectedPhoto].date && (
                                <p className="text-gray-300 mt-2 text-lg">
                                    {TEMPLE_PHOTOS[selectedPhoto].date}
                                </p>
                            )}
                            <p className="text-gray-400 text-sm mt-2">
                                {selectedPhoto + 1} / {TEMPLE_PHOTOS.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 影片播放 Modal */}
            {isVideoModalOpen && currentVideoId && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={closeVideoModal}
                >
                    <div 
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 關閉按鈕 */}
                        <button
                            onClick={closeVideoModal}
                            className="absolute top-2 right-2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
                            aria-label="關閉影片"
                        >
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* YouTube iframe */}
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>
                </div>
            )}

        </PageLayout>
        </>
    );
};

export default HeQianRenPage;
