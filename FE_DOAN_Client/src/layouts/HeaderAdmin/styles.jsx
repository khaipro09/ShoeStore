import styled from "styled-components";
import { Dropdown, Menu, Space } from "antd";

export const Logo = styled.div`
  font-size: 30px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  color: transparent;
  text-transform: uppercase;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #30cfd0 0%, #330867 100%);
  cursor: pointer;
`;

export const MenuRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  .name {
    font-size: 16px;
    font-weight: 600;
  }
  @media screen and (max-width: 767px) {
    .name {
      display: none;
    }
  }
`;

export const SpaceCT = styled(Space)`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
`;

export const CustomMenu = styled(Menu)`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 12px;
  & .icon {
    color: #ffd000;
  }
`;

export const CustomMenuItem = styled(Menu.Item)`
  padding: 13px 20px;
`;
