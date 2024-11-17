import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Input, Space, Popconfirm } from "antd";

import * as Icon from "@ant-design/icons";

import ModifyTicketModal from "./components/ModifyTicketModal";

import {
  deleteCategoryAction,
  getTicketListAction,
  createTicketAction,
  editTicketAction,
} from "../../../redux/actions";

import * as Style from "./styles";

function TicketListPage(props) {
  const [searchKey, setSearchKey] = useState("");
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyTicketData, setModifyTicketData] = useState({});

  const { ticketList } = useSelector((state) => state.ticketReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketListAction());
  }, []);

  function handleSearchTicket(value) {
    setSearchKey(value);
    dispatch(
      getTicketListAction({
        searchKey: value,
      })
    );
  }
  function handleSubmitForm(values) {
    if (isShowModifyModal === "create") {
      dispatch(
        createTicketAction({
          data: {
            ...values,
            percent: parseFloat(values.percent / 100),
          },
        })
      );
    } else {
      dispatch(
        editTicketAction({
          id: modifyTicketData.id,
          data: {
            ...values,
            percent: parseFloat(values.percent / 100),
          },
        })
      );
    }
    setIsShowModifyModal("");
  }

  const tableColumn = [
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: "Tỉ lệ giảm",
      dataIndex: "percent",
      key: "percent",
      sorter: (a, b) => a.percent - b.percent,
      render: (value) => `${value * 100}%`,
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
                setIsShowModifyModal("edit");
                setModifyTicketData(record);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Are you sure to delete this ticket?"
              onConfirm={() =>
                dispatch(deleteCategoryAction({ id: record.id }))
              }
              onCancel={() => null}
              okText="Có"
              cancelText="Không"
            >
              <Button danger icon={<Icon.DeleteOutlined />}>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const tableData = ticketList.data.map((ticketItem, ticketIndex) => {
    return {
      key: ticketIndex,
      ...ticketItem,
    };
  });

  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý mã giảm giá</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchTicket(e.target.value)}
            />
          </Style.Search>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal("create");
              setModifyTicketData({ code: "", percent: 0 });
            }}
          >
            Thêm mới
          </Button>
        </Style.CustomSpace>
      </Style.CustomSpaceBox>
      <Style.CustomTable
        scroll={{ x: "1000px" }}
        size="small"
        columns={tableColumn}
        dataSource={tableData}
        loading={ticketList.load}
      />

      <ModifyTicketModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyTicketData={modifyTicketData}
      />
    </div>
  );
}

export default TicketListPage;
