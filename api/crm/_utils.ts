import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "node:http";

export type VercelRequest = IncomingMessage & {
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  headers: IncomingHttpHeaders;
};

export type VercelResponse = ServerResponse;

const DEFAULT_MAX_BODY_BYTES = 16 * 1024;

type JsonResult =
  | { ok: true; data: unknown }
  | { ok: false; status: number; message: string };

const byteLength = (value: string) => Buffer.byteLength(value, "utf8");

export const setAllowHeader = (response: VercelResponse, methods: string[]) => {
  response.setHeader("Allow", methods.join(", "));
};

export const guardMethod = (request: VercelRequest, response: VercelResponse, methods: string[]) => {
  if (request.method && methods.includes(request.method)) return true;
  setAllowHeader(response, methods);
  return false;
};

export const getSingleQueryParam = (request: VercelRequest, key: string): string | undefined => {
  const value = request.query?.[key];
  if (Array.isArray(value)) return value[0];
  if (typeof value === "string") return value;
  return undefined;
};

export const readJsonBody = async (
  request: VercelRequest,
  maxBytes = DEFAULT_MAX_BODY_BYTES,
): Promise<JsonResult> => {
  try {
    if (request.body !== undefined) {
      if (typeof request.body === "string") {
        if (byteLength(request.body) > maxBytes) {
          return { ok: false, status: 413, message: "The submitted payload is too large." };
        }

        return { ok: true, data: request.body ? JSON.parse(request.body) : {} };
      }

      const bodyText = JSON.stringify(request.body);
      if (byteLength(bodyText) > maxBytes) {
        return { ok: false, status: 413, message: "The submitted payload is too large." };
      }

      return { ok: true, data: request.body };
    }

    const rawBody = await new Promise<string>((resolve, reject) => {
      let body = "";
      let size = 0;

      request.on("data", (chunk: Buffer) => {
        size += chunk.length;
        if (size > maxBytes) {
          reject(new Error("PAYLOAD_TOO_LARGE"));
          request.destroy();
          return;
        }
        body += chunk.toString("utf8");
      });

      request.on("end", () => resolve(body));
      request.on("error", reject);
    });

    return { ok: true, data: rawBody ? JSON.parse(rawBody) : {} };
  } catch (error) {
    if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
      return { ok: false, status: 413, message: "The submitted payload is too large." };
    }

    return { ok: false, status: 400, message: "Submit a valid JSON payload." };
  }
};

export const parsePositiveInteger = (
  value: string | null,
  fallback: number,
  max: number,
) => {
  const parsed = Number.parseInt(value || "", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
};

export const parseSort = (value: string | null) => {
  if (value === "oldest" || value === "follow_up") return value;
  return "newest";
};
