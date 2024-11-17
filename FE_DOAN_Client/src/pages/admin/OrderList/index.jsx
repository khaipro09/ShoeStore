import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Input, Space, List, Col } from "antd";
import UpdateStatusModel from "./components/UpdateStatusModel";
import moment from "moment";
import * as Icon from "@ant-design/icons";

import {
  getOrderListAction,
  editOrderListAction,
} from "../../../redux/actions";

import * as Style from "./styles";

const STATUS = {
  waiting: "Đang chờ",
  shipping: "Đang chuyển hàng",
  delivery: "Đã giao",
  confirm: "xác nhận",
};

function OrderListPage() {
  const [searchKey, setSearchKey] = useState("");
  const [isShowUpdateModal, setIsShowUpdateModal] = useState("");
  const [orderData, setOrderData] = useState({});
  const { orderList } = useSelector((state) => state.orderReducerAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListAction());
  }, []);

  const tableColumn = [
    {
      title: "Người Đặt",
      dataIndex: "user",
      width: 150,
      key: "user",
      sorter: (a, b) => a.user.name?.length - b.user.name?.length,
      render: (value) => value?.name,
    },
    {
      title: "Người Nhận",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
      width: 200,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 150,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (value) => `${value.toLocaleString()}VNĐ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      filters: [
        {
          value: "waiting",
          text: STATUS.waiting,
        },
        {
          value: "shipping",
          text: STATUS.shipping,
        },
        {
          value: "delivery",
          text: STATUS.delivery,
        },
        {
          value: "confirm",
          text: STATUS.confirm,
        },
      ],
      onFilter: (value, record) => {
        return record.status == value;
      },
      render: (value) => (
        <p
          style={{
            color:
              value === "waiting"
                ? "#52c41a"
                : value === "delivery"
                ? "#d4380d"
                : value === "confirm"
                ? "#13c2c2"
                : "#fadb14",
          }}
        >
          {STATUS[value]}
        </p>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              icon={<Icon.FormOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setIsShowUpdateModal(true);
                setOrderData(record);
              }}
            >
              Cập nhật trạng thái
            </Button>
          </Space>
        );
      },
    },
  ];
  function handleSubmitForm(values) {
    dispatch(
      editOrderListAction({
        id: orderData.id,
        data: {
          ...values,
        },
      })
    );
    setIsShowUpdateModal("");
  }

  const tableData = orderList.data.map((orderItem, orderIndex) => {
    return {
      key: orderIndex,
      ...orderItem,
    };
  });
  function handleSearchOrder(value) {
    setSearchKey(value);
    dispatch(
      getOrderListAction({
        searchKey: value,
      })
    );
  }
  return (
    <>
      <div>
        <Style.CustomSpaceBox>
          <Style.Title>Quản lý đặt hàng</Style.Title>
          <Style.Search>
            <Input
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchOrder(e.target.value)}
            />
          </Style.Search>
        </Style.CustomSpaceBox>
        <Style.CustomTable
          size="small"
          scroll={{ x: 1500 }}
          columns={tableColumn}
          dataSource={tableData}
          loading={orderList.load}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <List
                  size="small"
                  dataSource={record.products}
                  renderItem={(item) => (
                    <Style.ListItem>
                      <Row
                        style={{
                          width: "100%",
                        }}
                      >
                        <Col span={2}>
                          <Style.ShowImage src={item.image}></Style.ShowImage>
                        </Col>
                        <Col span={6}>{item.name}</Col>
                        <Col span={4}>Thương hiệu: {item.category}</Col>
                        <Col span={4}>Sản phẩm: {item.department}</Col>
                        <Col span={4}>Số lượng: {item.count}</Col>
                        <Col span={4}>
                          Tổng tiền: {item.price.toLocaleString()}VNĐ
                        </Col>
                      </Row>
                    </Style.ListItem>
                  )}
                />
              );
            },
            rowExpandable: (record) => record.products?.length > 0,
          }}
        />

        <UpdateStatusModel
          isShowUpdateModal={isShowUpdateModal}
          setIsShowUpdateModal={setIsShowUpdateModal}
          handleSubmitForm={handleSubmitForm}
          orderData={orderData}
        />
      </div>
    </>
  );
}
export default OrderListPage;
