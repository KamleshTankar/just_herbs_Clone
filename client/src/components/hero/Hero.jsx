import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination, A11y, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/swiper-bundle.css'
// import Prod1 from '../../assets/hero/Suvarna_Horizontal.webp';
// import Prod2 from '../../assets/hero/Suvarna_Chandan_Horizontal.webp';
// import Prod3 from '../../assets/hero/Chandan_Perfume_Horizontal.webp';
import Slide1 from '../../assets/hero/image1.jpg';
import Slide2 from '../../assets/hero/image2.jpg';
import Slide3 from '../../assets/hero/image3.jpg';
import Slide4 from '../../assets/hero/image4.jpg';
import Slide5 from '../../assets/hero/images5.jpg';


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
        className='h-[100vh] w-full text-center'
      >
        {/* <SwiperSlide><img src={Prod1} alt="slider-img1" height={300}/></SwiperSlide>
        <SwiperSlide><img src={Prod2} alt="slider-img2" height={300}/></SwiperSlide>
        <SwiperSlide><img src={Prod3} alt="slider-img3" height={300}/></SwiperSlide> */}

        <SwiperSlide><img src={Slide1} alt="slider-img4" height={100}/></SwiperSlide>
        <SwiperSlide><img src={Slide2} alt="slider-img4" height={100}/></SwiperSlide>
        <SwiperSlide><img src={Slide3} alt="slider-img4" height={100}/></SwiperSlide>
        <SwiperSlide><img src={Slide4} alt="slider-img4" height={100}/></SwiperSlide>
        <SwiperSlide><img src={Slide5} alt="slider-img4" height={100}/></SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Hero