import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select, Switch } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiGetById, apiGetList } from '~/services/helperServices';

const { Option } = Select;
const { TextArea } = Input;

const FunctionFormPage = () => {
  document.title = "Chức năng";
  const { t } = useTranslation();
  const { id } = useParams(); // get id from URL parameters
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [functions, setFunctions] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'functions',
        data: {},
      };
      const response = await apiGetList(data);
      setFunctions(response.dataObject);

      if (id && id !== '0') {
        const functionData = await apiGetById({ modelName: 'functions', id });
        form.setFieldsValue(functionData.dataObject); // Sử dụng form.setFieldsValue khi form đã được khởi tạo
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, form]); // Sử dụng form là dependency của useEffect

  const funcParentChange = value => {
    const selectedFunction = functions.find(finction => finction._id === value);

    form.setFieldsValue({
      parentFunc: selectedFunction._id,
      parentFuncName: selectedFunction.funcName,
    });

    const formData = form.getFieldValue();
  };

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('category')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName="functions" />
          <CreateButton form={form} navigate={navigate} modelName="functions" /> */}
          {/* <DeleteButton id={id} modelName="functions" /> */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName="functions" />
              <UpdateButton form={form} navigate={navigate} id={id} modelName="functions" />
            </>
          ) : (
            <>
              <CreateButton form={form} navigate={navigate} modelName="functions" />
            </>
          )}

        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('clientPath')} name="clientPath" rules={[{ required: true, message: "Vui lòng nhập đường dẫn" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('funcName')} name="funcName" rules={[{ required: true, message: "Vui lòng nhập tên chức năng" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('parentFunc')} name="parentFunc">
              <Select
                onChange={funcParentChange}
              >
                {functions
                  .filter(finction => finction.isParent)
                  .map(finction => (
                    <Option key={finction._id} value={finction._id}>
                      {finction.funcName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('isParent')} name="isParent">
              <Switch />
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

export default FunctionFormPage;
