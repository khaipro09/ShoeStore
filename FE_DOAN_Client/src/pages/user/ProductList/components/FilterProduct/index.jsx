import React from "react";

import { Collapse, Checkbox, Slider, Rate, Radio } from "antd";

import { SIZE_LIST } from "../../../../../constants/size";
import { COLOR_MENU } from "../../../../../constants/color";

import * as Style from "./style";
import * as Icons from "@ant-design/icons";
import TagList from "../TagList";
import history from "../../../../../utils/history";
import { RATING_LIST } from "../../../../../constants/rating";

const { Panel } = Collapse;

function FilterProduct({
  handleFilterCategory,
  handleFilterColor,
  handleFilterDepartment,
  handleFilterSize,
  handleFilterType,
  handleRangePrice,
  handleFilterRating,
  ...rest
}) {
  const {
    typeList,
    categoryList,
    departmentList,
    categoriesSelected,
    typesSelected,
    departmentsSelected,
    priceRange,
    searchKey,
    setTypesSelect,
    setCategoriesSelect,
    setDepartmentsSelect,
    setSearchKey,
    setPriceRange,
    colorSelected,
    setColorSelect,
    sizeSelected,
    setSizeSelect,
    ratingSelected,
    setRatingSelect,
  } = rest;

  const marks = {
    0: "0₫",
    7500000: "7.5tr",
    15000000: "15tr",
  };

  function renderCategoryRadio() {
    const categoryRadio = categoryList.data.map((categoryItem) => ({
      label: categoryItem.categoryName,
      value: categoryItem._id,
    }));
    return (
      <Radio.Group
        options={categoryRadio}
        onChange={(e) => handleFilterCategory(e.target.value)}
        value={categoriesSelected}
        style={{ display: 'flex', flexDirection: 'column' }}
      />
    );
  }

  function renderTypeCheckbox() {
    const typeCheckbox = typeList.data.map((typeItem) => ({
      label: typeItem.categoryName,
      value: typeItem._id,
    }));
    return (
      <Radio.Group
        options={typeCheckbox}
        onChange={(e) => handleFilterType(e.target.value)}
        value={typesSelected}
        style={{ display: 'flex', flexDirection: 'column' }}
      />
    );
  }
  

  // function renderSizeCheckbox() {
  //   const sizeCheckbox = SIZE_LIST.map((sizeItem) => ({
  //     label: sizeItem.size,
  //     value: sizeItem.id,
  //   }));
  //   return (
  //     <Checkbox.Group
  //       options={sizeCheckbox}
  //       onChange={(value) => handleFilterSize(value)}
  //       value={sizeSelected}
  //     />
  //   );
  // }

  function renderColorCheckbox() {
    const colorCheckbox = COLOR_MENU.map((colorItem) => ({
      label: (
        <Style.Color
          className="color"
          color={
            colorItem.code !== "multiColor"
              ? `#${colorItem.code}`
              : colorItem.code
          }
        ></Style.Color>
      ),
      value: colorItem.code,
    }));
    return (
      <Checkbox.Group
        options={colorCheckbox}
        onChange={(value) => handleFilterColor(value)}
        value={colorSelected}
      />
    );
  }
  function renderDepartmentCheckbox() {
    const departmentsCheckbox = departmentList.data.map((departmentItem) => ({
      label: departmentItem.name,
      value: departmentItem.id,
    }));
    return (
      <Checkbox.Group
        options={departmentsCheckbox}
        onChange={(value) => handleFilterDepartment(value)}
        value={departmentsSelected}
      />
    );
  }

  // function renderRatingCheckbox() {
  //   const ratingCheckbox = RATING_LIST.map((ratingItem) => ({
  //     label: <Rate disabled value={ratingItem.rating} />,
  //     value: ratingItem.rating,
  //   }));
  //   return (
  //     <Checkbox.Group
  //       options={ratingCheckbox}
  //       onChange={(value) => handleFilterRating(value)}
  //       value={ratingSelected}
  //     />
  //   );
  // }
  return (
    <Style.Filter>
      <h3>
        <Icons.FilterOutlined /> Lọc theo
      </h3>
      <TagList
        typeList={typeList}
        categoryList={categoryList}
        departmentList={departmentList}
        categoriesSelected={categoriesSelected}
        typesSelected={typesSelected}
        departmentsSelected={departmentsSelected}
        priceRange={priceRange}
        searchKey={searchKey}
        setTypesSelect={setTypesSelect}
        setCategoriesSelect={setCategoriesSelect}
        setDepartmentsSelect={setDepartmentsSelect}
        setSearchKey={setSearchKey}
        setPriceRange={setPriceRange}
        colorSelected={colorSelected}
        setColorSelect={setColorSelect}
        setSizeSelect={setSizeSelect}
      />
      <Collapse ghost expandIconPosition="right">
        <Panel
          header={
            <>
              <div class="title-collapse">
                <span>Loại sản phẩm</span>
              </div>
            </>
          }
          key="1"
        >
          <div>{renderCategoryRadio()}</div>
        </Panel>
        <Panel
          header={
            <>
              <div class="title-collapse">
                <span>Thương hiệu</span>
              </div>
            </>
          }
          key="2"
        >
          <div>{renderTypeCheckbox()}</div>
        </Panel>
        {/* {history.location.pathname === "/product" ? (
          <Panel
            header={
              <>
                <div class="title-collapse">
                  <span>Giới tính</span>
                </div>
              </>
            }
            key="3"
          >
            <div>{renderDepartmentCheckbox()}</div>
          </Panel>
        ) : null} */}

        {/* <Panel
          header={
            <>
              <div class="title-collapse">
                <span>Size</span>
              </div>
            </>
          }
          key="4"
        >
          <div className="checkbox-normal">{renderSizeCheckbox()}</div>
        </Panel> */}
        {/* <Panel
          header={
            <>
              <div class="title-collapse">
                <span>Color</span>
              </div>
            </>
          }
          key="5"
        >
          <div className="checkbox-normal color-list">
            {renderColorCheckbox()}
          </div>
        </Panel> */}
        <Panel
          header={
            <>
              <div class="title-collapse">
                <span>Khoảng giá</span>
              </div>
            </>
          }
          key="6"
        >
          <div>
            <Slider
              marks={marks}
              min={0}
              max={15000000}
              step={100000}
              range
              tipFormatter={(value) => value.toLocaleString()}
              onChange={(value) => handleRangePrice(value)}
              value={priceRange}
            />
          </div>
        </Panel>
        {/* <Panel
          header={
            <>
              <div class="title-collapse">
                <span>Đánh giá</span>
              </div>
            </>
          }
          key="7"
        >
          <div>{renderRatingCheckbox()}</div>
        </Panel> */}
      </Collapse>
    </Style.Filter>
  );
}

export default FilterProduct;
