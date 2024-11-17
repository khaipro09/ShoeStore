import React, { useState, useEffect } from 'react';
import { Upload, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ value = [], limit, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const convertedValue = value?.map(file => ({
      ...file,
      url: file.absoluteUrl,
    }));
    setFileList(convertedValue);
  }, [value]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const updatedFileList = [];
    for (const file of newFileList) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      updatedFileList.push(file);
    }

    setFileList(updatedFileList);
    onChange(updatedFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
        maxCount={limit}
        beforeUpload={() => false}
      >
        {fileList.length >= limit ? null : uploadButton}
      </Upload>
      <Image
        style={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterClose: () => setPreviewImage(''),
        }}
        src={previewImage}
      />
    </>
  );
};

export default ImageUpload;
