import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Space, Popconfirm } from "antd";
import * as Icon from "@ant-design/icons";
import { debounce } from "lodash";

import ModifyCategoryModal from "./components/ModifyCategoryModal";
import {
  getCategoryListAction,
  createCategoryAction,
  editCategoryAction,
  deleteCategoryAction,
} from "../../../redux/actions";

import * as Style from "./styles";

function CategoryListPage() {
  const [searchKey, setSearchKey] = useState("");
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modifyCategoryData, setModifyCategoryData] = useState({});

  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, [dispatch]);

  // Handle search with debounce
  const handleSearchCategory = debounce((value) => {
    setSearchKey(value);
    dispatch(getCategoryListAction({ searchKey: value }));
  }, 300);

  // Calculate total quantity
  const totalQuantityProduct = (products) =>
    products.reduce(
      (total, product) => total + (product.quantity || 0),
      0
    );

  // Calculate total sold
  const totalSoldProduct = (products) =>
    products.reduce(
      (total, product) => total + (product.sold || 0),
      0
    );

  // Columns for table
  const tableColumn = [
    {
      title: "Loại",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tổng số lượng",
      dataIndex: "products",
      key: "totalQuantity",
      render: totalQuantityProduct,
      sorter: (a, b) =>
        totalQuantityProduct(a.products) - totalQuantityProduct(b.products),
    },
    {
      title: "Đã bán",
      dataIndex: "products",
      key: "totalSold",
      render: totalSoldProduct,
      sorter: (a, b) =>
        totalSoldProduct(a.products) - totalSoldProduct(b.products),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<Icon.FormOutlined />}
            type="primary"
            ghost
            onClick={() => {
              setIsEditMode(true);
              setModifyCategoryData(record);
              setIsShowModifyModal(true);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này không?"
            onConfirm={() => dispatch(deleteCategoryAction({ id: record.id }))}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<Icon.DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tableData = categoryList.data.map((category, index) => ({
    key: index,
    ...category,
  }));

  const handleFormSubmit = (values) => {
    if (isEditMode) {
      dispatch(
        editCategoryAction({
          id: modifyCategoryData.id,
          data: values,
        })
      );
    } else {
      dispatch(createCategoryAction({ data: values }));
    }
    setIsShowModifyModal(false);
  };

  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý loại sản phẩm</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchCategory(e.target.value)}
            />
          </Style.Search>
          <Button
            type="primary"
            onClick={() => {
              setIsEditMode(false);
              setModifyCategoryData({ name: "", price: 0 });
              setIsShowModifyModal(true);
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
        loading={categoryList.load}
      />
      <ModifyCategoryModal
        isVisible={isShowModifyModal}
        onCancel={() => setIsShowModifyModal(false)}
        onSubmit={handleFormSubmit}
        initialValues={modifyCategoryData}
      />
    </div>
  );
}

export default CategoryListPage;
