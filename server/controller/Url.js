import Url from "../models/Url.js";
import { nanoid } from "nanoid";

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    let shortUrl;
    let url;
    do {
      shortUrl = nanoid(7);
      url = await Url.findOne({ shortUrl });
    } while (url);

    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();

    res.json(newUrl);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" });
  }
};

export const customshortenUrl = async (req, res) => {
  const { originalUrl, customUrl } = req.body;
  try {
    const url = await Url.findOne({ customUrl });
    if (url) {
      return res.status(201).json({ message: "This url exits." });
    }
    const newUrl = new Url({ originalUrl, shortUrl:customUrl });
    await newUrl.save();

    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
      url.clicks++;
      await url.save();
      return res.status(201).json(url);
    }
    res.status(404).json({ error: "URL not found" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log("url");
  }
};

export const getUrlDetails = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
      return res.json(url);
    }
    res.status(404).json({ error: "URL not found" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
