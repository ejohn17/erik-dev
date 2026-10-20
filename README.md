# erik-dev.ca

Personal portfolio for Erik Johnston, full-stack software developer in Kelowna, BC. Live at [erik-dev.ca](https://erik-dev.ca).

The site covers experience, case studies of recent work, and skills. Every fact and number matches the current resume.

## Stack

- **Next.js 13** (Pages Router) and **TypeScript**
- **Sass modules** with a small set of shared components in `components/common`
- **Jest** and **React Testing Library**
- **Docker** image built by **GitHub Actions** and deployed to **Google Cloud Run**

## Project layout

```
content/            resume facts (resume.ts) and case studies (projects.ts)
components/home     homepage sections
components/projects case study layout and architecture diagram
components/layout   header, footer, mobile navigation, nav links
components/common   buttons, cards, tags, page metadata
pages/              routes: /, /projects/[slug], /caption-generator, /api/videos/*
public/files        resume PDF
public/images       headshot, Open Graph image, project screenshots
```

## Updating content

- **Resume facts** (highlights, experience, skills) live in `content/resume.ts`. Keep them identical to the master resume.
- **Case studies** live in `content/projects.ts`. Adding an entry creates a new `/projects/<slug>` page at build time.
- **Resume PDF**: replace `public/files/resume.pdf` and update `RESUME_UPDATED` in `components/layout/navigation.ts`.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Jest
npm run build   # production build
```

The caption generator under `/caption-generator` needs Google Cloud Translation and Firebase Storage credentials. The rest of the site has no environment requirements.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the Docker image, pushes it to Artifact Registry, and deploys it to Cloud Run (`us-west1`).
