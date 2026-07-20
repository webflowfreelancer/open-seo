# Clarity SEO Product Reference

Clarity SEO is Clarity Messaging's internal, shared SEO workspace. It is built
from the open-source OpenSEO project and presents the Clarity SEO name to team
members while preserving upstream code and infrastructure identifiers.

## Workspace and access

- Every admitted `@claritymessaging.com` identity works in one Clarity
  organization and can see every client project.
- Admins connect external accounts, create or archive projects, and change
  project settings.
- Users can run research, audits, rank tracking, SAM, MCP queries, and exports
  across every project.
- There is no public signup, subscription, billing, or per-client access model.
  Admin membership is managed in deployment configuration.

## SEO workflows

Clarity SEO supports keyword research and saved keyword lists, domain and
competitor research, backlinks, live SERP analysis, rank tracking, technical
site audits, Google Search Console reporting, and project-scoped exports.

DataForSEO powers paid search-data lookups. Those calls spend the shared
deployment's provider balance, so avoid redundant or unnecessarily large
batches and confirm unusually large research runs first. Viewing saved data,
project configuration, and most state does not call DataForSEO.

## Google Search Console

Search Console access is read-only. An Admin links the shared Google grant, and
team members use the connected properties inside client projects. Clarity SEO
cannot modify Search Console data.

## SAM and MCP

SAM is the in-app SEO teammate. It uses the shared, budget-limited OpenRouter
configuration and operates on the active project.

The Clarity SEO MCP server exposes project-scoped research tools to compatible
AI clients. Team members connect to the MCP URL shown on the AI & MCP page and
authenticate through the protected Clarity SEO deployment.

## Support

For account linking, access, integration, or deployment questions, ask a
Clarity admin. The Help & Resources page identifies upstream OpenSEO community
and source links when an issue belongs to the underlying open-source project.
