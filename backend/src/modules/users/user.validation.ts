import {z} from  'zod';

export const registerSchema = z.object({
    en : z.number().int().positive("EN must be a positive integer"),
    name : z.string().min(3 , "Name is required"),
    email : z.string().email("Invalid email address"),
    password : z.string().min(6 , "Password must be at least 6 characters long")
})
