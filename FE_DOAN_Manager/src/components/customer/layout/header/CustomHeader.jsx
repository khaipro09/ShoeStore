import React, { useState } from 'react';
import { Layout, Menu, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PATH } from '~/constants/part';
import { NavLink } from 'react-router-dom';
import { t } from 'i18next';
import SubMenu from 'antd/es/menu/SubMenu';
import './CustomHeader.css';

const { Header } = Layout;

const CustomHeader = () => {
  const [current, setCurrent] = useState('a');
  const categoriesList = JSON.parse(localStorage?.categories || '[]');

  const transformDataToMenuItems = (data) => {
    if (data && data.length > 0) {
      const menuItems = data
        .filter(item => item.isParent && !item.parentCategoryId) // Lọc chỉ lấy các mục là parent
        .map(parent => ({
          key: parent._id,
          label: t(parent.categoryName),
          children: data
            .filter(child => child.parentCategoryId === parent._id)
            .map(child => ({
              key: child._id,
              label: t(child.categoryName),
              url: child.clientPath,
            })),
        }));

      return menuItems;
    } else {
      return [];
    }
  };

  const menuItems = transformDataToMenuItems(categoriesList);
  const defaultOpenKeys = menuItems.map(item => item.key);
  const onClick = (e) => {
    console.log('click ', e.key);
    setCurrent(e.key);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Header
        style={{
          marginTop: 20,
          padding: 0,
          position: 'fixed', // cố định
          top: 0,
          zIndex: 1000,
          width: '90%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 0 1.5px red',
          borderRadius: 25,
        }}
      >
        <Menu mode="horizontal" selectedKeys={[current]} onClick={onClick} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', borderRadius: 25 }}>
          <Menu.ItemGroup style={{ display: 'flex', maxWidth: '50%', alignItems: 'center', marginLeft: '-32px' }} title="">
            <Menu.Item
              defaultHoverBg='#ffffff'
            >
              <Button href={PATH.CUSTOMER.LOGIN} backgroundColor='#ffffff'>
                SHOESTORE
              </Button>
            </Menu.Item>

            <Menu.Item key="b">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                style={{ width: 250, boxShadow: '0 0 0 0.5px red', borderRadius: 25, }}
              />
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.ItemGroup
            defaultOpenKeys={defaultOpenKeys}
            title=""
            style={{ display: 'flex', flex: 1, fontWeight: 'bold' }}
          >
            {menuItems.map((item) => (
              <SubMenu key={item.key} title={item.label} style={{ padding: 0 }}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key} style={{ padding: 0 }}>
                    <NavLink to={child.url}>{child.label}</NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu.ItemGroup>


          <Menu.ItemGroup defaultOpenKeys={defaultOpenKeys} title="" style={{ display: 'flex', maxWidth: '120px', justifyContent: 'flex-end', alignItems: 'center', flex: 1, fontWeight: 'bold' }}>
            <Menu.Item
              defaultHoverBg='#ffffff'
            >
              <Button href={PATH.CUSTOMER.LOGIN} backgroundColor='#ffffff'>
                Đăng nhập
              </Button>
            </Menu.Item>
          </Menu.ItemGroup>

        </Menu>
      </Header>
    </div >
  );
};

export default CustomHeader;
