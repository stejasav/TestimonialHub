# JOURNAL.md — Decision Journal

## 1. Prioritization

- **What did you decide to build, in what order, and why?**
  1. **Project structure & Environment Setup (Current step):** Set up backend folders (`models`, `routes`, `controllers`, `config`, `middleware`) and frontend folders (`components`, `pages`, `services`) to establish a clean separation of concerns early.
  2. **Database & Backend API Foundation:** Define MongoDB models for testimonials (storing status, sentiment, customer details, and content) and set up Express connection.
  3. **Customer Submission Form:** Create the frontend form for testimonial collection.
  4. **Moderation Dashboard:** Build the admin interface to approve/reject testimonials and view sentiment analysis results.
  5. **Embeddable Widget / Public Wall:** Create a shareable widget & public wall layout.
- **What did you deliberately cut or skip? Why those?**
  - None yet, as we are at the initialization phase.

## 2. Key decisions

- **Decision:** Using ES Modules (`import/export`) for the Node.js/Express backend.
- **Options:** CommonJS (`require()`).
- **Why:** ES Modules keep the codebase uniform between the React frontend (Vite) and the Express backend, simplifying importing and syntax usage across the whole repository.

## 3. Working with AI agents

- **Tools and models used:** Antigravity (Google DeepMind agent), utilizing Gemini 3.5 models.
- **How you split the work:** 
  - **User:** Installs initial packages (`npm install express mongoose ...`), initiates git repository, configures gitignore.
  - **Agent:** Structures directories, modifies backend configs (`package.json`), sets up initial `server.js` and `.env` template.
- **Your agent setup:** Default Antigravity configuration. No custom instruction files or skills written yet.
- **Your 3–5 most important prompts:**
  - Initial setup prompt asking to create directory structure.
- **At least one time AI was wrong:**
  - None yet.
- **Something you rejected:**
  - None yet.

## 4. Verification

- **How did you convince yourself the code actually works? Be specific: what did you run, click, test, or inspect?**
  - Verified directory layouts using `list_dir`.
- **What do you know is still broken or fragile?**
  - The database connection in `server.js` requires a running MongoDB instance.

## 5. If I had 5 more hours

- What would you do next, in order?
  - Build database schemas for testimonials.
  - Implement basic routes for fetching and posting testimonials.
  - Integrate AI sentiment analysis API.