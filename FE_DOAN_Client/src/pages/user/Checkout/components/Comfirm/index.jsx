import React, { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
} from "antd";
import * as Style from "../../style";

function Confirm({
  confirmValues,
  setConfirmValues,
  userInfo,
  checkoutForm,
  columns,
  data,
  handleChangeCity,
  handleChangeDistrict,
  locationSelect,
  handleChangeWard,
  location,
  totalPrice,
  orderInfo,
  next,
}) {
  const confirm = {
    address: confirmValues.address || userInfo?.data?.data?.address || '',
    city: confirmValues.city || '',
    district: confirmValues.district || '',
    ward: confirmValues.ward || '',
    email: confirmValues.email || userInfo?.data?.data?.email || '',
    customerName: confirmValues.customerName || userInfo?.data?.data?.customerName || '',
    phoneNumber: confirmValues.phoneNumber || userInfo?.data?.data?.phoneNumber || '',
  };

  const handleValuesChange = (changedValues, allValues) => {
    setConfirmValues(allValues); // Cập nhật confirmValues mỗi khi form thay đổi
    console.log('Changed Values:', changedValues);
    console.log('All Values:', allValues);
  };

  useEffect(() => {
    // Cập nhật giá trị ban đầu của form khi component được mount
    checkoutForm.setFieldsValue(confirm);
  }, [confirm, checkoutForm]);

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "15px 0 30px" }}>
        Thủ tục thanh toán
      </h2>
      <Form
        form={checkoutForm}
        name="basic"
        layout="vertical"
        initialValues={confirm}
        onFinish={(values) => {
          setConfirmValues(values);
          next();
        }}
        onValuesChange={handleValuesChange}
      >
        <Card title="Thông tin đơn hàng" size="small">
          <Style.CustomTable
            size="small"
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            scroll={{ x: "max-content" }}
            dataSource={data}
            bordered
          />
          <strong style={{ marginTop: 15, display: "inline-block" }}>
            Tổng giá: {totalPrice.toLocaleString() + "₫"}{" "}
            {orderInfo.percent !== 0 &&
              `(nhập mã giảm ${orderInfo.percent * 100}% giá còn ${
                orderInfo.total.toLocaleString() + "₫"
              })`}
          </strong>
        </Card>
        <Card
          title="Thông tin cá nhân"
          size="small"
          style={{ margin: "16px 0" }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Tên khách hàng"
                name="customerName"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Địa chỉ cụ thể"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ cụ thể!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Row style={{ marginTop: "15px" }} justify="center">
          <Button htmlType="submit" type="primary">
            Tiếp tục
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default Confirm;