import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must have at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['buyer', 'seller', 'admin']),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
};
