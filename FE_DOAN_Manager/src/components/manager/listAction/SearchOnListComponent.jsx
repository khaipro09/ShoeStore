import React, { useState } from 'react';
import { Input } from 'antd';
import { apiGetList } from '~/services/helperServices';
import { useTranslation } from 'react-i18next';

const { Search } = Input;

const SearchOnList = ({ setSearchResults, modelName }) => {
  const { t } = useTranslation();

  const onSearch = async (value) => {
    try {
      const data = {
        modelName,
        keySearch: value,
        perPage: 10,
      };
      const response = await apiGetList(data);
      setSearchResults(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  return (
    <div>
      <Search
        placeholder={t('search')}
        onSearch={onSearch}
        style={{ width: 200 }}
        enterButton
        allowClear
        className="custom-search"
      />
      <style>
        {`
          .custom-search .ant-input-search-button {
            width: 32px; /* Tùy chỉnh chiều rộng của phần icon */
            padding: 0;
          }
        `}
      </style>
    </div>
  );
};

export default SearchOnList;
