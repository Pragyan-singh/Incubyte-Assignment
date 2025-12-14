import request from "supertest";
import app from "../app.js";
import { describe,beforeAll,it, expect} from "vitest";

let token: string;

beforeAll(async () => {
  // Register
  await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@sweets.com",
    password: "password123"
  });

  // Login
  const res = await request(app).post("/api/auth/login").send({
    email: "user@sweets.com",
    password: "password123"
  });

  token = res.body.token;
});

describe("Sweet APIs", () => {
  it("should add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Laddu",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Laddu");
  });

  it("should fetch all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
