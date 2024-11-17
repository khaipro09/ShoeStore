import mongoose from "mongoose";

const STOCKEXPORTS = 'stockExports';
const PRODUCTS = 'products';

export const createStockExport = async (req, res) => {
  try {
    const { modelName, data } = req.body;
    const { stockExportCode, employee, vendor, product, color, qty, cost } = data;

    console.log("🚀 ~ createStockExport ~ data:", data);

    if (modelName !== STOCKEXPORTS) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    // Validate input data
    if (!stockExportCode || !employee || !vendor || !product || !qty || !cost) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const StockExportModel = mongoose.model(modelName);
    const ProductModel = mongoose.model(PRODUCTS);

    // Create new stock export record
    const newStockExport = new StockExportModel({
      stockExportCode,
      employee,
      vendor,
      product,
      color,
      qty,
      cost,
    });

    await newStockExport.save();

    return res.json({ dataObject: newStockExport });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const exportStock = async (req, res) => {
  try {
    const { modelName, data } = req.body;
    const { stockExportCode, employee, vendor, product, color, qty } = data;
    const { id } = req.params;
    console.log("🚀 ~ importStock ~ id:", id)

    if (modelName !== STOCKEXPORTS) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    if (!stockExportCode || !employee || !vendor || !product || !qty) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const StockImportModel = mongoose.model(STOCKEXPORTS);
    const ProductModel = mongoose.model(PRODUCTS);

    const stockExport = await StockImportModel.findById(id);
    if (!stockExport) {
      return res.status(404).json({ error: "Stock import record not found." });
    }

    stockExport.stockExportStatus = "Đã xuất kho";
    await stockExport.save();

    const productUpdate = await ProductModel.findById(product);
    if (!productUpdate) {
      return res.status(404).json({ error: "Product not found." });
    }

    productUpdate.qty -= qty;
    await productUpdate.save();

    return res.json({ dataObject: stockExport });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};