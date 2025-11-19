import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

import AddReviewModal from "./AddReview";

// Default fallback data
const DEFAULT_TESTIMONIALS = [
  {
    text: "Great products and fast shipping!",
    author: "John Doe",
    rating: 5,
    img: "/avatars/john.png",
    verified: true,
  },
  {
    text: "Excellent customer service and quality.",
    author: "Jane Smith",
    rating: 4,
    img: "/avatars/jane.png",
    verified: true,
  },
  {
    text: "Highly recommended for everyone!",
    author: "Mike Johnson",
    rating: 5,
    img: "/avatars/mike.png",
    verified: true,
  },
  {
    text: "Amazing experience from start to finish!",
    author: "Emily Davis",
    rating: 5,
    img: "/avatars/emily.png",
    verified: true,
  },
  {
    text: "Amazing experience from start to finish!",
    author: "Emily Davis",
    rating: 5,
    img: "/avatars/emily.png",
    verified: true,
  },
  {
    text: "Amazing experience from start to finish!",
    author: "Emily Davis",
    rating: 5,
    img: "/avatars/emily.png",
    verified: true,
  },
];

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Load reviews from localStorage or use defaults
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("testimonials"));
    if (stored && stored.length) {
      setReviews(shuffleArray(stored));
    } else {
      setReviews(shuffleArray(DEFAULT_TESTIMONIALS));
    }
  }, []);

  const addReview = (review) => {
    const updated = [...reviews, review];
    setReviews(updated);
    localStorage.setItem("testimonials", JSON.stringify(updated));
  };

  return (
    <section className="bg-gray-100 py-16 border border-gray-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-10"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>

        {/* ➕ Add Review Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="mb-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          Add Review
        </button>

        <div className="flex  gap-6">
                    <Swiper
            modules={[ Navigation, Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={30}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {reviews.map((item, i) => (
            <SwiperSlide key={i}>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              >
              <TestimonialCard item={item} />
            </motion.div>
              </SwiperSlide>
          ))}
          </Swiper>
        </div>

        {/* Modal */}
        <AddReviewModal
          open={modalOpen}
          setOpen={setModalOpen}
          addReview={addReview}
        />
      </div>
    </section>
  );
};

const TestimonialCard = ({ item }) => {
  return (
    <div className=" w-full h-64 bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 text-center">
      <div className="flex flex-col items-center justify-center gap-4 mb-4">
        <div>
          <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {item.author}
            {item.verified && (
              <span className="text-blue-600 text-sm font-medium">
                ✔ Verified
              </span>
            )}
          </p>

          <div className="text-yellow-400 text-xl">
            {"★".repeat(item.rating)}
            {"☆".repeat(5 - item.rating)}
          </div>
        </div>

        <img src={item.img} alt={item.author}
          className="w-14 h-14 rounded-full border" />

      </div>

      <p className="text-gray-700 italic text-lg leading-relaxed">
        "{item.text}"
      </p>
    </div>
  );
};

export default Testimonials;

