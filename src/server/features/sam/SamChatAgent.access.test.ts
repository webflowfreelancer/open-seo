import type {
  ChatResponseResult,
  StepContext,
  TurnContext,
} from "@cloudflare/think";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getSessionById: vi.fn(),
  touchSession: vi.fn(),
  getProjectById: vi.fn(),
  buildSamMcpTools: vi.fn(),
  getUsageCreditsRemaining: vi.fn(),
  trackUsageCreditSpend: vi.fn(),
  openRouterCostUsd: vi.fn(),
  storageGet: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({
  env: {},
}));

vi.mock("@cloudflare/think", () => ({
  Think: class {
    name = "sam-session-1";
    env = {};
    messages = [];
    ctx = {
      storage: {
        get: mocks.storageGet,
        put: vi.fn(),
      },
    };
    session = {
      refreshSystemPrompt: vi.fn(),
    };
  },
}));

vi.mock("agents/chat", () => ({
  clearChatTerminal: vi.fn(),
}));

vi.mock("@/db", () => ({
  withPgClient: <T>(callback: () => T) => callback(),
  db: {
    select: () => ({
      from: () => ({
        where: () => ({
          limit: async () => [{ email: "pat@claritymessaging.com" }],
        }),
      }),
    }),
  },
}));

vi.mock("@/server/features/sam/SamSessionRepository", () => ({
  SamSessionRepository: {
    getSessionById: mocks.getSessionById,
    setTitle: vi.fn(),
    touch: mocks.touchSession,
  },
}));

vi.mock("@/server/features/projects/repositories/ProjectRepository", () => ({
  ProjectRepository: {
    getProjectById: mocks.getProjectById,
  },
}));

vi.mock("@/server/features/sam/SamProjectMemoryRepository", () => ({
  SamProjectMemoryRepository: {
    getBlock: vi.fn(),
    setBlock: vi.fn(),
  },
}));

vi.mock("@/server/features/sam/samChatTools", () => ({
  buildSamMcpTools: mocks.buildSamMcpTools,
}));

vi.mock("@/server/lib/runtime-env", () => ({
  getEnvValueSync: vi.fn(),
  isHostedServerAuthMode: vi.fn().mockResolvedValue(true),
}));

vi.mock("@/server/billing/subscription", () => ({
  getUsageCreditsRemaining: mocks.getUsageCreditsRemaining,
  trackUsageCreditSpend: mocks.trackUsageCreditSpend,
}));

vi.mock("@/server/lib/chatAgent", () => ({
  openRouterCostUsd: mocks.openRouterCostUsd,
}));

function mockValue<T>(value: unknown): T {
  // oxlint-disable-next-line typescript-eslint/no-unsafe-type-assertion -- tests replace the Worker/Think runtime with the minimal surface used by this class
  return value as T;
}

describe("SAM shared-organization access", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getSessionById.mockResolvedValue({
      id: "sam-session-1",
      projectId: "project-1",
      userId: "cloudflare-pat",
      title: "Shared strategy",
    });
    mocks.getProjectById.mockResolvedValue({
      id: "project-1",
      name: "Client One",
      domain: "client.example",
      locationCode: 2840,
      languageCode: "en",
      organizationId: "clarity-messaging",
    });
    mocks.getUsageCreditsRemaining.mockResolvedValue({
      monthlyRemaining: 100,
      topupRemaining: 0,
    });
    mocks.openRouterCostUsd.mockReturnValue(0.25);
    mocks.storageGet.mockResolvedValue("https://seo.claritymessaging.com");
    mocks.buildSamMcpTools.mockReturnValue({});
  });

  it("attributes a shared-organization User's tools and provider spend to Clarity", async () => {
    const { SamChatAgent } = await import("./SamChatAgent");
    const agent = new SamChatAgent(
      mockValue<DurableObjectState>({}),
      mockValue<Cloudflare.Env>({}),
    );

    await expect(
      agent.beforeTurn(mockValue<TurnContext>({})),
    ).resolves.toMatchObject({ maxSteps: 48 });

    expect(mocks.getUsageCreditsRemaining).toHaveBeenCalledWith(
      "clarity-messaging",
    );
    expect(mocks.buildSamMcpTools).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "cloudflare-pat",
        userEmail: "pat@claritymessaging.com",
        organizationId: "clarity-messaging",
        baseUrl: "https://seo.claritymessaging.com",
      }),
      {
        id: "project-1",
        domain: "client.example",
      },
    );

    agent.onStepFinish(
      mockValue<StepContext>({
        providerMetadata: {},
      }),
    );
    await agent.onChatResponse(
      mockValue<ChatResponseResult>({
        status: "failed",
      }),
    );

    expect(mocks.trackUsageCreditSpend.mock.calls[0]?.[0]).toMatchObject({
      customer: {
        userId: "cloudflare-pat",
        userEmail: "pat@claritymessaging.com",
        organizationId: "clarity-messaging",
        projectId: "project-1",
      },
      customerId: "clarity-messaging",
      creditFeature: "agent",
      costUsd: 0.25,
    });
  });
});
