import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Switch } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiGetById } from '~/services/helperServices';

const { TextArea } = Input;

const UomFormPage = () => {
  document.title = "Đơn vị tính";
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
            modelName: 'uoms',
            id: id,
          };
          const uom = await apiGetById(data);
          form.setFieldsValue(uom.dataObject);
        } catch (error) {
          console.error('Failed to fetch UOM:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('uom')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName="uoms" />
          <DeleteButton id={id} modelName="uoms" />
          <CreateButton form={form} navigate={navigate} modelName="uoms" /> */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName="uoms" />
              <UpdateButton form={form} navigate={navigate} id={id} modelName="uoms" />
            </>
          ) : (
            <>
              <CreateButton form={form} navigate={navigate} modelName="uoms" />
            </>
          )}

        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item
              label={t('uomCode')} name="uomCode" rules={[{ required: true, message: "Vui lòng nhập mã đơn vị tính" }]}>
              <Input />
            </Form.Item>

          </Col>
          <Col span={6}>
            <Form.Item label={t('uomName')} name="uomName" rules={[{ required: true, message: "Vui lòng nhập tên đơn vị tính" }]}>
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

export default UomFormPage;
