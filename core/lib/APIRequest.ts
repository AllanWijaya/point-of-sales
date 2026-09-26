import { API_BASE_URL } from "../helpers/AppConfig";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface APIRequestOptions<TBody = unknown> {
  url: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  method?: HTTPMethod;
  body?: TBody;
  signal?: AbortSignal;
}

const AUTH_TOKEN_KEY = "auth_token";

export function setAuthToken(token: string | null): void {
  if (typeof window === "undefined") return;

  if (token) window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  else window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function APIRequest<TResponse = unknown, TBody = unknown>({
  url,
  params,
  method = "GET",
  body,
  signal,
}: APIRequestOptions<TBody>): Promise<TResponse> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }

  const queryString = searchParams.toString();

  const requestUrl =
    `${API_BASE_URL}${url}` + (queryString ? `?${queryString}` : "");

  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKEN_KEY)
      : null;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(requestUrl, {
    method,
    signal,
    headers,
    credentials: "include",
    body:
      body !== undefined && method !== "GET" ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new APIRequestError(
      typeof data === "object" && data !== null && "message" in data
        ? String(data.message)
        : "Request failed",
      response.status,
      data,
    );
  }

  return data as TResponse;
}

export class APIRequestError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);

    this.name = "APIRequestError";
    this.status = status;
    this.data = data;
  }
}
