import React from 'react';
import { Button, Tooltip } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const ExportButton = ({ onClick, tooltip, ...props }) => {

  return (
    <Tooltip title={t('button.export')}>
      <Button
        type="primary"
        icon={<CloudDownloadOutlined />}
        onClick={onClick}
        {...props}
      />
    </Tooltip>
  );
};

export default ExportButton;
