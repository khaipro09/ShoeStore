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


const RoleListPage = () => {
  document.title = "Thẩm quyền";
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const data = {
          modelName: 'roles',
          data: {},
        };
        const response = await apiGetList(data);
        setRoles(response.dataObject);
      } catch (error) {
        console.error('Failed to fetch ROLES:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const columnsConfig = [
    {
      title: t('roleCode'),
      dataIndex: 'roleCode',
      key: 'roleCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.ROLES}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('roleName'),
      dataIndex: 'roleName',
      key: 'roleName',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('category')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'roles'}/>
          <AddButton to={`${PATH.MANAGER.ROLES}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : roles} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default RoleListPage;
