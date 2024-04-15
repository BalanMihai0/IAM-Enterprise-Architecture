import { z } from "zod"

export const LoginUserData = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50, { message: "Password must be at most 50 characters long" }),
});