import { z } from "zod";

export const LoginUserData = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" })
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s])/.test(password),
      {
        message:
          "Password must contain at least one lowercase character, one uppercase character, one number, and one special character",
      }
    ),
});
