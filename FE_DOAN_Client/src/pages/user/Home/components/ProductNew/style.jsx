import styled from "styled-components";

export const ProductList = styled.div`
  --spacing: 20px;
  --column: 5;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  margin-left: calc(-1 * var(--spacing));
  margin-bottom: calc(-1 * var(--spacing) + 10px);
  & > * {
    margin-left: var(--spacing);
    margin-bottom: calc(var(--spacing) + 10px);
    width: calc((100% / var(--column)) - var(--spacing));
  }
  @media screen and (max-width: 1180px) {
    --spacing: 15px;
    --column: 4;
    justify-content: center;
  }

  @media screen and (max-width: 920px) {
    --spacing: 15px;
    --column: 3;
  }

  @media screen and (max-width: 767px) {
    --spacing: 10px;
    --column: 2;
  }
  @media screen and (max-width: 320px) {
    --spacing: 0;
    --column: 0;
    all: unset;
    & {
      display: grid;
      justify-content: flex-start;
      grid-auto-columns: calc(100% - 10px);
      grid-auto-flow: column;
      grid-gap: 20px 10px;
      grid-template-rows: 1fr 1fr;
      overflow: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scroll-snap-stop: always;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      -webkit-overflow-scrolling: touch;
      scroll-padding: 10px;
      grid-template-columns: unset;
    }
    &::-webkit-scrollbar {
      display: none;
      width: 0;
    }
    & > * {
      scroll-snap-align: start;
    }
  }
`;
export const ProductItem = styled.div``;
