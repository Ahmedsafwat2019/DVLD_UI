import { z } from "zod";

const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("Please enter your first name")
      .min(2, "First name is too short")
      .regex(/^[\p{L}\s]+$/u, "Name must contain only letters"),

    secondName: z
      .string()
      .nonempty("Please enter your second name")
      .min(2, "Second name is too short")
      .regex(/^[\p{L}\s]+$/u, "Name must contain only letters"),

    thirdName: z
      .string()
      .nonempty("Please enter your third name")
      .min(2, "Third name is too short")
      .regex(/^[\p{L}\s]+$/u, "Name must contain only letters"),

    lastName: z
      .string()
      .nonempty("Please enter your last name")
      .min(2, "Last name is too short")
      .regex(/^[\p{L}\s]+$/u, "Last name must contain only letters"),
    nationalNo: z
      .string()
      .trim()
      .nonempty("National Number is required")
      .length(14, "National number must be 14 digits")
      .regex(/^\d+$/, "National number must contain only digits"),
    dateOfBirth: z.string().nonempty("Date of Birth is required"),
    gendor: z.string().nonempty("Please enter gender"),
    address: z.string().nonempty("Adress is Required"),
    nationality: z.string().nonempty("Nationality field is required"),

    city: z.string().nonempty("City field is required"),

    phone: z
      .string()
      .nonempty("Phone Number is required")
      .regex(
        /^(010|011|012|015)[0-9]{8}$/,
        "Phone number must start with 010, 011, 012, or 015 and be 11 digits long",
      ),

    email: z
      .string()
      .nonempty("Email is required")
      .min(5, "Email is too short")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(4, "Password must be at least 8 characters"),
    // .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    // .regex(/[a-z]/, "Password must include at least one lowercase letter")
    // .regex(/[0-9]/, "Password must include at least one number")
    // .regex(/[^A-Za-z0-9]/, "Password must include at least one special character"),

    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["checkPassword"],
  });

export default SignUpSchema;
