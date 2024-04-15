import { z } from "zod";

export const RegisterUserData = z.object({
    fullName: z.string().min(1, { message: "Name must be at least 1 character long" }).max(100, { message: "Name must be at most 100 characters long" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50, { message: "Password must be at most 50 characters long" }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}).refine(data => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s])/.test(data.password), {
    message: "Password must contain at least one lowercase character, one uppercase character, one number, and one special character",
    path: ["password"]
});