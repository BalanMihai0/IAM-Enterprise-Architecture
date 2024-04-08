import { z } from "zod"

export const RegisterUserData = z.object({
    fullName: z.string().min(1, { message: "Name must be at least 1 character long" }).max(100),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});