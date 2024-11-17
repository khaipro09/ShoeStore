import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Table, Tabs, InputNumber, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiGetById } from '~/services/helperServices';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import _ from 'lodash';
import TabPane from 'antd/es/tabs/TabPane';
import moment from 'moment';
import axios from 'axios';
import generatePDF from '~/functions/manager/orderFunction';
import { htmlContent } from './htmlContentPrint';

const { TextArea } = Input;

const OrderFormPage = () => {
  document.title = "Đặt hàng";
  const { t } = useTranslation();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(30);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderState, setOrderState] = useState('');

  const formChange = async (changedValues, allValues) => {
  };


  console.log(form.getFieldValue())
  const PrintButton = ({ orderDetail, ...props }) => {
    const { t } = useTranslation();

    const handlePrint = async () => {
      const updatedHtmlContent = htmlContent(order);
      await generatePDF(updatedHtmlContent);
    };

    return (
      <Button type="primary" onClick={handlePrint} {...props}>
        {t('button.print')}
      </Button>
    );
  };

  const AcceptButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();

    const accept = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
          modelName: modelName,
          data: {
            orderState: "Chờ giao hàng",
            employee: user ? user._id : '',
          },
        };

        await axios.put(`http://localhost:3001/v1/orders/${id}`, data);

        const { productList } = order;
        const updateProductPromises = productList.map(async (productItem) => {
          const { count, productId } = productItem;

          const { dataObject } = await apiGetById({ modelName: 'products', id: productId });
          dataObject.qty -= count;
          dataObject.sold += count;

          const dataProduct = {
            modelName: "products",
            data: {
              ...dataObject
            },
          };

          return axios.put(`http://localhost:3001/v1/products/${productId}`, dataProduct);
        });

        await Promise.all(updateProductPromises);

        // Sau khi tất cả các lệnh gọi API hoàn thành, điều hướng trở lại trang trước
        navigate(-1);
      } catch (error) {
        message.error(t('messages.actionFail'));
      }
    };


    return (
      <Button type="primary" onClick={accept} {...props}>
        {t('button.accept')}
      </Button>
    );
  };

  const RejectButton = ({ form, navigate, id, modelName, ...props }) => {
    const { t } = useTranslation();

    const reject = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
          modelName: modelName,
          data: {
            orderState: "Đã từ chối",
            employee: user ? user._id : '',
          },
        };

        await axios.put(`http://localhost:3001/v1/orders/${id}`, data);
        navigate(-1);
      } catch (error) {
        message.error(t('messages.actionFail'));
      }
    };

    return (
      <Button type="primary" onClick={reject} {...props}>
        {t('button.reject')}
      </Button>
    );
  };

  const ShipedButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();

    const accept = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
          modelName: modelName,
          data: {
            orderState: "Đã giao",
            employee: user ? user._id : '',
          },
        };

        await axios.put(`http://localhost:3001/v1/orders/${id}`, data);
        navigate(-1);
      } catch (error) {
        message.error(t('messages.actionFail'));
      }
    };

    return (
      <Button type="primary" onClick={accept} {...props}>
        {t('button.shiped')}
      </Button>
    );
  };

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

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    console.log(`Page size changed to ${size}`);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const orderData = await apiGetById({ modelName: 'orders', id });
        const orderDate = orderData?.dataObject?.orderDate
          ? moment(orderData?.dataObject?.orderDate).format('DD-MM-YYYY HH:mm')
          : null;
        orderData.dataObject.orderDate = orderDate;
        setOrder(orderData?.dataObject);
        setOrderDetail(orderData?.dataObject?.productList);
        setOrderState(orderData?.dataObject?.orderState)
        form.setFieldsValue({
          customerName: orderData?.dataObject?.customer?.customerName,
          phoneNumber: orderData?.dataObject?.customer?.phoneNumber,
          orderDate: orderData?.dataObject?.customer?.phoneNumber,
          employeeName: orderData?.dataObject?.employee?.employeeName,
          // paided: orderData?.dataObject?.customer?.phoneNumber,
          ...orderData?.dataObject,
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const columnsConfig = [
    {
      title: t('productName'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('saleQty'),
      dataIndex: 'count',
      width: 170,
      key: 'count',
    },
    {
      title: `${t('price')} (VNĐ)`,
      dataIndex: 'price',
      width: 170,
      key: 'price',
      render: (text) => `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: `${t('warranty')} (${t('month')})`,
      dataIndex: 'warranty',
      width: 180,
      key: 'warranty',
    },
  ];

  const columns = [
    {
      title: t('index'),
      dataIndex: 'index',
      key: 'index',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    ...columnsConfig.map(col => ({
      ...col,
      filters: getUniqueValues(orderDetail, col.key).map(value => ({ text: value, value })),
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

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('order')}</div>
        <div className="button-list">
          <BackButton />
          <PrintButton orderDetail={orderDetail} />

          {orderState && orderState == 'Chờ phê duyệt' ? (
            <AcceptButton form={form} navigate={navigate} id={id} modelName="orders" />
          ) : (
            <></>
          )}

          {orderState && orderState == 'Chờ giao hàng' ? (
            <ShipedButton form={form} navigate={navigate} id={id} modelName="orders" />
          ) : (
            <></>
          )}

          {orderState && orderState !== 'Đã giao' && orderState !== 'Đã từ chối' ? (
            <RejectButton form={form} navigate={navigate} id={id} modelName="orders" />
          ) : (
            <></>
          )}

          {/* <DeleteButton id={id} modelName="orders" /> */}
        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Tabs>
          <TabPane tab={t('orderInfor')} key="1">
            <Row gutter={[12]}>
              <Col span={6}>
                <Form.Item label={t('orderNumber')} name="orderNumber">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('orderState')} name="orderState" >
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('employeeName')} name="employeeName">
                  <Input readOnly />
                </Form.Item>
                <Form.Item name="employee" hidden>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('orderDate')} name="orderDate">
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12]}>
              <Col span={6}>
                <Form.Item label={t('customer')} name="customerName">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('phoneNumber')} name="phoneNumber">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('shipTo')} name="shipTo">
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12]}>
              <Col span={6}>
                <Form.Item label={t('paymentMethod')} name="paymentMethod">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={`${t('totalAmount')} (VNĐ)`} name="totalAmount">
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/(,*)/g, '')}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={`${t('paided')} (VNĐ)`} name="paided">
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/(,*)/g, '')}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <Tabs defaultActiveKey="1">
          <TabPane tab={t('orderDetail')} key="1">
            <Table
              columns={columns}
              dataSource={orderDetail}
              loading={loading}
              rowKey="_id"
              pagination={{
                pageSize: pageSize,
                showSizeChanger: true,
                pageSizeOptions: ['30', '50', '100', '200'],
                onShowSizeChange: handlePageSizeChange,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
              }}
              scroll={{ y: 430 }}
              size="small"
            />
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
};

export default OrderFormPage;
