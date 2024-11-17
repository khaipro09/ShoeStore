import styled from "styled-components";
import { Row, Button, Table, Space, Popconfirm } from "antd";

export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color: #330867;
  font-weight: 900;
  margin: 0;
`;
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`;
export const Search = styled.div`
  display: flex;
  width: 400px;
  font-weight: 900;
  justify-content: flex-end;
`;
export const CustomTable = styled(Table)`
  & th {
    text-transform: uppercase;
    background-color: #096dd9 !important;
    color: white !important;
    white-space: nowrap;
  }
`;
export const ImageItem = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => (props.image ? props.image : null)});
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #dee2e6;
`;
export const CustomSpace = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px !important;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
