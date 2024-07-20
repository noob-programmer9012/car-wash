import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter userId"],
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter serviceId"],
  },
  rating: {
    type: Number,
    required: [true, "Please enter rating for this service."],
    match: ["^[0-9]d*(.d+)?$", "Please enter valid rating."],
  },
  review: String,
});

export default mongoose.model("Review", reviewSchema);
