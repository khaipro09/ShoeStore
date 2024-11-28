import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/part';
import { t } from 'i18next';
import * as Style from "./styles";

const { SubMenu } = Menu;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const navigate = useNavigate();

  const functionList = [
    // {
    //   _id: '1',
    //   funcName: 'Dashboard',
    //   isParent: true,
    //   clientPath: PATH.MANAGER.DASHBOARD,
    // },
    {
      _id: '2',
      funcName: 'Products',
      isParent: true,
      clientPath: PATH.MANAGER.PRODUCTS,
    },
    // {
    //   _id: '3',
    //   funcName: 'Product Test',
    //   isParent: false,
    //   parentFunc: '2',
    //   clientPath: PATH.MANAGER.PRODUCTTEST,
    // },
    // {
    //   _id: '4',
    //   funcName: 'Users',
    //   isParent: true,
    //   clientPath: PATH.MANAGER.USERS,
    // },
    {
      _id: '5',
      funcName: 'Employees',
      isParent: true,
      clientPath: PATH.MANAGER.EMPLOYEES,
    },
    // {
    //   _id: '6',
    //   funcName: 'Functions',
    //   isParent: true,
    //   clientPath: PATH.MANAGER.FUNCTIONS,
    // },
    {
      _id: '7',
      funcName: 'Account',
      isParent: true,
      clientPath: PATH.MANAGER.ACCOUNT,
    },
    {
      _id: '8',
      funcName: 'Categories',
      isParent: true,
      clientPath: PATH.MANAGER.CATEGORIES,
    },
    {
      _id: '9',
      funcName: 'UOMs',
      isParent: true,
      clientPath: PATH.MANAGER.UOMS,
    },
    {
      _id: '10',
      funcName: 'Roles',
      isParent: true,
      clientPath: PATH.MANAGER.ROLES,
    },
    {
      _id: '11',
      funcName: 'Taxes',
      isParent: true,
      clientPath: PATH.MANAGER.TAXS,
    },
    {
      _id: '12',
      funcName: 'Customers',
      isParent: true,
      clientPath: PATH.MANAGER.CUSTOMERS,
    },
    // {
    //   _id: '13',
    //   funcName: 'Sales',
    //   isParent: true,
    //   clientPath: PATH.MANAGER.SALES,
    // },
    {
      _id: '14',
      funcName: 'Orders',
      isParent: true,
      clientPath: PATH.MANAGER.ORDERS,
    },
    {
      _id: '15',
      funcName: 'Material Stocks',
      isParent: true,
      clientPath: PATH.MANAGER.MATERIALSTOCKS,
    },
    {
      _id: '16',
      funcName: 'Stock Imports',
      isParent: true,
      clientPath: PATH.MANAGER.STOCKIMPORTS,
    },
    {
      _id: '17',
      funcName: 'Stock Exports',
      isParent: true,
      clientPath: PATH.MANAGER.STOCKEXPORTS,
    },
    {
      _id: '18',
      funcName: 'Vendors',
      isParent: true,
      clientPath: PATH.MANAGER.VENDORS,
    },
    {
      _id: '19',
      funcName: 'Report Sales',
      isParent: true,
      clientPath: PATH.MANAGER.REPORTSALES,
    },
    {
      _id: '20',
      funcName: 'Report Orders',
      isParent: true,
      clientPath: PATH.MANAGER.REPORTORDERS,
    },
  ];


  useEffect(() => {
    if (!localStorage?.functions) {
      navigate(PATH.MANAGER.LOGIN);
    }
  }, [navigate]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const transformDataToMenuItems = (data) => {
    if (data && data.length > 0) {
      const menuItems = data
        .filter(item => item.isParent)
        .map(parent => {
          const children = data.filter(child => child.parentFunc === parent._id).map(child => ({
            key: child._id,
            label: t(child.funcName),
            url: child.clientPath,
          }));

          // Sắp xếp các chức năng con theo tên đã dịch
          children.sort((a, b) => a.label.localeCompare(b.label, 'vi', { sensitivity: 'base' }));

          return children.length > 0
            ? {
                key: parent._id,
                label: t(parent.funcName),
                children: children,
              }
            : {
                key: parent._id,
                label: t(parent.funcName),
                url: parent.clientPath,
              };
        });

      // Sắp xếp các chức năng cha theo tên đã dịch
      menuItems.sort((a, b) => a.label.localeCompare(b.label, 'vi', { sensitivity: 'base' }));

      return menuItems;
    } else {
      return [];
    }
  };

  const menuItems = transformDataToMenuItems(functionList);
  const defaultOpenKeys = menuItems.filter(item => item.children).map(item => item.key);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, width: '100%' }}>
        <Style.HeaderLogo onClick={() => navigate('')}>
          SHOESTORE
        </Style.HeaderLogo>
      </div>

      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: '100%', maxHeight: '700px', overflowY: 'auto', fontSize:'16px' }}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[current]}
        mode="inline"
      >
        {menuItems.map((item) =>
          item.children ? (
            <SubMenu key={item.key} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  <NavLink to={child.url}>{child.label}</NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key}>
              <NavLink to={item.url}>{item.label}</NavLink>
            </Menu.Item>
          )
        )}
      </Menu>
    </>
  );
};

export default App;
