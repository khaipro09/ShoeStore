import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { PATH } from '~/constants/part';
import { useTranslation } from 'react-i18next';
import { apiGetList } from '~/services/helperServices';
import _ from 'lodash';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

const COLOR_MENU = [
  { name: 'đen', code: '000000' },
  { name: 'trắng', code: 'ffffff' },
  { name: 'xám', code: '808080' },
  { name: 'bạc', code: 'c0c0c0' },
  { name: 'đỏ', code: 'e7352b' },
  { name: 'xanh dương', code: '1790c8' },
  { name: 'nâu', code: '825d41' },
  { name: 'vàng', code: 'fed533' },
  { name: 'hồng', code: 'ff69b4' },
  { name: 'tím', code: '800080' },
  { name: 'xanh ngọc', code: '00ced1' },
  { name: 'be', code: 'f5f5dc' },
  { name: 'xanh navy', code: '000080' },
  { name: 'nhiều màu', code: 'multiColor' },
];

const getColorName = (code) => {
  const color = COLOR_MENU.find(color => color.code === code);
  return color ? color.name : 'Unknown';
};

// Helper function to get unique values and sort them
const getUniqueValues = (data, key) => {
  document.title = "Vật tư";
  const values = data?.map(item => {
    const keys = key.split('.');
    let value = item;
    keys.forEach(k => {
      value = value ? value[k] : 'No Value';
    });
    return value;
  });

  return _.uniq(values).sort((a, b) => {
    const aValue = typeof a === 'string' ? a : '';
    const bValue = typeof b === 'string' ? b : '';
    return aValue.localeCompare(bValue);
  });
};

const MaterialStockListPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'products',
        data: {},
      };
      const response = await apiGetList(data);
      setProducts(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Functions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columnsConfig = [
    {
      title: t('productCode'),
      dataIndex: 'productCode',
      key: 'productCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.PRODUCTS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('productName'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('color'),
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: t('qty'),
      dataIndex: 'qty',
      key: 'qty',
    },
  ];

  const TableComponent = ({ data, columnsConfig, loading }) => {
    const [pageSize, setPageSize] = useState(30); // Default page size

    const columns = [
      {
        title: t('index'),
        dataIndex: 'index',
        key: 'index',
        width: 70,
        render: (text, record, index) => index + 1, // Render STT based on the index in the filtered/sorted data
      },
      ...columnsConfig.map(col => ({
        ...col,
        filters: getUniqueValues(data, col.key).map(value => ({ text: value, value })),
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
          const keys = col.key.split('.');
          let recordValue = record;
          keys.forEach(k => {
            recordValue = recordValue ? recordValue[k] : 'No Value';
          });
          return recordValue.startsWith(value);
        },
        sorter: (a, b) => {
          const keys = col.key.split('.');
          let aValue = a;
          let bValue = b;
          keys.forEach(k => {
            aValue = aValue ? aValue[k] : '';
            bValue = bValue ? bValue[k] : '';
          });
          return aValue.localeCompare(bValue);
        },
      })),
    ];

    const handlePageSizeChange = (current, size) => {
      setPageSize(size);
      console.log(`Page size changed to ${size}`);
    };

    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="_id"
          pagination={{
            pageSize: pageSize, // Current page size
            showSizeChanger: true,
            pageSizeOptions: ['30', '50', '100', '200'], // Options for page size
            onShowSizeChange: handlePageSizeChange,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`, // Show total records
          }}
          scroll={{ y: 430 }} // Fixed height for the table body with a scrollbar
          style={{ minHeight: '400px' }} // Ensure the table container has a minimum height
        />
      </div>
    );
  };

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('materialStock')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'products'}/>
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : products}  columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default MaterialStockListPage;
