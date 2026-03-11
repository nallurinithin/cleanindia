import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    phone: z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^[0-9]+$/, 'Phone must be numeric'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: z.enum(['citizen', 'admin', 'worker']).optional()
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
});
