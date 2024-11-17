import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Input, Avatar, Button, Upload, Spin, message, Typography } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { apiGetById, apiUpdate, apiUpload } from '~/services/helperServices';

const { Title } = Typography;

function AccountPage() {
  document.title = "Thông tin cá nhân";
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [roleName, setRoleName] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { _id } = JSON.parse(localStorage.getItem('user'));
      const employeeData = await apiGetById({ modelName: 'employees', id: _id });
      setUserData(employeeData.dataObject);
      form.setFieldsValue({
        avatar: employeeData.dataObject.avatar[0],
        employeeCode: employeeData.dataObject.employeeCode,
        employeeName: employeeData.dataObject.employeeName,
        email: employeeData.dataObject.email,
        phoneNumber: employeeData.dataObject.phoneNumber,
        identityNumber: employeeData.dataObject.identityNumber,
        address: employeeData.dataObject.address,
      });
      setRoleName(employeeData.dataObject.role.roleName);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  const handleFinish = async (values) => {
    try {
      const data = {
        modelName: 'employees',
        id: userData?._id,
        data: {
          ...values,
          avatar: userData?.avatar,
        },
      };
      console.log("🚀 ~ handleFinish ~ data:", data)
      await apiUpdate(data);
      message.success(t('messages.actionSuccess'));
    } catch (error) {
      console.error('Failed to update data:', error);
      message.error(t('messages.actionFail'));
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleAvatarChange = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setFile(file.preview);

    try {
      const uploadedImage = await apiUpload([file]);
      const updatedUserData = { ...userData, avatar: [uploadedImage[0]] };
      setUserData(updatedUserData);
    } catch (error) {
      message.error(t('Failed to upload avatar.'));
    }
  };

  const avatarSrc = file || (userData?.avatar?.length ? userData.avatar[0].absoluteUrl : null);
  // const avatarSrc = "";
  // if(userData?.avatar && userData?.avatar?.length) {
  //   userData.avatar[0].url
  // }

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={14} xl={10}>
          <Card
            bordered={false}
            style={{ textAlign: 'left', borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <Row justify="center" style={{ marginBottom: 24 }}>
              <Col style={{ textAlign: 'center' }}>
                <Avatar
                  size={100}
                  icon={!avatarSrc && <UserOutlined />}
                  src={avatarSrc}
                  style={{ border: '2px solid #e8e8e8', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
                <div style={{ marginTop: '12px' }}>
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    onChange={handleAvatarChange}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t('changeAvatar')}
                    </Button>
                  </Upload>
                </div>
              </Col>
            </Row>

            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Title level={4} style={{ textAlign: 'center' }}>{t('accountInformation')}</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="employeeCode" label={t('employeeCode')}>
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="employeeName" label={t('employeeName')}>
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="email" label={t('email')}>
                <Input />
              </Form.Item>
              <Form.Item name="phoneNumber" label={t('phoneNumber')}>
                <Input />
              </Form.Item>
              <Form.Item name="identityNumber" label={t('identityNumber')}>
                <Input />
              </Form.Item>
              <Form.Item name="address" label={t('address')}>
                <Input />
              </Form.Item>
              <Form.Item label={t('Chức vụ')}>
                <Input readOnly value={roleName} />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  {t('saveChanges')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AccountPage;
