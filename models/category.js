import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  imageUrl: String,
});

export default mongoose.model("Category", categorySchema);
