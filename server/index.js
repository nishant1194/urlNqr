import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import urlRoutes from "./routes/urlRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173/',
  credentials: true
}));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(bodyParser.json());

app.use("/api/qr", qrRoutes);
app.use("/api/url", urlRoutes);

app.use("*", (req, res) => {
  res.json("request received");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
