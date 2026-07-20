# Domain Docs

This repository uses a single domain context.

## Before exploring

- Read root `CONTEXT.md` when it exists.
- Read relevant ADRs under `docs/adr/`.
- If either location does not exist, proceed silently. Domain-modeling creates
  these files lazily when terminology or a durable decision is resolved.

## Layout

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
├── src/
├── web/
└── badseo/
```

The root application, landing/documentation site, and site-audit fixture share
the same product and SEO vocabulary.

## Consumer rules

- Use terminology defined in `CONTEXT.md`.
- Avoid introducing synonyms for defined concepts.
- If a needed concept is missing, reconsider the wording or capture the gap for
  domain modeling.
- Surface conflicts with existing ADRs explicitly instead of silently
  overriding them.
