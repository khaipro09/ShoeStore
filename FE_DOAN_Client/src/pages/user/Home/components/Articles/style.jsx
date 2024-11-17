import styled from "styled-components";

export const ArticleList = styled.div`
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  @media screen and (max-width: 1023px) {
    & {
      display: grid;
      justify-content: flex-start;
      grid-auto-columns: 50%;
      grid-auto-flow: column;
      grid-gap: 1.5rem;
      overflow: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scroll-snap-stop: always;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      -webkit-overflow-scrolling: touch;
      scroll-padding: 1rem;
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
  @media screen and (max-width: 767px) {
    & {
      grid-auto-columns: 90%;
    }
  }
`;
export const ArticleItem = styled.div`
  cursor: pointer;
  .article-img {
    position: relative;
    padding-top: 280px;
    @media screen and (max-width: 767px) {
      padding-top: 100%;
    }
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .article-content {
    text-align: center;
    span {
      display: block;
      padding: 15px;
      font-size: 14px;
      text-transform: uppercase;
      word-break: break-all;
    }
    h2 {
      position: relative;
      padding-bottom: 12px;
      margin-bottom: 14px;
      title {
        display: block;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 2px;
        background-color: #000;
      }
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      font-size: 14px;
      line-height: 1.4;
    }
  }
`;
