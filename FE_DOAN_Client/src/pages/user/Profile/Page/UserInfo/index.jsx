import React, { useEffect, useState } from "react";
import {
  List,
  Button,
  Form,
  Input,
  Select,
  Typography,
  Row,
  Space,
  Modal,
  message,
  notification,
} from "antd";
import history from "../../../../../utils/history";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAction,
  getUserInfoAction,
} from "../../../../../redux/actions";
import { TITLE } from "../../../../../constants/title";

const { Title } = Typography;
function UserInfo() {
  document.title = TITLE.USER_INFO;

  const { userInfo } = useSelector((state) => state.userReducer);
  const { responseAction } = useSelector((state) => state.userReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (responseAction.edit_user.load) {
      dispatch(getUserInfoAction());
    }
  }, [responseAction.edit_user]);

  useEffect(() => {
    form.resetFields();
  }, [userInfo.data]);

  const handleChangeInfo = (values) => {
    const data = {
      modelName: 'customers',
      id: userInfo?.data?.data?._id,
      data: {},
    };

    if (values?.customerName && values.customerName.trim() !== '') {
      data.data.customerName = values.customerName.trim();
    }

    if (values?.phoneNumber && values.phoneNumber.trim() !== '') {
      data.data.phoneNumber = values.phoneNumber.trim();
    }

    if (values?.address && values.address.trim() !== '') {
      data.data.address = values.address.trim();
    }

    if (Object.keys(data).length === 0) {
      notification.error({
        message: 'Nhập thông tin cần thay đổi',
      });
      return;
    }
    dispatch(
      editUserProfileAction({
        data,
      })
    );
    setIsModalVisible(false);
  };

  const data = [
    `Tên: ${userInfo?.data?.data?.customerName || ""}`,
    `Email: ${userInfo?.data?.data?.email || ""}`,
    `Số điện thoại: ${userInfo?.data?.data?.phoneNumber || ""}`,
    `Địa chỉ: ${userInfo.data?.data?.address || ""}`,
  ];

  return (
    <>
      <h2>Thông tin cá nhân</h2>
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <Row style={{ marginTop: 15 }} justify="end">
        <Space>
          <Button type="default" onClick={() => showModal()}>
            Thay đổi thông tin
          </Button>
        </Space>
      </Row>
      <Modal
        title="Thay đổi thông tin cá nhân"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="change-info"
          layout="vertical"
          initialValues={
            userInfo?.data?.data
              ? {
                customerName: userInfo?.data?.data?.customerName,
                phoneNumber: userInfo?.data?.data?.phoneNumber,
                address: userInfo?.data?.data?.address,
              }
              : {}
          }
          onFinish={(values) => handleChangeInfo(values)}
        >
          <Form.Item
            label="Tên"
            name="customerName"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
          // rules={[{ required: true, message: "Bạn chưa nhập email ahihi!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
          // rules={[{ required: true, message: "Bạn chưa nhập email ahihi!" }]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={responseAction.edit_user.load}
          >
            Thay đổi thông tin
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default UserInfo;
