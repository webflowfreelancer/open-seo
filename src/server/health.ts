export const HEALTH_CHECK_PATH = "/api/health";

interface HealthDatabase {
  prepare(query: string): {
    first<T = unknown>(): Promise<T | null>;
  };
}

function healthResponse(
  request: Request,
  status: 200 | 503,
  body: { status: "ok" | "unavailable" },
) {
  return new Response(request.method === "HEAD" ? null : JSON.stringify(body), {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });
}

export async function handleHealthCheck(
  request: Request,
  database: HealthDatabase,
): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, {
      status: 405,
      headers: {
        allow: "GET, HEAD",
        "cache-control": "no-store",
      },
    });
  }

  try {
    const result = await database
      .prepare("SELECT 1 AS ok")
      .first<{ ok: number }>();
    if (result?.ok !== 1) {
      return healthResponse(request, 503, { status: "unavailable" });
    }
  } catch {
    return healthResponse(request, 503, { status: "unavailable" });
  }

  return healthResponse(request, 200, { status: "ok" });
}
