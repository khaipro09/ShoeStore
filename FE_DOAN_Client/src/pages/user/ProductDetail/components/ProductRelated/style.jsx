import styled from "styled-components";

export const ProductRelated = styled.div`
  padding: 30px 15px 15px;
  margin-top: 30px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  @media screen and (max-width: 450px) {
    padding: 20px 7.5px 15px;
    .title {
      h2 {
        font-size: 20px;
      }
    }
  }
  .title {
    text-align: center;
    div {
      font-weight: 600;
      font-size: 14px;
      color: #ff514e;
    }
    h2 {
      margin-top: 10px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.84);
    }
  }

  @media screen and (max-width: 350px) {
    .col-custom {
      display: block;
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
`;
