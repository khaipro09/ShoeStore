import { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Button
} from "antd";

function ModifyCategoryModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyCategoryData,
}) {
  const [modifyCategoryForm] = Form.useForm();

  useEffect(() => {
    if (isShowModifyModal) {
      modifyCategoryForm.resetFields();
    }
  }, [isShowModifyModal]);

  return (
    <Modal
      title={isShowModifyModal === "create" ? "Thêm Loại" : "Sửa Loại"}
      visible={!!isShowModifyModal}
      // onOk={() => modifyCategoryForm.submit()}
      onCancel={() => setIsShowModifyModal('')}
      footer={[
        <Button key="back" onClick={() => setIsShowModifyModal('')}>
          Hủy
        </Button>,
        <Button key="back" type="primary" onClick={() => modifyCategoryForm.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyCategoryForm}
        name="modify-category"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={modifyCategoryData}
        onFinish={(values) => handleSubmitForm(values)}

      >
        <Form.Item
          label="Tên Loại: "
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyCategoryModal;
