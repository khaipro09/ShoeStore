import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { generateAutoCodeByFaker } from "../core/helper/generateAutoCodeHelper.js";
const ORDERS = 'orders';

export const ordersAggregate = async (req, res) => {
  try {
    const { modelName, data } = req.query;
    const parsedData = JSON.parse(data);
    const { fromDate, toDate } = parsedData;

    if (modelName !== ORDERS) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    // Validate input data
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const OrdersModel = mongoose.model(modelName);

    const mongoMatch = {
      orderDate: {
        $gte: new Date(new Date(fromDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59, 999))
      },
      orderState: "Đã giao",
    };

    const reportByDate = await OrdersModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" }, //nếu productList là mảng nhiều phần tử thì trải nó ra thành nhiều bản ghi 1 phần tử
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          totalOrders: { $sum: { $multiply: ["$productList.count", "$productList.price"] } }
        }
      },
      { $sort: { _id: 1 } } // Sắp xếp theo ngày tăng dần
    ]);

    const reportByProduct = await OrdersModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" },
      {
        $group: {
          _id: "$productList.productId",
          productCode: { $first: "$productList.productCode" },
          productName: { $first: "$productList.productName" },
          totalOrders: { $sum: { $multiply: ["$productList.count", "$productList.price"] } },
          totalQuantity: { $sum: "$productList.count" }
        }
      },
      { $sort: { productName: 1 } }
    ]);

    return res.json({ reportByDate, reportByProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const fakeOrders = async (req, res) => {
  try {
    let arrFakeOrder = [];
    const numberOfRecordsToAdd = 100; // Số lượng bản ghi bạn muốn thêm

    const orderStateList = [
      "Chờ phê duyệt",
      "Chờ giao hàng",
      "Đã giao",
      // "	Đã từ chối",
    ]

    const paymentMethodList = [
      "paypal",
      "cod",
    ]
    // Lấy danh sách sản phẩm từ MongoDB
    const productList = await mongoose.model('products').find()
      .populate('category')
      .populate('brand')
      .populate('uom')
      .populate('tax')
      .lean();

    // Lấy danh sách nhân viên từ MongoDB -- NV bán hàng
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

    const customerList = await mongoose.model('customers').find().lean();

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2024-09-05');
    for (let index = 0; index < numberOfRecordsToAdd; index++) {
      const fakerDate = faker.date.between(startDate, endDate);
      const saleNumber = generateAutoCodeByFaker('DH', fakerDate);
      let randomNumberProduct = Math.floor(Math.random() * 3) + 1;
      const productOfOrdersList = [];

      // Chọn sản phẩm ngẫu nhiên để bán
      for (let i = 0; i < randomNumberProduct; i++) {
        const randomIndexProduct = Math.floor(Math.random() * productList.length);
        const prod = productList[randomIndexProduct];

        const modifiedProd = {
          ...prod,
          productId: prod._id, // Đổi tên _id thành productId
          count: 1
        };
        
        // Xóa thuộc tính _id ban đầu nếu không cần thiết
        delete modifiedProd._id;

        productOfOrdersList.push({
          ...modifiedProd
        });
      }

      const randomIndexEmployee = Math.floor(Math.random() * employeeList.length);
      const randomEmployee = employeeList[randomIndexEmployee];

      const randomIndexCustomer = Math.floor(Math.random() * customerList.length);
      const randomCustomer = customerList[randomIndexCustomer];

      const randomIndexState = Math.floor(Math.random() * orderStateList.length);
      const randomState = orderStateList[randomIndexState];

      const randomIndexPaymentMethod = Math.floor(Math.random() * paymentMethodList.length);
      const randomPaymentMethod = paymentMethodList[randomIndexPaymentMethod];

      let totalAmount = 0;
      for (const p of productOfOrdersList) {
        totalAmount += p.price;
      }

      const createdAt = fakerDate;
      const updatedAt = fakerDate;

      let fakeSale = {
        orderNumber: saleNumber,
        productList: productOfOrdersList,
        employee: randomEmployee._id,
        customer: randomCustomer._id,
        orderDate: fakerDate.toISOString(),
        totalAmount: totalAmount,
        paided: randomPaymentMethod === "paypal" ? totalAmount : 0,
        shipTo: "Phủ lỗ - Phường Phú Diễn - Quận Bắc Từ Liêm - Thành phố Hà Nội",
        orderState: "Đã giao",
        // orderState: randomState,
        paymentMethod: randomPaymentMethod,
        active: true,
        deleted: false,
        createdAt: createdAt,
        updatedAt: updatedAt,
        imported: true,
      };

      fakeSale.dataPayment = [
        {
          id: faker.datatype.uuid(), // Tạo ID ngẫu nhiên cho đơn hàng
          intent: "CAPTURE",
          status: "COMPLETED",
          purchase_units: [
            {
              reference_id: "default",
              amount: {
                currency_code: "USD", // Đơn vị tiền tệ là USD
                value: totalAmount.toFixed(2) // Giá trị của đơn hàng
              },
              payee: {
                email_address: "sb-5cxny32054494@business.example.com", // Email PayPal của người nhận
                merchant_id: faker.datatype.uuid() // ID người bán ngẫu nhiên
              },
              shipping: {
                name: {
                  full_name: randomCustomer.customerName // Tên người nhận (khách hàng ngẫu nhiên)
                },
                address: {
                  address_line_1: "1 Main St",
                  admin_area_2: "San Jose",
                  admin_area_1: "CA",
                  postal_code: "95131",
                  country_code: "US"
                }
              },
              payments: {
                captures: [
                  {
                    id: faker.datatype.uuid(), // ID giao dịch ngẫu nhiên
                    status: "COMPLETED",
                    amount: {
                      currency_code: "USD",
                      value: totalAmount.toFixed(2) // Giá trị đã thanh toán
                    },
                    final_capture: true,
                    seller_protection: {
                      status: "ELIGIBLE",
                      dispute_categories: [
                        "ITEM_NOT_RECEIVED",
                        "UNAUTHORIZED_TRANSACTION"
                      ]
                    },
                    create_time: fakerDate.toISOString(),
                    update_time: fakerDate.toISOString()
                  }
                ]
              }
            }
          ],
          payer: {
            name: {
              given_name: "John",
              surname: "Doe"
            },
            email_address: "sb-cikgx32065725@personal.example.com",
            payer_id: faker.datatype.uuid(),
            address: {
              country_code: "US"
            }
          },
          create_time: fakerDate.toISOString(),
          update_time: fakerDate.toISOString(),
          links: [
            {
              href: "https://api.sandbox.paypal.com/v2/checkout/orders/" + faker.datatype.uuid(),
              rel: "self",
              method: "GET"
            }
          ]
        }
      ];


      arrFakeOrder.push(fakeSale);
    }

    // Lưu dữ liệu vào cơ sở dữ liệu hoặc xử lý theo cách khác
    await mongoose.model('orders').insertMany(arrFakeOrder);

    return res.status(200).json(arrFakeOrder);
    // return res.status(200).json({ message: 'Fake sales data generated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};