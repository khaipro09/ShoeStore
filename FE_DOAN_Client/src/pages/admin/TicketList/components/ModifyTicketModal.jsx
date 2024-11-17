import { useEffect } from "react";
import { Modal, Form, Input, Button, InputNumber } from "antd";

function ModifyTicketModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyTicketData,
}) {
  const [modifyTicketForm] = Form.useForm();

  useEffect(() => {
    if (isShowModifyModal) {
      modifyTicketForm.resetFields();
    }
  }, [isShowModifyModal]);

  return (
    <Modal
      title={
        isShowModifyModal === "create" ? "Thêm mã giảm giá" : "Sửa mã giảm giá"
      }
      visible={!!isShowModifyModal}
      onCancel={() => setIsShowModifyModal("")}
      footer={[
        <Button key="back" onClick={() => setIsShowModifyModal("")}>
          Hủy
        </Button>,
        <Button
          key="back"
          type="primary"
          onClick={() => modifyTicketForm.submit()}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyTicketForm}
        name="modify-category"
        layout="vertical"
        initialValues={{
          ...modifyTicketData,
          percent: modifyTicketData.percent * 100,
        }}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Mã giảm giá: "
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã giảm giá!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tỉ lệ giảm(%): "
          name="percent"
          rules={[{ required: true, message: "Vui lòng nhập tỉ lệ giảm giá!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} max={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyTicketModal;
