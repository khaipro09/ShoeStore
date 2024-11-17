import mongoose from "mongoose";
import bcrypt from "bcrypt";

const EMPLOYEES = "employees";

export const loginController = async (req, res) => {
  try {
    console.log("MANAGER LOGIN");
    const { modelName, data } = req.body;
    const { employeeCode, password } = data;

    if (modelName !== EMPLOYEES) {
      return res.status(404).json({ error: "Model is undefined." });
    }

    const Model = mongoose.model(modelName);

    // Tìm người dùng dựa trên employeeCode, không phân biệt chữ hoa/thường
    const existingUser = await Model.findOne({
      employeeCode: { $regex: new RegExp(`^${employeeCode}$`, 'i') }
    }).populate('role');
    
    console.log(existingUser);
    if (!existingUser) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    const isPasswordValid = true;//await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    if (!existingUser.active) {
      return res.status(403).json({ error: 'Account not active' });
    }

    if (existingUser.deleted) {
      return res.status(410).json({ error: 'Account was deleted' });
    }

    // Xóa mật khẩu trước khi trả về người dùng
    const userWithoutPassword = existingUser.toObject();
    delete userWithoutPassword.password;

    res.json({ dataObject: userWithoutPassword });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const createEmployeeController = async (req, res) => {
  try {
    console.log("CREATE EMPLOYEE");
    const { modelName, data } = req.body;
    const { employeeCode, password } = data;
    if (modelName !== EMPLOYEES) {
      throw new Error("Model is undefined.");
    }

    const Model = mongoose.model(modelName);
    const modelAttributes = Object.keys(Model.schema.paths);
    const invalidFields = Object.keys(data).filter(field => !modelAttributes.includes(field));
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Kiểm tra các trường có tham chiếu đến các model khác
    for (const field of Object.keys(data)) {
      const attribute = Model.schema.paths[field];
      if (attribute.options && attribute.options.ref) {
        const referencedModel = mongoose.model(attribute.options.ref);
        const record = await referencedModel.findById(data[field]);
        if (!record) {
          throw new Error(`Referenced record not found for field '${field}'`);
        }
      }
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
    data.password = hashPassword;

    const dataObject = new Model(data);
    await dataObject.save();

    res.json({ dataObject });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export const updateEmployeeController = async (req, res) => {
  try {
    console.log("UPDATE EMPLOYEE");
    const { modelName, id, data } = req.body;
    const { password } = data;

    if (modelName !== EMPLOYEES) {
      throw new Error("Model is undefined.");
    }

    const Model = mongoose.model(modelName);
    const modelAttributes = Object.keys(Model.schema.paths);
    const invalidFields = Object.keys(data).filter(field => !modelAttributes.includes(field));

    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Kiểm tra các trường có tham chiếu đến các model khác
    for (const field of Object.keys(data)) {
      const attribute = Model.schema.paths[field];
      if (attribute.options && attribute.options.ref) {
        const referencedModel = mongoose.model(attribute.options.ref);
        const record = await referencedModel.findById(data[field]);
        if (!record) {
          throw new Error(`Referenced record not found for field '${field}'`);
        }
      }
    }

    const existingUser = await Model.findOne({ _id: id });

    if (!existingUser) {
      return res.status(401).json({ error: 'Employee not found' });
    }

    // So sánh mật khẩu nếu mật khẩu được cung cấp
    if (password) {
      const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
      data.password = hashPassword;
    }

    // Cập nhật thông tin nhân viên
    const updatedEmployee = await Model.findByIdAndUpdate(id, data, { new: true }).populate('role');

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found for update' });
    }

    res.json({ updatedEmployee });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
