import styled from "styled-components";

export const Section = styled.div`
  padding: 40px 0;
`;

export const SectionHeading = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
export const SectionTitle = styled.h2`
  font-size: 28px;
  color: #272727;
  line-height: 1.1;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding-bottom: 15px;
  display: block;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: auto;
  word-break: break-all;
  &::after {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 56px;
    height: 1.8px;
    background-color: currentColor;
    content: "";
    bottom: 0;
  }
  @media only screen and (max-width: 425px) {
    font-size: 19px;
  }
`;
export const Button = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
