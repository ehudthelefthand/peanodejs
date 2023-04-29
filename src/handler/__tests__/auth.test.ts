import request from "supertest";
import prisma from "../../db";
import app from "../../app";

describe("Authication", () => {
  beforeAll(async () => {
    await prisma.$transaction([
      prisma.student.deleteMany(),
      prisma.class.deleteMany(),
      prisma.course.deleteMany(),
      prisma.studenProfile.deleteMany(),
      prisma.user.deleteMany(),
    ]);
    await prisma.$disconnect();
  });

  describe("Register", () => {
    test("POST /api/v1/register", async () => {
      const res = await request(app).post("/api/v1/register").send({
        username: "pongneng",
        password: "supersecret",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
    });
  });

  describe("Login", () => {
    test("POST /api/v1/login", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "pongneng",
        password: "supersecret",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
    });
  });
});
