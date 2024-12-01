import { useState, useEffect } from "react";
import { logoutAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import * as Icons from "@ant-design/icons";
import { Menu, Dropdown, Button, Space, Drawer, Badge } from "antd";
import history from "../../utils/history";
import { UserOutlined } from '@ant-design/icons';
import hotline from "../../assets/images/hotline.jpg";
import * as Style from "./styles";
import Avatar from "antd/lib/avatar/avatar";

function Header({ type }) {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [sticky, setSticky] = useState(true);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos || prevScrollpos === 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    history.push("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => history.push("/profile/user-info")}>
        <Icons.FireOutlined /> Thông tin cá nhân
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/profile/history-order")}>
        <Icons.HistoryOutlined /> Lịch sử đơn hàng
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/profile/wish-list")}>
        <Icons.HeartOutlined /> Sản phẩm yêu thích
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <Icons.LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const ListNav = [
    { title: "Trang chủ", path: "/" },
    { title: "Sản phẩm", path: "/product" },
    { title: "Nam", path: "/product/GIAY_NAM" },
    { title: "Nữ", path: "/product/GIAY_NU" },
    { title: "Trẻ Em", path: "/product/GIAY_TRE_EM" },
    { title: "Liên hệ", path: "/contact" },
  ];

  const renderListNav = () => {
    return ListNav.map((nav, index) => (
      <Style.HeaderItem key={index}>
        <Style.HeaderLink
          onClick={() => {
            console.log(`Navigating to ${nav.path}`);
            history.push(nav.path);
          }}
        >
          {nav.title}
        </Style.HeaderLink>
      </Style.HeaderItem>
    ));
  };

  return (
    <>
      <Style.Header className={sticky ? "" : "sticky"}>
        <Style.HeaderContainer>
          {/* Mobile menu */}
          <div className="menu-container menu-hide-desktop">
            <Button
              className="btn-menu-mobile"
              type="text"
              icon={<Icons.MenuOutlined />}
              onClick={showDrawer}
            />
          </div>
          <Drawer
            title="SHOESTORE"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <div className="user-mobile">
              {userInfo?.data?.data?.customerName ? (
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Space align="center" className="avatar-mobile">
                    <Avatar src={userInfo?.data?.data?.avatar} />
                    <strong>{userInfo?.data?.data?.customerName}</strong>
                  </Space>
                </Dropdown>
              ) : (
                <Button
                  type="primary"
                  danger
                  block
                  className="btn-login"
                  style={{padding: '0'}}
                  onClick={() => history.push("/login")}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
            <ul>
              {ListNav.map((nav, index) => (
                <li key={index} onClick={() => { onClose(); history.push(nav.path); }}>
                  {nav.title}
                </li>
              ))}
            </ul>
            <div
              style={{
                background: `url(${hotline}) no-repeat center`,
                backgroundSize: "cover",
                paddingTop: "100%",
              }}
            />
          </Drawer>

          {/* Logo */}
          <Style.HeaderLogo onClick={() => history.push("/")}>
            SHOESTORE
          </Style.HeaderLogo>

          {/* Main menu */}
          {!(type === "admin") && <Style.HeaderList>{renderListNav()}</Style.HeaderList>}

          <div className="menu-container">
            <Style.HeaderAction>
              {!(type === "admin") && (
                <Badge
                  count={cartList.data?.length}
                  onClick={() => history.push("/cart")}
                >
                  <Button
                    size="large"
                    type="default"
                    shape="circle"
                    style={{padding: '0'}}
                    icon={<Icons.ShoppingCartOutlined />}
                  />
                </Badge>
              )}
              <div className="user-action">
                {userInfo?.data?.data?.customerName ? (
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <Space align="center" style={{ cursor: "pointer" }}>
                      {userInfo?.data?.data?.avatar?.length ? (
                        <Avatar size="large" src={userInfo.data.data.avatar[0].absoluteUrl} />
                      ) : (
                        <Avatar size={40} icon={<UserOutlined />} />
                      )}
                    </Space>
                  </Dropdown>
                ) : (
                  <Button style={{padding: '0 1em'}} type="primary" onClick={() => history.push("/login")}>
                    Đăng nhập
                  </Button>
                )}
              </div>
            </Style.HeaderAction>
          </div>
        </Style.HeaderContainer>
      </Style.Header>
      <Style.SpacingTop />
    </>
  );
}

export default Header;
