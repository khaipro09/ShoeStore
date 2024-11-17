//http://localhost/v1/orders?modelName=orders&byField={customer=669fc3eb4956aafaf53ff757}   api tìm kiếm theo trường
//http://localhost/v1/products?modelName=products&byField=%7B%22category%22%3A%2266744456a05d2d473e7b7646%22%7D  url trong postman

import mongoose from 'mongoose';
import serviceModelList from '../../models/index.js';
import {
  HTTP_METHOD,
  POST, DELETE, CREATE, GET_LIST,
  EXPORT, GET_BY_ID, UPDATE, AGGREGATE
} from '../constant/routersConstant.js';

export const createController = async (req, res) => {
  try {
    console.log("CREATE CONTROLLER");
    const { modelName, data } = req.body;
    console.log("🚀 ~ createController ~ req.body:", req.body);
    // const payloadSize = Buffer.byteLength(JSON.stringify(req.body), 'utf8');
    // console.log("Kích thước của request body là:", payloadSize, "bytes");

    if (!modelName) {
      throw new Error("Model is undefined.");
    }

    const Model = serviceModelList[modelName].collectionName;
    const modelAttributes = Object.keys(Model.schema.paths);
    const invalidFields = Object.keys(data).filter(field => !modelAttributes.includes(field));

    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Kiểm tra các trường có tham chiếu đến các model khác
    for (const field of Object.keys(data)) {
      const attribute = Model.schema.paths[field];
      if (attribute?.options && attribute?.options?.ref) {
        const referencedModelName = attribute?.options?.ref;
        const referencedModel = serviceModelList[referencedModelName].collectionName;
        const record = await referencedModel.findById(data[field]);
        if (!record) {
          throw new Error(`Referenced record not found for field '${field}'`);
        }
      }
    }

    const dataObject = new Model(data);
    await dataObject.save();

    res.json({ dataObject });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const getListController = async (req, res) => {
  try {
    console.log("GET LIST CONTROLLER");

    let { modelName, fields, page = 1, perPage = 3000, keySearch, byField } = req.query;
    page = parseInt(page);
    page = Math.max(page, 1);
    perPage = parseInt(perPage);
    perPage = Math.max(perPage, 1);

    if (!modelName) {
      throw new Error("Model is undefined.");
    }

    const Model = serviceModelList[modelName].collectionName;

    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage);

    // Nếu có fields, tạo projection object để chỉ định các trường cần lấy
    const projection = fields ? fields.replace(/[\[\]" ]/g, '').split(',').reduce((acc, field) => {
      acc[field.trim()] = 1;
      return acc;
    }, {}) : null;

    // Tìm tất cả các trường có tham chiếu để populate
    const refPopulate = [];
    for (const field in Model.schema.paths) {
      const attribute = Model.schema.paths[field];
      if (attribute?.options?.ref) {
        refPopulate.push({ path: field, model: attribute.options.ref });
      }
    }

    // Tạo điều kiện tìm kiếm
    const searchCondition = { deleted: false };
    if (keySearch) {
      const searchFields = Object.keys(Model.schema.paths).filter(field => Model.schema.paths[field].instance === 'String');
      searchCondition.$or = searchFields.map(field => ({
        [field]: { $regex: keySearch, $options: 'i' }
      }));
    }

    // Xử lý điều kiện lọc theo trường 'byField' nếu có
    if (byField) {
      console.log("🚀 ~ getListController ~ byField:", byField);
      try {
        // Phân tích cú pháp chuỗi byField thành đối tượng
        const byFieldObj = JSON.parse(byField); // Chuyển đổi chuỗi JSON thành đối tượng
        Object.keys(byFieldObj).forEach(key => {
          const value = byFieldObj[key];
          // Kiểm tra xem giá trị có phải là ObjectId không
          if (mongoose.Types.ObjectId.isValid(value)) {
            byFieldObj[key] = new mongoose.Types.ObjectId(value);
          }
        });
        Object.assign(searchCondition, byFieldObj);
      } catch (error) {
        console.error("Error parsing byField:", error);
        throw new Error("Invalid byField format.");
      }
    }

    console.log("🚀 ~ getListController ~ searchCondition:", searchCondition);

    // Truy vấn dữ liệu và populate các trường tham chiếu
    const dataObject = await Model.find(searchCondition, projection)
      .populate(refPopulate)
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({ dataObject });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const exportController = async (req, res) => {
  res.send({
    message: 'exportController'
  }
  );
}

export const getByIdController = async (req, res) => {
  try {
    console.log("GET BY ID CONTROLLER");

    const { modelName, fields } = req.query;
    const { id } = req.params;

    if (!modelName) {
      throw new Error("Model is undefined.");
    }

    // Lấy model từ serviceModelList
    const Model = serviceModelList[modelName]?.collectionName;
    if (!Model) {
      throw new Error("Model not found in serviceModelList.");
    }

    // Tạo projection object nếu có fields
    const projection = fields ? fields.replace(/[\[\]" ]/g, '').split(',').reduce((acc, field) => {
      acc[field.trim()] = 1;
      return acc;
    }, {}) : {};

    // Tìm tất cả các trường có tham chiếu để populate
    const refPopulate = [];
    for (const field in Model.schema.paths) {
      const attribute = Model.schema.paths[field];
      if (attribute?.options?.ref) {
        refPopulate.push({ path: field, model: attribute.options.ref });
      }
    }

    // Truy vấn dữ liệu và populate các trường tham chiếu
    const dataObject = await Model.findById(id, projection, { deleted: false })
      .populate(refPopulate)
      .exec();

    if (!dataObject) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ dataObject });
  } catch (error) {
    console.error('Error in getByIdController:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const updateController = async (req, res) => {
  try {
    console.log("UPDATE CONTROLER");
    const { modelName, data } = req.body;
    console.log("🚀 ~ updateController ~ data:", data)
    const { id } = req.params;

    if (!modelName) {
      throw new Error("Model is undefined.")
    }

    const Model = serviceModelList[modelName].collectionName;
    const modelAttributes = Object.keys(Model.schema.paths);
    const invalidFields = Object.keys(data).filter(field => !modelAttributes.includes(field)); // check field data == field model
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Kiểm tra các trường có tham chiếu đến các model khác
    for (const field of Object.keys(data)) {
      const attribute = Model.schema.paths[field];
      if (attribute.options && attribute.options.ref) {
        const referencedModelName = attribute.options.ref;
        const referencedModel = serviceModelList[referencedModelName].collectionName;
        const record = await referencedModel.findById(data[field]);
        if (!record) {
          throw new Error(`Referenced record not found for field '${field}'`);
        }
      }
    }

    const dataObject = await Model.updateOne(
      { _id: id },
      { $set: data }
    );

    res.json({ dataObject });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export const deleteController = async (req, res) => {
  try {
    const { modelName } = req.query;
    const { id } = req.params;

    if (!modelName) {
      throw new Error("Model is undefined.");
    }

    const Model = serviceModelList[modelName].collectionName;

    const dataObject = await Model.updateOne(
      { _id: id },
      { $set: { deleted: true } }
    );

    res.json({ dataObject });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export const postController = (req, res) => {
  res.send({
    message: 'postController'
  }
  );
}

export const aggregateController = (req, res) => {
  res.send({
    message: 'aggregateController'
  }
  );
}

export const API = {
  CREATE: {
    code: CREATE,
    method: HTTP_METHOD.POST,
    path: '/',
    controller: createController,
  },

  GET_LIST: {
    code: GET_LIST,
    method: HTTP_METHOD.GET,
    path: '/',
    controller: getListController,
  },

  EXPORT: {
    code: EXPORT,
    method: HTTP_METHOD.GET,
    path: '/export',
    controller: exportController,
  },

  GET_BY_ID: {
    code: GET_BY_ID,
    method: HTTP_METHOD.GET,
    path: '/:id',
    controller: getByIdController,
  },

  UPDATE: {
    code: UPDATE,
    method: HTTP_METHOD.PUT,
    path: '/:id',
    controller: updateController,
  },

  DELETE: {
    code: DELETE,
    method: HTTP_METHOD.DELETE,
    path: '/:id',
    controller: deleteController,
  },

  POST: {
    code: POST,
    method: HTTP_METHOD.PATCH,
    path: '/post/:id',
    controller: postController,
  },

  AGGREGATE: {
    code: AGGREGATE,
    method: HTTP_METHOD.PATCH,
    path: '/aggregate/:id',
    controller: aggregateController,
  },
};

export const API_LIST = {
  CRUD: [
    API.CREATE,
    // API.AGGREGATE, // [!] cause of router pipeline, "Aggregate" API" must before "GetById API"
    API.GET_LIST,
    API.GET_BY_ID,
    API.UPDATE,
    API.DELETE,
  ],
  RUD: [
    // API.AGGREGATE, // [!] cause of router pipeline, "Aggregate" API" must before "GetById API"
    API.GET_LIST,
    API.GET_BY_ID,
    API.UPDATE,
    API.DELETE,
  ],
  R: [
    // API.AGGREGATE, // [!] cause of router pipeline, "Aggregate" API" must before "GetById API"
    API.GET_LIST,
    API.GET_BY_ID,
  ],
}