import pg from "pg";
import dotenv from "dotenv";

// Load biến môi trường cho database
dotenv.config();

const { Pool } = pg;

// Tạo connection pool để quản lý nhiều kết nối PostgreSQL hiệu quả
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Ghi log khi một kết nối mới được tạo
pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

// Ghi log nếu có lỗi xảy ra với pool
pool.on("error", (error) => {
  console.error("PostgreSQL error:", error);
});

export default pool;