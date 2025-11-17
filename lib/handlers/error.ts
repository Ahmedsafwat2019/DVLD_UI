import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    // Check if this is an auth-related error that should be silenced
    const isAuthError =
      error.message.toLowerCase().includes("null username") ||
      error.message.toLowerCase().includes("null role") ||
      error.message.toLowerCase().includes("unauthorized") ||
      error.message.toLowerCase().includes("not authenticated");

    // Only log non-auth errors or if it's not a 401/403/500 auth issue
    if (!isAuthError || (error.statusCode !== 401 && error.statusCode !== 403 && error.statusCode !== 500)) {
      logger.error(
        { err: error },
        `${responseType.toUpperCase()} Error: ${error.message}`
      );
    }

    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    logger.error({ err: error }, `ValidationError: ${validationError.message}`);
    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }
  if (error instanceof Error) {
    logger.error(error.message);
    return formatResponse(responseType, 500, error.message);
  }
  logger.error({ err: error }, "An unexpected error occurred");
  return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;
