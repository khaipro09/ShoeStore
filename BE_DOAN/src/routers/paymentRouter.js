import Express from "express";
import paymentFunction from "../functions/paymentFunction.js";

const router = Express.Router();

router.get('/payments', paymentFunction.paymentFunction);


export default router;

