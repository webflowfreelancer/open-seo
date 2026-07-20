import { createFileRoute } from "@tanstack/react-router";
import { PRODUCT_NAME } from "@/shared/product-brand";

const OPENROUTER_KEYS_URL = "https://openrouter.ai/settings/keys";

export const Route = createFileRoute("/_app/help/openrouter-api-key")({
  component: OpenrouterApiKeyHelpPage,
});

function OpenrouterApiKeyHelpPage() {
  return (
    <div className="px-4 py-4 md:px-6 md:py-6 pb-24 md:pb-8 overflow-auto">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-3">
            <h1 className="text-2xl font-semibold">
              Set up your OpenRouter API key
            </h1>
            <p className="text-sm text-base-content/70">
              {PRODUCT_NAME} needs the <code>OPENROUTER_API_KEY</code> secret
              before AI features like SAM, the in-app SEO agent, can run. It is
              optional — everything else in {PRODUCT_NAME} works without it.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h2 className="card-title text-base">Steps</h2>
            <ol className="list-decimal pl-5 text-sm space-y-3 text-base-content/80">
              <li>
                Create an account at{" "}
                <a
                  className="link link-primary"
                  href="https://openrouter.ai"
                  target="_blank"
                  rel="noreferrer"
                >
                  openrouter.ai
                </a>{" "}
                and add credits (pay-as-you-go, like DataForSEO).
              </li>
              <li>
                Go to{" "}
                <a
                  className="link link-primary"
                  href={OPENROUTER_KEYS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenRouter API Keys
                </a>{" "}
                and click "Create API Key".
              </li>
              <li>
                Save the key as the <code>OPENROUTER_API_KEY</code> secret in
                your environment:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Railway: set it in the service Variables tab</li>
                  <li>
                    Docker self-hosting: set it in <code>.env</code>
                  </li>
                  <li>
                    Local development: <code>.env.local</code>
                  </li>
                </ul>
              </li>
              <li>Redeploy {PRODUCT_NAME}.</li>
            </ol>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-2 text-sm text-base-content/75">
            <h2 className="card-title text-base">Railway production service</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-base-content/80">
              <li>
                Open the <code>Clarity SEO</code> service in Railway.
              </li>
              <li>
                Open the <code>Variables</code> tab.
              </li>
              <li>
                Add <code>OPENROUTER_API_KEY</code> and paste the key.
              </li>
              <li>Apply the staged change and wait for the redeploy.</li>
            </ol>

            <p>
              Keep this value in Railway only. Do not expose it in the browser,
              chat, source control, or a client project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
