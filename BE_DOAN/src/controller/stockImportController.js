import mongoose from "mongoose";

const STOCKIMPORTS = 'stockImports';
const PRODUCTS = 'products';

export const createStockImport = async (req, res) => {
  try {
    const { modelName, data } = req.body;
    const { stockImportCode, employee, vendor, product, color, qty, cost } = data;

    console.log("🚀 ~ createStockImport ~ data:", data);

    if (modelName !== STOCKIMPORTS) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    // Validate input data
    if (!stockImportCode || !employee || !vendor || !product || !qty || !cost) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const StockImportModel = mongoose.model(modelName);
    const ProductModel = mongoose.model(PRODUCTS);

    // Create new stock import record
    const newStockImport = new StockImportModel({
      stockImportCode,
      employee,
      vendor,
      product,
      color,
      qty,
      cost,
    });

    await newStockImport.save();

    return res.json({ dataObject: newStockImport });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const importStock = async (req, res) => {
  try {
    const { modelName, data } = req.body;
    const { stockImportCode, employee, vendor, product, color, qty } = data;
    const { id } = req.params;
    console.log("🚀 ~ importStock ~ id:", id)

    if (modelName !== STOCKIMPORTS) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    if (!stockImportCode || !employee || !vendor || !product || !qty) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const StockImportModel = mongoose.model(STOCKIMPORTS);
    const ProductModel = mongoose.model(PRODUCTS);

    const stockImport = await StockImportModel.findById(id);
    if (!stockImport) {
      return res.status(404).json({ error: "Stock import record not found." });
    }

    stockImport.stockImportStatus = "Đã nhập kho";
    await stockImport.save();

    const productUpdate = await ProductModel.findById(product);
    if (!productUpdate) {
      return res.status(404).json({ error: "Product not found." });
    }

    productUpdate.qty += qty;
    await productUpdate.save();

    return res.json({ dataObject: stockImport });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};