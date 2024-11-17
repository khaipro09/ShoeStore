import React from 'react';
import { Table, Button } from 'antd';
import { useTranslation } from 'react-i18next';

// Function to get unique values for filtering
const getUniqueValues = (data, key) => {
  const uniqueValues = [...new Set(data?.map(item => item[key] || 'No Value'))];
  return uniqueValues;
};

const TableInFormComponent = ({ data, columnsConfig, loading, onDelete }) => {
  console.log("🚀 ~ TableInFormComponent ~ data:", data)
  const { t } = useTranslation();

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
      filters: getUniqueValues(data, col.dataIndex).map(value => ({ text: value, value })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        const recordValue = record[col.dataIndex] || 'No Value';
        return recordValue.startsWith(value);
      },
      sorter: (a, b) => {
        const aValue = a[col.dataIndex] || '';
        const bValue = b[col.dataIndex] || '';
        return aValue.localeCompare(bValue);
      },
    })),
    {
      title: t('Action'),
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Button type="link" danger onClick={() => onDelete(record.permissionId)}>
          {t('Delete')}
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: 800, y: 400 }}
      size="small"
      rowKey="permissionId"
    />
  );
};

export default TableInFormComponent;
