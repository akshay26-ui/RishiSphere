import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.js";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    // Check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Access token missing",
        });
    }
    // Extract token
    const token = authHeader.split(" ")[1];
    try {

        // Verify token
        const decoded = verifyToken(token) as any;
        // Attach user to request
        req.user = {
            enrollmentNumber: decoded.enrollmentNumber,
            role: decoded.role,
        };
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
