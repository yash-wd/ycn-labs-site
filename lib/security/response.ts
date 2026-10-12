import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "INVALID_INPUT"
  | "RATE_LIMITED"
  | "UNSUPPORTED_MEDIA"
  | "PAYLOAD_TOO_LARGE"
  | "SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  requestId: string;
}

export interface ApiFailure {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
  requestId: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiFailure;

export function createSuccessResponse<T>(
  data: T,
  requestId: string,
  status = 200
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      requestId,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}

export function createErrorResponse(
  code: ApiErrorCode,
  message: string,
  requestId: string,
  status: number,
  headersInit?: Record<string, string>,
  fieldErrors?: Record<string, string[]>
): NextResponse<ApiFailure> {
  const headers: Record<string, string> = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    ...headersInit,
  };

  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(fieldErrors ? { fieldErrors } : {}),
      },
      requestId,
    },
    {
      status,
      headers,
    }
  );
}
