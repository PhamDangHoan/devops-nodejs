import express from "express";

import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller.js";

// Khởi tạo router riêng cho các endpoint liên quan đến sản phẩm
const router = express.Router();

// GET /api/products -> lấy danh sách sản phẩm
router.get("/", getProducts);

// GET /api/products/:id -> lấy thông tin một sản phẩm
router.get("/:id", getProduct);

// POST /api/products -> tạo mới sản phẩm
router.post("/", addProduct);

// PUT /api/products/:id -> cập nhật sản phẩm
router.put("/:id", editProduct);

// DELETE /api/products/:id -> xóa sản phẩm
router.delete("/:id", removeProduct);

export default router;