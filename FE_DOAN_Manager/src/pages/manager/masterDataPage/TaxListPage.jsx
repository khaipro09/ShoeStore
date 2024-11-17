import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { apiGetList } from '~/services/helperServices'; // Đảm bảo đường dẫn chính xác
import { PATH } from '~/constants/part';
import { useTranslation } from 'react-i18next';
import TableComponent from '~/components/TableComponent';
import { Form } from 'antd';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

const TaxListPage = () => {
  document.title = "Thuế";
  const { t } = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [taxs, setTaxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const fetchTaxs = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'taxs',
        data: {},
      };
      const response = await apiGetList(data);
      console.log("🚀 ~ fetchTaxs ~ response:", response);
      setTaxs(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch fetchTaxs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxs();
  }, [id, form]);

  const columnsConfig = [
    {
      title: t('taxCode'),
      dataIndex: 'taxCode',
      key: 'taxCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.TAXS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('taxValue'),
      dataIndex: 'taxValue',
      key: 'taxValue',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('tax')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'taxs'}/>
          <AddButton to={`${PATH.MANAGER.TAXS}/0`} />
          {/* <ExportButton /> */}
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : taxs} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default TaxListPage;
