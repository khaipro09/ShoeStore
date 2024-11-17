import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, message, Button, Avatar, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiCreate, apiGetById, apiGetList, apiUpload } from '~/services/helperServices';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '~/components/manager/listAction/BackButton';
import CreateButton from '~/components/manager/listAction/CreateButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import ImageUpload from '~/components/uploadComponent';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const CustomerFormPage = () => {
  document.title = "Khách hàng";
  const { t } = useTranslation();
  const [customer, setCustomer] = useState({});
  console.log("🚀 ~ CustomerFormPage ~ customer:", customer)
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const UpdateEmployeeButton = ({ modelName, form, navigate, id, ...props }) => {
    const { t } = useTranslation();

    const UpdateEmployeeButton = async () => {
      try {
        const formData = await form.getFieldValue();
        console.log("🚀 ~ UpdateEmployeeButton ~ formData:", formData)
        const { password, rePassword, avatar } = formData;

        if ((password && password !== rePassword) || (password && !rePassword)) {
          console.log("🚀 ~ handleUpdateEmployee ~ password mismatch:", password);
          message.success(t('messages.createSuccess'));
          return;
        } else {
          if (avatar[0]?.uid) {
            console.log("có")
            const uploadedImage = await apiUpload(formData.avatar)
            if (uploadedImage && uploadedImage?.length > 0) {
              delete formData.avatar;
              delete formData.rePassword;
              const data = {
                modelName: modelName,
                id,
                data: {
                  ...formData,
                  avatar: uploadedImage,
                },
              };
              await axios.put(`http://localhost:3001/v1/employees/updateEmployee/${id}`, data);
              message.success(t('messages.updateSuccess'));
              navigate('/manager/employees');
            }
          } else {
            console.log("ko")

            delete formData.avatar;
            delete formData.rePassword;
            const data = {
              modelName: modelName,
              id,
              data: {
                ...formData,
              },
            };
            await axios.put(`http://localhost:3001/v1/employees/updateEmployee/${id}`, data);
            message.success(t('messages.updateSuccess'));
            navigate('/manager/employees');
          }

        }
      } catch (error) {
        console.error('Failed to create item:', error);
        message.error(error);
      }
    };

    return (
      <Button
        type="primary"
        onClick={UpdateEmployeeButton}
        {...props}
      >
        {t('button.update')}
      </Button>
    );
  };
  // Component để cập nhật khách hàng
  const UpdateCustomerButton = ({ modelName, form, navigate, id, ...props }) => {
    const { t } = useTranslation();

    const handleUpdate = async () => {
      try {
        const formData = await form.getFieldValue();
        console.log("🚀 ~ UpdateEmployeeButton ~ formData:", formData)
        const { password, rePassword } = formData;

        if ((password && password !== rePassword) || (password && !rePassword)) {
          console.log("🚀 ~ handleUpdateEmployee ~ password mismatch:", password);
          message.success(t('messages.createSuccess'));
          return;
        }
        // Nếu có thay đổi avatar mới, xử lý upload

        delete formData.rePassword;
        delete formData.avatar;
        const data = {
          modelName: modelName,
          id,
          data: formData,
        };

        await axios.put(`http://localhost:3001/v1/customers/updateCustomer/${id}`, data);
        message.success(t('messages.updateSuccess'));
        navigate('/manager/customers');
      } catch (error) {
        console.error('Failed to update customer:', error);
        message.error(error?.response?.data?.message || t('messages.updateFailed'));
      }
    };

    return (
      <Button
        type="primary"
        onClick={handleUpdate}
        {...props}
      >
        {t('button.update')}
      </Button>
    );
  };

  // Xử lý thay đổi form (nếu cần)
  const formChange = (changedValues, allValues) => {
    // Bạn có thể thêm logic xử lý thay đổi form tại đây nếu cần
    // Ví dụ: console.log("Form changed:", allValues);
  };

  // Lấy dữ liệu khách hàng theo ID (nếu có)
  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const customerData = await apiGetById({ modelName: 'customers', id });
        const { password, ...filteredEmployeeData } = customerData.dataObject;

        const customerDetails = customerData.dataObject;
        setCustomer({
          ...filteredEmployeeData,
          avatar: Array.isArray(customerDetails.avatar) ? customerDetails.avatar : [],
        });
        form.setFieldsValue({
          ...filteredEmployeeData,
          avatar: Array.isArray(customerDetails.avatar) ? customerDetails.avatar : [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
      message.error(t('messages.fetchFailed'));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('customer')}</div>
        <div className="button-list">
          <BackButton />
          {id && id !== '0' ? (
            <>
              <UpdateCustomerButton form={form} navigate={navigate} id={id} modelName="customers" />
              <DeleteButton id={id} modelName="customers" />
            </>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Row>
          <Col span={12}>
            <Form.Item label={t('avatar')} name="avatar">
              {/* <ImageUpload fileList={customer.avatar} limit={1} /> */}
              {(customer?.avatar && customer?.avatar?.length) ? (
                <ImageUpload fileList={customer?.avatar[0].absoluteUrl} limit={1} />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} preview={true}/>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('customerName')} name="customerName" rules={[{ required: true, message: t('customerNameRequired') }]}>
              <Input readOnly/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('email')} name="email" rules={[
              { type: 'email', message: t('mustBeAValidEmail') },
            ]}>
              <Input readOnly/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('phoneNumber')} name="phoneNumber" rules={[
              { required: true, message: t('phoneNumberRequired') },
              { pattern: /^[0-9]+$/, message: t('phoneNumberInvalid') }
            ]}>
              <Input readOnly/>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('active')} name="active" valuePropName="checked">
              <Switch defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={12}>
            <Form.Item label={t('address')} name="address" rules={[{ required: true, message: t('addressRequired') }]}>
              <TextArea rows={4} readOnly/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item
              name="password"
              style={{ marginBottom: '30px' }}
              label={t('password')}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="rePassword"
              style={{ marginBottom: '30px' }}
              label={t('rePassword')}
              dependencies={['password']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('passwordMismatch')));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CustomerFormPage;
