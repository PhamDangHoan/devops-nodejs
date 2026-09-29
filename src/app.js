import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.routes.js";

// Khởi tạo ứng dụng Express
const app = express();

// Cho phép các origin khác nhau gửi request đến API
app.use(cors());

// Parse dữ liệu JSON từ request body
app.use(express.json());

// Route kiểm tra ứng dụng đang hoạt động
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevOps Node.js API is running",
  });
});

// Route health check để kiểm tra trạng thái server
app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Tất cả route liên quan đến sản phẩm sẽ được gắn dưới prefix /api/products
app.use("/api/products", productRoutes);

export default app;