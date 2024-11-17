import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';  // Import CSS của Ant Design
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/redux/manager/slices/authSlice';
import { fetchFunction } from '~/redux/manager/slices/functionSlice';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/part';
import { customerLogin } from '~/services/customer/UI';
import { apiGetById, apiGetList } from '~/services/helperServices';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const [errorMessage, setErrorMessage] = useState(null); // State để lưu thông báo lỗi

  useEffect(() => {
    if (state.auth?.isAuthenticated) {
      console.log("🚀 ~ LoginPage ~ state after login:", state);
    }
  }, [state.auth?.isAuthenticated]);

  const onFinish = async (values) => {
    const loginData = {
      modelName: 'customers',
      data: values
    };
    try {
      const result = await customerLogin(loginData);
      console.log("🚀 ~ onFinish ~ result:", result)
      if(result) {
        localStorage.setItem('customer', JSON.stringify(result.dataObject));

        const reqPerm = {
          modelName: 'permissions',
          id: result?.dataObject?.data?._id,
        }
        const resultPerm = await apiGetById(reqPerm);
        localStorage.setItem('permissions', JSON.stringify(resultPerm.dataObject));

        const reqCategory = {
          modelName: 'categories',
          data: {},
        };
        const resultCategory = await apiGetList(reqCategory);
        localStorage.setItem('categories', JSON.stringify(resultCategory.dataObject));
        navigate(`${PATH.CUSTOMER.HOME}`);
      }      
    } catch (error) {
      console.log('Login Failed:', error);
      setErrorMessage('Email hoặc Mật khẩu không chính xác');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formChange = async () => {
    setErrorMessage('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ maxWidth: 400, width: '100%', height: 360, padding: '2rem', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Đăng nhập</h2>
        {errorMessage && (
          <div style={{ marginBottom: '1rem', color: 'red', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={formChange}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Đăng nhập
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>Bạn chưa có tài khoản? <a href={PATH.CUSTOMER.SIGNIN}>Đăng ký</a></div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
