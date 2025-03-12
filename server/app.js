import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import urlRoutes from "./routes/urlRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());


mongoose
  .connect("mongodb+srv://nishantkumar32435:url@cluster0.79gt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

 
app.use("/api/qr", qrRoutes);
app.use("/api/url", urlRoutes);

app.use("*", (req, res) => {
  res.json("request received");
});

export default app;