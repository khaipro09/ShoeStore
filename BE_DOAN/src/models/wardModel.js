import mongoose from "mongoose";
import { API_LIST } from "../core/helper/controllerHelper.js";

const model = {
  modelName: 'wards',
  version: '1',
  data: {
    id: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    code: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    parentcode: {
      type: mongoose.Schema.Types.String,
    },

    name: {
      type: mongoose.Schema.Types.String,
    },

    status: {
      type: mongoose.Schema.Types.String,
    },

    region: {
      type: mongoose.Schema.Types.String,
    },
  },
};

export default model;
