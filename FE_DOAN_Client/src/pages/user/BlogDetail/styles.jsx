import styled from "styled-components";

export const BlogDetail = styled.div`
  background-color: #f3f3f3;
  min-height: 100vh;
  padding-bottom: 30px;
  .site-page-header {
    padding: 15px 0;
  }
  .ant-page-header-heading-title {
    font-size: 18px;
  }
`;

export const BlogContent = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  min-height: 500px;
  @media screen and (max-width: 767px) {
    padding: 10px;
  }

  h2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
    text-overflow: ellipsis;
    word-break: break-word;
    text-decoration: none;
    font-size: 22px;
    color: unset;
    color: #323c82;
    font-weight: 600;
  }
  p {
    line-height: 1.4;
  }
  time {
    font-size: 12px;
    color: crimson;
  }
`;
