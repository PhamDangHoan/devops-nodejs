import pool from "../config/database.js";

// Lấy toàn bộ danh sách sản phẩm, sắp xếp mới nhất lên đầu
export const getAllProducts = async () => {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY id DESC"
  );

  return result.rows;
};

// Tìm sản phẩm theo id
export const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Tạo sản phẩm mới trong database
export const createProduct = async ({
  name,
  description,
  price,
  quantity,
}) => {
  const result = await pool.query(
    `INSERT INTO products
      (name, description, price, quantity)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, description, price, quantity]
  );

  return result.rows[0];
};

// Cập nhật thông tin sản phẩm theo id
export const updateProduct = async (
  id,
  { name, description, price, quantity }
) => {
  const result = await pool.query(
    `UPDATE products
     SET
       name = $1,
       description = $2,
       price = $3,
       quantity = $4,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [name, description, price, quantity, id]
  );

  return result.rows[0];
};

// Xóa sản phẩm theo id và trả về bản ghi vừa bị xóa
export const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};