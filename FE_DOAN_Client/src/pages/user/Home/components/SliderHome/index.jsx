import React, { useEffect } from "react";

// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper/core";

import slide1 from "../../../../../assets/images/slide1.png";
import slide2 from "../../../../../assets/images/slide2.jpg";
import slide3 from "../../../../../assets/images/slide3.png";
import slide4 from "../../../../../assets/images/slide4.png";
import slideLC4 from "../../../../../assets/images/slideLC4.jpg";

import * as Style from "./style";

// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation]);

function SliderHome() {
  const sliderList = [
    // {
    //   image: slide1,
    // },
    // {
    //   image: slide2,
    // },
    // {
    //   image: slide3,
    // },
    // {
    //   image: slide4,
    // },
    {
      image: slide1
    },
    {
      image: slideLC4
    },
  ];

  useEffect(() => {
    //preload image
    sliderList.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);
  function renderSlider() {
    return sliderList.map((slide, index) => {
      return (
        <SwiperSlide key={index}>
          <Style.SwipperItem>
            <img src={slide.image} />
          </Style.SwipperItem>
        </SwiperSlide>
      );
    });
  }
  return (
    <Style.SwipperWalpaper>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={false}
        className="mySwiper"
      >
        {renderSlider()}
      </Swiper>
    </Style.SwipperWalpaper>
  );
}

export default SliderHome;
