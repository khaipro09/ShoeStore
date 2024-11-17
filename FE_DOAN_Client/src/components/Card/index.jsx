import React from "react";
import { Badge, Space, Rate } from "antd";
import * as Style from "./styles";
import history from "../../utils/history";

function CardProduct({ product, path }) {
  return (
    <Badge.Ribbon style={{ zIndex: 5 }} text="New" color="red">
      <Style.CardProduct onClick={() => history.push(path)}>
        <Style.ProductImage onClick={() => history.push(path)}>
          <img
            src={product.images[0].absoluteUrl}
            className="visible content"
            alt={product.name}
          />
          <img
            src={product.images[0].absoluteUrl}
            className="hidden content"
            alt={product.name}
          />
        </Style.ProductImage>
        <Style.ProductContent>
          <h3 onClick={() => history.push(path)}>{product.productName}</h3>
          <strong>{product?.price?.toLocaleString()}₫</strong>
          <div align="center" className="card-info">
            <Rate className="star" allowHalf disabled value={4.5} />
            {/* <Rate className="star" allowHalf disabled value={product.rate} /> */}
            <span className="quantity">
              {product.qty === 0
                ? "đã hết"
                : `còn ${product.qty} sản phẩm`}
            </span>
          </div>
          <div align="center" className="card-info brand-info">
            {/* <img
              src={product.category?.logo}
              className="logo_brand"
              alt={product.category?.name}
            /> */}
            <span className="option">
              Đã bán: {product?.sold}
            </span>
            <span className="brand">Nhãn hiệu: {product?.brand?.categoryName}</span>
          </div>
        </Style.ProductContent>
      </Style.CardProduct>
    </Badge.Ribbon>
  );
}

export default CardProduct;
