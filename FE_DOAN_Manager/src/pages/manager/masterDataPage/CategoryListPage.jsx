import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { apiGetList } from '~/services/helperServices'; // Đảm bảo đường dẫn chính xác
import { PATH } from '~/constants/part';
import _ from 'lodash';
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

// Helper function to get unique values and sort them
const getUniqueValues = (categories, key) => {
  const values = categories.map(category => category[key]).filter(Boolean);
  return _.uniq(values).sort((a, b) => a.localeCompare(b));
};

const CategoryListPage = () => {
  document.title = "Danh mục";
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'categories',
        data: {},
      };
      const response = await apiGetList(data);
      setCategories(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Category:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const columnsConfig = [
    {
      title: t('categoryCode'),
      dataIndex: 'categoryCode',
      key: 'categoryCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.CATEGORIES}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('categoryName'),
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: t('parentCategoryId'),
      dataIndex: 'parentCategoryName',
      key: 'parentCategoryId',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('category')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'categories'}/>
          <AddButton to={`${PATH.MANAGER.CATEGORIES}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : categories} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default CategoryListPage;
