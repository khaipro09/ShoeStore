import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import Menu from './Menu';
import './manager-layout.css';
import { useTranslation } from 'react-i18next';
import { Switch } from 'antd';
import i18n from '~/i18n/i18n';
import DropdownAvt from '../DropdownAvt';

const { Header, Sider, Content } = Layout;

function ManagerLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onSwitchChange = (checked) => { 
    if (checked) {
      changeLanguage('vi');
    } else {
      changeLanguage('en');
    }
  };

  return (
    <Layout style={{ height: '100%', minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={270} theme="light">
        <div className="demo-logo-vertical" />
        <Menu theme="light" mode="inline" width={'100%'} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
            <Switch checkedChildren="VN" unCheckedChildren="ENG" defaultChecked onChange={onSwitchChange} style={{ marginRight: '20px' }} className='switch-trans'/>
            <DropdownAvt />
          </div>
        </Header>
        <Content
          className="layout-content"
          style={{
            margin: '24px 16px',
            padding: 24,
            // minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'auto', // Thêm overflowY để có thanh cuộn
            height: 'calc(100vh - 112px)' // Chiều cao tính toán dựa trên tổng chiều cao trừ đi header và margin
          }}
        >
          <div className="content-body">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManagerLayout;
