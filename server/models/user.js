import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import titleCase from "../util/titleCase.js";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your full name."],
    match: [/^[a-zA-Z ]*$/, "Please enter valid full name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email address.",
    ],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password."],
    minlength: 6,
    maxlength: 8,
    select: false,
  },
  address: {
    homeNo: {
      type: String,
      required: [true, "Please enter Home number and Building Name."],
      trim: true,
    },
    landmark: {
      type: String,
      required: [true, "Please enter Landmark."],
      trim: true,
    },
    area: {
      type: String,
      required: [true, "Please enter your area name."],
      trim: true,
    },
  },
  pincode: {
    type: String,
    required: [true, "Please enter your pin code."],
    match: [/^(\s*|\d+)$/, "Please enter valid pin code."],
    minlength: 6,
    maxlength: 6,
  },
  city: {
    type: String,
    required: [true, "Please enter your city name."],
    trim: true,
    match: [/^[a-zA-Z]+$/, "Please enter valid city name."],
  },
  mobileNo: {
    type: String,
    default: null,
    minlength: 10,
    maxlength: 14,
    match: [/^[0-9-+]*$/, "please enter a valid number"],
  },
  cart: {
    items: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
      },
    ],
  },
  passwordResetToken: String,
  passwordResetTokenExpiry: Date, // Date.now() + 60000 * 10;
  // reviews: [mongoose.Schema.Types.ObjectId],
});

userSchema.pre("save", async function (next) {
  this.address.homeNo = titleCase(this.address.homeNo);
  this.address.landmark = titleCase(this.address.landmark);
  this.address.area = titleCase(this.address.area);
  this.city = titleCase(this.city);
  this.fullname = titleCase(this.fullname);

  if (this.isModified("mobileNo")) {
    this.mobileNo = "+91-" + this.mobileNo;
  }

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default new mongoose.model("User", userSchema);
