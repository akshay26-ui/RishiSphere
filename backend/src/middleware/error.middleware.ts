import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

// A global error handling middleware for Express applications. It captures any errors that occur during request processing and sends a standardized JSON response with a 500 status code.
export const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    //Unknown error
    console.error("Unexpected error:", error);
    res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
    });
};
