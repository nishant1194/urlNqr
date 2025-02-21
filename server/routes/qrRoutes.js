 import express from "express";
import { generateQR } from "../controller/Qr.js";

const router = express.Router();

router.post("/generate", generateQR);

export default router;