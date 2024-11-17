import React from 'react';
import { Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiDelete } from '~/services/helperServices';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const DeleteButton = ({ id, modelName, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      title: t('delete'),
      content: t('areYouSureDelete'),
      onOk: async () => {
        try {
          const data = {
            modelName,
            id: id,
          };
          await apiDelete(data);
          message.success(t('messages.deleteSuccess'));
          navigate(-1); // Quay lại trang trước đó
        } catch (error) {
          console.error('Failed to delete:', error);
          message.error(t('messages.deleteFailed'));
        }
      },
      onCancel() {
        console.log('Cancel delete');
      },
    });
  };

  return (
    <Button
      type="primary"
      onClick={showConfirm}
      {...props}>
      {t('button.delete')}
    </Button>
  );
};

export default DeleteButton;
