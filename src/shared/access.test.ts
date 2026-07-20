import { describe, expect, it } from "vitest";
import { canManageWorkspace } from "./access";

describe("canManageWorkspace", () => {
  it("shows shared-configuration controls only to Admin", () => {
    expect(canManageWorkspace("admin")).toBe(true);
    expect(canManageWorkspace("user")).toBe(false);
  });
});
