import dotenv from "dotenv";
dotenv.config();

const paymentFunction = async (req, res) => {
  try {
    return res.status(200).json({
      status: "OK",
      data: process.env.CLIENT_ID
    })
  } catch (error) {
    return res.status(400).json({
      status: "ERR",
      error: error.message
    });
  }
};

export default {
  paymentFunction
}