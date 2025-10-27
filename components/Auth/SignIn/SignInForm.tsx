"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ZodError } from "zod";
import signInSchema from "@/utilts/SignInSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    check: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = (fieldName: string, value: string) => {
    try {
      signInSchema.pick({ [fieldName]: true }).parse({ [fieldName]: value });
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (err) {
      if (err instanceof ZodError) {
        const zodErrors = err.issues;
        setErrors((prev) => ({
          ...prev,
          [fieldName]: zodErrors[0]?.message || "Invalid input",
        }));
      } else {
        console.error("Unexpected error during validation:", err);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "Unknown error",
        }));
      }
    }
  };

  function validateForm() {
    try {
      signInSchema.parse(formData);
      setErrors({ email: "", password: "" });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as string;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors({
          email: fieldErrors.email || "",
          password: fieldErrors.password || "",
        });
      }
      return false;
    }
  }

  async function HandeleSubmitForm() {
    if (!validateForm()) {
      console.log("Form has errors ", formData);
      return;
    } else {
      try {
        const response = await fetch("http://localhost:5240/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        });

        let data: any = null;
        const responseType = response.headers.get("Content-Type");

        if (responseType && responseType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          alert("فشل تسجيل الدخول، الرجاء التحقق من البيانات");
        } else {
          alert(`تم تسجيل الدخول بنجاح`);
          router.push("/"); // Redirect to home page
        }
      } catch (err) {
        alert(`خطأ غير متوقع أثناء الاتصال بالخادم: ${err}`);
      }
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="-mx-4 flex flex-wrap justify-center">
        <div className="w-full max-w-md px-4">
          <div className="rounded-lg border border-neutral-200 bg-white px-8 py-12 shadow-xl dark:border-neutral-700 dark:bg-neutral-800 sm:px-12 sm:py-16">
            <h3 className="mb-8 text-center font-cairo text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              تسجيل الدخول إلى حسابك
            </h3>
            <form>
              {/* Email */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-3 block font-cairo text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onBlur={(e) => validateField("email", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-all duration-300 focus:outline-none focus:ring-2 dark:text-neutral-100 dark:placeholder-neutral-400 ${
                    errors.email
                      ? "border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-200 dark:border-error-400 dark:bg-error-900/20"
                      : "border-neutral-300 bg-neutral-50 focus:border-government-500 focus:ring-government-200 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:border-government-400 dark:focus:ring-government-400"
                  }`}
                  required
                />
                {hasMounted && errors.email && (
                  <p className="mt-2 font-cairo text-sm text-error-600 dark:text-error-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-3 block font-cairo text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  كلمة المرور
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="أدخل كلمة المرور"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onBlur={(e) => validateField("password", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-all duration-300 focus:outline-none focus:ring-2 dark:text-neutral-100 dark:placeholder-neutral-400 ${
                    errors.password
                      ? "border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-200 dark:border-error-400 dark:bg-error-900/20"
                      : "border-neutral-300 bg-neutral-50 focus:border-government-500 focus:ring-government-200 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:border-government-400 dark:focus:ring-government-400"
                  }`}
                  required
                />
                {hasMounted && errors.password && (
                  <p className="mt-2 font-cairo text-sm text-error-600 dark:text-error-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Checkbox + Forgot password */}
              <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                <label
                  htmlFor="keepSignedIn"
                  className="flex cursor-pointer select-none items-center font-cairo text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  <input
                    id="keepSignedIn"
                    type="checkbox"
                    checked={formData.check}
                    onChange={(e) =>
                      setFormData({ ...formData, check: e.target.checked })
                    }
                    className="mr-3 h-5 w-5 rounded border-neutral-300 text-government-500 focus:ring-2 focus:ring-government-200 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:ring-government-400"
                  />
                  تذكرني
                </label>

                <Link
                  href="#0"
                  className="mt-3 font-cairo text-government-600 transition-colors duration-200 hover:text-government-700 dark:text-government-400 dark:hover:text-government-300 sm:mt-0"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  HandeleSubmitForm();
                }}
                className="w-full transform rounded-lg bg-government-500 px-6 py-4 font-cairo font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-government-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-government-200 active:bg-government-700 dark:focus:ring-government-400"
              >
                تسجيل الدخول
              </button>
            </form>

            <p className="mt-8 text-center font-cairo text-sm text-neutral-600 dark:text-neutral-400">
              لا تملك حساباً؟{" "}
              <Link
                href="/signup"
                className="font-semibold text-government-600 transition-colors duration-200 hover:text-government-700 hover:underline dark:text-government-400 dark:hover:text-government-300"
              >
                إنشاء حساب
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
