import React, { useEffect, useRef, useState } from "react";

import { Image, Row, Col, Menu, Avatar, Button, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../../styles/styles";
import * as Icons from "@ant-design/icons";

import * as Style from "./styles";
import {
  editUserProfileAction,
  getUserInfoAction,
  logoutAction,
} from "../../../redux/actions";
import history from "../../../utils/history";
import { Route, Switch, useParams } from "react-router";
import UserInfo from "./Page/UserInfo";
import ChageInfo from "./Page/ChageInfo";
import Loading from "../../../components/Loading";
import { ImageUpload } from "../../../utils/ImageUpload";
import { TITLE } from "../../../constants/title";

function ProfileAdminPage() {
  document.title = TITLE.USER_PROFILE;
  const { userInfo } = useSelector((state) => state.userReducer);
  const { responseAction } = useSelector((state) => state.userReducer);
  const { page } = useParams();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState({
    menuItem: "user-info",
  });

  const handleMenuItemClick = ({ key }) => {
    setActiveMenu({
      ...activeMenu,
      menuItem: key,
    });
    history.push(`/admin/profile/${key}`);
  };

  const USER_MENU = [
    {
      title: "Thông tin tài khoản",
      key: "user-info",
      path: "/admin/profile/user-info",
      action: function (e) {
        handleMenuItemClick(e);
      },
      icon: <Icons.UserOutlined />,
      subMenu: [],
    },
    {
      title: "Thay đổi thông tin tài khoản",
      key: "change-info",
      path: "admin/profile/change-info",
      action: function (e) {
        handleMenuItemClick(e);
      },
      icon: <Icons.EditOutlined />,
      subMenu: [],
    },
    {
      title: "Đăng xuất",
      key: "logout",
      path: "/",
      action: function () {
        dispatch(logoutAction());
        history.push("/login");
      },
      icon: <Icons.LogoutOutlined />,
      subMenu: [],
    },
  ];

  const inputFile = useRef(null);

  useEffect(() => {
    let menuInfo = page;
    setActiveMenu({
      menuItem: menuInfo,
    });
  }, []);
  useEffect(() => {
    let menuInfo = page;
    setActiveMenu({
      menuItem: menuInfo,
    });
  }, [page]);

  useEffect(() => {
    if (responseAction.edit_user.load) {
      dispatch(getUserInfoAction());
    }
  }, [responseAction.edit_user]);

  const chageAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setVisible(false);
      return message.error("Ảnh không tồn  tại");
    }
    if (file.size > 1024 * 1024) {
      setVisible(false);
      return message.error("Ảnh không không được nặng quá 1mb");
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setVisible(false);
      return message.error("Ảnh không đúng định dạng");
    }
    setAvatar(file);
  };

  const updateAvatar = async () => {
    let media;
    if (avatar) media = await ImageUpload([avatar]);
    if (media) {
      dispatch(
        editUserProfileAction({
          id: userInfo.data.id,
          data: {
            avatar: media[0].url,
          },
        })
      );
      setAvatar("");
      setVisible(false);
    }
  };

  function renderUserMenu() {
    return USER_MENU.map((menuItem, menuIndex) => {
      console.log("🚀 ~ returnUSER_MENU.map ~ menuItem:", menuItem)
      return (
        <Menu.Item
          key={menuItem.key}
          icon={menuItem.icon}
          onClick={(e) => menuItem.action(e)}
        >
          {menuItem.title}
        </Menu.Item>
      );
    });
  }

  return (
    <>
      <Style.ProfilePage>
        <Row gutter={[15, 15]}>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            {responseAction.edit_user.load ? (
              <Loading load={responseAction.edit_user.load} />
            ) : (
              <Style.ProfileMenu>
                <div className="profile-top">
                  <div className="profile-avatar">
                    <Avatar
                      className="profile-image"
                      src={
                        <Image
                          preview={false}
                          src={
                            avatar
                              ? URL.createObjectURL(avatar)
                              : userInfo.data.data.avatar
                          }
                        />
                      }
                    ></Avatar>
                    <span className="avatar-upload">
                      <Button
                        className="btn-upload"
                        shape="circle"
                        onClick={() => {
                          inputFile.current.click();
                          setVisible(true);
                        }}
                        icon={<Icons.EditOutlined />}
                      ></Button>
                      <input
                        ref={inputFile}
                        type="file"
                        hidden
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={(e) => chageAvatar(e)}
                      />
                    </span>
                  </div>
                  <Space
                    align="center"
                    className={visible ? "btn-avatar active" : "btn-avatar"}
                  >
                    <Button
                      onClick={() => {
                        updateAvatar();
                      }}
                      icon={<Icons.CheckOutlined />}
                    >
                      Ok
                    </Button>
                    <Button
                      onClick={() => {
                        setAvatar("");
                        setVisible(false);
                      }}
                      icon={<Icons.CloseOutlined />}
                    >
                      Huỷ
                    </Button>
                  </Space>
                  <h3>{userInfo.data?.name}</h3>
                </div>
                <Menu
                  mode="inline"
                  selectedKeys={[activeMenu.menuItem]}
                  openKeys={activeMenu.subMenu}
                >
                  {renderUserMenu()}
                </Menu>
              </Style.ProfileMenu>
            )}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 16 }}>
            <Style.ProfilePanel>
              <Switch>
                <Route
                  exact
                  path="/admin/profile/user-info"
                  component={UserInfo}
                />
                <Route
                  exact
                  path="/admin/profile/change-info"
                  component={ChageInfo}
                />
              </Switch>
            </Style.ProfilePanel>
          </Col>
        </Row>
      </Style.ProfilePage>
    </>
  );
}

export default ProfileAdminPage;
