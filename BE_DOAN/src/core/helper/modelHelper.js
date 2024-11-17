import mongoose from "mongoose";
import { API_LIST } from "./controllerHelper.js";

const registerModelList = (modelList) => {
  const serviceModelList = {};

  if (!Array.isArray(modelList)) {
    throw new Error('modelList is not an array.');
  }
  
  const permissionModel = {
    modelName: 'permissions',
    version: '1',
    data: {
      apiPath: {
        type: mongoose.Schema.Types.String,
      },
      
      method: {
        type: mongoose.Schema.Types.String,
      },

      perCode: {
        type: mongoose.Schema.Types.String,
      },
      
      perName: {
        type: mongoose.Schema.Types.String,
      },
    },
  };

  const functionModel = {
    modelName: 'functions',
    version: '1',
    data: {
      clientPath: {
        type: mongoose.Schema.Types.String,
      },

      funcName: {
        type: mongoose.Schema.Types.String,
      },

      parentFunc: {
        type: mongoose.Schema.Types.ObjectId,
      },

      isParent: {
        type: mongoose.Schema.Types.Boolean,
      },

      parentFuncName: {
        type: mongoose.Schema.Types.String,
      },
    },
  };
  
  modelList.push(permissionModel);
  modelList.push(functionModel);
  
  modelList.forEach((model) => {
    const { modelName, version, data, apiList } = model;
    
    if (!modelName) {
      throw new Error('modelName is undefined.');
    }

    if (!data) {
      throw new Error('data is undefined.');
    }

    data.active = { type: Boolean, default: true };
    data.createdAt = { type: Date };
    data.updatedAt = { type: Date };
    data.deleted = { type: Boolean, default: false };
    data.deletedAt = { type: Date };

    const schema = new mongoose.Schema(data, { timestamps: true });
    const collectionName = mongoose.model(modelName, schema);
    // const collectionName = mongoose.model(modelName, data);
    serviceModelList[modelName] = {
      modelName,
      collectionName,
      version: version || '1',
      apiList: apiList || API_LIST.CRUD,
      data: data,
    }
  });
  
  return serviceModelList;
};

export default registerModelList; // bất đồng bộ nên hiện chưa có data, registerModelList chạy ngay sau cái này