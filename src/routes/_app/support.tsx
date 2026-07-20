import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  PRODUCT_NAME,
  UPSTREAM_PRODUCT_NAME,
  UPSTREAM_REPOSITORY_URL,
} from "@/shared/product-brand";

const DISCORD_URL = "https://discord.gg/c9uGs3cFXr";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="h-full overflow-auto bg-base-100 px-4 py-8 pb-24 md:px-6 md:py-12 md:pb-8">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-medium text-base-content/40">
          Help & Resources
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Get help with {PRODUCT_NAME}
        </h1>
        <p className="mt-2 text-sm text-base-content/60">
          Start with a Clarity admin for account, integration, or client-project
          questions. The upstream project remains available for source-level
          bugs and community support.
        </p>

        <div className="mt-8 space-y-3">
          <div className="rounded-lg border border-base-300 px-5 py-4">
            <p className="text-sm font-semibold">Internal support</p>
            <p className="mt-1 text-sm text-base-content/60">
              Ask a Clarity admin to connect accounts, update deployment
              configuration, or investigate access and project issues.
            </p>
          </div>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-base-300 px-5 py-4 transition-colors hover:border-base-content/20"
          >
            <p className="text-sm font-semibold">
              {UPSTREAM_PRODUCT_NAME} community
            </p>
            <p className="mt-1 text-sm text-base-content/60">
              Ask implementation questions and learn from the open-source
              community behind {PRODUCT_NAME}.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-base-content">
              Join the upstream Discord
              <ArrowUpRight className="size-3.5" />
            </span>
          </a>

          <a
            href={`${UPSTREAM_REPOSITORY_URL}/issues`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-base-300 px-5 py-4 transition-colors hover:border-base-content/20"
          >
            <p className="text-sm font-semibold">
              {UPSTREAM_PRODUCT_NAME} GitHub issues
            </p>
            <p className="mt-1 text-sm text-base-content/60">
              Review or report defects in the underlying open-source project.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-base-content">
              Open upstream issues
              <ArrowUpRight className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
