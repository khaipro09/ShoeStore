import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, Row, Col, Form, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useTranslation } from 'react-i18next';
import ExportButton from '~/components/manager/listAction/ExportButton';
import BackButton from '~/components/manager/listAction/BackButton';
import axios from 'axios';
import dayjs from 'dayjs'; // Import dayjs for date handling
import { TabPane } from 'react-bootstrap';

const { RangePicker } = DatePicker;

const ReportSale = () => {
  document.title = "Báo cáo thống kê";
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'day'), dayjs()]); // Default to last 7 days
  const [dataReportByProduct, setDataReportByProduct] = useState([]);
  const [dataReportByDate, setDataReportByDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchReportData(); // Fetch report data on component mount
  }, [dateRange]);

  const formChange = (changedValues, allValues) => {
    console.log("🚀 ~ form.getFieldsValue():", form.getFieldsValue());
  };

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const fromDate = dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '';
      const toDate = dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '';
      const data = {
        modelName: 'sales',
        data: {
          fromDate,
          toDate
        },
      };

      const queryString = Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key])}`)
        .join('&');

      const response = await axios.get(`http://localhost:3001/v1/sales/salesAggregate/?${queryString}`);
      const { reportByDate, reportByProduct } = response.data;
      setDataReportByDate(reportByDate || []);
      setDataReportByProduct(reportByProduct || []);
    } catch (error) {
      console.error('Failed to fetch report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: t('productName'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('sold'),
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: t('total'),
      dataIndex: 'totalSales',
      key: 'totalSales',
      render: (text) => `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('saleReport')}</div>
        <div className="button-list">
          <BackButton />
          {/* <ExportButton /> */}
        </div>
      </div>
      <div>
        <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
          <Row gutter={[12]}>
            <Col span={6}>
              <RangePicker
                style={{ width: '100%' }}
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
                format="YYYY-MM-DD"
              />
            </Col>
            <Col span={6}>
              <Button type="primary" onClick={fetchReportData}>{t('viewReport')}</Button>
              <span style={{ color: 'red', marginLeft: 10 }}>{ }</span>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('reportByPrices')} key="1">
              <Row gutter={[24]}>
                <Col span={24}>
                  {dataReportByDate.length > 0 ? (
                    <LineChart width={1000} height={400} data={dataReportByDate} margin={{ top: 5, right: 20, bottom: 5, left: 60 }}>
                      <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                      <XAxis dataKey="_id" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                      <YAxis tickFormatter={(value) => value.toLocaleString()} /> {/* Định dạng giá trị trục tung */}
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ paddingLeft: 30 }}
                        formatter={(value) => {
                          return value === 'totalSales' ? 'Doanh thu' : value;
                        }}
                      />
                      <Tooltip
                        formatter={(value, name) => {
                          // Thay đổi cách hiển thị giá trị tooltip
                          const formattedValue = value.toLocaleString();
                          return name === 'totalSales' ? ['Doanh thu', formattedValue] : [name, formattedValue];
                        }}
                      />
                    </LineChart>

                  ) : <p>{t('noDataAvailable')}</p>}
                </Col>
              </Row>
            </TabPane>
          </Tabs>

          <Tabs defaultActiveKey="1">
            <TabPane tab={t('reportByProducts')} key="1">
              <Row gutter={[24]}>
                <Col span={24}>
                  {dataReportByProduct.length > 0 ? (
                    <BarChart width={1000} height={400} data={dataReportByProduct} margin={{ top: 5, right: 20, bottom: 5, left: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="productName" />
                      <YAxis tickFormatter={(value) => value.toLocaleString()} /> {/* Định dạng giá trị trục tung */}
                      <Tooltip
                        formatter={(value, name) => {
                          // Thay đổi cách hiển thị giá trị tooltip
                          const formattedValue = value.toLocaleString();
                          return name === 'totalQuantity' ? ['Số lượng bán', formattedValue] : [name, formattedValue];
                        }}
                      />
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ paddingLeft: 30 }}
                        formatter={(value) => {
                          return value === 'totalQuantity' ? 'Số lượng bán' : value;
                        }}
                      />
                      <Bar dataKey="totalQuantity" fill="#82ca9d" />
                    </BarChart>
                  ) : <p>{t('noDataAvailable')}</p>}
                </Col>
              </Row>
            </TabPane>
          </Tabs>

          <Tabs defaultActiveKey="1">
            <TabPane tab={t('detail')} key="1">
              <Table
                columns={columns}
                dataSource={dataReportByProduct}
                loading={loading}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>
          </Tabs>
        </Form>
      </div>
    </div >
  );
};

export default ReportSale;
