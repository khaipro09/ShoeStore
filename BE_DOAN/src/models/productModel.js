import mongoose from 'mongoose';

const model = {
  modelName: 'products',
  version: '1',
  data: {
    productCode: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    productName: {
      type: mongoose.Schema.Types.String,
    },
    images: {
      type: mongoose.Schema.Types.Array,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    qty: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    sold: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    specifications: {
      type: mongoose.Schema.Types.String,
    },
    description: {
      type: mongoose.Schema.Types.String,
    },
    color: {
      type: mongoose.Schema.Types.String,
    },
    warranty: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
    },
    uom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'uoms',
    },
    tax: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'taxs',
    },
  },
};

export default model;
