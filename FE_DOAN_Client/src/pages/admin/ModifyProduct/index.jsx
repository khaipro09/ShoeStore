import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SunEditor from "suneditor-react";
import {
  Form,
  Row,
  Card,
  Space,
  Input,
  Button,
  InputNumber,
  Col,
  Image,
  Radio,
  Upload,
  Checkbox,
  Select,
} from "antd";
import * as Icon from "@ant-design/icons";

import {
  setProductSelectActionAdmin,
  getCategoryListAction,
  createProductActionAdmin,
  editProductActionAdmin,
  createOptionActionAdmin,
  getProductDetailActionAdmin,
  getDepartmentListAction,
} from "../../../redux/actions";
import { convertFileToBase64 } from "../../../utils/common";
import ProductOptionItem from "../components/ProductOptionItem";

import history from "../../../utils/history";
import * as Style from "./styles";

const COLOR_MENU = [
  {
    name: "đỏ",
    code: "e7352b",
  },
  {
    name: "trắng",
    code: "ffffff",
  },
  {
    name: "đen",
    code: "000000",
  },
  {
    name: "xanh dương",
    code: "1790c8",
  },
  {
    name: "cam",
    code: "f36b26",
  },
  {
    name: "nâu",
    code: "825d41",
  },
  {
    name: "xanh la",
    code: "7bba3c",
  },
  {
    name: "vàng",
    code: "fed533",
  },
  {
    name: "xám",
    code: "808080",
  },
  {
    name: "hồng",
    code: "f0728f",
  },
  {
    name: "xanh ngọc",
    code: "02cbb5",
  },
  {
    name: "nhiều màu",
    code: "multiColor",
  },
];

