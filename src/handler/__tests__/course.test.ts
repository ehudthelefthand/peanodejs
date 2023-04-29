import request from "supertest";
import app from "../../app";
import { generateToken } from "../../util/token";
import prisma from "../../db";

jest.mock("../../repository/user", () => {
  return {
    getUserById: jest.fn(() => {
      return Promise.resolve({ id: "1" });
    }),
  };
});

describe("Course", () => {
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
  describe("POST /api/v1/coures", () => {
    test("Valid body", async () => {
      const token = generateToken({ id: "1" });
      const res = await request(app)
        .post("/api/v1/courses")
        .send({
          name: "name",
          description: "description",
        })
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });
  });
});
