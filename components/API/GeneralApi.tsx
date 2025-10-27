import { error } from "console";
import { json } from "zod";
// utils/apiClient.ts
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  errors?: string;
  data: T;
}
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders?: Record<string, string>) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders || {
      "Content-Type": "application/json",
    };
  }
  private buildUrl(
    path: string,
    queryParams?: Record<string, string | number>,
  ) {
    let url = `${this.baseUrl}${path}`;
    if (queryParams) {
      const query = new URLSearchParams(
        Object.entries(queryParams).map(([k, v]) => [k, String(v)]),
      ).toString();
      url += `?${query}`;
    }
    return url;
  }
  async request<T>(
    path: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> {
    const { method = "GET", body, headers, queryParams } = options || {};
    const url = this.buildUrl(path, queryParams);

    const response = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("content-type");
    let responseData: any = null;

    if (contentType?.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: responseData?.message || response.statusText,
        errors: responseData.errors,
      };
    }

    return {
      success: responseData.success ?? true,
      message: responseData.message ?? "Request successful",
      data: responseData.data as T,
    };
  }

  get<T>(
    path: string,
    queryParams?: Record<string, string | number>,
    headers?: Record<string, string>,
  ) {
    return this.request<T>(path, { method: "GET", queryParams, headers });
  }

  post<T>(path: string, body?: any, headers?: Record<string, string>) {
    return this.request<T>(path, { method: "POST", body, headers });
  }

  put<T>(path: string, body?: any, headers?: Record<string, string>) {
    return this.request<T>(path, { method: "PUT", body, headers });
  }

  delete<T>(path: string, body?: any, headers?: Record<string, string>) {
    return this.request<T>(path, { method: "DELETE", body, headers });
  }
}
