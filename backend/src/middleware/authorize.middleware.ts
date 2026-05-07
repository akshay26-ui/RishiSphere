import { Request, Response, NextFunction } from "express";

export const authorize = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // User missing
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Role check
        const hasPermission = allowedRoles.includes(req.user.role);
        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        next();
    };
};
