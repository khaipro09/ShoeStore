import serviceModelList from '../../models/index.js';
import { MODELS } from '../constant/modelConstant.js';
import { API_LIST } from './controllerHelper.js';

const registerRouterList = async (router) => {
  try {
    if (!serviceModelList) {
      throw new BosError('serviceModelList is undefined.', BOS_ERROR.INVALID_ARG_VALUE);
    }

    for (const model of Object.values(serviceModelList)) {
      const { modelName, version, apiList } = model;
      const normalizedApiList = apiList || API_LIST.CRUD;

      for (const api of normalizedApiList) {
        const { code, path, method, controller } = api;

        if (!code || !path || !method || !controller) {
          throw new BosError('Invalid API configuration.', BOS_ERROR.INVALID_ARG_VALUE);
        }

        router[method](`/v${version || 1}/${modelName}${path}`, controller);

        const permissionModel = serviceModelList[MODELS.permissionModel].collectionName;
        const permissionData = {
          apiPath: `/v${version || 1}/${modelName}${path}`,
          method: `${method}`,
          perCode: `${code}_${modelName}`,
          perName: `${code} ${modelName}`,
        };

        const modelAttributes = Object.keys(permissionModel.schema.paths);
        const invalidFields = Object.keys(permissionData).filter(field => !modelAttributes.includes(field));

        if (invalidFields.length > 0) {
          throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
        }

        const existingPermission = await permissionModel.findOne({
          perCode: permissionData.perCode,
          perName: permissionData.perName
        });

        // Nếu bản ghi không tồn tại, tạo mới
        if (!existingPermission) {
          await permissionModel.create(permissionData);
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

export {
  registerRouterList
};

