import styled from "styled-components";
import { Container } from "../../../styles/styles";
import { Table } from "antd";
export const OrderPage = styled.div`
  background-color: #f3f3f3;
`;

export const OrderContainer = styled(Container)`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  margin-bottom: 15px;
  @media screen and (max-width: 767px) {
    padding: 7.5px;
  }
`;

export const Content = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  @media screen and (max-width: 767px) {
    padding: 7.5px;
  }
`;
export const CustomTable = styled(Table)`
  & th {
    text-transform: uppercase;
    background-color: #096dd9 !important;
    color: white !important;
    white-space: nowrap;
  }
`;
