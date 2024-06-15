import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { Type: String, trim: true },
  serviceTypes: [{ Type: mongoose.Schema.ObjectId, ref: "serviceType" }],
  priceStructure: [
    {
      price: {
        Type: Number,
        match: [
          "^[1-9]d*(.d+)?$",
          "Only natural numbers and decimals are valid values.",
        ],
      },
      facilities: [String],
    },
  ],
});

export default Service = mongoose.Model("Service", serviceSchema);
