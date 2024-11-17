import styled from "styled-components";

export const ProductContainer = styled.div`
  /* padding: 15px;
  background-color: #fff; */
  .num-product {
    display: inline-block;
    color: #003a8c;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: 700px;
  grid-gap: 15px;
  @media screen and (max-width: 1200px) {
    min-height: unset;
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 900px) {
    min-height: unset;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
    min-height: unset;
  }
  @media screen and (max-width: 620px) {
    grid-gap: 15px 10px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const ProductItem = styled.div``;
