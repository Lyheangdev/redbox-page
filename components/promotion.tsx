"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ImageNext } from "./ui/image";
import "swiper/css";

export interface PromotionProps {
  status: string;
  images: [string];
}

export const Promotion: React.FC<PromotionProps> = ({ status, images }) => {
  const bulletCustom = {
    /* used to apply or change style of bullet */
    "--swiper-pagination-color": "#000",
    "--swiper-pagination-bullet-inactive-color": "#000",
    "--swiper-pagination-bullet-inactive-opacity": "0",
    "--swiper-pagination-bullet-size": "0",
    "--swiper-pagination-bullet-active": "0",
    "--swiper-pagination-bullet-horizontal-gap": "0",
  };

  return (
    <div>
      <h4 className="text-base font-bold py-3">{status}</h4>
      <Swiper
        style={bulletCustom as never}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop
        modules={[Autoplay, Pagination]}
        className="swiper"
      >
        {images.map((m, i) => (
          <SwiperSlide key={i} className="relative w-full h-60">
            <ImageNext src={m} className="w-full h-44" radius="md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
