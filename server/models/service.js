import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, "Please enter service name!"],
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Please provide category for service"],
  },
  maxOrders: {
    type: Number,
    match: ["^d+$", "Please enter valid number of orders"],
    required: [true, "Please enter maximum number of oderers for particular time frame"]
  },
  timeFrame: {
    type: Number,
    match: ["^[0-9]d*(.d+)?$", "Please enter valid price."],
    required: [true, "Please enter time frame in Number"],
  },
  plan: {
    price: {
      type: Number,
      match: ["^[0-9]d*(.d+)?$", "Please enter valid price."],
      required: [true, "Please enter price"],
    },
    facilities: [String],
    discount: {
      type: Number,
      match: ["^d+$", "Please enter valid discount value."],
    },
  },
  imageUrl: String,
});

export default mongoose.model("Service", serviceSchema);
