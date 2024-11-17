import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select, Switch } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiGetById, apiGetList } from '~/services/helperServices';

const { Option } = Select;
const { TextArea } = Input;

const CategoryFormPage = () => {
  document.title = "Danh mục";
  const { t } = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = {
          modelName: 'categories',
          data: {},
        };
        const response = await apiGetList(data);
        setCategories(response.dataObject);

        if (id && id !== '0') {
          const categoryData = await apiGetById({ modelName: 'categories', id });
          form.setFieldsValue(categoryData.dataObject); // Sử dụng form.setFieldsValue khi form đã được khởi tạo
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]); // Sử dụng form là dependency của useEffect

  const categoryParentChange = value => {
    const selectedCategory = categories.find(category => category._id === value);

    form.setFieldsValue({
      parentCategoryId: selectedCategory._id,
      parentCategoryCode: selectedCategory.categoryCode,
      parentCategoryName: selectedCategory.categoryName,
    });

    const formData = form.getFieldValue();
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('category')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName="categories" />
          <CreateButton form={form} navigate={navigate} modelName="categories" /> */}
          {/* <DeleteButton id={id} modelName="categories" /> */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName="categories" />
              <UpdateButton form={form} navigate={navigate} id={id} modelName="categories" />
            </>
          ) : (
            <>
              <CreateButton form={form} navigate={navigate} modelName="categories" />
            </>
          )}

        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('categoryCode')} name="categoryCode" rules={[{ required: true, message: "Vui lòng nhập mã danh mục" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('categoryName')} name="categoryName" rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('parentCategoryId')} name="parentCategoryId">
              <Select
                onChange={categoryParentChange}
              >
                {categories
                  .filter(category => category.isParent)
                  .map(category => (
                    <Option key={category._id} value={category._id}>
                      {category.categoryName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={t('isParentCategory')} name="isParent">
              <Switch defaultChecked={false} />
            </Form.Item>
          </Col>
        </Row>

        <Col span={6}>
          <Form.Item label={t('active')} name="active">
            <Switch defaultChecked={true} />
          </Form.Item>
        </Col>

      </Form>
    </div>
  );
};

export default CategoryFormPage;
