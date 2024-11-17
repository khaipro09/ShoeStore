import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Icon from "@ant-design/icons";

import {
  editOptionActionAdmin,
  deleteOptionActionAdmin
} from '../../../../redux/actions'
import {
  Col,
  Row,
  Button,
  Space,
  Popconfirm,
  Card,
  Form,
  Input,
  InputNumber,
} from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';


function ProductOptionItem({ optionItem, productId, }) {

  const [isEditForm, setIsEditForm] = useState(false);
  const dispatch = useDispatch();
  if (isEditForm) {
    return (
      <Card
        title="Cập nhật"
        size="small"
        style={{ marginBottom: 8 }}
      >
        <Form
          name="editProductOption"
          initialValues={optionItem}
          onFinish={(values) => {
            dispatch(editOptionActionAdmin({
              id: optionItem.id,
              data: {
                ...values,
                productId,
              },
            }))
            setIsEditForm(false);
          }}
        >
          <Form.Item name="size" label="Tùy chọn">
            <Input placeholder="Tùy chọn" />
          </Form.Item>
          <Form.Item name="price" label="Giá thêm">
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá thêm"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsEditForm(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Xác nhận</Button>
            </Space>
          </Row>
        </Form>
      </Card>
    )
  }

  return (
    <Card size="small" style={{ marginBottom: 8 }}>
      <Row justify="space-between">
        <Space  >
          <Row>
            <Space >
              <Col ><div>Size: {optionItem.size}</div></Col>
              <Col ><div>{(optionItem.price).toLocaleString()}VNĐ</div></Col>
            </Space>
          </Row>
        </Space>
        <Space>
          <Button type="text" size="small" onClick={() => setIsEditForm(true)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title={`Bạn có chắc muốn xóa ${optionItem.title}`}
            onConfirm={() => dispatch(deleteOptionActionAdmin({ id: optionItem.id }))}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" size="small" danger ><CloseOutlined /></Button>
          </Popconfirm>
        </Space>
      </Row>
    </Card>
  );
}

export default ProductOptionItem;