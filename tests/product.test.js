import request from "supertest";
import app from "../src/app.js";
import pool from "../src/config/database.js";

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

describe("Product API", () => {
  test("GET /api/products should return 200", async () => {
    const response = await request(app)
      .get("/api/products");

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("data");
  });
});

afterAll(async () => {
  await pool.end();
});