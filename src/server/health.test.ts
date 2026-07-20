import { describe, expect, it, vi } from "vitest";
import { handleHealthCheck } from "./health";

function createDatabase(result: unknown, error?: Error) {
  const first = error
    ? vi.fn().mockRejectedValue(error)
    : vi.fn().mockResolvedValue(result);
  const prepare = vi.fn().mockReturnValue({ first });

  return {
    database: { prepare },
    first,
    prepare,
  };
}

describe("handleHealthCheck", () => {
  it("reports healthy only after the database responds", async () => {
    const { database, first, prepare } = createDatabase({ ok: 1 });

    const response = await handleHealthCheck(
      new Request("https://open-seo.test/api/health"),
      database,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({ status: "ok" });
    expect(prepare).toHaveBeenCalledWith("SELECT 1 AS ok");
    expect(first).toHaveBeenCalledOnce();
  });

  it("returns no response body for Railway HEAD probes", async () => {
    const { database } = createDatabase({ ok: 1 });

    const response = await handleHealthCheck(
      new Request("https://open-seo.test/api/health", { method: "HEAD" }),
      database,
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("");
  });

  it("reports unhealthy without exposing storage errors", async () => {
    const { database } = createDatabase(
      undefined,
      new Error("database path and credentials"),
    );

    const response = await handleHealthCheck(
      new Request("https://open-seo.test/api/health"),
      database,
    );

    expect(response.status).toBe(503);
    const body = await response.text();
    expect(JSON.parse(body)).toEqual({ status: "unavailable" });
    expect(body).not.toContain("database path");
  });

  it("rejects methods other than GET and HEAD", async () => {
    const { database, prepare } = createDatabase({ ok: 1 });

    const response = await handleHealthCheck(
      new Request("https://open-seo.test/api/health", { method: "POST" }),
      database,
    );

    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET, HEAD");
    expect(prepare).not.toHaveBeenCalled();
  });
});
