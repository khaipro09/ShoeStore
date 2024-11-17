import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { VALUE_CUS } from "../core/constant/valueConstant.js";
import mailer from '../core/config/mailer.js';

const CUSTOMERS = 'customers'
const CUSTOMERTOKENS = 'customertokens'

export const loginController = async (req, res) => {
  try {
    console.log("LOGIN");
    const { modelName, data } = req.body;
    const { email, password } = data;

    if (modelName !== CUSTOMERS) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    const CustomerModel = mongoose.model(modelName);

    const customer = await CustomerModel.findOne({ email });
    if (customer) {
      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid Password' });
      }
      if (!customer.active) {
        return res.status(401).json({ error: 'Email not active' });
      }
      if (customer.deleted) {
        return res.status(401).json({ error: 'Account was deleted' });
      }

      delete customer.password;

      const token = Jwt.sign({ data: customer }, process.env.JWT_SECRET, { expiresIn: '30 days' });
      const dataObject = {
        data: customer,
        token: token
      };

      return res.json({ dataObject });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


export const signinController = async (req, res) => {
  try {
    console.log("SIGNIN");
    const { modelName, data } = req.body;
    const { customerName, email, password, avatar, phoneNumber } = data;

    if (modelName !== CUSTOMERS) {
      throw new Error("Model is undefined.");
    }

    const CustomerModel = mongoose.model(modelName);
    const CustomerTokenModel = mongoose.model(CUSTOMERTOKENS);

    const existingCustomer = await CustomerModel.findOne({ email });
    if (existingCustomer) {
      throw new Error("email already exists");
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
    const newCustomer = await CustomerModel.create({
      active: false,
      avatar,
      email,
      password: hashPassword,
      customerName,
      phoneNumber,
      roleId: VALUE_CUS.ID,
    })
    console.log("🚀 ~ signinController ~ newCustomer:", newCustomer)

    delete newCustomer.password;
    const subject = "Hello ✔";
    const cusToken = Jwt.sign({ data: email }, process.env.JWT_SECRET, { expiresIn: '3m' });

    const newToken = await CustomerTokenModel.create({
      customerId: newCustomer.id,
      token: cusToken
    })

    if (!newCustomer || !newToken) {
      throw new Error("Can't create User");
    }

    const html = `Hello ${email},
    Please verify your account by clicking the link:
    http://${req.headers.host}/v1/customers/verifyMail/${newCustomer.id}/${cusToken}
    Thank You!
    `;

    await mailer(email, subject, html);

    return res.status(200).json(
      {
        status: "SIGNIN SUCCESS",
      }
    )
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const verifyController = async (req, res) => {
  try {
    const cusId = req.params.id;
    console.log("🚀 ~ verifyController ~ cusId:", cusId)
    const token = req.params.token;

    const CustomerModel = mongoose.model(CUSTOMERS);
    const CustomerTokenModel = mongoose.model(CUSTOMERTOKENS);

    const existingCus = await CustomerModel.findById(cusId);
    if (!existingCus) {
      throw new Error("Cus not exists");
    }

    const existingToken = await CustomerTokenModel.findOne({ customerId: existingCus._id, token: token });

    if (!existingToken) {
      throw new Error("Token not exists");
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.exp < Date.now() / 1000) {
      throw new Error(`Link has expired`);
    } else {
      existingCus.active = true;
      await existingCus.save();
      // await UserToken.findByIdAndRemove(existingToken._id);
    }
    const successMessage = `
            <div style="text-align: center; padding: 20px; background-color: #dff0d8; color: #3c763d; border: 1px solid #d6e9c6; border-radius: 5px;">
                <h1>Email verified successfully</h1>
                <p>Please <a href="http://localhost:3000/login">login</a> to continue.</p>
            </div>`;
    res.send(successMessage);

  } catch (error) {
    const errorMessage = '<div style="text-align: center; padding: 20px; background-color: #f2dede; color: #a94442; border: 1px solid #ebccd1; border-radius: 5px;"><h1>Email verification failed</h1></div>';
    res.send(errorMessage);
  }
};

export const updateCustomerController = async (req, res) => {
  try {
    console.log("UPDATE CUSTOMER");
    const { modelName, id, data } = req.body;
    console.log("🚀 ~ updateCustomerController ~ data:", data)
    const { password = null } = data;

    if (modelName !== CUSTOMERS) {
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
      return res.status(401).json({ error: 'Customer not found' });
    }

    // So sánh mật khẩu nếu mật khẩu được cung cấp
    if (password) {
      const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
      data.password = hashPassword;
    }

    // Cập nhật thông tin nhân viên
    const updatedEmployee = await Model.findByIdAndUpdate(id, data, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found for update' });
    }

    res.json({ dataObject: updatedEmployee });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const changePasswordCustomerController = async (req, res) => {
  try {
    console.log("CHANGE PASSWORD CUSTOMER");
    const { modelName, id, data } = req.body;
    const { password = null, newPassword = null } = data;

    if (modelName !== CUSTOMERS) {
      throw new Error("Model is undefined.");
    }

    const Model = mongoose.model(modelName);

    const existingUser = await Model.findOne({ _id: id });

    if (!existingUser) {
      return res.status(401).json({ error: 'Customer not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    const hashNewPassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALT));
    data.password = hashNewPassword;

    // Cập nhật thông tin nhân viên
    const updatedEmployee = await Model.findByIdAndUpdate(id, data, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found for update' });
    }

    res.json({ dataObject: updatedEmployee });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};