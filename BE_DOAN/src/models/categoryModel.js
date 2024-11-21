import mongoose from "mongoose";

const model = {
  modelName: 'categories',
  version: '1',
  data: {
    categoryCode: {
      type: mongoose.Schema.Types.String,
    },

    categoryName: {
      type: mongoose.Schema.Types.String,
    },

    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    parentCategoryCode: {
      type: mongoose.Schema.Types.String,
    },

    parentCategoryName: {
      type: mongoose.Schema.Types.String,
    },

    isParent: {
      type: mongoose.Schema.Types.Boolean,
    }
  },
};

export default model;
