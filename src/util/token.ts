import jwt from "jsonwebtoken";

const secretKey = "supersecret";

export const generateToken = ({ id }: { id: string }) => {
  return jwt.sign({ id }, secretKey, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return <jwt.CustomJwtPayload>jwt.verify(token, secretKey);
};

declare module "jsonwebtoken" {
  export interface CustomJwtPayload extends JwtPayload {
    id: string;
  }
}
