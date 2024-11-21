import mongoose from "mongoose";

const model = {
  modelName: 'uoms',
  version: '1',
  data: {
    uomCode: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    uomName: {
      type: mongoose.Schema.Types.String,
    },
  },
};

export default model;
