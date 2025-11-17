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

    if (!response.success) {
      const errorMessage =
        response.error?.message ||
        "فشل إنشاء الحساب. الرجاء التحقق من البيانات.";

      return {
        success: false,
        status: response.status,
        error: {
          message: errorMessage,
          details: response.error?.details,
        },
      };
    }

    return {
      success: true,
      status: 200,
      data: response.data as any,
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
    const response = await api.auth.login({
      email: data.email,
      password: data.password,
    });

    if (!response.success) {
      return {
        success: false,
        status: response.status,
        error: {
          message:
            response.error?.message ||
            "فشل تسجيل الدخول، الرجاء التحقق من البريد الإلكتروني وكلمة المرور.",
        },
      };
    }

    return {
      success: true,
      status: 200,
      data: response.data as any,
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      error: { message: `خطأ في الاتصال بالخادم: ${error.message}` },
    };
  }
}
