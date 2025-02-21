import express from "express";
import { shortenUrl, redirectUrl, getUrlDetails,customshortenUrl } from "../controller/Url.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.post("/custom-shorten", customshortenUrl);

router.get("/:shortUrl", redirectUrl);
router.get("/details/:shortUrl", getUrlDetails);

export default router;