import styled from "styled-components";
import { Container } from "../../styles/styles";

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  transition: all 0.25s linear;
  height: ${(props) => props.theme.size.headerSize};
  background-color: ${(props) => props.theme.colors.whiteColor};
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  z-index: 100;
  &.sticky {
    transform: translateY(-100%);
  }
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  height: ${(props) => props.theme.size.headerSize};
  .menu-hide-desktop {
    display: none;
  }
  @media screen and (max-width: 920px) {
    .menu-container {
      flex: 1;
    }
    .menu-hide-desktop {
      display: block;
    }
    .user-action {
      display: none;
    }
  }
`;

export const HeaderLogo = styled.h1`
  flex-shrink: 0;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #FF6347 0%, #FFA07A 100%);
  text-transform: uppercase;
  font-size: 36px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin: 0;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 26px;
  }
  @media screen and (max-width: 340px) {
    font-size: 22px;
  }
`;

export const HeaderList = styled.ul`
  list-style-type: none;
  margin: 0;
  @media screen and (max-width: 920px) {
    display: none;
  }
`;
export const HeaderItem = styled.li`
  display: inline-block;
  position: relative;
`;

export const HeaderLink = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: ${(props) => props.theme.size.headerSize};
  text-decoration: none;
  margin: 0 12px;
  font-size: 14px;
  color: #000;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    font-size: 11px;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: #444;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    right: 50%;
  }
  &::after {
    left: 50%;
  }
  &:hover::after,
  &:hover::before {
    width: 50%;
  }
`;

export const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0 15px;
  @media screen and (max-width: 340px) {
    gap: 0 5px;
  }
`;
export const HeaderButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
  font-size: 24px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  @media screen and (max-width: 920px) {
    font-size: 18px;
  }
`;

export const SpacingTop = styled.div`
  padding-top: ${(props) => props.theme.size.headerSize};
`;
