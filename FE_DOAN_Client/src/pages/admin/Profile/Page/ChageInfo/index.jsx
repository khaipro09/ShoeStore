import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Row,
  Space,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAction,
  getUserInfoAction,
} from "../../../../../redux/actions";
import { TITLE } from "../../../../../constants/title";

const { Title } = Typography;

function ChageInfo() {
  document.title = TITLE.CHANGE_INFO;
  const { userInfo } = useSelector((state) => state.userReducer);
  const { responseAction } = useSelector((state) => state.userReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const [form, formPass] = Form.useForm();

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
    dispatch(
      editUserProfileAction({
        id: userInfo.data.id,
        data: {
          name: values.name,
          gender: values.gender,
          email: values.email,
        },
      })
    );
  };

  const handleChangePassword = (values) => {
    dispatch(
      editUserProfileAction({
        id: userInfo.data.id,
        data: {
          password: values.passwordNew,
        },
      })
    );
    setIsModalVisible(false);
  };

  return (
    <div>
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
        Thay đổi thông tin cá nhân
      </Title>
      <div>
        <Form
          form={form}
          name="change-info"
          layout="vertical"
          initialValues={
            userInfo.data
              ? {
                  name: userInfo.data.name,
                  email: userInfo.data.email,
                  gender: userInfo.data.gender,
                }
              : {}
          }
          onFinish={(values) => handleChangeInfo(values)}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Bạn chưa nhập email ahihi!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Bạn chưa nhập giới tính!" }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={responseAction.edit_user.load}
          >
            Thay đổi
          </Button>
        </Form>
        <Row style={{ marginTop: 15 }} justify="end">
          <Space>
            <Button type="default" onClick={() => showModal()}>
              Thay đổi mật khẩu
            </Button>
          </Space>
        </Row>
        <Modal
          title="Thay đổi mật khẩu"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            name="changePassword"
            form={formPass}
            onFinish={(values) => handleChangePassword(values)}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="passwordOld"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="passwordNew"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="passwordConfirm"
              rules={[
                { required: true, message: "Vui lòng xác nhận lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("passwordNew") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu xác nhận không đúng!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default ChageInfo;
