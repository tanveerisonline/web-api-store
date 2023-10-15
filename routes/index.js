import express from "express";
import productController from "../controllers/productController.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.use("/api", productController);
router.use("/api", orderController);

export default router;
