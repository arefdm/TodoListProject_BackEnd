
import {z} from 'zod';

export const registerSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(4,"Password must be at least 4 characters"),
});

export const loginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string("Invalid Password format"),
});