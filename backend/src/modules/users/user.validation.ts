import {z} from  'zod';

export const registerSchema = z.object({
    enrollmentNumber : z.string().min(1 , "Enrollment number is required"),
    name : z.string().min(3 , "Name is required"),
    email : z.string().email("Invalid email address"),
    password : z.string().min(6 , "Password must be at least 6 characters long")
})

export const loginSchema = z.object({
    email : z.string().email("Invalid email address"),
    password : z.string().min(6 , "Password must be at least 6 characters long")
})
