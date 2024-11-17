import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import { initConnectToDB } from './core/startup/startupDB.js'
import { initCreateRouter } from './core/startup/startupRouter.js'; // Sửa tên hàm này thành initCreateRouter
import bodyParser from "body-parser";

const app = Express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;

app.use(cors());
// app.use(Express.static(path.join(__dirname, '../uploads/')));
app.use('/media', Express.static(path.join(__dirname, '../uploads')));

// app.use(Express.json());
// app.use(Express.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({ limit: 'Infinity' })); // Giới hạn 10MB
app.use(bodyParser.urlencoded({ limit: 'Infinity', extended: true }));

(async () => {
  try {
    await initConnectToDB();
    await initCreateRouter(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
})();
