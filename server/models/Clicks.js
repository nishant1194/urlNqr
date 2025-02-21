import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  
}, { timestamps: true });

const Click = mongoose.model("Click", urlSchema);
export default Click;