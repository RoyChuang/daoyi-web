import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';

import classes from './slider.module.scss';
import { transformImagePaths } from '../../utils/utils';

const Slider = ({ images, className }: { images: string[], className?: string }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className={className}
            draggable={true}
        >
            {
                images.map((each, i) => (
                    <SwiperSlide className={classes.slide} key={i}>
                        <div className={classes.slide_inner}>
                            {/* 模糊背景層：放大填滿，製造景深感 */}
                            <img
                                src={transformImagePaths(each)}
                                alt=''
                                className={classes.bg_blur}
                                aria-hidden="true"
                            />
                            {/* 主圖層：維持原比例顯示，不裁切 */}
                            <img
                                src={transformImagePaths(each)}
                                alt=''
                                className={classes.main_img}
                            />
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default Slider;