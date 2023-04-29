import { describe, expect, test, beforeEach } from "@jest/globals";
import request from "supertest";
import app from "../src/app";
import prisma from "../src/db";

describe("Register", () => {
  beforeEach(async () => {
    await prisma.$transaction([prisma.user.deleteMany()]);
    await prisma.$disconnect();
  });

  test("POST /api/v1/register", async () => {
    const res = await request(app).post("/api/v1/register").send({
      username: "pongneng",
      password: "supersecret",
    });

    expect(res.statusCode).toEqual(200);
  });
});
