import styled from "styled-components";

export const Home = styled.div`
  background-color: #fff;
  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    top: 50% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #002878;
    border-radius: 50%;
  }
  .swiper-button-disabled {
    display: none;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }
`;
