# AI Agent Workflow & Guidelines

## Primary Tools

- **ChatGPT (GPT-5.5)**: Architectural planning, API schema design, and interview preparation.
- **Antigravity (Gemini 3.5 & 3.6 Flash/Pro)**: Autonomous code editing, refactoring, terminal execution, browser subagent testing, and verification.

## Usage & Execution Summary

- **Architecture & Scaffolding**: Planned the project layout, 3-tier backend service architecture (`Routes` ➔ `Controllers` ➔ `Services` ➔ `Models`), and modular React component system.
- **API & Middleware Development**: Built Express controllers, `express-validator` middleware, duplicate detection, response helpers (`utils/response.js`), and centralized status constants (`constants/status.js`).
- **AI Sentiment Analysis Integration**: Integrated `@google/genai` (Gemini API) to automatically generate sentiment labels, 1-sentence summaries, and keyword tags.
- **Design System & Visual Identity**: Established an editorial Paper & Ink theme (`index.css`), created the signature `QuoteSeal` brand mark, and eliminated raw emojis in favor of vector SVG icons and text badges.
- **Embeddable Widget Architecture**: Built a multi-view embeddable widget (`WidgetPage.jsx`) supporting Slideshow Carousel and List Feed views, custom color parameters, contextual Navbar rendering (`window.self !== window.top`), and live iframe code generation.
- **Automated Verification**: Executed shell scripts, `curl` API validation, autonomous browser subagent testing, and production Vite builds (`npm run build`).

## Core Engineering Rules

- **Modular React Components**: Prefer small, focused components (`Navbar`, `InputField`, `RatingStars`, `StatusBadge`, `TestimonialCard`, `Loader`, `EmptyState`, `QuoteSeal`).
- **RESTful API Conventions**: Maintain standard HTTP verbs (`GET`, `POST`, `PATCH`) and clean status codes (`200`, `201`, `400`, `404`, `500`).
- **Explain Generated Code**: Describe non-obvious logic or structural choices before applying code edits.
- **Empirical Verification**: Always run terminal tests (`npm run build`, `curl`, browser tests) to verify code correctness before declaring completion.
- **Minimal Dependencies**: Avoid unneeded packages; keep the bundle light, performant, and maintainable.