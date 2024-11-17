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

const FunctionListPage = () => {
  document.title = "Chức năng";
  const { t } = useTranslation();
  const [functions, setFunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const fetchFunction = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'functions',
        data: {},
      };
      const response = await apiGetList(data);
      setFunctions(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Functions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  const columnsConfig = [
    {
      title: t('funcName'),
      dataIndex: 'funcName',
      key: 'funcName',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.FUNCTIONS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('clientPath'),
      dataIndex: 'clientPath',
      key: 'clientPath',
    },
    {
      title: t('parentFunc'),
      dataIndex: 'parentFuncName',
      key: 'parentFunc',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('category')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'functions'}/>
          <AddButton to={`${PATH.MANAGER.FUNCTIONS}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : functions} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default FunctionListPage;
