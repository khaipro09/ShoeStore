import Express from "express";
import uploadFunction from "../functions/uploadFunction.js";

import { upload } from "../core/config/uploadConfig.js"

const router = Express.Router();

const uploadFields = upload.fields([
  { name: 'images', maxCount: 10 },
]);

router.post('/uploads', uploadFields, uploadFunction.uploadFunction);


export default router;
