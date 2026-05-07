import { Request, Response, NextFunction } from "express";

// A global error handling middleware for Express applications. It captures any errors that occur during request processing and sends a standardized JSON response with a 500 status code.
export const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
    });
};

