import React, { useEffect, useRef, useState } from "react";
import { Image, Row, Col, Menu, Avatar, Button, message, Space, Upload } from "antd";
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
import Wishlist from "./Page/WishList";
import HistoryOrder from "./Page/HistoryOrder";
import ChageInfo from "./Page/ChageInfo";
import Loading from "../../../components/Loading";
import { apiUpload } from "../../../helper/helperServices";
import { TITLE } from "../../../constants/title";
import Hero from "../../../components/Hero";
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

function ProfilePage() {
  document.title = TITLE.USER_PROFILE;
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState([]); // Changed initial value to null
  const { userInfo } = useSelector((state) => state.userReducer);
  const { responseAction } = useSelector((state) => state.userReducer);
  const { page } = useParams();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState({
    menuItem: "user-info",
  });

  const handleMenuItemClick = ({ key }) => {
    setActiveMenu({
      ...activeMenu,
      menuItem: key,
    });
    history.push(`/profile/${key}`);
  };

  const USER_MENU = [
    {
      title: "Thông tin cá nhân",
      key: "user-info",
      path: "/profile/user-info",
      action: function (e) {
        handleMenuItemClick(e);
      },
      icon: <Icons.UserOutlined />,
      subMenu: [],
    },
    {
      title: "Lịch sử giao dịch",
      key: "history-order",
      path: "/profile/history-order",
      action: function (e) {
        handleMenuItemClick(e);
      },
      icon: <Icons.FieldTimeOutlined />,
      subMenu: [],
    },
    {
      title: "Sản phẩm yêu thích",
      key: "wish-list",
      path: "/profile/wish-list",
      action: function (e) {
        handleMenuItemClick(e);
      },
      icon: <Icons.HeartOutlined />,
      subMenu: [],
    },
    {
      title: "Thay đổi mật khẩu",
      key: "change-info",
      path: "/profile/change-info",
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
        history.push("/");
      },
      icon: <Icons.LogoutOutlined />,
      subMenu: [],
    },
  ];

  const inputFile = useRef(null);

  useEffect(() => {
    setActiveMenu({
      menuItem: page || "user-info",
    });
  }, [page]);

  useEffect(() => {
    if (responseAction.edit_user.load) {
      dispatch(getUserInfoAction());
    }
    setAvatar(userInfo?.data?.data?.avatar)
  }, [responseAction.edit_user]);


  useEffect(() => {
    if (userInfo) {
      setAvatar(userInfo?.data?.data?.avatar);
    }
  }, [userInfo]);

  // const chageAvatar = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) {
  //     return message.error("Ảnh không tồn tại");
  //   }
  //   if (file.size > 1024 * 1024) {
  //     return message.error("Ảnh không được nặng quá 1MB");
  //   }
  //   if (file.type !== "image/jpeg" && file.type !== "image/png") {
  //     return message.error("Ảnh không đúng định dạng");
  //   }
  //   setAvatar(file); // Set the file to the state
  // };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleAvatarChange = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setFile(file.preview);

    try {
      const uploadedImage = await apiUpload([file]);
      // userInfo.data.data.avatar = uploadedImage;
      setAvatar(uploadedImage);
    } catch (error) {
      return message.error("Không thể tải ảnh lên");
    }
  };

  const updateAvatar = async () => {
    if (avatar) {
      try {
        const data = {
          modelName: 'customers',
          id: userInfo?.data?.data?._id,
          data: {},
        };

        data.data.avatar = avatar;

        dispatch(
          editUserProfileAction({
            data,
          })
        );
        // setAvatar(null); // Clear avatar state
        setVisible(false); // Hide preview

        // if (uploadedImage && uploadedImage.length > 0) {
        //   dispatch(
        //     editUserProfileAction({
        //       id: userInfo.data.id,
        //       data: {
        //         avatar: uploadedImage[0].url, // Assuming `uploadedImage` is an array of URLs
        //       },
        //     })
        //   );
        //   setAvatar(null); // Clear avatar state
        //   setVisible(false); // Hide preview
        // }
      } catch (error) {
        console.error("Error updating avatar:", error);
        message.error("Có lỗi xảy ra khi cập nhật ảnh");
      }
    }
  };

  function renderUserMenu() {
    return USER_MENU.map((menuItem) => (
      <Menu.Item
        key={menuItem.key}
        icon={menuItem.icon}
        onClick={(e) => menuItem.action(e)}
      >
        {menuItem.title}
      </Menu.Item>
    ));
  }

  const userName = userInfo?.data?.name || '';

  if (!userInfo || !avatar) {
    return <Loading />; // Hoặc một thành phần chờ khác
  }

  return (
    <>
      <Hero
        title={
          USER_MENU.find((menu) => menu.key === page)?.title || "Tài khoản"
        }
      />
      <Style.ProfilePage>
        <Container>
          <Row gutter={[15, 15]}>
            <Col xs={{ span: 24 }} lg={{ span: 6 }}>
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
                            preview={true}
                            src={avatar[0]?.absoluteUrl}
                          />
                        }
                      />
                      <span className="avatar-upload">
                        <Upload
                          name="avatar"
                          showUploadList={false}
                          id="avatar"
                          onChange={handleAvatarChange}
                        >
                          <Button
                            className="btn-upload"
                            shape="circle"
                            onClick={() => {
                              // inputFile.current.click();
                              setVisible(true);
                            }}
                            icon={<Icons.EditOutlined />}
                          />
                        </Upload>
                        {/* <input
                          ref={inputFile}
                          type="file"
                          hidden
                          id="avatar"
                          name="avatar"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        // onChange={chageAvatar}
                        /> */}
                      </span>
                    </div>
                    <Space
                      align="center"
                      className={visible ? "btn-avatar active" : "btn-avatar"}
                    >
                      <Button
                        onClick={updateAvatar}
                        icon={<Icons.CheckOutlined />}
                      >
                        Ok
                      </Button>
                      <Button
                        onClick={() => {
                          setAvatar(null); // Clear avatar state
                          setVisible(false); // Hide preview
                        }}
                        icon={<Icons.CloseOutlined />}
                      >
                        Huỷ
                      </Button>
                    </Space>
                    <h3>{userName}</h3>
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
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
              <Style.ProfilePanel>
                <Switch>
                  <Route exact path="/profile/user-info" component={UserInfo} />
                  <Route exact path="/profile/wish-list" component={Wishlist} />
                  <Route
                    exact
                    path="/profile/history-order"
                    component={HistoryOrder}
                  />
                  <Route
                    exact
                    path="/profile/change-info"
                    component={ChageInfo}
                  />
                </Switch>
              </Style.ProfilePanel>
            </Col>
          </Row>
        </Container>
      </Style.ProfilePage>
    </>
  );
}

export default ProfilePage;
