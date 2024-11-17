import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';  // Import CSS của Ant Design
import { employeeLogin, getFunc } from '~/services/manager/UI';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/redux/manager/slices/authSlice';
import { fetchFunction } from '~/redux/manager/slices/functionSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/part';
import { customerSignin } from '~/services/customer/UI';

const SigninPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const state = useSelector((state) => state);
  // useEffect(() => {
  //   if (state.auth?.isAuthenticated) {
  //     console.log("🚀 ~ LoginPage ~ state after login:", state);
  //   }
  // }, [state.auth?.isAuthenticated]);

  const onFinish = async (values) => {
    const loginData = {
      modelName: 'customers',
      data: values
    };
    try {
      const result = await customerSignin(loginData);
      if(result) {
        localStorage.setItem('customer', JSON.stringify(result.dataObject));
        // const resultFunc = await getFunc();
        // localStorage.setItem('functions', JSON.stringify(resultFunc.dataObject));
      }      
      // dispatch(login(result));
      // dispatch(fetchFunction());
      Navigate(`${PATH.CUSTOMER.HOME}`);
    } catch (error) {
      console.log('Signin Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ maxWidth: 400, width: '100%', height: 550, padding: '2rem', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Đăng kí</h2>
        <Form
          name="signin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="customerName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ tên" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="rePassword"
            rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Đăng kí
            </Button>
          </Form.Item>
          <div style={{textAlign: 'center'}}>Bạn đã có tài khoản? <a href={PATH.CUSTOMER.LOGIN}>Đăng nhập</a></div>
        </Form>
      </div>
    </div>
  );
};

export default SigninPage;
