import jwt from "jsonwebtoken";

const secretKey = "supersecret";

export const generateToken = ({ id }: { id: string }) => {
  return jwt.sign({ id }, secretKey, { expiresIn: "1d" });
};
