import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email address."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
    minlength: 6,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const hashed = await bcrypt.hash(this.password, 12);
  this.password = hashed;
  next();
});

adminSchema.methods.comparePassword = async function comparePassword(password) {
  return await bcrypt.compare(password, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);
