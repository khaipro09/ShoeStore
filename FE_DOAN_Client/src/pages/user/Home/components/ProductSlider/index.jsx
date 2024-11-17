import React from "react";

// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper/core";
import CardProduct from "../../../../../components/Card";

import * as Style from "./style";

// install Swiper modules
SwiperCore.use([EffectFade, Navigation]);

function ProductSlider({ productList }) {
  function renderProduct() {
    return productList.data.map((product, index) => {
      if (index <= 9) {
        return (
          <SwiperSlide key={`${product.name}-${index}`}>
            <CardProduct
              path={`/product/${product.name}-${product.id}`}
              product={product}
            />
          </SwiperSlide>
        );
      }
    });
  }
  return (
    <Style.SliderProduct>
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        className="mySwiper"
      >
        {renderProduct()}
      </Swiper>
    </Style.SliderProduct>
  );
}

export default ProductSlider;
