import React from 'react';
import { Breadcrumb, Col, Layout, Row, theme } from 'antd';
import CustomHeader from './header/CustomHeader.jsx';
import Title from 'antd/es/skeleton/Title.js';
import Paragraph from 'antd/es/skeleton/Paragraph.js';

const { Content, Footer } = Layout;

const App = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ overflow: 'hidden' }}>
      <CustomHeader />
      <Content
        style={{
          padding: '0 25px',
          // overflowY: 'auto',
          // height1: 'calc(100vh - 64px - 70px)',
          height: '100%',
          overflowY: 'hidden', // 1. Loại bỏ thanh cuộn
          // height: 'auto', // 2. Tự động mở rộng chiều cao
        }}
      >
        <div className="content-body">{children}</div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        SHOESTORE ©{new Date().getFullYear()} Created by Nhom4
      </Footer>
    </Layout>
  );
};

export default App;
