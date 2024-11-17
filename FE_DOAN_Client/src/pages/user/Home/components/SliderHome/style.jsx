import styled from "styled-components";

export const SwipperWalpaper = styled.div``;

export const SwipperItem = styled.div`
  position: relative;
  padding-top: 70vh;
  @media screen and (max-width: 1279px) {
    padding-top: 380px;
  }
  @media screen and (max-width: 767px) {
    padding-top: 200px;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
