import { Breadcrumb } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../utils/history";

const BREADCRUMB_MENU = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <Icon.HomeOutlined />,
    subMenu: [],
  },
  {
    title: "Quản lý Sản Phẩm",
    path: "/admin/products",
  },
  {
    pathParent: "/admin/products",
    title: "Sửa sản phẩm",
    path: "/admin/products/edit/:id",
  },
  {
    pathParent: "/admin/products",
    title: "Thêm sản phẩm",
    path: "/admin/products/create",
  },
  {
    title: "Quán lý Loại giày",
    path: "/admin/categories",
  },
  {
    title: "Quản lý khách hàng",
    path: "/admin/customers",
  },
  {
    title: "Quản lý đặt hàng",
    path: "/admin/orders",
  },
  {
    title: "Quản lý tài khoản",
    path: "/admin/accounts",
  },
  {
    title: "Thông tin cá nhân",
    path: "/admin/profile/:page",
  },

  {
    title: "Quản lý bài viết",
    path: "/admin/blog",
  },
  {
    pathParent: "/admin/blog",
    title: "Sửa bài viết",
    path: "/admin/blog/edit/:id",
  },
  {
    pathParent: "/admin/blog",
    title: "Thêm bài viết",
    path: "/admin/blog/create",
  },
  {
    title: "Quản lý mã giảm giá",
    path: "/admin/ticket",
  },
  {
    pathParent: "/admin/ticket",
    title: "Sửa mã giảm giá",
    path: "/admin/ticket/edit/:id",
  },
  {
    pathParent: "/admin/ticket",
    title: "Thêm mã giảm giá",
    path: "/admin/ticket/create",
  },
];

function BreadcrumbLayout({ match }) {
  function renderBreadcrumb(pathName) {
    return BREADCRUMB_MENU.map((menuItem, menuIndex) => {
      if (menuItem.path === pathName) {
        return (
          <>
            {menuItem.pathParent ? renderBreadcrumb(menuItem.pathParent) : null}
            <Breadcrumb.Item
              style={{ cursor: "pointer" }}
              onClick={() => history.push(menuItem.path)}
            >
              {menuItem.title}
            </Breadcrumb.Item>
          </>
        );
      }
    });
  }
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/admin")}
      >
        <Icon.HomeOutlined />
        Trang chủ
      </Breadcrumb.Item>
      {renderBreadcrumb(match.path)}
    </Breadcrumb>
  );
}
export default BreadcrumbLayout;