function ModifyProduct({ action, match }) {
  const [uploadImages, setUploadImage] = useState([]);
  const [uploadError, setUploadError] = useState("");

  const productId = match.params?.id;
  const { Option } = Select;
  const [productForm] = Form.useForm();

  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productDetail } = useSelector((state) => state.productReducerAdmin);
  const { departmentList } = useSelector((state) => state.departmentReducer);
  const { productSelected } = useSelector(
    (state) => state.commonProductReducerAdmin
  );

  const [isOptionForm, setIsOptionForm] = useState(false);
  const [isShowCreateOption, setIsShowCreateOption] = useState(false);
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getDepartmentListAction());
  }, []);
  useEffect(() => {
    if (productId) {
      dispatch(getProductDetailActionAdmin({ id: productId }));
    }
  }, [productId]);
  useEffect(
    () => {
      if (productDetail.data.id && productId) {
        productForm.resetFields();
        setUploadImage([...productDetail.data.images]);
        dispatch(setProductSelectActionAdmin(productDetail.data));
      } else setUploadImage([]);
    },
    [productDetail.data],
    [productId]
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
    await setUploadImage([...uploadImages, imageBase64]);
  }

  function renderProductImages() {
    return uploadImages.map((imageItem, imageIndex) => (
      <Col span={6}>
        <Style.ImagesBox>
          <Image width="100%" src={imageItem} />
          <div
            className="icon_delete"
            onClick={() => {
              const newUploadImages = [...uploadImages];
              newUploadImages.splice(imageIndex, 1);
              console.log(newUploadImages);
              setUploadImage(newUploadImages);
            }}
          >
            <Icon.CloseSquareOutlined />
          </div>
        </Style.ImagesBox>
      </Col>
    ));
  }

  function renderProductOptionItems() {
    return productSelected.productOptions.map((optionItem, optionIndex) => {
      return (
        <ProductOptionItem
          key={optionIndex}
          optionItem={optionItem}
          productId={productSelected.id}
        />
      );
    });
  }
  function renderCreateOptionForm() {
    return (
      <Card size="small" title="Thêm mới">
        <Form
          layout="vertical"
          name="createProductOption"
          onFinish={(values) => {
            dispatch(
              createOptionActionAdmin({
                data: {
                  ...values,
                  productId: parseInt(productId),
                },
              })
            );
            setIsShowCreateOption(false);
          }}
        >
          <Form.Item
            name="size"
            label="Size"
            rules={[
              { required: true, message: "Bạn chưa điền tên của tùy chọn" },
            ]}
          >
            <InputNumber placeholder="Tùy chọn" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[
              { required: true, message: "Bạn chưa điền giá của tùy chọn" },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder="Giá thêm"
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsShowCreateOption(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    );
  }
  function renderProductOptionForm() {
    return (
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <h4>Danh sách tùy chọn</h4>
          {productSelected.id &&
            productSelected.productOptions.length > 0 &&
            renderProductOptionItems()}
          {isShowCreateOption ? (
            renderCreateOptionForm()
          ) : (
            <Button
              type="dashed"
              block
              icon={<Icon.PlusOutlined />}
              onClick={() => setIsShowCreateOption(true)}
            >
              Thên tùy chọn
            </Button>
          )}
        </Col>
      </Row>
    );
  }

  function handleSubmitForm() {
    if (uploadImages.length === 0) {
      return setUploadError("Ảnh là bắt buộc!");
    }
    const values = productForm.getFieldsValue();
    console.log("🚀 ~ file: index.jsx ~ line 233 ~ handleSubmitForm ~ values", {
      ...values,
      images: uploadImages,
    });
    if (action === "create") {
      dispatch(
        createProductActionAdmin({
          data: {
            ...values,
            images: uploadImages,
          },
        })
      );
    } else {
      dispatch(
        editProductActionAdmin({
          id: productId,
          data: {
            ...values,
            images: uploadImages,
          },
        })
      );
    }
    history.push("/admin/products");
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  function renderOptionCategory() {
    return categoryList.data.map((categoryItem) => {
      return (
        <>
          <Option value={categoryItem.id}>{categoryItem.name}</Option>
        </>
      );
    });
  }
  function renderOptionDepartment() {
    return departmentList.data.map((departmentItem) => {
      return (
        <>
          <Option value={departmentItem.id}>{departmentItem.name}</Option>
        </>
      );
    });
  }
  function renderOptionColor() {
    return COLOR_MENU.map((colorItem, colorIndex) => {
      return (
        <Style.CustomRadio value={colorItem.code}>
          {colorItem.code === "ffffff" || colorItem.code === "multiColor" ? (
            <Style.CustomTag>{colorItem.name}</Style.CustomTag>
          ) : (
            <Style.CustomTag color={`#${colorItem.code}`}>
              {colorItem.name}
            </Style.CustomTag>
          )}
        </Style.CustomRadio>
      );
    });
  }

  return (
    <>
      <Style.Container>
        <Style.CustomSpaceBox>
          <Style.Title>
            {action === "create" ? "Thêm" : "Sửa"} Sản Phẩm
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
        <Row>
          <Col xl={{ span: 20 }}>
            <Form
              layout="vertical"
              form={productForm}
              className="form"
              name="basic"
              labelCol={{ span: 4 }}
              initialValues={productId ? productDetail.data : {}}
              onFinish={handleSubmitForm}
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "bạn chưa nhập tên sản phẩm!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: "bạn chưa nhập giá!" }]}
              >
                <InputNumber />
              </Form.Item>
              {action == "create" ? (
                <Form.Item
                  label="Số lượng"
                  name="quantity"
                  rules={[
                    { required: true, message: "bạn chưa nhập số lượng!" },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              ) : null}
              <Form.Item
                label="Loại"
                name="categoryId"
                rules={[{ required: true, message: "Bạn chưa chọn loại" }]}
              >
                <Select>{renderOptionCategory()}</Select>
              </Form.Item>
              <Form.Item
                label="Đối tượng sử dụng"
                name="departmentId"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn đối tượng sử dụng",
                  },
                ]}
              >
                <Select>{renderOptionDepartment()}</Select>
              </Form.Item>
              <Form.Item
                label="Màu sắc"
                name="color"
                rules={[{ required: true, message: "bạn chưa chọn màu" }]}
              >
                <Radio.Group>{renderOptionColor()}</Radio.Group>
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
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#000",
                      }}
                    >
                      Hình ảnh
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
                    <Button icon={<Icon.UploadOutlined />}>
                      Click to upload
                    </Button>
                  </Upload>
                  {uploadImages.length > 0 && (
                    <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                      {renderProductImages()}
                    </Row>
                  )}
                  <div style={{ height: 24, color: "#ff4d4f" }}>
                    {uploadError}
                  </div>
                </Col>
              </Row>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Bạn chưa nhập mô tả!" }]}
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
                    defaultStyle: `font-family: 'poppins', 'Aria', sans-serif; font-size: 14px;`,
                  }}
                  defaultValue={productForm.getFieldValue("description")}
                  onChange={(value) =>
                    productForm.setFieldsValue({ description: value })
                  }
                />
              </Form.Item>
            </Form>
            {action === "edit" ? (
              <Form.Item label="Tùy chọn">
                <Checkbox
                  checked={isOptionForm}
                  onChange={(e) => setIsOptionForm(e.target.checked)}
                />
              </Form.Item>
            ) : null}

            {isOptionForm && productSelected.id && renderProductOptionForm()}
          </Col>
        </Row>
      </Style.Container>
    </>
  );
}
export default ModifyProduct;
