import mongoose from "mongoose";

const options = ["in-progress", "completed"];

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter user id."],
  },

  paymentDetails: {
    orderId: String,
    paymentId: String,
    paymentSignature: String,
  },

  status: {
    type: String,
    enum: options,
    default: "in-progress",
  },

  items: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "Please enter service id."],
      },
      serviceName: {
        type: String,
      },
      slot: {
        type: String,
        required: [true, "Please enter time slot."],
      },
      address: {
        type: String,
        required: [true, "Please enter address."],
      },
    },
  ],
});

export default new mongoose.model("order", orderSchema);
