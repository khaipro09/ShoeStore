import styled from "styled-components";
import { Table, Button, List, Space } from "antd";

export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color: #1d3a98;
  font-weight: 900;
`;
export const ContentBox = styled.div``;
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`;
export const Search = styled.div`
  display: flex;
  min-width: 400px;
  justify-content: flex-end;
  font-weight: 900;
`;
export const CustomTable = styled(Table)`
  & th {
    text-transform: uppercase;
    background-color: #096dd9 !important;
    color: white !important;
    white-space: nowrap;
  }
`;
export const ListItem = styled(List.Item)`
  background-color: #feffe6;
`;
export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
export const ChartContainer = styled.div``;
export const ShowImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`;
export const ShowColor = styled.div`
  height: 20px;
  width: 20px;
  ${(props) => {
    if (props.color) {
      return props.color === "multiColor"
        ? "background:linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);"
        : `background-color:#${props.color}`;
    }
  }};
  border: 1px solid #096dd9;
`;

export const ShowTotalItem = styled.div`
  width: 100%;
  padding: 10px 15px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  & > h3 {
    color: white;
    margin-bottom: 10px;
  }
  & > span {
    font-weight: 900;
    font-size: 60px;
  }
  &.week {
    background-color: #ff706d;
  }
  &.month {
    background-color: #00dbb3;
  }
`;
