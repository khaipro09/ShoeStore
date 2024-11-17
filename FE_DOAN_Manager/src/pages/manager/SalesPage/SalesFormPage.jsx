import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, Tabs, InputNumber, Button, Table, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCreate, apiGetById, apiGetList, apiUpdate } from '~/services/helperServices';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import ProductSearch from '~/components/ProductFieldComponent';
import { COLOR_MENU } from '~/constants/colorConstants';
import { generateAutoCode } from '~/helper/functionHelper';
import { CloseOutlined } from '@ant-design/icons';
import _ from 'lodash';

const { TabPane } = Tabs;
const { Option } = Select;

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

const SalesFormPage = () => {
  document.title = "Bán hàng";
  const { t } = useTranslation();
  const [sale, setSale] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState('');
  const [productData, setProductData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [salesDetail, setSalesDetail] = useState([]);
  const [pageSize, setPageSize] = useState(30);
  const [errorAddLineMessage, setErrorAddLineMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const formChange = async (changedValues, allValues) => {
  };

  const CreateSaletButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();

    const handleCreate = async () => {
      try {
        if (!salesDetail.length) {
          return;
        };

        for (const item of salesDetail) {
          if (item.qty <= 0) {
            message.error(t(`Sản phẩm "${item.productName}" đã hết hàng`));
            return;
          }

          if (item.qty < item.saleQty) {
            message.error(t(`Sản phẩm "${item.productName}" không đủ số lượng`));
            return;
          }
        }

        const { saleNumber, customer, employee, phoneNumber } = await form.getFieldValue();
        const data = {
          modelName: 'sales',
          data: {
            productList: salesDetail,
            saleNumber, customer, employee, phoneNumber, totalAmount
          },
        };
        await apiCreate(data);

        for (const item of salesDetail) {
          const updateProduct = await apiGetById({
            modelName: 'products',
            id: item.product,
          })

          if (updateProduct) {
            const { dataObject } = updateProduct;
            dataObject.sold += item.saleQty;
            dataObject.qty -= item.saleQty;

            await apiUpdate({
              modelName: 'products',
              id: item.product,
              data: dataObject
            });
          }
        }

        message.success(t('messages.createSuccess'));
        navigate(-1);

      } catch (error) {
        message.error(t('messages.createFail'));
      }
    };

    return (
      <Button
        type="primary"
        onClick={handleCreate}
        {...props}
      >
        {t('button.create')}
      </Button>
    );
  };

  const onColorChange = async (value) => {
    const { product } = form.getFieldsValue();
    const filteredProducts = productsData.filter(item => item._id === product && item.color === value);

    if (filteredProducts && filteredProducts.length) {
      form.setFieldsValue({
        qty: filteredProducts[0].qty,
      });
    } else {
      form.setFieldsValue({
        qty: 0,
      });
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'products',
        data: {},
      };
      const response = await apiGetList(data);
      setProductsData(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const saleData = await apiGetById({ modelName: 'sales', id });
        setSale(saleData.dataObject);
        form.setFieldsValue(saleData.dataObject);
        setSalesDetail(saleData?.dataObject?.productList);
        setEmployeeName(saleData ? saleData?.dataObject?.employee?.employeeName : '');
        setTotalAmount(saleData ? saleData?.dataObject?.totalAmount : 0);
      } else {
        const autoCode = generateAutoCode('BH');

        const user = JSON.parse(localStorage.getItem('user'));
        setEmployeeName(user ? user.employeeName : '');
        form.setFieldsValue({
          employee: user ? user._id : '',
          saleNumber: autoCode,
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchData();
  }, [id, form]);

  const calculateTotalAmount = (details) => {
    const total = details.reduce((sum, detail) => sum + (detail.price * detail.saleQty), 0);
    setTotalAmount(total);
  };

  const addSaleLine = () => {
    const product = form.getFieldValue('product');
    const color = form.getFieldValue('color');
    const qty = form.getFieldValue('qty');
    const saleQty = form.getFieldValue('saleQty');
    const productDetails = productsData.find(item => item._id === product);

    if (qty <= 0) {
      setErrorAddLineMessage("Sản phẩm không đủ tồn kho");
      return;
    }

    if (saleQty <= 0) {
      setErrorAddLineMessage("Số lượng mua phải lớn hơn 0");
      return;
    }

    if (product && color && saleQty) {
      const newSaleDetail = {
        productName: productDetails.productName,
        saleQty: saleQty,
        price: productDetails.price,
        warranty: productDetails.warranty,
        product,
        color,
        qty,
      };

      setSalesDetail(prevDetails => {
        const newDetails = [...prevDetails, newSaleDetail];
        calculateTotalAmount(newDetails);
        return newDetails;
      });


      // Reset form fields in the salesProduct tab
      form.resetFields(['product', 'color', 'qty', 'saleQty']);
      setErrorAddLineMessage(''); // Clear error message after adding successfully
    }
  };

  const removeSaleLine = (index) => {
    setSalesDetail(prevDetails => {
      const newDetails = prevDetails.filter((_, i) => i !== index);
      calculateTotalAmount(newDetails);
      return newDetails;
    });
  };

  const columnsConfig = [
    {
      title: t('productName'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('saleQty'),
      dataIndex: 'saleQty',
      width: 170,
      key: 'saleQty',
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
    {
      title: '',
      key: 'action',
      width: 70, // Adjust the width of the "X" column here
      render: (text, record, index) => (
        <Button type="link" icon={<CloseOutlined />} onClick={() => removeSaleLine(index)}>

        </Button>
      ),
    },
  ];

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

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
      filters: getUniqueValues(salesDetail, col.key).map(value => ({ text: value, value })),
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
        <div className="title">{t('sale')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName="sales" />
          <CreateSaletButton form={form} navigate={navigate} modelName="sales" /> */}
          {/* <DeleteButton id={id} modelName="sales" /> */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName="sales" />
              <UpdateButton form={form} navigate={navigate} id={id} modelName="sales" />
            </>
          ) : (
            <>
              <CreateSaletButton form={form} navigate={navigate} modelName="sales" />
            </>
          )}


        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('salesInfor')} key="1">
            <Row gutter={[12]}>
              <Col span={6}>
                <Form.Item label={t('saleNumber')} name="saleNumber" rules={[{ required: true, message: "Vui lòng nhập số đơn bán hàng" }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('employeeName')} rules={[{ required: true, message: "Vui lòng nhập số đơn bán hàng" }]}>
                  <Input value={employeeName} readOnly />
                </Form.Item>
                <Form.Item name="employee" hidden>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('customer')} name="customer" rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('phoneNumber')} name="phoneNumber" rules={[{ required: true, message: "Vui lòng nhập SĐT" }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <Tabs defaultActiveKey="1">
          <TabPane tab={t('salesProduct')} key="1">
            <Row gutter={[12]}>
              <Col span={6}>
                <Form.Item label={t('product')} name="product" rules={[{ required: true, message: "Vui lòng nhập sản phẩm" }]}>
                  <ProductSearch form={form} name="product" initProducts={productData} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('color')} name="color" rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}>
                  <Select onChange={onColorChange}>
                    {COLOR_MENU.map(color => (
                      <Option key={color.name} value={color.name}>
                        {color.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('qty')} name="qty">
                  <InputNumber style={{ width: '100%' }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('saleQty')} name="saleQty" rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}>
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Button onClick={addSaleLine}>{t('addSaleLine')}</Button>
                <span style={{ color: 'red', marginLeft: 10 }}>{errorAddLineMessage}</span>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <Tabs defaultActiveKey="1">
          <TabPane tab={t('salesDetail')} key="1">
            <Table
              columns={columns}
              dataSource={salesDetail}
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
              // style={{ minHeight: '400px' }}
              size="small"
            />
            <Row gutter={[12]}>
              <Col span={6}>
              </Col>
              <Col span={6}>
              </Col>
              <Col span={6}>
              </Col>
              <Col span={6}>
                <div>{t('totalAmount')}: {totalAmount.toLocaleString('vi-VN')}</div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
};

export default SalesFormPage;
