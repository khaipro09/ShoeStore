import styled from "styled-components";

export const Breadcrumb = styled.div`
  width: 100%;
  text-align: center;
  .ant-breadcrumb-separator {
    color: #fff;
  }
  a {
    color: #fff;
    transition: all 0.2s;
    font-weight: 600;
    &:hover {
      color: #002878;
      font-weight: 600;
    }
  }
  .ant-breadcrumb > span:last-child a {
    color: #fff;
    font-weight: 600;
  }
`;
