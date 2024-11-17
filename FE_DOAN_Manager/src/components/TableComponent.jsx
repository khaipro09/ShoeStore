import React, { useState } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import { t } from 'i18next';

// Helper function to get unique values and sort them
const getUniqueValues = (data, key) => {
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
      // Ensure the width property is applied if it's provided in the columnsConfig
      width: col.width || 'auto',
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

export default TableComponent;
