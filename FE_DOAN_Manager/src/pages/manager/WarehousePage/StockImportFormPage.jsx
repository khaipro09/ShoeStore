import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select, InputNumber, message, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiCreate, apiGetById, apiGetList } from '~/services/helperServices';
import { generateAutoCode } from '~/helper/functionHelper';
import ProductSearch from '~/components/ProductFieldComponent';
import { COLOR_MENU } from '~/constants/colorConstants';
import axios from 'axios';
import { Option } from 'antd/es/mentions';

const StockImportFormPage = () => {
  document.title = "Nhập kho";
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [productData, setProductData] = useState([]); // State to store product data
  const [state, setState] = useState('');
  console.log("🚀 ~1 StockImportFormPage ~ productData:", productData)

  const CreateStockImportButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();

    const handleCreate = async () => {
      try {
        const formData = await form.getFieldValue();
        const data = {
          modelName: modelName,
          data: {
            ...formData,
          },
        };

        await axios.post(`http://localhost:3001/v1/stockImports/createStockImports`, data);
        message.success(t('messages.createSuccess'));
        navigate(-1);
      } catch (error) {
        message.error(t('messages.createFail'));
      }
    };

    return (
      <Button type="primary" onClick={handleCreate} {...props}>
        {t('button.create')}
      </Button>
    );
  };

  const ImportButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();

    const importStock = async () => {
      try {
        const formData = await form.getFieldValue();
        const data = {
          modelName: modelName,
          data: {
            ...formData,
          },
        };

        await axios.post(`http://localhost:3001/v1/stockImports/import/${id}`, data);
        message.success(t('messages.importStockSuccess'));
        navigate(-1);
      } catch (error) {
        message.error(t('messages.importStockFail'));
      }
    };

    return (
      <Button type="primary" onClick={importStock} {...props}>
        {t('stockImport')}
      </Button>
    );
  };

  const fetchVendor = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'vendors',
        data: {},
      };
      const response = await apiGetList(data);
      setVendors(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id && id !== '0') {
          const stockImportData = await apiGetById({ modelName: 'stockImports', id });
          console.log("🚀 ~ fetchData ~ stockImportData:", stockImportData);

          form.setFieldsValue({
            ...stockImportData.dataObject,
            product: stockImportData.dataObject.product._id,
            vendor: stockImportData.dataObject.vendor._id,
            employee: stockImportData.dataObject.employee._id,
          });
          setState(stockImportData?.dataObject?.stockImportStatus)
          setEmployeeName(stockImportData.dataObject.employee.employeeName);

          // Set product data to display the product in Select
          setProductData([stockImportData.dataObject.product]);
        } else {
          const autoCode = generateAutoCode('NK');
          form.setFieldsValue({ stockImportCode: autoCode });

          const user = JSON.parse(localStorage.getItem('user'));
          setEmployeeName(user ? user.employeeName : '');
          form.setFieldsValue({
            employee: user ? user._id : ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
    fetchData();
  }, [id, form]);

  const formChange = async (changedValues, allValues) => {
    console.log("🚀 ~ form.getFieldsValue():", form.getFieldsValue());
  };

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('stockImport')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName="stockImports" /> */}
          {/* <DeleteButton id={id} modelName="stockImports" /> */}
          {/* <ImportButton form={form} navigate={navigate} modelName="stockImports" /> */}
          {/* <CreateStockImportButton form={form} navigate={navigate} modelName="stockImports" /> */}

          {(id && id !== '0') && (state && state !== 'Đã nhập kho') ? (
            <UpdateButton form={form} navigate={navigate} id={id} modelName="stockImports" />
          ) : (
            <></>
          )}

          {id && id !== '0' ? (
            <DeleteButton id={id} modelName="stockImports" />
          ) : (
            <></>
          )}

          {!id || id == '0' ? (
            <CreateStockImportButton form={form} navigate={navigate} modelName="stockImports" />
          ) : (
            <></>
          )}

          {state && state == 'Chờ nhập kho' ? (
            <ImportButton form={form} navigate={navigate} modelName="stockImports" />
          ) : (
            <></>
          )}

        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form} onValuesChange={formChange}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('stockImportCode')} name="stockImportCode" rules={[{ required: true, message: "Vui lòng nhập mã phiếu nhập kho" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('stockImportStatus')} name="stockImportStatus">
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('vendor')} name="vendor">
              <Select>
                {vendors.map(vendor => (
                  <Option key={vendor._id} value={vendor._id}>
                    {vendor.vendorName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('employeeName')}>
              <Input value={employeeName} readOnly />
            </Form.Item>
            <Form.Item name="employee" hidden>
              <Input />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('product')} name="product">
              <ProductSearch form={form} name="product" initProducts={productData} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('color')} name="color">
              <Select>
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
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={`${t('cost')} (VNĐ)`} name="cost" rules={[{ required: true, message: "Bạn chưa nhập đơn giá" }]}>
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/(,*)/g, '')}
              />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default StockImportFormPage;
