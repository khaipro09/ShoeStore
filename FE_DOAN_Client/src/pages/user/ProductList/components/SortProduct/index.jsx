import React from "react";

import { Input, Select } from "antd";
import * as Icons from "@ant-design/icons";

import * as Style from "./style";

function SortProduct({
  handleSearchProduct,
  handleChangeSelect,
  sortValue,
  searchKey,
}) {
  return (
    <Style.SortSearchProduct>
      <Input
        placeholder="Search..."
        onChange={(e) => handleSearchProduct(e.target.value)}
        value={searchKey}
        suffix={<Icons.SearchOutlined />}
      />
      <div className="select-sort">
        <Select
          style={{ width: "100%" }}
          value={sortValue}
          onChange={handleChangeSelect}
          placeholder="Sắp xếp theo..."
        >
          <Select.Option value="" disabled>
            Sắp xếp theo...
          </Select.Option>
          <Select.Option value="price-desc">Giá cao đến thấp</Select.Option>
          <Select.Option value="price-asc">Giá thấp đến cao</Select.Option>
          <Select.Option value="id-desc">Mới nhất</Select.Option>
          <Select.Option value="id-asc">Cũ nhất</Select.Option>
        </Select>
      </div>
    </Style.SortSearchProduct>
  );
}

export default SortProduct;
