import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { PATH } from '~/constants/part';
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';
import { apiGetList } from '~/services/helperServices';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

const CustomerListPage = () => {
  document.title = "Khách hàng";
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'customers',
        data: {},
      };
      const response = await apiGetList(data);
      setCustomers(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const columnsConfig = [
    {
      title: t('customerName'),
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.CUSTOMERS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('phoneNumber'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('customer')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'customers'}/>
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : customers} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default CustomerListPage;
