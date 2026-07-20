import { describe, expect, it } from "vitest";
import {
  PRODUCT_MCP_NAME,
  PRODUCT_NAME,
  PRODUCT_SHORT_NAME,
  PRODUCT_WORKSPACE_NAME,
  UPSTREAM_PRODUCT_NAME,
} from "./product-brand";

describe("Clarity product brand", () => {
  it("keeps the deployed product distinct from its upstream foundation", () => {
    expect(PRODUCT_NAME).toBe("Clarity SEO");
    expect(PRODUCT_SHORT_NAME).toBe("Clarity");
    expect(PRODUCT_WORKSPACE_NAME).toBe("Clarity");
    expect(PRODUCT_MCP_NAME).toBe("Clarity SEO MCP");
    expect(UPSTREAM_PRODUCT_NAME).toBe("OpenSEO");
  });
});
