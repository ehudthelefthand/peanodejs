// jest.mock("../src/repository/profile", () => {
//   createOrUpdateProfile: () => {
//     Promise.resolve({});
//   };
// });

import request from "supertest";
import app from "../../app";
import prisma from "../../db";

describe("Profile", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.studenProfile.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  });

  test("POST /api/v1/profiles", async () => {
    const registerRes = await request(app).post("/api/v1/register").send({
      username: "pongneng",
      password: "supersecret",
    });

    const res = await request(app)
      .put("/api/v1/profiles")
      .send({
        companyName: "ODDS",
        jobTitle: "Frontend Dev",
        level: "Senior",
      })
      .set("Authorization", "Bearer " + registerRes.body.token);

    expect(res.statusCode).toEqual(200);
  });
});
