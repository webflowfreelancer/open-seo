import { describe, expect, it } from "vitest";
import { AppError } from "@/server/lib/errors";
import { requireAdminAccess } from "./authorization";

describe("requireAdminAccess", () => {
  it("allows Admin and rejects User with a forbidden application error", () => {
    expect(() => requireAdminAccess({ role: "admin" })).not.toThrow();

    try {
      requireAdminAccess({ role: "user" });
      throw new Error("Expected User access to be rejected");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toMatchObject({ code: "FORBIDDEN" });
    }
  });
});
