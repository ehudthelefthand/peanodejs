import request from "supertest";
import app from "../../app";
import { generateToken } from "../../util/token";

const profile = {
  companyName: "IRRELEVANT",
  jobTitle: "IRRELEVANT",
  level: "IRRELEVANT",
};

jest.mock("../../repository/profile", () => {
  return {
    createOrUpdateProfile: jest.fn(() => {
      return Promise.resolve(profile);
    }),
  };
});

jest.mock("../../repository/user", () => {
  return {
    getUserById: jest.fn(() => {
      return Promise.resolve({ id: "1" });
    }),
  };
});

describe("Profile ", () => {
  describe("POST /api/v1/profiles", () => {
    test("Valid body", async () => {
      const token = generateToken({ id: "1" });

      const res = await request(app)
        .put("/api/v1/profiles")
        .set("Authorization", `Bearer ${token}`)
        .send(profile);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("profile.companyName");
      expect(res.body).toHaveProperty("profile.jobTitle");
      expect(res.body).toHaveProperty("profile.level");
    });

    test("Invalid body", async () => {
      const token = generateToken({ id: "1" });

      delete profile["companyName"];

      const res = await request(app)
        .put("/api/v1/profiles")
        .set("Authorization", `Bearer ${token}`)
        .send(profile);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});
