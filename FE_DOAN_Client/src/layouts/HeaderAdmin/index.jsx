import { useEffect } from "react";
import { Dropdown, Menu, Space, Badge, Layout, Avatar } from "antd";
import history from "../../utils/history";

import * as Icons from "@ant-design/icons";
import * as Style from "./styles";

import { logoutAction, getOrderWaitingAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const { Header } = Layout;

function HeaderAdmin() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { orderWaitingList } = useSelector((state) => state.orderReducerAdmin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderWaitingAction());
  }, []);

  function handleLogout() {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    history.push("/login");
  }
  const menuProfile = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => history.push("/admin/profile/user-info")}
      >
        <Space size={5} align="center">
          <Icons.FireOutlined /> <span>Xem thông tin</span>
        </Space>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => handleLogout()}>
        <Space size={5} align="center">
          <Icons.LogoutOutlined /> <span>Đăng xuất</span>
        </Space>
      </Menu.Item>
    </Menu>
  );

  function rendernotification() {
    return orderWaitingList.data.map((item, index) => {
      return (
        <Style.CustomMenuItem
          key={index}
          onClick={() => history.push("/admin/orders")}
        >
          <Space size={5} align="center">
            <Icons.NotificationFilled className="icon" />
            <span>
              {item.name} đã đặt {item.products?.length} Sản phẩm
            </span>
          </Space>
        </Style.CustomMenuItem>
      );
    });
  }

  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f0f0",
          boxShadow: "0 4px 12px 0 rgb(0 0 0 / 5%)",
        }}
      >
        <Style.SpaceCT>
          <Style.Logo onClick={() => history.push("/admin")}>Runner</Style.Logo>
          <Style.MenuRight>
            <Dropdown
              placement="bottomRight"
              overlay={
                <Style.CustomMenu>{rendernotification()}</Style.CustomMenu>
              }
              trigger={["click"]}
            >
              <Badge
                style={{ cursor: "point" }}
                count={orderWaitingList.data?.length}
                size="small"
              >
                <Icons.BellOutlined style={{ fontSize: 24 }} className="icon" />
              </Badge>
            </Dropdown>
            <Dropdown overlay={menuProfile} trigger={["click"]}>
              <Style.Profile>
                <Avatar src={userInfo.data?.avatar} size="large" />
                <span className="name">{userInfo.data?.name}</span>
              </Style.Profile>
            </Dropdown>
          </Style.MenuRight>
        </Style.SpaceCT>
      </Header>
    </>
  );
}
export default HeaderAdmin;
