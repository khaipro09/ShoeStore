import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tag, Button, Input, Space } from "antd";
import moment from "moment";
import * as Icon from "@ant-design/icons";
import ModifyAccountModal from "./components/ModifyAccountModal";
import { getUserListAction, editUserListAction } from "../../../redux/actions";
import * as Style from "./styles";
import { debounce } from "lodash";

function AccountListPage() {
  const [uploadImages, setUploadImage] = useState();
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [modifyUserData, setModifyUserData] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const { userList, userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  // Lấy danh sách người dùng
  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);

  // Xử lý submit form
  const handleSubmitForm = useCallback(
    (values) => {
      dispatch(
        editUserListAction({
          id: modifyUserData.id,
          data: {
            ...values,
            avatar: uploadImages,
          },
        })
      );
      setIsShowModifyModal(false);
    },
    [dispatch, modifyUserData, uploadImages]
  );

  // Cấu hình cột của bảng
  const tableColumn = [
    {
      dataIndex: "avatar",
      width: 100,
      key: "avatar",
      render: (value) => <Style.ImageItem image={value}></Style.ImageItem>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      width: 250,
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: 100,
      key: "gender",
      render: (value) => (value === "female" ? "Nữ" : "Nam"),
    },
    {
      title: "Quyền",
      dataIndex: "role",
      width: 100,
      key: "role",
      render: (value) =>
        value === "admin" ? (
          <Tag color="#8f9117">{value}</Tag>
        ) : (
          <Tag color="#126d19">{value}</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      width: 150,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: (value) => moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày sửa",
      width: 150,
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => a.updatedAt - b.updatedAt,
      render: (value) => moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 150,
      key: "status",
      filters: [
        { text: "Kích hoạt", value: "active" },
        { text: "Khóa", value: "block" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value) =>
        value === "block" ? (
          <span style={{ color: "red" }}>Khóa</span>
        ) : (
          <span style={{ color: "#52c41a" }}>Kích hoạt</span>
        ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setIsShowModifyModal(true);
              setModifyUserData(record);
            }}
          >
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  // Dữ liệu bảng
  const tableData = userList.data.map((userItem, index) => ({
    key: index,
    ...userItem,
  }));

  // Xử lý tìm kiếm
  const handleSearchAccount = debounce((value) => {
    setSearchKey(value);
    dispatch(getUserListAction({ searchKey: value }));
  }, 300);

  return (
    <div>
      <Style.CustomSpace>
        <Style.Title>Quản Lý tài khoản</Style.Title>
        <Style.Search>
          <Input
            placeholder="Tìm kiếm..."
            suffix={<Icon.SearchOutlined />}
            onChange={(e) => handleSearchAccount(e.target.value)}
          />
        </Style.Search>
      </Style.CustomSpace>

      <Style.CustomTable
        size="small"
        scroll={{ x: 1200 }}
        columns={tableColumn}
        dataSource={tableData}
        loading={userList.load}
      />

      <ModifyAccountModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyUserData={modifyUserData}
        uploadImages={uploadImages}
        setUploadImage={setUploadImage}
      />
    </div>
  );
}

export default AccountListPage;
