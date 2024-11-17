import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/part';

const DropdownAvt = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmployee(user);
    }
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      console.log('click', key);
    }
  };

  const handleLogout = () => {
    const keysToRemove = ['user', 'functions'];
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    navigate(`${PATH.MANAGER.LOGIN}`);
  };

  const items = [
    {
      label: t('account'),
      key: '1',
      icon: <UserOutlined />,
      url: PATH.MANAGER.ACCOUNT,
    },
    {
      label: t('logout'),
      key: 'logout',
      icon: <UserOutlined />,
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.url ? (
            <NavLink to={item.url}>{item.label}</NavLink>
          ) : (
            <span>{item.label}</span>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Space align="center" style={{ cursor: 'pointer' }}>
        <Avatar
          size={'large'}
          src={employee?.avatar && employee?.avatar?.length > 0 ? employee?.avatar[0]?.absoluteUrl : null}
          icon={!employee?.avatar || employee?.avatar?.length === 0 ? <UserOutlined /> : null}
        />
        <span>{employee?.name}</span>
      </Space>
    </Dropdown>
  );
};

export default DropdownAvt;
