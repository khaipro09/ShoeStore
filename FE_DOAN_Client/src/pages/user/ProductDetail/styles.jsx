import styled from "styled-components";

export const Section = styled.div`
  padding: 0 0 30px;
  background-color: #f3f3f3;
  .site-page-header {
    padding: 15px 0;
  }
  .ant-page-header-heading-title {
    font-size: 18px;
  }
  .list-info {
    position: relative;
    height: 380px;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.6);
      z-index: 1;
    }
    &.active {
      height: auto;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 1;
      }
    }
  }
`;
export const ProductDetail = styled.div``;
export const Color = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid rgb(229, 229, 229);
  background: ${(props) =>
    props.color
      ? props.color === "multiColor"
        ? "radial-gradient(circle, #59ae12, #a5a100, #d88f1f, #f77e54, #ff7887, #fb81b6, #e493df, #bfa8fd, #8bc3ff, #4cdaff, #29edff, #5ffbf1);"
        : props.color
      : "white"};
`;
