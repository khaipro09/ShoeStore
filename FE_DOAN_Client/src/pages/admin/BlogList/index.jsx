import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Space, Popconfirm, List, Input } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../../utils/history";
import moment from "moment";

import { deleteBlogAction, getBlogListAction } from "../../../redux/actions";

import * as Style from "./styles";

function BlogListPage(props) {
  const { blogList } = useSelector((state) => state.blogReducer);
  const [searchKey, setSearchKey] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogListAction());
  }, []);

  function handleSearchBlog(value) {
    setSearchKey(value);
    dispatch(
      getBlogListAction({
        searchKey: value,
      })
    );
  }

  const tableColumn = [
    {
      dataIndex: "thumb",
      key: "thumb",
      render: (value) => <Style.ShowImage src={value}></Style.ShowImage>,
      width: 150,
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      width: 300,
    },

    {
      title: "Mô tả bài viết",
      dataIndex: "desc",
      key: "desc",
      ellipsis: true,
      width: 300,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
      width: 150,
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
      width: 150,
    },

    {
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
                history.push(`/admin/blog/edit/${record.id}`);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có muốn xoá bài viết này?"
              onConfirm={() => dispatch(deleteBlogAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<Icon.DeleteOutlined />} danger>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const tableData = blogList.data.map((blogItem, blogIndex) => {
    return {
      key: blogIndex,
      ...blogItem,
    };
  });

  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý bài viết</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              value={searchKey}
              onChange={(e) => handleSearchBlog(e.target.value)}
            />
          </Style.Search>
          <Style.CustomButton
            type="primary"
            onClick={() => history.push("/admin/blog/create")}
          >
            Thêm mới
          </Style.CustomButton>
        </Style.CustomSpace>
      </Style.CustomSpaceBox>
      <Style.CustomTable
        size="small"
        scroll={{ x: 1250 }}
        columns={tableColumn}
        dataSource={tableData}
        loading={blogList.load}
      />
    </div>
  );
}

export default BlogListPage;
