import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", apiRoutes);

const dbURI = process.env.MONGO_URI;
connectDB(dbURI);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));