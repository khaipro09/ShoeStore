import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectionComponent = ({ options, placeholder, onChange, onSearch, value, ...rest }) => (
  <Select
    showSearch
    placeholder={placeholder}
    onChange={onChange}
    onSearch={onSearch}
    value={value}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    {...rest}
  >
    {options.map(option => (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    ))}
  </Select>
);

export default SelectionComponent;
