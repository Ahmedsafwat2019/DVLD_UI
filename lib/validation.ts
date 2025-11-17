import { z } from "zod";

export const LocalLicenceSchema = z.object({
  licenseClassId: z.string().min(1, "من فضلك اختر فئة الرخصة"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("من فضلك أدخل البريد الإلكتروني")
    .refine((val) => /\S+@\S+\.\S+/.test(val), {
      message: "صيغة البريد الإلكتروني غير صحيحة",
    }),
  password: z
    .string()
    .nonempty("من فضلك أدخل كلمة المرور")
    .min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل"),
});

export const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("من فضلك أدخل الاسم الأول")
      .min(2, "الاسم الأول قصير جدًا")
      .regex(/^[\p{L}\s]+$/u, "يجب أن يحتوي الاسم على أحرف فقط"),

    secondName: z
      .string()
      .nonempty("من فضلك أدخل الاسم الثاني")
      .min(2, "الاسم الثاني قصير جدًا")
      .regex(/^[\p{L}\s]+$/u, "يجب أن يحتوي الاسم على أحرف فقط"),
    thirdName: z
      .string()
      .nonempty("من فضلك أدخل الاسم الثالث")
      .min(2, "الاسم الثالث قصير جدًا")
      .regex(/^[\p{L}\s]+$/u, "يجب أن يحتوي الاسم على حروف فقط"),

    lastName: z
      .string()
      .nonempty("من فضلك أدخل الاسم الأخير")
      .min(2, "الاسم الأخير قصير جدًا")
      .regex(/^[\p{L}\s]+$/u, "يجب أن يحتوي الاسم على حروف فقط"),

    nationalNo: z
      .string()
      .trim()
      .nonempty("الرقم القومي مطلوب")
      .length(14, "يجب أن يتكون الرقم القومي من 14 رقمًا")
      .regex(/^\d+$/, "يجب أن يحتوي الرقم القومي على أرقام فقط"),

    dateOfBirth: z.string().nonempty("تاريخ الميلاد مطلوب"),

    gendor: z.string().nonempty("من فضلك اختر الجنس"),

    address: z.string().nonempty("العنوان مطلوب"),

    nationality: z.string().nonempty("الجنسية مطلوبة"),

    city: z.string().nonempty("المدينة مطلوبة"),

    phone: z
      .string()
      .nonempty("رقم الهاتف مطلوب")
      .regex(
        /^(010|011|012|015)[0-9]{8}$/,
        "يجب أن يبدأ رقم الهاتف بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقمًا"
      ),

    email: z
      .string()
      .nonempty("البريد الإلكتروني مطلوب")
      .min(5, "البريد الإلكتروني قصير جدًا")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "صيغة البريد الإلكتروني غير صحيحة"),

    terms: z.boolean().refine((val) => val === true, {
      message: "يجب الموافقة على الشروط والأحكام قبل المتابعة",
    }),

    password: z
      .string()
      .nonempty("كلمة المرور مطلوبة")
      .min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل"),
    // يمكنك تفعيل التحقق الأقوى أدناه عند الحاجة:
    // .regex(/[A-Z]/, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل")
    // .regex(/[a-z]/, "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل")
    // .regex(/[0-9]/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
    // .regex(/[^A-Za-z0-9]/, "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل"),

    confirmPassword: z.string().nonempty("يرجى تأكيد كلمة المرور"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });
