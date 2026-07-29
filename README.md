# TestimonialHub — Full-Stack SaaS Testimonial Management Platform

A production-grade testimonial collection, moderation, and display platform built with **React 19**, **Node.js**, **Express**, and **MongoDB Atlas**. Features an editorial modern SaaS design system, AI-powered sentiment analysis via **Google Gemini** (`@google/genai`), signature `QuoteSeal` brand marks, and a restructured, embeddable widget page.

- **Live Deployed Backend (Render)**: [https://testimonialhub-backend.onrender.com](https://testimonialhub-backend.onrender.com)

---

## 🌟 Key Features

### 1. Customer Submission Form (`/`)
- Public feedback form with real-time field validation (`express-validator` backend validation + email format check via `validator`).
- Dual-mode Photo selection: Upload directly from computer (converted via `FileReader` Base64) OR paste an image URL.
- Live character counter (`0 / 500 characters`).
- Real-time toast notifications (`react-hot-toast`).
- Editorial split layout with narrative hero copy and elevated form card.

### 2. Moderation Dashboard (`/dashboard`)
- Integrated metrics row (`Total`, `Pending`, `Approved`, `Rejected`).
- Live search bar filtering by name, company, or testimonial text.
- Underline tab filters (`All Reviews`, `Pending`, `Approved`, `Rejected`) and sort ordering.
- One-click **Approve** and **Reject** action buttons.
- Displays AI-generated insights (Clean `Positive`, `Negative`, `Neutral` sentiment badges, 1-sentence summaries, and hashtag keywords).

### 3. Public Testimonial Wall (`/wall`)
- Responsive masonry grid displaying verified customer testimonials.
- Only displays testimonials with `approved` status.
- Shows formatted submission date (`28 Jul 2026`) and average rating badge (`4.7 / 5`).

### 4. AI-Powered Sentiment Analysis (Gemini Integration)
- Every submitted testimonial is automatically analyzed via **Google Gemini API** (`@google/genai`).
- Generates:
  - **Sentiment Label**: `Positive`, `Neutral`, or `Negative`.
  - **1-Sentence Summary**: Concise takeaway of the feedback.
  - **Keywords**: 2-4 key tags extracted from the text.
- Fallback mechanism ensures testimonial creation succeeds even if no API key is configured.

### 5. Restructured Embeddable Widget (`/widget` & `demo/index.html`)
- **Dual-View Modes**: Interactive **Slideshow Carousel** (with auto-play, pause/play control, next/previous buttons, slide counter, and dot indicators) and **Scrollable List Feed**.
- **Contextual Navbar Rendering**: Automatically detects iframe embedding (`window.self !== window.top`). Hides `<Navbar />` inside third-party iframes for pure style isolation, but displays `<Navbar />` when accessed directly.
- **Custom Accent Colors**: Supports `?color=%231F3A3D` parameters.
- **Interactive Embed Code Generator**: Includes a live `<iframe>` code snippet box with a one-click "Copy iFrame Code" button when accessed directly.
- `demo/index.html` provided to demonstrate third-party website embedding.

### 6. Signature Design System (`QuoteSeal.jsx` & Vector SVG Icons)
- **Paper & Ink Palette**: High-end neutral palette (`--color-paper` `#FAF9F6`, `--color-ink` `#14161F`, `--color-brand` `#1F3A3D` teal, `--color-gold` `#B8863D`).
- **Signature `QuoteSeal` Component**: Scale-invariant circular brand mark (`bg-brand` teal with `text-gold` serif double quote) used as the Navbar logo mark, `EmptyState` graphic, and avatar fallbacks.
- **100% Emoji-Free**: Replaced all raw emojis with clean SVG vector icons and professional text badges.

---

## 📁 Project Architecture & Folder Structure

Built using a **3-Tier Service-Layer Architecture** (Routes ➔ Controllers ➔ Services ➔ Models & AI Service) for enterprise separation of concerns:

```
testimonial-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── QuoteSeal.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── TestimonialCard.jsx
│   │   ├── hooks/
│   │   │   └── useTestimonials.js
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── SubmissionPage.jsx
│   │   │   ├── WallPage.jsx
│   │   │   └── WidgetPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── formatDate.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── constants/
│   │   └── status.js
│   ├── controllers/
│   │   └── testimonialController.js
│   ├── middleware/
│   │   └── validateTestimonial.js
│   ├── models/
│   │   └── Testimonial.js
│   ├── routes/
│   │   └── testimonialRoutes.js
│   ├── services/
│   │   ├── aiService.js
│   │   └── testimonialService.js
│   ├── utils/
│   │   └── response.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── demo/
│   └── index.html
├── README.md
├── JOURNAL.md
├── AGENTS.md
└── .gitignore
```

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, React Router DOM v7, Axios, TailwindCSS v4, React Hot Toast.
- **Backend**: Node.js, Express, Mongoose, Dotenv, CORS, Validator, Express-Validator, `@google/genai`.
- **Database**: MongoDB Atlas.
- **Deployment**: Backend hosted on **Render**.

---

## 🛠️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/Testimonial
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/Testimonial
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: Backend port is set to `5001` to prevent port 5000 conflicts with macOS AirPlay Receiver).*

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://testimonialhub-backend.onrender.com/api
```

---

## 📡 API Endpoints (Base URL: `https://testimonialhub-backend.onrender.com`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/testimonials` | Submit a new testimonial (runs validation, duplicate check, and AI analysis) |
| `GET` | `/api/testimonials` | Fetch all testimonials for moderation (supports `?page=1&limit=20`) |
| `GET` | `/api/testimonials/stats` | Fetch counts (`pending`, `approved`, `rejected`, `total`) |
| `GET` | `/api/testimonials/approved` | Fetch only approved testimonials |
| `PATCH` | `/api/testimonials/:id/approve` | Approve a testimonial |
| `PATCH` | `/api/testimonials/:id/reject` | Reject a testimonial |

---

## 💻 Local Setup Instructions

### 1. Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Start Servers

```bash
# Backend (Port 5001)
cd backend && npm run dev

# Frontend (Port 5173)
cd frontend && npm run dev
```

---

## 🧩 Embed Widget Snippet

```html
<iframe
  src="http://localhost:5173/widget?color=%231F3A3D"
  width="100%"
  height="480"
  frameborder="0"
  style="border-radius: 16px; overflow: hidden;">
</iframe>
```
Open `demo/index.html` in your browser for a live third-party embedding demonstration.

---

## 🎯 Follow-up Interview Discussion Points

1. **Why MongoDB over PostgreSQL?**
   - Testimonials are semi-structured documents containing flexible attributes (ratings, AI summary, keywords array, Base64/URL photos). MongoDB document schema fits this domain without complex SQL joins.
2. **Why an `<iframe>` widget instead of a custom JS script?**
   - An `<iframe>` provides complete CSS isolation (preventing style leaks between host site and widget), prevents cross-site script execution vulnerabilities, and works out-of-the-box on any CMS (WordPress, Shopify, Webflow).
3. **Why 3-Tier Architecture (Controller ➔ Service ➔ Model)?**
   - Controllers handle HTTP routing, status codes, and req/res validation. Services contain pure business logic (duplicate checks, AI sentiment orchestration, status transitions), making logic reusable and easily testable.
4. **How would you scale this to 1 million testimonials?**
   - Add database indexes on `{ status: 1, createdAt: -1 }` and `{ email: 1 }`.
   - Implement redis caching for public wall and widget requests (`GET /testimonials/approved`).
   - Move synchronous Gemini AI calls to an asynchronous background job queue (e.g. BullMQ / Redis).