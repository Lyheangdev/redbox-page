"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { ImageNext } from "./image";

const bulletCustom = {
  /* used to apply or change style of bullet */
  "--swiper-pagination-color": "#E61580",
  "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
  "--swiper-pagination-bullet-inactive-opacity": "1",
  "--swiper-pagination-bullet-size": "8px",
  "--swiper-pagination-bullet-active": "10px",
  "--swiper-pagination-bullet-horizontal-gap": "2px",
};

export const SwiperNext: React.FC<{ images: [string] }> = ({ images }) => (
  <>
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
      loop
      navigation={true}
      modules={[Autoplay, Pagination]}
      className="swiper"
    >
      {images.map((m, i) => (
        <SwiperSlide key={i} className="w-full h-72 pb-8">
          <ImageNext src={m} className="aspect-square" />
        </SwiperSlide>
      ))}
    </Swiper>
  </>
);
