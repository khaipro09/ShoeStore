import React from 'react';
import { Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiDelete } from '~/services/helperServices';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const RemoveButton = ({ id, modelName, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      title: t('delete'),
      content: t('areYouSureDelete'),
      onOk: async () => {
        try {
        } catch (error) {
          console.error('Failed to remove:', error);
          message.error(t('deleteFailed'));
        }
      },
      onCancel() {
        console.log('Cancel remove');
      },
    });
  };

  return (
    <Button
      type="primary"
      onClick={showConfirm}
      {...props}>
      {t('button.remove')}
    </Button>
  );
};

export default RemoveButton;
