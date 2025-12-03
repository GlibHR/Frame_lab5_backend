import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import apiRoutes from "./routes/api.js"; 

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Дозволити всім
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Дозволити всі методи
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Дозволити заголовки
  
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.use("/", apiRoutes);

const dbURI = process.env.MONGO_URI;
connectDB(dbURI);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));