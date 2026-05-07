import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// Function to generate a JWT access token
export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "15m",
    });
};

// Function to generate a JWT refresh token
export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Function to verify a JWT token
export const verifyToken =
  (token: string) => {

    return jwt.verify(
      token,
      env.JWT_SECRET
    );
  };
