import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { apiGetList } from '~/services/helperServices'; // Đảm bảo đường dẫn chính xác
import { PATH } from '~/constants/part';
import { useTranslation } from 'react-i18next';
import TableComponent from '~/components/TableComponent';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

const UomListPage = () => {
  document.title = "Đơn vị tính";
  const { t } = useTranslation();
  const [uoms, setUoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUoms = async () => {
      setLoading(true);
      try {
        const data = {
          modelName: 'uoms',
          data: {},
        };
        const response = await apiGetList(data);
        console.log("🚀 ~ fetchUoms ~ response:", response);
        setUoms(response.dataObject);
      } catch (error) {
        console.error('Failed to fetch UOMs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUoms();
  }, []);

  const columnsConfig = [
    {
      title: t('uomCode'),
      dataIndex: 'uomCode',
      key: 'uomCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.UOMS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('uomName'),
      dataIndex: 'uomName',
      key: 'uomName',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('uom')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'uoms'}/>
          <AddButton to={`${PATH.MANAGER.UOMS}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : uoms} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default UomListPage;
