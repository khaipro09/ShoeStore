import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SunEditor from "suneditor-react";
import { Form, Row, Space, Input, Button, Col, Image, Upload } from "antd";
import * as Icon from "@ant-design/icons";

import {
  createBlogAction,
  editBlogAction,
  getBlogDetailAction,
} from "../../../redux/actions";
import { convertFileToBase64 } from "../../../utils/common";

import history from "../../../utils/history";
import * as Style from "./styles";
import { useParams } from "react-router";

function ModifyBlog({ action }) {
  const { blogDetail } = useSelector((state) => state.blogReducer);

  const [uploadImages, setUploadImage] = useState("");
  const [uploadError, setUploadError] = useState("");

  const { id } = useParams();

  const [blogForm] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getBlogDetailAction({ id: id }));
    }
  }, [id]);
  useEffect(
    () => {
      if (blogDetail.data.id && id) {
        blogForm.resetFields();
        setUploadImage(blogDetail.data.thumb);
      } else setUploadImage("");
    },
    [blogDetail.data],
    [id]
  );

  async function handleUploadImage(value) {
    if (!["image/png", "image/jpeg"].includes(value.file.type)) {
      return setUploadError("File không đúng!");
    }
    if (value.file.size > 1024000) {
      return setUploadError("File quá nặng!");
    }
    setUploadError("");
    const imageBase64 = await convertFileToBase64(value.file);
    await setUploadImage(imageBase64);
  }

  function handleSubmitForm() {
    if (uploadImages === "") {
      return setUploadError("Ảnh là bắt buộc!");
    }
    const values = blogForm.getFieldsValue();

    if (action === "create") {
      dispatch(
        createBlogAction({
          data: {
            ...values,
            thumb: uploadImages,
          },
        })
      );
    } else {
      dispatch(
        editBlogAction({
          id: id,
          data: {
            ...values,
            thumb: uploadImages,
          },
        })
      );
    }
    history.push("/admin/blog");
  }

  return (
    <>
      <Style.Container>
        <Style.CustomSpaceBox>
          <Style.Title>
            {action == "create" ? "Thêm" : "Sửa"} Bài viết
          </Style.Title>
          <Space>
            <Button type="default" onClick={() => history.goBack()}>
              Hủy
            </Button>
            <Button type="primary" onClick={() => handleSubmitForm()}>
              Lưu
            </Button>
          </Space>
        </Style.CustomSpaceBox>
        <Form
          layout="vertical"
          form={blogForm}
          className="form"
          name="basic"
          initialValues={id ? blogDetail.data : {}}
          onFinish={handleSubmitForm}
        >
          <Form.Item
            label="Tiêu đề bài viết:"
            name="title"
            rules={[
              { required: true, message: "bạn chưa nhập tiêu đề bài viết!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả bài viết"
            name="desc"
            rules={[
              { required: true, message: "bạn chưa nhập mô tả bài viết!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Space size={0}>
                <div
                  style={{
                    display: "inline-block",
                    marginRight: "4px",
                    color: "#ff4d4f",
                    fontSize: "14px",
                    fontFamily: "SimSun, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  *
                </div>
                <div
                  style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}
                >
                  Hình ảnh bài viết :
                </div>
              </Space>
            </Col>
            <Col span={24}>
              <Upload
                accept="image/*"
                listType="picture"
                beforeUpload={() => false}
                onChange={(value) => handleUploadImage(value)}
                showUploadList={false}
              >
                <Button icon={<Icon.UploadOutlined />}>Click to upload</Button>
              </Upload>
              {uploadImages.length > 0 && (
                <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                  {uploadImages !== "" && (
                    <Col span={6}>
                      <Style.ImagesBox>
                        <Image width="100%" src={uploadImages} />
                        <div
                          className="icon_delete"
                          onClick={() => {
                            setUploadImage("");
                          }}
                        >
                          <Icon.CloseSquareOutlined />
                        </div>
                      </Style.ImagesBox>
                    </Col>
                  )}
                </Row>
              )}
              <div style={{ height: 24, color: "#ff4d4f" }}>{uploadError}</div>
            </Col>
          </Row>
          <Form.Item
            label="Nội dung bài viết"
            name="content"
            rules={[
              { required: true, message: "Bạn chưa nhập nội dung bài viết!" },
            ]}
          >
            <SunEditor
              setOptions={{
                height: 300,
                font: [
                  "Poppins",
                  "Segoe UI",
                  "Arial",
                  "tohoma",
                  "Courier New,Courier",
                ],
                buttonList: [
                  ["font", "formatBlock", "fontSize"],
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                  ],
                  [
                    "fontColor",
                    "hiliteColor",
                    "outdent",
                    "indent",
                    "align",
                    "list",
                    "table",
                  ],
                  ["link", "image"],
                ],
                defaultStyle: `font-family: 'Poppins', 'Aria', sans-serif; font-size: 14px;`,
              }}
              defaultValue={blogForm.getFieldValue("content")}
              onChange={(value) => blogForm.setFieldsValue({ content: value })}
            />
          </Form.Item>
        </Form>
      </Style.Container>
    </>
  );
}
export default ModifyBlog;
