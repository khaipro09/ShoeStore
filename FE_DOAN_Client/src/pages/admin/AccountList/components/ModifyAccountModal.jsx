import { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import {
  Modal,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Upload
} from "antd";
import * as Icon from "@ant-design/icons";
import * as Style from './styles';
import { convertFileToBase64 } from '../../../../utils/common';

function ModifyAccountModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyUserData,
  uploadImages,
  setUploadImage
}) {
  const [modifyAccountForm] = Form.useForm();
  const [uploadError, setUploadError] = useState('');
  const { Option } = Select;
  const { userInfo } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (isShowModifyModal) {
      modifyAccountForm.resetFields();
      setUploadImage(modifyUserData?.avatar);
    }
  }, [isShowModifyModal, modifyUserData]);

  const handleUploadImage = useCallback(async (value) => {
    if (!["image/png", "image/jpeg"].includes(value.file.type)) {
      return setUploadError('File không đúng!');
    }
    if (value.file.size > 1024000) {
      return setUploadError('File quá nặng!');
    }
    setUploadError('');
    const imageBase64 = await convertFileToBase64(value.file);
    setUploadImage(imageBase64);
  }, [setUploadImage]);

  return (
    <Modal
      title="Sửa thông tin"
      visible={!!isShowModifyModal}
      onCancel={() => setIsShowModifyModal('')}
      footer={[
        <Button key="cancel" onClick={() => setIsShowModifyModal('')}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={() => modifyAccountForm.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyAccountForm}
        name="modifyAccount"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={modifyUserData}
        onFinish={handleSubmitForm}
      >
        <Form.Item
          label="Tên: "
          name="name"
          rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giới tính: "
          name="gender"
        >
          <Radio.Group>
            <Radio value="female">Nữ</Radio>
            <Radio value="male">Nam</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Hình ảnh:">
          <Upload
            name="logo"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleUploadImage}
            listType="picture-card"
          >
            <Style.ShowUploadImage uploadImages={uploadImages}>
              <Icon.PlusOutlined />
            </Style.ShowUploadImage>
          </Upload>
          {uploadError && <div style={{ height: 24, color: '#ff4d4f' }}>{uploadError}</div>}
        </Form.Item>

        <Form.Item label="Quyền: " name="role">
          <Select disabled={userInfo.data.id === modifyUserData.id}>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Trạng thái: " name="status">
          <Select disabled={userInfo.data.id === modifyUserData.id}>
            <Option value="active">Kích hoạt</Option>
            <Option value="block">Khóa</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyAccountModal;
