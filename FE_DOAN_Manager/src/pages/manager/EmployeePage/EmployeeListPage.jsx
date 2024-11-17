import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { PATH } from '~/constants/part';
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';
import { apiGetList } from '~/services/helperServices';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

const EmployeeFormPage = () => {
  document.title = "Nhân viên";
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'employees',
        data: {},
      };
      const response = await apiGetList(data);
      setEmployees(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Functions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  const columnsConfig = [
    {
      title: t('employeeCode'),
      dataIndex: 'employeeCode',
      key: 'employeeCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.EMPLOYEES}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('employeeName'),
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: t('role'),
      key: 'roleName',
      render: (text, record) => record?.role?.roleName,
    },
    // {
    //   title: t('price'),
    //   dataIndex: 'price',
    //   key: 'price',
    // },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('employee')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'employees'}/>
          <AddButton to={`${PATH.MANAGER.EMPLOYEES}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : employees} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default EmployeeFormPage;
