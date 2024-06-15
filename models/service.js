import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  serviceTypes: [{ type: mongoose.Schema.ObjectId, ref: "serviceType" }],
  priceStructure: [
    {
      price: {
        type: Number,
        match: [
          "^[1-9]d*(.d+)?$",
          "Only natural numbers and decimals are valid values.",
        ],
      },
      facilities: [String],
    },
  ],
});

export default mongoose.model("Service", serviceSchema);
