import styled from "styled-components";

export const SliderProduct = styled.div`
  padding-top: 20px;
  .swiper-button-prev {
    top: 150px !important;
    left: 0 !important;
  }
  .swiper-button-next {
    top: 150px !important;
    right: 0 !important;
  }

  .mySwiper {
    padding: 30px 15px;
    margin: -30px -15px;
  }
  @media screen and (max-width: 767px) {
    .mySwiper {
      padding: 30px 10px;
      margin: -30px -10px;
    }
  }
  @media screen and (max-width: 768px) {
    .swiper-button-prev,
    .swiper-button-next {
      display: none !important;
    }
  }
`;
