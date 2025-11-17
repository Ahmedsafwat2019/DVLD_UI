import { ActionResponse } from "@/types";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeout?: number;
  silentAuthErrors?: boolean;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 100000,
    headers: customHeaders = {},
    silentAuthErrors = false,
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      let errorMessage = `HTTP error: ${response.status}`;
      try {
        const text = await response.text();
        if (text) {
          try {
            const errorData = JSON.parse(text);
            if (errorData?.message) {
              errorMessage = errorData.message;
            } else if (errorData?.errors) {
              errorMessage = Array.isArray(errorData.errors)
                ? errorData.errors.join(", ")
                : JSON.stringify(errorData.errors);
            }
          } catch {
            errorMessage = text;
          }
        }
      } catch {}

      throw new RequestError(response.status, errorMessage);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { success: true } as ActionResponse<T>;
    }

    const text = await response.text();
    if (!text || text.trim() === "") {
      return { success: true } as ActionResponse<T>;
    }

    try {
      const data = JSON.parse(text);
      return data;
    } catch (err) {
      logger.error({ url, text }, "Failed to parse JSON response");
      throw new Error("Invalid JSON response from server");
    }
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
