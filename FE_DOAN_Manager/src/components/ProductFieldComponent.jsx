import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { apiGetList } from '~/services/helperServices';
import { t } from 'i18next';

const { Option } = Select;

const ProductSearch = ({ form, name, initProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keySearch, setKeySearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (initProducts && initProducts.length > 0) {
      setProducts(initProducts);
      // Automatically select the first product if initProducts has items
      setSelectedValue(initProducts[0]._id);
      form.setFieldsValue({ [name]: initProducts[0]._id });
    }
  }, [initProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!keySearch) return;

      setLoading(true);
      const data = {
        modelName: 'products',
        data: {},
        keySearch,
        perPage: 10,
      };
      try {
        const response = await apiGetList(data);
        setProducts(response.dataObject);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keySearch]);

  const handleSearch = (value) => {
    setKeySearch(value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
    form.setFieldsValue({ [name]: value });
  };

  return (
    <Select
      showSearch
      placeholder={t('selectProduct')}
      onSearch={handleSearch}
      onChange={handleChange}
      filterOption={false}
      notFoundContent={loading ? <Spin size="small" /> : null}
      style={{ width: '100%' }}
      autoFocus
      value={selectedValue}
    >
      {products.map((product) => (
        <Option key={product._id} value={product._id}>
          {product.productName}
        </Option>
      ))}
    </Select>
  );
};

export default ProductSearch;
