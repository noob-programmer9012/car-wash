import mongoose from "mongoose";
import crypto from "node:crypto";
import Razorpay from "razorpay";

import Category from "../models/category.js";
import Service from "../models/service.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import { ErrorResponse } from "../util/errorRespone.js";
// import { createPDF } from "../util/createPDF.js";
import sendEmail from "../util/sendEmail.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const totalCategories = await Category.countDocuments();
    return res.status(200).json({
      success: true,
      totalCategories,
      data: totalCategories > 0 ? categories : "No categories added yet!",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getServices = async (req, res, next) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId))
    return next(new ErrorResponse("Not a valid path", 404));

  try {
    const services = await Service.find({
      category: categoryId,
    });

    const totalServices = await Service.countDocuments();
    return res.status(200).json({
      success: true,
      totalServices,
      data: totalServices > 0 ? services : "No services added yet.",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getServiceById = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new ErrorResponse("Not a valid path", 404));

  try {
    const data = await Service.findById(id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "No service available for this id." });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();

    const totalServices = await Service.countDocuments();
    return res.status(200).json({
      success: true,
      totalServices,
      data: totalServices > 0 ? services : "No services added yet.",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getUser = async (req, res, next) => {
  const email = req.email;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .statas(404)
        .json({ success: false, message: "User doen not exist" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const addAddress = async (req, res, next) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);
    if (!user) return next(new ErrorResponse("User does not exist!", 404));
    user.secondaryAddress.push(req.body);
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getCart = async (req, res, next) => {
  const userId = req.user;
  if (!req.isUser || !mongoose.Types.ObjectId.isValid(userId))
    return next(new ErrorResponse("Not a valid user", 401));

  try {
    const user = await User.findById(userId).populate("cart.items.serviceId");
    if (!user) return next(new ErrorResponse("No user found", 404));
    return res.status(200).json({
      success: true,
      cart: user.cart.items,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getOrders = async (req, res, next) => {
  const { pageNumber, nPerPage } = req.query;
  const userId = req.user;

  if (!userId) return next(new ErrorResponse("No user found", 404));
  if (!mongoose.Types.ObjectId.isValid(userId))
    return next(new ErrorResponse("Not valid userId.", 401));

  try {
    const orders = await Order.find({
      user: userId,
    })
      .populate("items.serviceId")
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .sort({ _id: "desc" });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const slotAvailable = async (req, res, next) => {
  const { slot, serviceId } = req.query;

  const isAvailable = await Order.find({
    "items.serviceId": serviceId,
    "items.slot": slot,
  }).countDocuments();

  const service = await Service.findById(serviceId);
  const maxOrders = service.maxOrders;

  const available = Number(isAvailable) >= Number(maxOrders) ? 0 : 1;
  return res.json({
    success: true,
    available,
    slot,
  });
};

export const postAddToCart = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const userId = req.user;

  if (
    !mongoose.Types.ObjectId.isValid(serviceId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  )
    return next(new ErrorResponse("Not valid serviceId or UserId", 401));

  try {
    const user = await User.findById(userId);
    if (!user)
      return next(new ErrorResponse("No user available with this id", 404));

    try {
      const service = await Service.findById(serviceId);
      if (!service)
        return next(
          new ErrorResponse("No service available with this id", 404),
        );

      const available = user.cart.items.filter((item) => {
        return (
          item.serviceId == new mongoose.Types.ObjectId(serviceId).toString()
        );
      });

      if (available.length > 0)
        return next(new ErrorResponse("Already in the cart", 401));

      user.cart.items.push({ serviceId });
      await user.save();
      return res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorResponse(error, 500));
    }
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const deleteCartItem = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const userId = req.user;

  if (
    !mongoose.Types.ObjectId.isValid(serviceId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  )
    return res.status(401).json({
      success: false,
      message: "Not a valid id",
    });

  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user found with this id." });
    const cartItems = user.cart.items;
    const updatedCart = cartItems.filter((item) => {
      return item.serviceId.toString() !== serviceId;
    });
    user.cart.items = updatedCart;
    await user.save();
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const postCheckout = async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: "rzp_test_kBDtfQdGy3qNno",
    key_secret: "OogErPxPtZyGgBnNwGy6XW7q",
  });

  const { slotLength, selectedAddressLen } = req.body;
  const userId = req.user;

  const user = await User.findById(userId);
  const cartLen = user.cart.items.length;

  if (cartLen !== Number(slotLength) || cartLen !== Number(selectedAddressLen))
    return next(new ErrorResponse("Please select time slot for all items."));

  try {
    const options = {
      amount: req.body.total * 100, // amount in paisa
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error, 500));
  }
};

export const verifyPayment = async (req, res, next) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    order_id,
    selectedSlot,
    selectedAddress,
  } = req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  const user = await User.findById(req.user);
  if (!user) return next(new ErrorResponse("No user found!", 404));

  if (digest === razorpay_signature) {
    const items = user.cart.items.map((i) => {
      return { serviceId: i.serviceId };
    });

    const slotsIds = Object.keys(selectedSlot);
    const addressIds = Object.keys(selectedAddress);

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < slotsIds.length; j++) {
        if (items[i].serviceId._id.toString() === slotsIds[j]) {
          const service = await Service.findById(items[i].serviceId._id);
          items[i].serviceName = service.serviceName;
          items[i].slot = selectedSlot[slotsIds[j]][items[i].serviceId._id];
        }
      }

      for (let k = 0; k < addressIds.length; k++) {
        if (items[i].serviceId._id.toString() === addressIds[k]) {
          items[i].address = selectedAddress[addressIds[k]];
        }
      }
    }

    const order = new Order({
      user,
      items,
      paymentDetails: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        paymentSignature: razorpay_signature,
      },
    });

    try {
      await order.save();

      const items = order;
      const options = {
        from: "parth.sclub@gmail.com",
        to: user.email,
        subject: `Your Carwash order #${razorpay_order_id} of ${user.cart.items.length} items.`,
        template: "main",
        context: {
          name: order.user.fullname,
          items: Array.isArray(items) ? items : [items],
        },
      };
      await sendEmail(options);

      user.cart.items = [];

      await user.save();

      return res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorResponse(error, 500));
    }
  } else {
    return next(new ErrorResponse("Payment failed", 400));
  }
};
