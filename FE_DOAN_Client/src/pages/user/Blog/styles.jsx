import styled from "styled-components";
import { Container } from "../../../styles/styles";

export const BlogPage = styled.div``;

export const Breadcrumb = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  color: white;
`;
export const Hero = styled.div`
  position: relative;
  padding-top: 150px;
  background-image: linear-gradient(to right, #cb5eee, #4be1ec);
  margin-bottom: 15px;
`;

export const HeroTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
`;

export const BlogContainer = styled(Container)`
  padding-bottom: 40px;
`;

export const SortSearchBlog = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 16px;
  @media screen and (max-width: 460px) {
    flex-wrap: wrap;
  }

  .select-sort {
    flex-shrink: 0;
    width: 250px;
    max-width: 100%;
    @media screen and (max-width: 767px) {
      & {
        width: unset;
      }
    }
    @media screen and (max-width: 460px) {
      width: 100%;
    }
  }
`;

export const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-gap: 15px 10px;
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
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
