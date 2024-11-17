// CreateButton.js
import React from 'react';
import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiUpdate } from '~/services/helperServices';

const UpdateButton = ({ modelName, form, id, navigate, ...props }) => {
  const { t } = useTranslation();

  const handleCreate = async () => {
    try {
      const formData = form.getFieldValue();
      console.log("🚀 ~ handleCreate ~ formData:", formData)
      const data = {
        modelName: modelName,
        id,
        data: formData,
      };
      await apiUpdate(data);
      message.success(t('messages.updateSuccess'));
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Failed to update item:', error);
      message.error(t('messages.updateFail'));
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleCreate}
      {...props}
    >
      {t('button.update')}
    </Button>
  );
};

export default UpdateButton;
