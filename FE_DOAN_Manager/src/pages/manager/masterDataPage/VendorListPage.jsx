import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { apiGetList } from '~/services/helperServices'; // Đảm bảo đường dẫn chính xác
import { PATH } from '~/constants/part';
import { useTranslation } from 'react-i18next';
import TableComponent from '~/components/TableComponent';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

const VendorListPage = () => {
  document.title = "Nhà cung cấp";
  const { t } = useTranslation();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const data = {
          modelName: 'vendors',
          data: {},
        };
        const response = await apiGetList(data);
        console.log("🚀 ~ fetchUoms ~ response:", response);
        setVendors(response.dataObject);
      } catch (error) {
        console.error('Failed to fetch VENDORS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const columnsConfig = [
    {
      title: t('vendorCode'),
      dataIndex: 'vendorCode',
      key: 'vendorCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.VENDORS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('vendorName'),
      dataIndex: 'vendorName',
      key: 'vendorName',
    },
    {
      title: t('phoneNumber'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('vendor')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'vendors'}/>
          <AddButton to={`${PATH.MANAGER.VENDORS}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : vendors} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default VendorListPage;
