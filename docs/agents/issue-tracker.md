# Issue tracker: GitHub

Issues and PRDs live in GitHub Issues on `webflowfreelancer/open-seo`. Use the
`gh` CLI for operations. The upstream repository is `every-app/open-seo`.

## Conventions

- Create: `gh issue create --title "..." --body "..."`
- Read: `gh issue view <number> --comments`
- List: `gh issue list --state open --json number,title,body,labels,comments`
- Comment: `gh issue comment <number> --body "..."`
- Label: `gh issue edit <number> --add-label "..."`
- Close: `gh issue close <number> --comment "..."`
- Pull requests as a triage request surface: no.

When a skill says to publish to the issue tracker, create a GitHub issue. When
it says to fetch a ticket, read the matching issue and its comments.

## Wayfinding operations

- A map is an issue labelled `wayfinder:map`.
- Tickets are native GitHub sub-issues labelled `wayfinder:research`,
  `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`.
- Blocking uses native GitHub issue dependencies.
- The frontier is the map's open, unblocked, unassigned child issues in map
  order.
- Claim a ticket by assigning it before beginning work.
- Resolve it with a resolution comment, close it, and append its linked gist to
  the map's Decisions-so-far section.
