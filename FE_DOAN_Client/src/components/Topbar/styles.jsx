import styled from "styled-components";

export const TopBar = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.colors.secondColor};
`;
export const TopBarText = styled.span`
  color: ${(props) => props.theme.colors.whiteColor};
  text-align: center;
  height: 50px;
  text-transform: capitalize;
  font-weight: 500;
  padding: 10px 15px;
  font-size: 13px;
  display: inline-block;
  line-height: 1.5;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 11px;
  }
`;
