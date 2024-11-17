import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Switch, InputNumber } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiGetById } from '~/services/helperServices';
import { percentFormatter, percentParser, vndFormatter, vndParser } from '~/constants/helperConstants';

const TaxFormPage = () => {
  document.title = "Thuế";
  const { t } = useTranslation();
  const { id } = useParams(); // get id from URL parameters
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formChange = async (value) => {
    console.log("🚀 ~ formChange ~ value:", value)
    const formData = await form.getFieldValue();
    console.log("🚀 ~ !!!!handleCreate ~ formData:", formData)
  };

  const fetchData = async () => {
    if (id && id !== '0') {
      setLoading(true);
      try {
        const data = {
          modelName: 'taxs',
          id: id,
        };
        const tax = await apiGetById(data);
        form.setFieldsValue(tax.dataObject);
      } catch (error) {
        console.error('Failed to fetch TAX:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('tax')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName="taxs" />
          <DeleteButton id={id} modelName="taxs" />
          <CreateButton form={form} navigate={navigate} modelName="taxs" /> */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName="taxs" />
              <UpdateButton form={form} navigate={navigate} id={id} modelName="taxs" />
            </>
          ) : (
            <>
              <CreateButton form={form} navigate={navigate} modelName="taxs" />
            </>
          )}
        </div>
      </div>

      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form} onChange={formChange}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('taxCode')} name="taxCode" rules={[{ required: true, message: "Vui lòng nhập mã thuế" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('taxValue')} name="taxValue" rules={[{ required: true, message: "Vui lòng nhập giá trị thuế" }]}>
              <InputNumber style={{ width: '100%', textAlign: 'right' }} formatter={percentFormatter} parser={percentParser} />
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

export default TaxFormPage;
