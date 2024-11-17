import mongoose from "mongoose";
import { CREATE, HTTP_METHOD, UPDATE } from "../core/constant/routersConstant.js";
import { createStockImport, importStock } from "../controller/stockImportController.js";
import { API_LIST } from "../core/helper/controllerHelper.js";

const model = {
  modelName: 'stockImports',
  version: '1',
  apiList: [
    {
      code: CREATE,
      path: "/createStockImports/",
      method: HTTP_METHOD.POST,
      controller: createStockImport,
    },
    {
      code: UPDATE,
      path: "/import/:id",
      method: HTTP_METHOD.POST,
      controller: importStock,
    },
    ...API_LIST.RUD,
  ],
  data: {
    stockImportCode: {
      type: mongoose.Schema.Types.String,
    },

    stockImportStatus: {
      type: mongoose.Schema.Types.String,
      default: 'Chờ nhập kho',
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendors'
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees'
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    },

    color: {
      type: mongoose.Schema.Types.String,
    },

    qty: {
      type: mongoose.Schema.Types.Number,
    },

    cost: {
      type: mongoose.Schema.Types.Number,
    },
  },
};

export default model;
