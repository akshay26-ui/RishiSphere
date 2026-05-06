import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { registerSchema } from "./user.validation.js";
import { createUser } from "./user.service.js";

export const registerUser = async (req: Request, res: Response) => {
    try {
        //validate the incoming data
        const validatedData = registerSchema.parse(req.body);

        //Hash the password
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        //Create User
        const user = await createUser({
            ...validatedData,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
