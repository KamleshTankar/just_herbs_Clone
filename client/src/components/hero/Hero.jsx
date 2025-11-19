import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination, A11y, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/swiper-bundle.css'
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/lazy";
import Slide1 from '../../assets/hero/image1.jpg';
import Slide2 from '../../assets/hero/image2.jpg';
import Slide3 from '../../assets/hero/image3.jpg';
import Slide4 from '../../assets/hero/image4.jpg';
import Slide5 from '../../assets/hero/images5.jpg';

const slides = [
  { src: Slide1, alt: "Ayurveda's skincare hero banner 1" },
  { src: Slide2, alt: "Natural beauty products hero banner 2" },
  { src: Slide3, alt: "Organic perfumes and attars hero banner 3" },
  { src: Slide4, alt: "Herbal wellness and spa hero banner 4" },
  { src: Slide5, alt: "Sustainable personal care hero banner 5" },
];

const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        speed={800}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        className="h-[100vh] w-full text-center"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.src} alt={slide.alt} loading='lazy' className="w-full h-[80vh] md:h-[90vh] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero