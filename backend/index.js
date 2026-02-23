import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from "./routes/Userroutes.js";
import adminRoutes from "./routes/Adminroutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const App = express();
App.use(express.json({ limit: "30mb", extended: true }));
App.use(express.urlencoded({ limit: "30mb", extended: true }));
App.use(cors());
App.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


App.get('/', (req, res) => { res.send("This is a ecommerce clone Api testing") });

App.use("/user", userRoutes);
App.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() =>
    App.listen(PORT, () => {
      console.log(`server port is running on ${PORT}`);
    })
  )
    .catch((err) => console.log(err.message));
  
// App.listen(PORT);
// App.listen(PORT()=> { console.log(`server is running on port ${PORT}`) });

