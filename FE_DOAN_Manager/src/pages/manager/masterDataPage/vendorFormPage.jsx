import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Switch } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiGetById } from '~/services/helperServices';
import { generateAutoCode } from '~/helper/functionHelper';

const VendorFormPage = () => {
  document.title = "Nhà cung cấp";
  const { t } = useTranslation();
  const { id } = useParams(); // get id from URL parameters
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id && id !== '0') {
        setLoading(true);
        try {
          const data = {
            modelName: 'vendors',
            id: id,
          };
          const vendor = await apiGetById(data);
          form.setFieldsValue(vendor.dataObject);
        } catch (error) {
          console.error('Failed to fetch VENDOR:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Generate auto code for new vendor
        const autoCode = generateAutoCode('NCC');
        form.setFieldsValue({ vendorCode: autoCode });
      }
    };

    fetchData();
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('vendor')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName="vendors" />
          <DeleteButton id={id} modelName="vendors" />
          <CreateButton form={form} navigate={navigate} modelName="vendors" /> */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName="vendors" />
              <UpdateButton form={form} navigate={navigate} id={id} modelName="vendors" />
            </>
          ) : (
            <>
              <CreateButton form={form} navigate={navigate} modelName="vendors" />
            </>
          )}

        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item
              label={t('vendorCode')} name="vendorCode" rules={[{ required: true, message: "Vui lòng nhập mã Nhà cung cấp" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('vendorName')} name="vendorName" rules={[{ required: true, message: "Vui lòng nhập tên nhà cung cấp" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('phoneNumber')} name="phoneNumber" rules={[{ required: true, message: "Vui lòng nhập SĐT" }]}>
              <Input />
            </Form.Item>
          </Col>

        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label={t('address')} name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Form.Item label={t('active')} name="active">
              <Switch defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default VendorFormPage;
