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
import moment from 'moment';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

// Helper function to get unique values and sort them
const getUniqueValues = (categories, key) => {
  const values = categories.map(category => category[key]).filter(Boolean);
  return _.uniq(values).sort((a, b) => a.localeCompare(b));
};

const StockExportListPage = () => {
  document.title = "Xuất kho";
  const { t } = useTranslation();
  const [stockExports, setStockExports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const fetchStockExports = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'stockExports',
        data: {},
      };
      const response = await apiGetList(data);
      setStockExports(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Functions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockExports();
  }, []);

  const columnsConfig = [
    {
      title: t('stockExportCode'),
      dataIndex: 'stockExportCode',
      key: 'stockExportCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.STOCKEXPORTS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('stockExportStatus'),
      dataIndex: 'stockExportStatus',
      key: 'stockExportStatus',
    },
    {
      title: t('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => moment(text).format('DD-MM-YYYY HH:mm'),
    },
    {
      title: t('product'),
      key: 'productName',
      render: (text, record) => record?.product?.productName,
    },
    {
      title: t('qty'),
      dataIndex: 'qty',
      key: 'qty',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('stockExport')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'stockExports'}/>
          <AddButton to={`${PATH.MANAGER.STOCKEXPORTS}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : stockExports} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default StockExportListPage;
