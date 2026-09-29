import dotenv from "dotenv";

// Tải biến môi trường từ file .env để cấu hình ứng dụng
dotenv.config();

import app from "./app.js";

// Cổng mặc định nếu không được cấu hình trong môi trường
const PORT = process.env.PORT || 3000;

// Khởi động server và lắng nghe các request HTTP
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});