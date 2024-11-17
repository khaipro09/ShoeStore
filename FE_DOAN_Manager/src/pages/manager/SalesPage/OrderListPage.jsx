import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { PATH } from '~/constants/part';
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';
import { apiGetList } from '~/services/helperServices';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';
import moment from 'moment';
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import { format } from "date-and-time";
import { generateAutoCode } from '~/helper/functionHelper';

const OrderListPage = () => {
  document.title = "Đặt hàng";
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const onExport = async (orders) => {
    try {
      const autoCode = generateAutoCode("");
      const resp = await fetch("/files/orderTemplate.xlsx");
      const buff = await resp.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buff);
      const sheetData = workbook.getWorksheet(1);
  
      let rowIndex = 1;
      Array.from(orders).forEach((item) => {
        rowIndex += 1;
  
        sheetData.getCell(`A${rowIndex}`).value = item.orderNumber;
        sheetData.getCell(`B${rowIndex}`).value = item.orderState;
        // Định dạng ngày giờ
        sheetData.getCell(`C${rowIndex}`).value = moment(item.orderDate).format('DD/MM/YYYY HH:mm');
        sheetData.getCell(`D${rowIndex}`).value = item.customer.customerName;
        sheetData.getCell(`E${rowIndex}`).value = item.customer.email;
        sheetData.getCell(`F${rowIndex}`).value = item.customer.phoneNumber;
        sheetData.getCell(`G${rowIndex}`).value = item.shipTo;
        // Chuyển đổi phương thức thanh toán
        sheetData.getCell(`H${rowIndex}`).value = item.paymentMethod === 'cod'
          ? 'Thanh toán khi nhận hàng'
          : item.paymentMethod === 'paypal'
          ? 'Thanh toán Paypal'
          : item.paymentMethod;
        sheetData.getCell(`I${rowIndex}`).value = item.totalAmount || 0;
        sheetData.getCell(`J${rowIndex}`).value = item.paided || 0;
      });
  
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      FileSaver.saveAs(blob, `Đặt hàng ${autoCode}.xlsx`);
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'orders',
        data: {},
      };
      const response = await apiGetList(data);
      setOrders(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columnsConfig = [
    {
      title: t('orderNumber'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.ORDERS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('orderDate'),
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text) => moment(text).format('DD-MM-YYYY HH:mm'),
    },
    {
      title: t('customer'),
      key: 'customer',
      render: (text, record) => record.customer?.customerName,
    },
    {
      title: t('totalAmount'),
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: t('paymentMethod'),
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (text) => {
        if (text === 'cod') {
          return t('Thanh toán khi nhận hàng');
        } else if (text === 'paypal') {
          return t('Thanh toán Paypal');
        } else {
          return text; // Nếu có thêm phương thức thanh toán khác, nó sẽ được hiển thị nguyên văn
        }
      }
    },
    {
      title: t('orderState'),
      dataIndex: 'orderState',
      key: 'orderState',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('order')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'orders'} />
          {/* <AddButton to={`${PATH.MANAGER.ORDERS}/0`} /> */}
          <Tooltip title={t('button.exportButton')}>
            <Button
              type="primary"
              icon={<CloudDownloadOutlined />}
              onClick={() => onExport(orders)}
            />
          </Tooltip>
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : orders} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default OrderListPage;
