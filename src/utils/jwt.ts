import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};