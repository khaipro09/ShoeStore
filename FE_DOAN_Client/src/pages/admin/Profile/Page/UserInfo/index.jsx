import React from "react";
import { useSelector } from "react-redux";
import { Typography, List, Button } from "antd";
import history from "../../../../../utils/history";
import { TITLE } from "../../../../../constants/title";

const { Title } = Typography;
function UserInfo() {
  document.title = TITLE.USER_INFO;
  const { userInfo } = useSelector((state) => state.userReducer);

  const data = [
    `Tên: ${userInfo.data?.name}`,
    `Email: ${userInfo.data?.email}`,
    `Giới tính: ${userInfo.data?.gender === "female" ? "Nữ" : "Nam"}`,
  ];

  return (
    <>
      <Title
        level={3}
        style={{
          textAlign: "center",
          padding: "0 0 15px",
          margin: 0,
          fontSize: "20px",
          textTransform: "uppercase",
          color: "#1d3a98",
          fontWeight: 900,
          margin: 0,
        }}
      >
        Thông tin cá nhân
      </Title>
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
}

export default UserInfo;
