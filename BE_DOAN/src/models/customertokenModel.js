import mongoose from "mongoose";

const model = {
  modelName: 'customertokens',
  version: '1',
  data: {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    token: {
      type: mongoose.Schema.Types.String,
    },
  },
};

export default model;
