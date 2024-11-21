import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { generateAutoCodeByFaker } from "../core/helper/generateAutoCodeHelper.js";
import { customerNameList, phoneNumberList } from '../db/db.js'
const SALES = 'sales';

export const salesAggregate = async (req, res) => {
  try {
    const { modelName, data } = req.query;
    const parsedData = JSON.parse(data);
    const { fromDate, toDate } = parsedData;

    if (modelName !== SALES) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    // Validate input data
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const SalesModel = mongoose.model(modelName);

    const mongoMatch = {
      saleDate: {
        $gte: new Date(new Date(fromDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59, 999))
      }
    };

    const reportByDate = await SalesModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
          totalSales: { $sum: { $multiply: ["$productList.saleQty", "$productList.price"] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const reportByProduct = await SalesModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" },
      {
        $group: {
          _id: "$productList.product",
          productCode: { $first: "$productList.productCode" },
          productName: { $first: "$productList.productName" },
          totalSales: { $sum: { $multiply: ["$productList.saleQty", "$productList.price"] } },
          totalQuantity: { $sum: "$productList.saleQty" }
        }
      },
      { $sort: { productName: 1 } }
    ]);

    return res.json({ reportByDate, reportByProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const fakeSales = async (req, res) => {
  try {
    let arrFakeSale = [];
    const numberOfRecordsToAdd = 100; // Số lượng bản ghi bạn muốn thêm

    // Lấy danh sách sản phẩm từ MongoDB
    const productList = await mongoose.model('products').find()
      .populate('category')
      .populate('brand')
      .populate('uom')
      .populate('tax')
      .lean();

    // Lấy danh sách nhân viên từ MongoDB
    const employeeList = await mongoose.model('employees').find(
      {
        role: {
          $in: [
            "66703d86fad16e6b8950fd1f", "667c200f9e5d06e866a34502", "669553bdc67ed71045eee5d9"
          ]
        },
        deleted: false,
        active: true
      }
    ).lean();

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2024-09-05');
    for (let index = 0; index < numberOfRecordsToAdd; index++) {
      const fakerDate = faker.date.between(startDate, endDate);
      const saleNumber = generateAutoCodeByFaker('BH', fakerDate);
      let randomNumberProduct = Math.floor(Math.random() * 3) + 1;
      const productOfSalesList = [];

      // Chọn sản phẩm ngẫu nhiên để bán
      for (let i = 0; i < randomNumberProduct; i++) {
        const randomIndexProduct = Math.floor(Math.random() * productList.length);
        const prod = productList[randomIndexProduct];

        productOfSalesList.push({
          productName: prod.productName,
          saleQty: 1,
          price: prod.price,
          warranty: prod.warranty,
          product: prod._id,
          color: prod.color,
          qty: prod.qty
        });
      }

      const randomIndexEmployee = Math.floor(Math.random() * employeeList.length);
      const randomEmployee = employeeList[randomIndexEmployee];
      console.log("🚀 ~ fakeSales ~ randomEmployee:", randomEmployee)
      const randomIndexCusName = Math.floor(Math.random() * customerNameList.length);
      const randomCusName = customerNameList[randomIndexCusName];
      const randomIndexPhone = Math.floor(Math.random() * phoneNumberList.length);
      const randomPhoneNumber = phoneNumberList[randomIndexPhone];

      let totalAmount = 0;
      for (const p of productOfSalesList) {
        totalAmount += p.price;
      }

      const createdAt = fakerDate;
      const updatedAt = fakerDate;

      let fakeSale = {
        saleNumber: saleNumber,
        productList: productOfSalesList,
        employee: randomEmployee._id,
        customer: randomCusName,
        phoneNumber: randomPhoneNumber,
        saleDate: fakerDate.toISOString(),
        totalAmount: totalAmount,
        active: true,
        deleted: false,
        createdAt: createdAt,
        updatedAt: updatedAt,
        imported: true,
      };

      arrFakeSale.push(fakeSale);
    }

    // Lưu dữ liệu vào cơ sở dữ liệu hoặc xử lý theo cách khác
    await mongoose.model('sales').insertMany(arrFakeSale);

    return res.status(200).json(arrFakeSale);
    // return res.status(200).json({ message: 'Fake sales data generated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

