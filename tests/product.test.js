import request from "supertest";
import app from "../src/app.js";
import pool from "../src/config/database.js";

// Kiểm thử API Health Check
describe("Health API", () => {
  test("GET /health should return 200", async () => {
    const response = await request(app)
      .get("/health");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        status: "OK"
      })
    );
  });
});

// Kiểm thử API quản lý sản phẩm
describe("Product API", () => {
  test("GET /api/products should return 200", async () => {
    const response = await request(app)
      .get("/api/products");

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("data");
  });
});

// Đóng pool database sau khi chạy hết các test
afterAll(async () => {
  await pool.end();
});