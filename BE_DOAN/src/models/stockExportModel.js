import mongoose from "mongoose";
import { CREATE, HTTP_METHOD, UPDATE } from "../core/constant/routersConstant.js";
import { createStockExport, exportStock } from "../controller/stockExportController.js";
import { API_LIST } from "../core/helper/controllerHelper.js";

const model = {
  modelName: 'stockExports',
  version: '1',
  apiList: [
    {
      code: CREATE,
      path: "/createStockExports/",
      method: HTTP_METHOD.POST,
      controller: createStockExport,
    },
    {
      code: UPDATE,
      path: "/export/:id",
      method: HTTP_METHOD.POST,
      controller: exportStock,
    },
    ...API_LIST.RUD,
  ],
  data: {
    stockExportCode: {
      type: mongoose.Schema.Types.String,
    },

    stockExportStatus: {
      type: mongoose.Schema.Types.String,
      default: 'Chờ xuất kho',
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
