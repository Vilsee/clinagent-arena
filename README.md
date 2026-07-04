# ClinAgent Arena

ClinAgent Arena is a public, open-source safety record for clinical AI agents. It adversarially red-teams clinical LLMs and agent systems against a shared attack taxonomy, then publishes the results.

This repository contains the front-end web application built to visualize the methodology, attack taxonomy, and leaderboards for the ClinAgent Arena project.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla CSS for tokens, no UI kits)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```text
clinagent-arena/
├── app/
│   ├── compliance/       # EU AI Act regulatory mapping & FAQs
│   ├── contribute/       # Instructions for submitting agents or taxonomy PRs
│   ├── demo/             # Interactive simulation of the Attacker -> Target -> Judge pipeline
│   ├── how-it-works/     # Detailed methodology and scoring rubric
│   ├── leaderboard/      # The interactive risk matrix evaluating different systems
│   ├── taxonomy/         # The 6 distinct adversarial attack categories
│   ├── globals.css       # Design tokens, resets, and core component styles
│   ├── layout.tsx        # Global shell (Header, Footer, Metadata)
│   └── page.tsx          # Home page
├── components/           # Shared React components (Header, Footer, etc.)
├── lib/                  # Static mock data (leaderboard-data.ts, demo-scenarios.ts)
└── public/               # Static assets
```

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Currently, the front-end is completely static and relies on mock data for the demo and leaderboard. However, if you plan to wire up the `/demo` to a live LLM API in the future, you will need to provide API keys. 

Copy the `.env.example` file to `.env.local` to configure your environment variables:
```bash
cp .env.example .env.local
```

*Note: Never commit `.env.local` or any real API keys to version control.*
