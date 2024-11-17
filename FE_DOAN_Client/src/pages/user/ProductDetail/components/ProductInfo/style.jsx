import styled from "styled-components";

export const ProductInfo = styled.div`
  .ant-form-item {
    margin-bottom: 15px;
  }
`;

export const MainInfo = styled.div`
  padding: 15px;
  margin-bottom: 30px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  @media screen and (max-width: 450px) {
    padding: 7.5px;
  }
  .image-group {
  }
  .slide-item {
    .ant-image {
      position: relative;
      padding-top: 70%;
      width: 100%;
      .slide-image {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-position: center;
        object-fit: cover;
      }
    }
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
  .product-content {
    h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 20px;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      @media screen and (max-width: 320px) {
        font-size: 24px;
      }
    }
    .product-rate {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
      .rate {
      display:flex;
        font-size: 14px;
        .ant-rate-star:not(:last-child) {
          margin-right: 5px;
        }
      }
      .number-rate {
        position: relative;
        display: inline-flex;
        top: 1px;
        font-size: 14px;
      }
    }
    .product-price {
      font-size: 24px;
      color: #ff514e;
      margin-bottom: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
    .product-info-list {
      display: flex;
      gap: 30px;
      align-items: center;
      margin-bottom: 20px;
      @media screen and (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
    }
    .product-brand-item {
      display: flex;
      align-items: baseline;
      gap: 5px;
    }
    .product-info-tag {
      font-size: 14px;
    }
    .product-info-text {
      font-size: 15px;
      font-weight: 600;
    }
    .product-department {
      margin-bottom: 20px;
    }
    .product-color {
      display: flex;
      gap: 5px;
      align-items: center;
      margin-bottom: 20px;
    }
    .product-option {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
      strong {
        color: #ff514e;
      }
    }
    .product-action {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 15px 0;
      margin-bottom: 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      gap: 30px 15px;
    }
  }

  @media screen and (max-width: 350px) {
    .ant-list-bordered .ant-list-item,
    .ant-list-bordered .ant-list-header {
      padding-right: 10px;
      padding-left: 10px;
    }
  }
`;

export const TabCard = styled.div`
  .ant-tabs-card .ant-tabs-content {
    margin-top: -15px;
  }
  .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    padding: 15px;
    background: #fff;
    border: 1px solid #dee2e6;
    @media screen and (max-width: 374px) {
      padding: 7.5px;
    }
  }
  .ant-tabs-card > .ant-tabs-nav::before {
    /* display: none; */
    border-bottom: 2px solid #003a8c;
  }
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active,
  .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
    border-bottom-color: #003a8c;
  }
  .ant-tabs-card .ant-tabs-tab,
  [data-theme="compact"] .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }
  .ant-tabs-card .ant-tabs-tab-active,
  [data-theme="compact"] .ant-tabs-card .ant-tabs-tab-active {
    background: #003a8c;
    border-color: #003a8c;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
    font-weight: 600;
  }
  #components-tabs-demo-card-top .code-box-demo {
    padding: 24px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .tab-list-image {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    @media screen and (max-width: 374px) {
      grid-template-columns: 1fr;
      gap: 7.5px;
    }
  }
`;

const COLOR_MENU = [
  { name: "đen", code: "000000" },
  { name: "trắng", code: "ffffff" },
  { name: "xám", code: "808080" },
  { name: "bạc", code: "c0c0c0" },
  { name: "đỏ", code: "e7352b" },
  { name: "xanh dương", code: "1790c8" },
  { name: "nâu", code: "825d41" },
  { name: "vàng", code: "fed533" },
  { name: "hồng", code: "ff69b4" },
  { name: "tím", code: "800080" },
  { name: "xanh ngọc", code: "00ced1" },
  { name: "be", code: "f5f5dc" },
  { name: "xanh navy", code: "000080" },
  { name: "nhiều màu", code: "multiColor" },
];

// Hàm để lấy mã màu từ tên màu
const getColorCode = (colorName) => {
  const color = COLOR_MENU.find(item => item.name === colorName);
  return color ? color.code : null;
};

export const Color = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid rgb(229, 229, 229);
  background: ${(props) => {
    const colorCode = getColorCode(props.color);
    return colorCode
      ? colorCode === "multiColor"
        ? "radial-gradient(circle, #59ae12, #a5a100, #d88f1f, #f77e54, #ff7887, #fb81b6, #e493df, #bfa8fd, #8bc3ff, #4cdaff, #29edff, #5ffbf1);"
        : `#${colorCode}`
      : "white";
  }};
`;

export const DescriptionsCard = styled.div`
  .ant-descriptions-header {
    margin: 0 0 1px 0;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      border-bottom: 2px solid #003a8c;
    }
    .ant-descriptions-title {
      span {
        display: inline-block;
        padding: 8px 16px;
        font-size: 14px;
        background: #003a8c;
        border-radius: 2px 2px 0 0;
        border: 1px solid #003a8c;
        color: #fff;
      }
    }
  }
  .ant-descriptions-bordered .ant-descriptions-view {
    background-color: #fff;
    border: 1px solid #dee2e6;
  }
  @media screen and (max-width: 450px) {
    .ant-descriptions-bordered .ant-descriptions-item-label,
    .ant-descriptions-bordered .ant-descriptions-item-content {
      padding: 10px 15px;
    }
  }
  @media screen and (max-width: 350px) {
    .ant-descriptions-bordered .ant-descriptions-item-label,
    .ant-descriptions-bordered .ant-descriptions-item-content {
      padding: 10px 10px;
    }
  }
`;
