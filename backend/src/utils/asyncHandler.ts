import { Request, Response, NextFunction } from "express";

// A utility function to handle asynchronous route handlers and middleware in Express.
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Wrap the asynchronous function in a Promise and catch any errors, passing them to the next middleware (error handler).
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
