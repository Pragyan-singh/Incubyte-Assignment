import request from "supertest";
import app from "../app.js";
import prisma from "../utils/prisma.js";
import { beforeAll, describe, it, expect } from "vitest";

let userToken: string;
let adminToken: string;
let sweetId: number;

beforeAll(async () => {
  // 🧹 Clean test data (important for repeat runs)
  await prisma.sweet.deleteMany();
  await prisma.user.deleteMany();

  // Create USER
  await request(app).post("/api/auth/register").send({
    name: "User",
    email: "buyer@sweets.com",
    password: "password123"
  });

  const userLogin = await request(app).post("/api/auth/login").send({
    email: "buyer@sweets.com",
    password: "password123"
  });

  userToken = userLogin.body.token;

  // Create ADMIN
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@sweets.com",
    password: "password123"
  });

  // Promote ADMIN BEFORE login
  await prisma.user.update({
    where: { email: "admin@sweets.com" },
    data: { role: "ADMIN" }
  });

  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "admin@sweets.com",
    password: "password123"
  });

  adminToken = adminLogin.body.token;

  // Create Sweet (admin only)
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Barfi",
      category: "Indian",
      price: 20,
      quantity: 5
    });

  sweetId = sweetRes.body.id;
});

describe("Inventory APIs", () => {
  it("should purchase a sweet and reduce quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4);
  });

  it("should restock a sweet (admin only)", async () => {
    const res = await request(app)
      .post(`/api/inventory/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 10 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(14);
  });

  it("should prevent restock by non-admin", async () => {
    const res = await request(app)
      .post(`/api/inventory/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ amount: 5 });

    expect(res.status).toBe(403);
  });
});
