import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import history from "../../utils/history";

import * as Icons from "@ant-design/icons";

const { SubMenu } = Menu;

const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <Icons.HomeOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý Sản Phẩm",
    path: "/admin/products",
    icon: <Icons.MedicineBoxOutlined />,
    subMenu: [],
  },
  {
    title: "Quán Lý Loại Giày",
    path: "/admin/categories",
    icon: <Icons.QrcodeOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý Khách Hàng",
    path: "/admin/customers",
    icon: <Icons.SolutionOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý Đặt Hàng",
    path: "/admin/orders",
    icon: <Icons.ShoppingOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý tài khoản",
    path: "/admin/accounts",
    icon: <Icons.UserOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý bài viết",
    path: "/admin/blog",
    icon: <Icons.EditOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý mã giảm giá",
    path: "/admin/ticket",
    icon: <Icons.GiftOutlined />,
    subMenu: [],
  },
];

function Sidebar({ location }) {
  const [selectSiderItem, setSelectSiderItem] = useState(0);

  useEffect(() => {
    const siderbarIndex = SIDEBAR_MENU.findIndex((item, index) => {
      return item.path === location.pathname;
    });
    setSelectSiderItem(siderbarIndex);
  }, [location]);

  function renderSidebarMenu() {
    return SIDEBAR_MENU.map((sidebarItem, sidebarIndex) => {
      return (
        <>
          {sidebarItem.subMenu.length === 0 ? (
            <Menu.Item
              icon={sidebarItem.icon}
              key={sidebarIndex}
              active={location.pathname === sidebarItem.path}
              onClick={() => history.push(sidebarItem.path)}
            >
              {sidebarItem.title}
            </Menu.Item>
          ) : (
            <SubMenu
              title={sidebarItem.title}
              icon={<img src={sidebarItem.icon} />}
              key={`sidebar-${sidebarIndex}`}
              active={location.pathname === sidebarItem.path}
            >
              {renderSubMenu(sidebarItem.subMenu)}
            </SubMenu>
          )}
        </>
      );
    });
  }
  function renderSubMenu(subMenu) {
    return subMenu.map((subMenuItem, subMenuIndex) => {
      return (
        <Menu.Item
          key={`subMenu-${subMenuIndex}`}
          active={location.pathname === subMenuItem.path}
          onClick={() => history.push(subMenuItem.path)}
        >
          {subMenuItem.title}
        </Menu.Item>
      );
    });
  }
  return (
    <>
      <Menu theme="light" mode="inline">
        {renderSidebarMenu()}
      </Menu>
    </>
  );
}

export default Sidebar;
