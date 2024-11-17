import styled from "styled-components";
import { Table } from "antd";

export const HistoryOrder = styled.div``;
export const CustomTable = styled(Table)`
  & th {
    text-transform: uppercase;
    background-color: #096dd9 !important;
    color: white !important;
    white-space: nowrap;
  }
`;
