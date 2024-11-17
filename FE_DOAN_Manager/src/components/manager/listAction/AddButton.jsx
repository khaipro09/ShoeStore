import React from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

const AddButton = ({ to, tooltip, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <Tooltip title={tooltip || t('button.add')}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleClick}
        {...props}
      />
    </Tooltip>
  );
};

export default AddButton;
