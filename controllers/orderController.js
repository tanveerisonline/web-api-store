import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

// Place an order
router.post("/orders", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product || product.quantity < quantity) {
      throw new Error("Product unavailable");
    }

    const order = await Order.create({ productId, quantity });
    product.quantity -= quantity;
    await product.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel an order
router.delete("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    const product = await Product.findById(order.productId);
    product.quantity += order.quantity;
    await product.save();

    res.json({ message: "Order cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
