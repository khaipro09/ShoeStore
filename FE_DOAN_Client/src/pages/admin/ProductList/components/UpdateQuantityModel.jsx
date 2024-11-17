import { useEffect } from 'react';
import {
  Modal,
  Form,
  InputNumber,
  Button
} from "antd";

function UpdateQuantityModel({
  isShowUpdateModal,
  setIsShowUpdateModal,
  quantityData,
  handleSubmitForm
}) {
  const [updateQuantityForm] = Form.useForm();

  useEffect(() => {
    if (isShowUpdateModal) {
      updateQuantityForm.resetFields();
    }
  }, [isShowUpdateModal]);

  return (
    <Modal
      title="Cập nhật số lượng"
      visible={!!isShowUpdateModal}
      onCancel={() => setIsShowUpdateModal('')}
      footer={[
        <Button key="back" onClick={() => setIsShowUpdateModal('')}>
          Hủy
        </Button>,
        <Button key="back" type="primary" onClick={() => updateQuantityForm.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={updateQuantityForm}
        name="update-quanity"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={quantityData}
        onFinish={(values) => handleSubmitForm(values)}

      >
        <Form.Item
          label="Số lượng hiện tại: "
          name="quantity"
        >
          <InputNumber disabled />
        </Form.Item>
        <Form.Item
          label="Thêm: "
          name="quantityAdd"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateQuantityModel;
