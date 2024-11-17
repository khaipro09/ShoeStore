import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, InputNumber, Switch, Upload, message, Button } from 'antd';
import CreateButton from '~/components/manager/listAction/CreateButton';
import { useTranslation } from 'react-i18next';
import { apiCreate, apiGetById, apiGetList, apiUpload } from '~/services/helperServices';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import ImageUpload from '~/components/uploadComponent';
import Password from 'antd/es/input/Password';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const ProductFormPage = () => {
  document.title = "Nhân viên";
  const { t } = useTranslation();
  const [employee, setEmployee] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const CreateEmployeeButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();
    const handleCreate = async () => {
      try {
        const { password, rePassword } = form.getFieldValue();
        if (!password || password !== rePassword) {
          message.error('Mật khẩu không hợp lệ');
          return;
        }
    
        const formData = form.getFieldValue();
        const uploadedImage = await apiUpload(formData.avatar);
    
        if (uploadedImage && uploadedImage.length > 0) {
          delete formData.avatar;
          delete formData.rePassword;
          const data = {
            modelName: modelName,
            data: {
              ...formData,
              avatar: uploadedImage,
            },
          };
    
          await axios.post(`http://localhost:3001/v1/employees/createEmployee`, data);
          message.success(t('messages.createSuccess'));
          navigate('/manager/employees');
        }
      } catch (error) {
        console.error('Failed to create item:', error);
        message.error(error.message || 'Có lỗi xảy ra');
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

  const formChange = async (changedValues, allValues) => {
    console.log(form.getFieldValue());
  };

  const fetchRole = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'roles',
        data: {},
      };
      const response = await apiGetList(data);
      setRoles(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const employeeData = await apiGetById({ modelName: 'employees', id });
        const { password, ...filteredEmployeeData } = employeeData.dataObject;

        setEmployee(filteredEmployeeData);
        form.setFieldsValue({
          ...filteredEmployeeData,
          role: filteredEmployeeData.role._id
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchData();
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('employee')}</div>
        <div className="button-list">
          <BackButton />
          {/* <DeleteButton id={id} modelName="employees" />
          {id && id !== '0' ? (
            <UpdateEmployeeButton form={form} navigate={navigate} id={id} modelName="employees" />
          ) : (
            <CreateEmployeeButton form={form} navigate={navigate} modelName="employees" />
          )} */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName="employees" />
              <UpdateEmployeeButton form={form} navigate={navigate} id={id} modelName="employees" />
            </>
          ) : (
            <>
              <CreateEmployeeButton form={form} navigate={navigate} modelName="employees" />
            </>
          )}
          
        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Row>
          <Col span={12}>
            <Form.Item label={t('avatar')} name="avatar">
              <ImageUpload fileList={employee.avatar} limit={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('employeeCode')} name="employeeCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('employeeName')} name="employeeName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('role')} name="role">
              <Select>
                {roles.map(role => (
                  <Option key={role._id} value={role._id}>
                    {role.roleName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('email')}
              name="email"
              rules={[
                {
                  type: 'email',
                  message: t('mustBeAGmail'),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('phoneNumber')} name="phoneNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('identityNumber')} name="identityNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('address')} name="address">
              <Input />
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

export default ProductFormPage;
