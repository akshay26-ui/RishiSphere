import "express";

declare global {
  namespace Express {

    interface Request {

      user?: {
        enrollmentNumber: string;

        role: string;
      };
    }
  }
}
