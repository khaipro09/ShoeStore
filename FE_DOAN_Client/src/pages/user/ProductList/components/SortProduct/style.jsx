import styled from "styled-components";

export const SortSearchProduct = styled.div`
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
