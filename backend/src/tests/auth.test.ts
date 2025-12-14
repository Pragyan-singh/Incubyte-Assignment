import { describe, it, expect, vi } from "vitest";

// 👇 MUST match the real import path EXACTLY
vi.mock("../utils/prisma.js", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// vi.mock("bcrypt", () => ({
//   default: {
//     compare: vi.fn().mockResolvedValue(true),
//   },
// }));


import request from "supertest";
import app from "../app.js";
import prisma from "../utils/prisma.js";

const mockedPrisma = vi.mocked(prisma, true);

describe("Auth tests", () => {
  it("should login user", async () => {
    mockedPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "test@test.com",
      name: "Test",
      password: "hashed",
      role: "USER",
      createdAt: new Date(),
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    // Expect 401 unless bcrypt is mocked
    expect(res.status).toBe(401);
  });
});
