import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  upsertDelegatedOrganization: vi.fn(),
}));

vi.mock("@/server/auth/repositories/AuthRepository", () => ({
  AuthRepository: {
    upsertDelegatedOrganization: mocks.upsertDelegatedOrganization,
  },
}));

describe("ensureDelegatedOrganization", () => {
  beforeEach(() => {
    mocks.upsertDelegatedOrganization.mockReset();
  });

  it("upserts the configured shared organization without user-specific identity", async () => {
    const { ensureDelegatedOrganization } =
      await import("./delegated-organization");

    await expect(
      ensureDelegatedOrganization({
        id: "clarity-messaging",
        name: "Clarity Messaging",
      }),
    ).resolves.toBe("clarity-messaging");

    expect(mocks.upsertDelegatedOrganization).toHaveBeenCalledWith({
      id: "clarity-messaging",
      name: "Clarity Messaging",
      slug: "delegated-clarity-messaging",
    });
  });
});
