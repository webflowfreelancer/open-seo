import { describe, expect, it } from "vitest";
import { resolveDelegatedAccess } from "./delegated-access";

describe("resolveDelegatedAccess", () => {
  it("places every admitted identity in the same organization and assigns Admin by email", () => {
    const config = {
      organizationId: "clarity-messaging",
      organizationName: "Clarity Messaging",
      adminEmails: " jordan@claritymessaging.com ",
    };

    expect(
      resolveDelegatedAccess("JORDAN@claritymessaging.com", config),
    ).toEqual({
      organizationId: "clarity-messaging",
      organizationName: "Clarity Messaging",
      role: "admin",
    });
    expect(resolveDelegatedAccess("pat@claritymessaging.com", config)).toEqual({
      organizationId: "clarity-messaging",
      organizationName: "Clarity Messaging",
      role: "user",
    });
  });
});
