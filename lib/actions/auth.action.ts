"use server";

import { ActionResponse } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5240/api/auth";

/**
 * SIGN UP ACTION
 */
export async function signUpWithCredentails(
  data: Record<string, any>
): Promise<ActionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/AddCitizen`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const contentType = response.headers.get("Content-Type");
    const responseData =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
      console.error("Sign-up failed:", responseData);
      return {
        success: false,
        status: response.status,
        error: {
          message:
            responseData?.message ||
            "فشل إنشاء الحساب. الرجاء التحقق من البيانات.",
        },
      };
    }

    console.log("Sign-up success:", responseData);
    return { success: true, status: 200, data: responseData };
  } catch (error: any) {
    console.error(" Network error (sign-up):", error);
    return {
      success: false,
      status: 500,
      error: { message: `خطأ في الاتصال بالخادم: ${error.message}` },
    };
  }
}

/**
 * SIGN IN ACTION
 */
export async function signInWithCredentails(
  data: Record<string, any>
): Promise<ActionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const contentType = response.headers.get("Content-Type");
    const responseData =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
      console.error("Sign-in failed:", responseData);
      return {
        success: false,
        status: response.status,
        error: {
          message:
            responseData?.message ||
            "فشل تسجيل الدخول، الرجاء التحقق من البريد الإلكتروني وكلمة المرور.",
        },
      };
    }

    console.log("Sign-in success:", responseData);
    return { success: true, status: 200, data: responseData };
  } catch (error: any) {
    console.error("Network error (sign-in):", error);
    return {
      success: false,
      status: 500,
      error: { message: `خطأ في الاتصال بالخادم: ${error.message}` },
    };
  }
}
