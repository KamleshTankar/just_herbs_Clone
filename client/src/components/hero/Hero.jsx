import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination, A11y, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/swiper-bundle.css'
import Prod1 from '../../assets/hero/Suvarna_Horizontal.webp';
import Prod2 from '../../assets/hero/Suvarna_Chandan_Horizontal.webp';
import Prod3 from '../../assets/hero/Chandan_Perfume_Horizontal.webp';


const Hero = () => {
  return (
    <section className='h-1/2'>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay
        pagination={{ clickable: true }}
        onSlideChange={() =>{}}
        onSwiper={(swiper) => {}}
        className='bg-yellow-200 h-[60vh] w-full text-center'
      >
        <SwiperSlide><img src={Prod1} alt="slider-img1" height={300}/></SwiperSlide>
        <SwiperSlide><img src={Prod2} alt="slider-img2" height={300}/></SwiperSlide>
        <SwiperSlide><img src={Prod3} alt="slider-img3" height={300}/></SwiperSlide>
        <SwiperSlide><img src={Prod2} alt="slider-img4" height={300}/></SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Hero