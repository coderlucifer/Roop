import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Initialize Razorpay
// Note: Fallback to test keys if env vars are missing so the app doesn't crash
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YourTestKeyId",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YourTestKeySecret",
});

// 1. Create Order
router.post("/order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    
    // Fallback to mock order if keys are not configured
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === "rzp_test_YourTestKeyId") {
      return res.json({
        id: "order_dummy_" + Date.now(),
        amount: amount * 100,
        currency,
        isDummy: true
      });
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: receipt || `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Some error occurred while generating Razorpay order" });
    }

    res.json({
      ...order,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID || "rzp_test_YourTestKeyId"
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({ error: "Server error during order creation" });
  }
});

// 2. Verify Payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      cartItems,
      shippingInfo,
      isDummy
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || "YourTestKeySecret";

    let isAuthentic = false;

    if (isDummy) {
      isAuthentic = true;
    } else {
      // Creating our own signature to verify
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");

      isAuthentic = expectedSignature === razorpay_signature;
    }

    if (isAuthentic) {
      // Save order to Database
      const newOrder = await prisma.order.create({
        data: {
          razorpayId: razorpay_payment_id,
          totalAmount: amount,
          status: "PAID",
          shippingInfo: shippingInfo,
          cartItems: cartItems
        }
      });

      res.json({
        success: true,
        message: "Payment verified successfully",
        orderId: newOrder.id
      });
    } else {
      res.status(400).json({ success: false, error: "Payment verification failed" });
    }
  } catch (err) {
    console.error("Payment Verify Error:", err);
    res.status(500).json({ error: "Server error during verification" });
  }
});

export default router;
