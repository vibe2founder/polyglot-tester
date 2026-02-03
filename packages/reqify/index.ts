import {
  HttpMethod,
  HttpStatusCode,
  ApiUrl,
  JsonBody,
} from "../../types/api-types.js";

export interface ReqifyOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface ReqifyResponse<T = any> {
  status: HttpStatusCode;
  data: T;
  headers: Headers;
}

export const reqify = async <T = any>(
  url: ApiUrl,
  options: ReqifyOptions = {},
): Promise<ReqifyResponse<T>> => {
  const { method = "GET", headers = {}, body } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  return {
    status: response.status as HttpStatusCode,
    data: data as T,
    headers: response.headers,
  };
};
