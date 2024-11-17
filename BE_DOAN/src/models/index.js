import registerModelList from '../core/helper/modelHelper.js';

// import productModel from './productModel.js';
// import permissionModel from './permissionModel.js'; 
import roleModel from './roleModel.js';
import employeeModel from './empoyeeModel.js';
import uomModel from './uomModel.js';
import categoryModel from './categoryModel.js';
import taxModel from './taxModel.js';
import productModel from './productModel.js';
import customerModel from './customerModel.js';
import customertokenModel from './customertokenModel.js';
import vendorModel from './vendorModel.js';
import stockImportModel from './stockImportModel.js';
import stockExportModel from './stockExportModel.js';
import salesModel from './salesModel.js';
import orderModel from './orderModel.js';
import citiesModel from './citiesModel.js';
import districtModel from './districtModel.js';
import wardModel from './wardModel.js';

const modelList = [
  // userModel,
  // permissionModel,
  roleModel,
  employeeModel,
  uomModel,
  categoryModel,
  taxModel,
  productModel,
  customerModel,
  customertokenModel,
  vendorModel,
  stockImportModel,
  stockExportModel,
  salesModel,
  orderModel,
  citiesModel,
  districtModel,
  wardModel,
];
const serviceModelList = registerModelList(modelList);

export default serviceModelList;