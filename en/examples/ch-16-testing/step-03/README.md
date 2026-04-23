# example_16_03

**Chapter 16: Testing** · step 03 (Chromatic CI workflow)

GitHub Actions workflow that runs Chromatic on every push and PR to
`main`. It builds the Storybook in CI, uploads it to Chromatic, and
Chromatic diffs pixel by pixel against the approved baseline.
Differences are flagged for human review.

Not runnable standalone. It is a file to drop into the repo that hosts
your Storybook. Requires the `CHROMATIC_PROJECT_TOKEN` secret on the
GitHub repo.

## How to plug it in

1. Copy `.github/workflows/chromatic.yml` into the repo root that
   holds your Storybook (the one in Chapter 13 step-01 works).
2. Create an account at [chromatic.com](https://www.chromatic.com/),
   connect the repo, copy the `project-token`.
3. On GitHub, `Settings → Secrets and variables → Actions`, add
   `CHROMATIC_PROJECT_TOKEN` with that value.
4. Push to `main`. The first run stamps the initial baseline with no
   diff.
5. Push a PR with a visual change. Chromatic detects the diff, adds
   a link to the PR status. Open that link, approve or reject.

## Three lines that matter

**`exitZeroOnChanges: true`.** Visual changes do NOT fail the
workflow. The workflow passes and the PR status asks for manual
review. Without this, any visual change blocks the PR and creates
friction with the design team.

**`onlyChanged: true`.** "TurboSnap" mode. Chromatic only re-renders
stories affected by the PR diff, not the whole Storybook. Saves a lot
of time and credits on teams with 200+ stories.

**`fetch-depth: 0` on checkout.** Chromatic diffs against the base
branch. Without depth=0, git history doesn't include main and
Chromatic fails because it can't find the baseline.

## If you don't want to pay for Chromatic

There is a limited free tier (5k snapshots per month). For OSS or
small teams it is enough. If it falls short:

- **Loki** (open source). Runs headless Chrome in your CI, one
  screenshot per story, pixel diff. More manual setup, zero cost.
  GitHub repo: `oblador/loki`.
- **Percy** (formerly BrowserStack). Similar to Chromatic, similar
  pricing.
- **Playwright visual comparison**. Use `toHaveScreenshot()` per
  story, works without an external service. Medium setup.

For an enterprise DS with 5+ consumer apps, Chromatic pays its cost
in review time and confidence. For a side project, Loki.

## Back to the book

- Source text: `ENG/05-implementation/ch-16-testing.md`, section
  "Visual regression with Chromatic"
- Related chapter: `ch-13-storybook/step-01` (Storybook to deploy)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
