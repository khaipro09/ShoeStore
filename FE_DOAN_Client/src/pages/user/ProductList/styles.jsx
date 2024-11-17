import styled from "styled-components";

export const ProductLayout = styled.div`
  display: flex;
  padding: 30px 0 30px 0;
  gap: 30px;
  .ant-collapse-item {
    border: 1px solid #e3e7ef;
  }
`;
export const ProductFilterContainer = styled.div`
  width: 250px;
  flex-shrink: 0;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const ProductContent = styled.div`
  flex-grow: 1;
`;
