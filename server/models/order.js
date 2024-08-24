import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Please enter user id."]
  },

  paymentDetails: {
    orderId: String,
    paymentId: String,
    paymentSignature: String,
  },

  items: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        required: [true, "Please enter service id."]
      }
    } 
  ],  
});

export default new mongoose.model("order", orderSchema);
