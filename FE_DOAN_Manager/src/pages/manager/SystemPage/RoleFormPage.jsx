import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Switch, Table, Checkbox } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiGetById, apiGetList } from '~/services/helperServices';
import { MODELNAME } from '~/constants/modelName';

const RoleFormPage = () => {
  document.title = "Thẩm quyền";
  const { t } = useTranslation();
  const { id } = useParams(); // get id from URL parameters
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [functionsList, setFunctionsList] = useState([]);
  const [pageSize, setPageSize] = useState(30); // Default page size

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    // You can add any additional logic here if needed when page size changes
    console.log(`Page size changed to ${size}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const perReq = {
          modelName: MODELNAME.PERMISSIONS,
          data: {},
        };
        const dataPer = await apiGetList(perReq);
        setPermissions(dataPer.dataObject);

        const funcReq = {
          modelName: MODELNAME.FUNCTIONS, // Update to FUNCTIONS
          data: {},
        };
        const dataFunc = await apiGetList(funcReq);
        setFunctions(dataFunc.dataObject);

        if (id && id !== '0') {
          const roleData = await apiGetById({ modelName: MODELNAME.ROLES, id });
          setPermissionList(roleData.dataObject.permissionList?.map(item => item) || []);
          setFunctionsList(roleData.dataObject.functionList?.map(item => item) || []);
          form.setFieldsValue(roleData.dataObject);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  useEffect(() => {
    // When permissions change, update permissionList to reflect current selections
    if (permissions.length > 0 && permissionList.length === 0) {
      const allPermissionIds = permissions.map(item => item._id);
      setPermissionList(allPermissionIds);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        permissionList: allPermissionIds,
      });
    }
  }, [permissions, permissionList.length, form]);

  const columnsConfig = [
    {
      title: t('perCode'),
      dataIndex: 'perCode',
      key: 'perCode',
    },
    {
      title: t('perName'),
      dataIndex: 'perName',
      key: 'perName',
    },
    {
      title: t('apiPath'),
      dataIndex: 'apiPath',
      key: 'apiPath',
    },
    {
      title: t('method'),
      dataIndex: 'method',
      key: 'method',
    },
  ];

  const funcColumnsConfig = [
    {
      title: t('funcName'),
      dataIndex: 'funcName',
      key: 'funcName',
    },
    {
      title: t('clientPath'),
      dataIndex: 'clientPath',
      key: 'clientPath',
    },
  ];

  // Function to get unique values for filtering
  const getUniqueValues = (data, key) => {
    const uniqueValues = [...new Set(data?.map(item => item[key] || 'No Value'))];
    return uniqueValues;
  };

  // Function to handle checkbox change for permissions
  const onCheckboxChange = (permissionId) => {
    const updatedPermissionList = permissionList.includes(permissionId)
      ? permissionList.filter(id => id !== permissionId)
      : [...permissionList, permissionId];

    setPermissionList(updatedPermissionList);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      permissionList: updatedPermissionList,
    });
  };

  // Function to handle checkbox change for functions
  const onCheckboxTableFunctionChange = (functionId) => {
    const updatedFunctionList = functionsList.includes(functionId)
      ? functionsList.filter(id => id !== functionId)
      : [...functionsList, functionId];

    setFunctionsList(updatedFunctionList);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      functionList: updatedFunctionList, // Ensure it matches the form field name
    });
  };

  // Function to handle select all checkbox change for permissions
  const onSelectAllChange = (e) => {
    const checked = e.target.checked;
    const allPermissionIds = permissions.map(item => item._id);

    if (checked) {
      setPermissionList(allPermissionIds);
    } else {
      setPermissionList([]);
    }

    form.setFieldsValue({
      ...form.getFieldsValue(),
      permissionList: checked ? allPermissionIds : [],
    });
  };

  // Function to handle select all checkbox change for functions
  const onSelectAllFunctionsChange = (e) => {
    const checked = e.target.checked;
    const allFunctionIds = functions.map(item => item._id);

    if (checked) {
      setFunctionsList(allFunctionIds);
    } else {
      setFunctionsList([]);
    }

    form.setFieldsValue({
      ...form.getFieldsValue(),
      functionList: checked ? allFunctionIds : [],
    });
  };

  const columns = [
    {
      title: t('index'),
      dataIndex: 'index',
      key: 'index',
      width: 70,
      render: (text, record, index) => index + 1, // Render STT based on the index in the filtered/sorted data
    },
    ...columnsConfig.map(col => ({
      ...col,
      filters: getUniqueValues(permissions, col.dataIndex).map(value => ({ text: value, value })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        const recordValue = record[col.dataIndex] || 'No Value';
        return recordValue.startsWith(value);
      },
      sorter: (a, b) => {
        const aValue = a[col.dataIndex] || '';
        const bValue = b[col.dataIndex] || '';
        return aValue.localeCompare(bValue);
      },
    })),
    {
      title: (
        <Checkbox
          checked={permissionList.length === permissions.length}
          indeterminate={permissionList.length > 0 && permissionList.length < permissions.length}
          onChange={onSelectAllChange}
        />
      ),
      key: 'operation',
      fixed: 'right',
      width: 50,
      render: (text, record) => {
        const isChecked = permissionList.includes(record._id);
        return (
          <Checkbox checked={isChecked} onChange={() => onCheckboxChange(record._id)} />
        );
      },
    },
  ];

  const funcColumns = [
    {
      title: t('index'),
      dataIndex: 'index',
      key: 'index',
      width: 70,
      render: (text, record, index) => index + 1, // Render STT based on the index in the filtered/sorted data
    },
    ...funcColumnsConfig.map(col => ({
      ...col,
      filters: getUniqueValues(functions, col.dataIndex).map(value => ({ text: value, value })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        const recordValue = record[col.dataIndex] || 'No Value';
        return recordValue.startsWith(value);
      },
      sorter: (a, b) => {
        const aValue = a[col.dataIndex] || '';
        const bValue = b[col.dataIndex] || '';
        return aValue.localeCompare(bValue);
      },
    })),
    {
      title: (
        <Checkbox
          checked={functionsList.length === functions.length}
          indeterminate={functionsList.length > 0 && functionsList.length < functions.length}
          onChange={onSelectAllFunctionsChange}
        />
      ),
      key: 'operation',
      fixed: 'right',
      width: 50,
      render: (text, record) => {
        const isChecked = functionsList.includes(record._id);
        return (
          <Checkbox checked={isChecked} onChange={() => onCheckboxTableFunctionChange(record._id)} />
        );
      },
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('role')}</div>
        <div className="button-list">
          <BackButton />
          {/* <UpdateButton form={form} navigate={navigate} id={id} modelName={MODELNAME.ROLES} />
          <DeleteButton id={id} modelName={MODELNAME.ROLES} />
          <CreateButton form={form} navigate={navigate} modelName={MODELNAME.ROLES} /> */}

          {id && id !== '0' ? (
            <>
              <DeleteButton id={id} modelName={MODELNAME.ROLES} />
              <UpdateButton form={form} navigate={navigate} id={id} modelName={MODELNAME.ROLES} />
            </>
          ) : (
            <>
              <CreateButton form={form} navigate={navigate} modelName={MODELNAME.ROLES} />
            </>
          )}

        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('roleCode')} name="roleCode" rules={[{ required: true, message: "Vui lòng nhập mã thẩm quyền" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('roleName')} name="roleName" rules={[{ required: true, message: "Vui lòng nhập tên thẩm quyền" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Form.Item label={t('active')} name="active">
              <Switch defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>

        <label style={{ fontWeight: 'bold', fontSize: 20 }}>{t("permissionList")}</label>
        <div>&nbsp;</div>

        <Table
          columns={columns}
          dataSource={permissions}
          loading={loading}
          style={{ minHeight: '400px' }}
          scroll={{ x: 800, y: 400 }}
          size="small"
          rowKey="_id"
          pagination={{
            pageSize: pageSize, // Current page size
            showSizeChanger: true,
            pageSizeOptions: ['30', '50', '100', '200'], // Options for page size
            onShowSizeChange: handlePageSizeChange,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`, // Show total records
          }}
        />

        <label style={{ fontWeight: 'bold', fontSize: 20 }}>{t("functionList")}</label>
        <div>&nbsp;</div>

        <Table
          columns={funcColumns}
          dataSource={functions}
          loading={loading}
          style={{ minHeight: '400px' }}
          scroll={{ x: 800, y: 400 }}
          size="small"
          rowKey="_id"
          pagination={{
            pageSize: pageSize, // Current page size
            showSizeChanger: true,
            pageSizeOptions: ['30', '50', '100', '200'], // Options for page size
            onShowSizeChange: handlePageSizeChange,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`, // Show total records
          }}
        />
      </Form>
    </div>
  );
};

export default RoleFormPage;
