import { Button, Row, List, Card } from "antd";
import React, { useEffect, useState } from "react";
import PaypalButton from "./PaypalButton-v2";
import * as Style from "../../style";
import axios from "axios";

function Payment({
  tranSuccess,
  prev,
  next,
  confirmValues,
  totalPrice,
  location,
  columns,
  data,
  checkoutForm,
  handleOrder,
  orderInfo,
  paypalCreatOrder,
}) {
  const dataList = [
    `Tên khách hàng: ${confirmValues.customerName}`,
    `Email: ${confirmValues.email}`,
    `Số điện thoại: ${confirmValues.phoneNumber}`,
    `Địa chỉ: ${confirmValues.address}`,
    `Tổng tiền phải thanh toán:
      ${totalPrice.toLocaleString()}₫
      ${orderInfo.percent !== 0
      ? `nhập mã giảm ${orderInfo.percent * 100
      }% giá còn ${orderInfo.total.toLocaleString()}₫`
      : ""
    }`,
  ];

  const [sdkReady, setSdkReady] = useState(false);
  const addPaypalScript = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/payments");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data.data}&currency=USD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Error loading PayPal script:", error);
    }
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <div>
      <Button onClick={() => prev()}>Quay lại</Button>
      <Card style={{ marginTop: 15 }} title="Thông tin đơn hàng" size="small">
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
        <List
          style={{ marginTop: 10 }}
          bordered
          size="small"
          dataSource={dataList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
          padding: "15px 0 5px",
        }}
      >
        <div>
          <Button
            style={{ height: "100%" }}
            type="primary"
            shape="round"
            onClick={() => handleOrder(confirmValues, "cod")}
          >
            Thanh toán khi nhận hàng
          </Button>
        </div>
        {sdkReady ? (
          <PaypalButton
            total={totalPrice}
            tranSuccess={tranSuccess}
            paypalCreatOrder={paypalCreatOrder}
            confirmValues={confirmValues}
          />
        ) : (
          <p>Loading PayPal...</p>
        )}
      </div>
    </div>
  );
}

export default Payment;
