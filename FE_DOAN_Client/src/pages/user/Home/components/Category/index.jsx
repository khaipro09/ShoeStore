import React, { useEffect } from "react";

import giayNam from "../../../../../assets/images/giayNam.jpg";
import giayNu from "../../../../../assets/images/giayNu.jpg";
import giayTreEm from "../../../../../assets/images/giayTreEm.jpg";

import history from "../../../../../utils/history";

import * as Style from "./style";

function CategoryHome() {
  const categoryList = [
    {
      image: giayNam,
      tag: "Bộ sưu tập",
      category: "Giày Nam",
      path: "/product/GIAY_NAM",
    },
    {
      image: giayNu,
      tag: "Bộ sưu tập",
      category: "Giày Nữ",
      path: "/product/GIAY_NU",
    },
    {
      image: giayTreEm,
      tag: "Bộ sưu tập",
      category: "Giày Trẻ Em",
      path: "/product/GIAY_TRE_EM",
    },
  ];

  useEffect(() => {
    // Tải trước hình ảnh để cải thiện hiệu suất
    categoryList.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, [categoryList]);

  function renderCategory() {
    return categoryList.map((category, index) => (
      <Style.CategoryItem
        key={index}
        onClick={() => history.push(category.path)}
      >
        <img src={category.image} alt={category.category} />
        <div className="category-content">
          <span>{category.tag}</span>
          <h2>{category.category}</h2>
        </div>
      </Style.CategoryItem>
    ));
  }

  return (
    <Style.Category>
      <Style.CategoryList>{renderCategory()}</Style.CategoryList>
    </Style.Category>
  );
}

export default CategoryHome;
