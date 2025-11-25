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

    console.log(response);

    console.log(result);

    if (!response.ok) {
      return {
        success: false,
        status: response.status || response.status,
        error: {
          message: result?.message,
          details: result?.errors,
        },
      };
    }

    return {
      success: true,
      status: 200,
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

    const result = await response.json();
    console.log("Response:", response);

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: {
          message: result?.message,
          details: result?.errors,
        },
      };
    }

    return {
      success: true,
      status: 200,
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
