# erik-dev.ca

Personal portfolio for Erik Johnston, full-stack software developer in Kelowna, BC. Live at [erik-dev.ca](https://erik-dev.ca).

## What the site is

- **Home (`/`)**: introduction, experience, skills, and links to the resume PDF and case studies. Every fact and number matches the current resume.
- **Case studies (`/projects/[slug]`)**: write-ups of recent work with an architecture diagram. Pages are generated at build time from `content/projects.ts`.
- **Caption generator (`/caption-generator`)**: a working tool that pulls captions from a YouTube video, translates them, and can burn them into a downloadable video. It is backed by the API routes under `pages/api/videos/`.

`/youtube-to-mp3` is a retired tool and permanently redirects to `/` (see `next.config.js`).

## Stack

- **Next.js 13** (Pages Router), **React 18**, and **TypeScript**
- **Sass modules** with shared components in `components/common`
- **Jest** and **React Testing Library** for tests
- **Caption generator**: Google Cloud Translation (v2), Firebase Storage (`gs://erik-dev-uploaded-videos`), `yt-dlp`, and `ffmpeg`
- **Hosting**: Docker image on **Google Cloud Run**, fronted by **Firebase Hosting**, deployed by **GitHub Actions**

## Project layout

```
content/            resume facts (resume.ts) and case studies (projects.ts)
components/home     homepage sections
components/projects case study layout and architecture diagram
components/captions caption generator UI
components/layout   header, footer, mobile navigation, nav links
components/common   buttons, cards, tags, page metadata, video player, upload box
pages/              routes: /, /projects/[slug], /caption-generator, /api/videos/*
firebaseUtils/      Firebase Storage helpers for uploaded and generated videos
utilities/          ffmpeg wrapper, language list, bundled yt-dlp binaries
public/files        resume PDF
public/images       headshot, Open Graph image, project screenshots
```

## Updating content

- **Resume facts** (highlights, experience, skills) live in `content/resume.ts`. Keep them identical to the master resume.
- **Case studies** live in `content/projects.ts`. Adding an entry creates a new `/projects/<slug>` page at build time.
- **Resume PDF**: replace `public/files/resume.pdf` and update `RESUME_UPDATED` in `components/layout/navigation.ts`.

## Local development

Requires Node 20. Use Yarn, because `yarn.lock` is the lockfile the production image installs from.

```bash
yarn install
yarn dev        # http://localhost:3000
yarn test       # Jest
yarn lint
yarn build      # production build
yarn start      # serve the production build
```

The portfolio pages need no environment setup. The caption generator also needs:

- `ffmpeg` on your `PATH`, plus Python 3 for `yt-dlp`. Platform binaries for `yt-dlp` are in `utilities/ytdlp/`.
- Google Cloud credentials for the Translation API. The client uses Application Default Credentials, so run `gcloud auth application-default login` against the `erik-dev-896d1` project.

The Firebase web config is in `pages/_app.tsx`. These are public client keys, and access is controlled by the Firebase Storage rules.

## Deployment

Production runs in Google Cloud project `erik-dev-896d1`, region `us-west1`.

1. **Cloud Run (automatic).** Every push to `main` (or a manual run) triggers `.github/workflows/deploy.yml`. The workflow:
   - authenticates to Google Cloud using the `GCP_CREDENTIALS` repository secret (a service account key JSON),
   - builds the `Dockerfile` (Node 20 with ffmpeg and Python, then `yarn install --frozen-lockfile` and `yarn build`),
   - pushes the image to Artifact Registry at `us-west1-docker.pkg.dev/erik-dev-896d1/erik-dev/erik-dev:<commit sha>`,
   - deploys it to the `erik-dev` Cloud Run service (256 MiB, 0 to 10 instances, 300 s timeout, public).

   Cloud Run sets `PORT=8080` at runtime, which overrides the `PORT=3000` default in the Dockerfile. `next start` reads that value.

2. **Firebase Hosting (manual).** `firebase.json` serves the custom domain and rewrites every request to the `erik-dev` Cloud Run service:

   ```bash
   firebase deploy --only hosting
   ```

   The rewrite uses `pinTag: true`, so Hosting keeps serving the Cloud Run revision that was live when Hosting was last deployed. After a Cloud Run deploy, run the command above to point the domain at the new revision.
