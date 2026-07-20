# Railway Self-Hosting

This repository includes a Railway deployment contract for a single, durable
OpenSEO service. The application is built from `Dockerfile.selfhost`, serves on
Railway's assigned port, and stores its local D1 and Durable Object state on a
Railway volume.

## Service shape

- Source: this GitHub repository
- Config file: `/railway.toml`
- Dockerfile: `/Dockerfile.selfhost`
- Persistent volume mount: `/app/.wrangler`
- Health check: `GET /api/health`
- Replicas: `1`

Keep the service at one replica while it uses local D1/SQLite. A Railway volume
can be attached to only one running deployment at a time, and multiple
independent replicas would not share the same database.

The volume is required at startup. The image compiles during Railway's build
and retains Vite's immutable deploy metadata outside the mount. At startup the
container seeds that metadata into Railway's otherwise-empty bind mount, applies
D1 migrations, and starts Vite on `0.0.0.0:$PORT`. Do not move the migration
into Railway's pre-deploy command: Railway volumes are not mounted during
pre-deploy.

## Required variables

Configure these in Railway's production environment:

```text
AUTH_MODE=cloudflare_access
ALLOWED_HOST=healthcheck.railway.app
BETTER_AUTH_URL=https://seo.claritymessaging.com
TEAM_DOMAIN=https://<team>.cloudflareaccess.com
POLICY_AUD=<Cloudflare Access application audience>
DELEGATED_ORGANIZATION_ID=<shared Clarity organization id>
DELEGATED_ORGANIZATION_NAME=Clarity
ADMIN_EMAILS=<comma-separated admin addresses>
ALLOWED_EMAIL_DOMAIN=claritymessaging.com
DATAFORSEO_API_KEY=<base64 login:password>
```

Railway sends its startup probe with `Host: healthcheck.railway.app`, so that
hostname must be the explicit `ALLOWED_HOST`. The public application hostname
is also allowed because Vite derives it from `BETTER_AUTH_URL`.

The Docker image already defaults
`CLOUDFLARE_INCLUDE_PROCESS_ENV=true`,
`OPENSEO_TELEMETRY_DISABLED=1`, and `VITE_SHOW_DEVTOOLS=false`. Set them
explicitly in Railway as well if you want the deployment settings to document
the policy.

Google Search Console and AI variables are optional until their integrations
are configured. See the other self-hosting guides for their names and setup.
Never commit variable values.

## Persistent storage and backups

Attach one Railway volume to the service at exactly `/app/.wrangler`. This path
contains Miniflare's local D1 database and Durable Object state. Recreating or
redeploying the container is safe only when the same volume remains attached.

Enable daily, weekly, and monthly volume backup schedules in Railway after the
first healthy deployment. Restore tests should be performed in a non-production
service or environment before relying on the backup procedure.

## Health and rollout behavior

`/api/health` bypasses application authentication but discloses only
`{"status":"ok"}` or `{"status":"unavailable"}`. A response is healthy only
after a query against the D1 binding succeeds. Railway will not switch traffic
to a new deployment until this endpoint returns `200`.

`railway.toml` disables deployment overlap because both old and new containers
cannot safely write to the same local database at once. It also requires the
volume mount, drains the process for 30 seconds, and restarts the service after
an unexpected exit.

## Upstream maintenance

Keep Railway and Clarity changes as shallow commits on the fork. Pull upstream
changes into a review branch, run the full checks plus the self-host container
smoke test, then merge and promote that reviewed revision. Avoid editing
upstream migrations after they have reached production.
