import React from "react";

import CardProduct from "../../../../../components/Card";

import * as Style from "./style";

function ProductNew({ productList }) {
  console.log("🚀 ~ ProductNew ~ productList:", productList)
  function renderProductNew() {
    return productList.data.map((product, index) => {
      if (index <= 9) {
        return (
          <Style.ProductItem key={`${product.productName}-${index}`}>
            <CardProduct
              path={`/product/${product.productName}-${product._id}`}
              product={product}
            />
          </Style.ProductItem>
        );
      }
    });
  }
  return <Style.ProductList>{renderProductNew()}</Style.ProductList>;
}

export default ProductNew;
