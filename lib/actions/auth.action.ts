"use client";

import { api } from "@/lib/api";
import { ActionResponse } from "@/types";

/**
 * SIGN UP ACTION
 */
export async function signUpWithCredentails(
  data: Record<string, any>
): Promise<ActionResponse> {
  try {
    const requestBody = {
      nationalNo: data.nationalNo,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      firstName: data.firstName,
      secondName: data.secondName,
      thirdName: data.thirdName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gendor: data.gendor,
      address: data.address,
      phone: data.phone,
      nationality: data.nationality,
      city: data.city,
    };

    console.log(requestBody);

    const response = await api.auth.signup(requestBody);
    const result = await response.json();

    if (!result.success) {
      const errorMessage =
        result.error?.message || "فشل إنشاء الحساب. الرجاء التحقق من البيانات.";

      return {
        success: false,
        status: result.status || response.status,
        error: {
          message: errorMessage,
          details: result.error?.details,
        },
      };
    }

    return {
      success: true,
      status: 200,
      data: result.data as any,
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      error: {
        message: `خطأ في الاتصال بالخادم: ${error.message}`,
      },
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
    console.log("Sending login request with:", {
      email: data.email,
      password: data.password,
    });

    const response = await api.auth.login({
      email: data.email,
      password: data.password,
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    console.log("Response URL:", response.url);

    // Check if response has content before parsing JSON
    const contentType = response.headers.get("content-type");
    const hasJsonContent =
      contentType && contentType.includes("application/json");

    // If response is not OK (401, 404, etc.) and has no JSON content
    if (!response.ok) {
      let errorMessage =
        "فشل تسجيل الدخول، الرجاء التحقق من البريد الإلكتروني وكلمة المرور.";

      if (response.status === 401) {
        errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
      }

      // Try to parse JSON if content exists
      if (hasJsonContent) {
        try {
          const result = await response.json();
          errorMessage =
            result.error?.message || result.message || errorMessage;
        } catch (e) {
          // If JSON parsing fails, use default message
        }
      }

      return {
        success: false,
        status: response.status,
        error: { message: errorMessage },
      };
    }

    // Parse successful response
    const result = await response.json();
    console.log("Result:", result);

    if (!result.success) {
      return {
        success: false,
        status: result.status || response.status,
        error: {
          message:
            result.error?.message ||
            "فشل تسجيل الدخول، الرجاء التحقق من البريد الإلكتروني وكلمة المرور.",
        },
      };
    }

    return {
      success: true,
      status: 200,
      data: result.data as any,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      status: 500,
      error: { message: `خطأ في الاتصال بالخادم: ${error.message}` },
    };
  }
}
