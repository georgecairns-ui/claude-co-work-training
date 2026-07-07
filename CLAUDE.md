# What this project is

The Claude Cowork Academy - the interactive Cowork field guide and "Who Wants to Be a
Millionaire" style knowledge check (the Claude Co-Work quiz). It is served in production
as a static export at https://claudecofounder.com/cowork-quiz, embedded in the
claude-cofounder-site repo. Run by Get AI Powers.

# Stack

- Next.js 16 (App Router, TypeScript), Tailwind CSS 4, static export (`output: "export"`)
- Package manager: pnpm (no pnpm binary on this Mac - use `npx pnpm`)
- GitHub: georgecairns-ui/claude-co-work-training

# Commands

- Dev: `npx pnpm dev`
- Build/export: `npx pnpm build` (output lands in `out/`)
- Ship to production: `rsync -a --delete out/ ~/Claude/03_Projects/claude-cofounder-site/public/cowork-quiz/`
  then deploy claude-cofounder-site with its prebuilt Vercel flow.

# Rules for this repo

- `basePath` is `/cowork-quiz` and must stay that way - the export is served under that
  path on claudecofounder.com. Plain `<img>`/asset URLs need the `/cowork-quiz/` prefix
  by hand (next/image does not add it here).
- The email gate in `components/difficulty-picker.tsx` is required before the knowledge
  check; quiz events post to `/api/quiz-track` (a function in the claude-cofounder-site
  repo) via `lib/track.ts`. Tracking failures log to console, never block the player.
- Quiz questions and guide content live in `lib/quiz-levels.ts` and `lib/training-data.ts`.

# Gotchas

- The Vercel project `claude-co-work-training` no longer serves the quiz - it holds a
  redirect-only deployment sending everything to claudecofounder.com/cowork-quiz.
  Remote Vercel builds of this repo fail on pnpm build-script approval; there is no need
  to deploy this repo to Vercel at all.
- `package.json`'s `pnpm.ignoredBuiltDependencies` records that msw/sharp postinstall
  scripts are intentionally skipped.
