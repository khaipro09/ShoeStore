import styled from "styled-components";

export const HeaderLogo = styled.h1`
  flex-shrink: 0;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #FF6347 0%, #FFA07A 100%);
  text-transform: uppercase;
  font-size: 28px;
  font-weight: 750;
  font-family: "Poppins", sans-serif;
  margin: 0;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 20px;
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
