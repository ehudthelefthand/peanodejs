import { User } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

declare module "jsonwebtoken" {
  export interface MyJwtPayload extends JwtPayload {
    id: string;
  }
}
