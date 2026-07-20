import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findUser: vi.fn(),
  ensureDelegatedOrganization: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({
  env: {
    DELEGATED_ORGANIZATION_ID: "clarity-messaging",
    DELEGATED_ORGANIZATION_NAME: "Clarity Messaging",
    ADMIN_EMAILS: "jordan@claritymessaging.com",
  },
}));

vi.mock("@/db", () => ({
  db: {
    query: {
      user: {
        findFirst: mocks.findUser,
      },
    },
  },
}));

vi.mock("@/server/auth/delegated-organization", () => ({
  ensureDelegatedOrganization: mocks.ensureDelegatedOrganization,
}));

describe("resolveDelegatedContext", () => {
  beforeEach(() => {
    mocks.findUser.mockReset();
    mocks.ensureDelegatedOrganization.mockReset();
    mocks.ensureDelegatedOrganization.mockResolvedValue("clarity-messaging");
  });

  it("resolves different Cloudflare identities into the shared organization with their configured roles", async () => {
    mocks.findUser
      .mockResolvedValueOnce({ email: "jordan@claritymessaging.com" })
      .mockResolvedValueOnce({ email: "pat@claritymessaging.com" });
    const { resolveDelegatedContext } = await import("./delegated");

    await expect(
      resolveDelegatedContext(
        "cloudflare-jordan",
        "jordan@claritymessaging.com",
      ),
    ).resolves.toMatchObject({
      userEmail: "jordan@claritymessaging.com",
      organizationId: "clarity-messaging",
      role: "admin",
    });
    await expect(
      resolveDelegatedContext("cloudflare-pat", "pat@claritymessaging.com"),
    ).resolves.toMatchObject({
      userEmail: "pat@claritymessaging.com",
      organizationId: "clarity-messaging",
      role: "user",
    });

    expect(mocks.ensureDelegatedOrganization).toHaveBeenNthCalledWith(1, {
      id: "clarity-messaging",
      name: "Clarity Messaging",
    });
    expect(mocks.ensureDelegatedOrganization).toHaveBeenNthCalledWith(2, {
      id: "clarity-messaging",
      name: "Clarity Messaging",
    });
  });
});
