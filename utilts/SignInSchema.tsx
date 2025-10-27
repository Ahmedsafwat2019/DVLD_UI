import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .nonempty(" please enter email")
    .refine((val) => /\S+@\S+\.\S+/.test(val), {
      message: "Invalid email format",
    }),
  password: z
    .string()
    .nonempty("please enter password")
    .min(6, "Password must be at least 6 characters"),
});
export default signInSchema;
