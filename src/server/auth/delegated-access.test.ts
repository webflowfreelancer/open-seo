import { describe, expect, it } from "vitest";
import {
  isDelegatedEmailAllowed,
  resolveDelegatedAccess,
} from "./delegated-access";

describe("resolveDelegatedAccess", () => {
  it("defaults the shared workspace label to Clarity without renaming its internal id", () => {
    expect(resolveDelegatedAccess("pat@claritymessaging.com", {})).toEqual({
      organizationId: "open-seo-shared",
      organizationName: "Clarity",
      role: "user",
    });
  });

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

  it("admits only the exact configured email domain", () => {
    expect(
      isDelegatedEmailAllowed(
        " Pat@ClarityMessaging.com ",
        "claritymessaging.com",
      ),
    ).toBe(true);
    expect(
      isDelegatedEmailAllowed(
        "pat@agency.claritymessaging.com",
        "claritymessaging.com",
      ),
    ).toBe(false);
    expect(
      isDelegatedEmailAllowed(
        "pat@claritymessaging.com.example",
        "claritymessaging.com",
      ),
    ).toBe(false);
  });
});
