import { createFileRoute } from "@tanstack/react-router";
import { PRODUCT_NAME } from "@/shared/product-brand";

const DATAFORSEO_API_ACCESS_URL = "https://app.dataforseo.com/api-access";

export const Route = createFileRoute("/_app/help/dataforseo-api-key")({
  component: DataforseoApiKeyHelpPage,
});

function DataforseoApiKeyHelpPage() {
  return (
    <div className="px-4 py-4 md:px-6 md:py-6 pb-24 md:pb-8 overflow-auto">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-3">
            <h1 className="text-2xl font-semibold">
              Set up your DataForSEO API key
            </h1>
            <p className="text-sm text-base-content/70">
              {PRODUCT_NAME} needs the <code>DATAFORSEO_API_KEY</code> secret
              before keyword, domain, and SEO data workflows can run.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h2 className="card-title text-base">Steps</h2>
            <ol className="list-decimal pl-5 text-sm space-y-3 text-base-content/80">
              <li>
                Go to{" "}
                <a
                  className="link link-primary"
                  href={DATAFORSEO_API_ACCESS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  DataForSEO API Access
                </a>{" "}
                and request API credentials by email.
              </li>
              <li>
                Base64 encode your DataForSEO login and API password in this
                format:
                <pre className="mt-2 p-3 rounded bg-base-200 border border-base-300 overflow-x-auto text-xs">
                  <code>printf '%s' 'YOUR_LOGIN:YOUR_PASSWORD' | base64</code>
                </pre>
              </li>
              <li>
                Save the output as the <code>DATAFORSEO_API_KEY</code> secret in
                your environment.
              </li>
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
                Add <code>DATAFORSEO_API_KEY</code> and paste the base64 value
                from the terminal command above.
              </li>
              <li>Apply the staged change and wait for the redeploy.</li>
            </ol>

            <p>
              Keep this value in Railway only. Do not paste it into chat, source
              control, or a client project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
