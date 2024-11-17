// CreateButton.js
import React from 'react';
import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiCreate } from '~/services/helperServices';

const CreateButton = ({ modelName, form, navigate, ...props }) => {
  const { t } = useTranslation();

  const handleCreate = async () => {
    try {
      const formData = await form.getFieldValue();
      console.log("🚀 ~ !!!!handleCreate ~ formData:", formData)
      const data = {
        modelName: modelName,
        data: formData,
      };
      await apiCreate(data);
      message.success(t('messages.createSuccess'));
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Failed to create item:', error);
      message.error(t('messages.createFail'));
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleCreate}
      {...props}
    >
      {t('button.create')}
    </Button>
  );
};

export default CreateButton;