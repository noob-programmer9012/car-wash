import mongoose from "mongoose";

const ComaplaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter userId"]
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Pleas enter orderId"],
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter serviceId"],
  },
  complaint: {
    type: String,
    required: [true, "Please enter the nature of your compaint."],
  },
  imageUrl: {
    type: String,
    required: [true, "Please upload an image as a proof for further investigation."],
  }
});

export default new mongoose.Model('Complaint', ComaplaintSchema);
