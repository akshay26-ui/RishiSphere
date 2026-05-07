import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

type ValidationSource = "body" | "query" | "params";

export const validate = (
    schema: ZodSchema,
    source: ValidationSource = "body",
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[source]);

            next();
        } catch (error: any) {
            return res.status(400).json({
                success: false,

                message: "Validation failed",

                errors: error.errors,
            });
        }
    };
};
