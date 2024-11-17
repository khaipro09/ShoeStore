import React from 'react';
import { Button, Tooltip } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to, tooltip, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Quay về trang trước đó
    }
  };

  return (
    <Tooltip title={tooltip || t('button.back')}>
      <Button
        type="primary"
        onClick={handleClick}
        {...props}
      >
        {t('button.back')}
      </Button>
    </Tooltip>
  );
};

export default BackButton;
