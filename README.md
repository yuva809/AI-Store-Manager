# DataPilot AI 🚀

> **AI-powered P&L analytics platform** — Upload your spreadsheets and instantly get dashboards, visualisations, and actionable business insights.

🌐 **Live Demo:** [datapilotaidash.netlify.app](https://datapilotaidash.netlify.app)

---

## 📌 Overview

DataPilot AI is a frontend SaaS analytics platform that transforms raw Profit & Loss spreadsheet data into interactive dashboards and AI-generated business insights — in seconds. Designed for business owners, analysts, and finance teams who want clarity without complexity.

The platform processes financial data across 50M+ rows from 40+ countries, delivering KPI tracking, revenue trend analysis, expense breakdowns, and margin insights through a clean, responsive UI.

---

## ✨ Features

- **P&L Dashboard** — Automated KPI cards for Revenue, Expenses, Net Profit, and Margin with period-on-period change indicators
- **CSV / Spreadsheet Upload** — Drag-and-drop file upload with live parsing and dashboard generation
- **Demo Mode** — Instant preview with sample data, no sign-up required
- **AI Insights Panel** — Auto-generated narrative insights based on uploaded financial data
- **Interactive Charts** — Bar charts, line trends, pie breakdowns, and data tables
- **Multi-tab Analysis** — Switch between Overview, Revenue, Expenses, and Profitability views
- **User Authentication** — Sign up / Sign in / Guest mode with localStorage session management
- **Pricing Plans** — Free, Pro, and Enterprise tiers with monthly/annual billing toggle
- **Responsive Design** — Fully mobile-friendly with hamburger nav and adaptive grid layouts
- **Toast Notifications** — Non-intrusive feedback for all user interactions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Charts & Visualisation | SVG (custom, hand-coded) |
| Styling | CSS custom properties, CSS Grid, Flexbox |
| Auth | localStorage-based session with basic password hashing |
| Deployment | Netlify |

> **No frameworks. No build tools. No dependencies.** Pure HTML/CSS/JS — single file, zero setup.

---

## 📂 Project Structure

```
datapilot-ai/
├── index.html       # Entire application (single-file architecture)
└── favicon.ico      # App icon
```

---

## 🚀 Getting Started

### Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/datapilot-ai.git

# Navigate into the project
cd datapilot-ai

# Open in browser (no build step needed)
open index.html
```

Or simply drag `index.html` into any browser — it works instantly.

### Deploy

The project is a static site and can be deployed to any static hosting platform:

- **Netlify** — Drag and drop the folder, done.
- **GitHub Pages** — Push to `main`, enable Pages in repo settings.
- **Vercel** — `vercel --prod` from the project root.

---

## 📸 Screenshots

> *(Add screenshots of the hero section, dashboard view, and P&L Solutions page here)*

---

## 🗺️ Pages & Routing

The app uses a client-side page routing system (no URL changes):

| Page | Description |
|---|---|
| **Home** | Hero, Features, How It Works, Pricing, Testimonials, About, CTA |
| **P&L Solutions** | Dedicated page for P&L-specific features and use cases |

---

## 🔐 Authentication Notes

Authentication is **demo-only** and uses `localStorage` for session persistence. This is intentional for a portfolio/prototype context — no backend or real credentials are stored.

- Passwords are hashed client-side before storage
- Guest mode is available with no account required
- Sessions persist across page reloads

---

## 📊 Use Cases

- Small business owners reviewing monthly P&L
- Freelancers tracking income vs. expenses
- Finance analysts building quick client-facing reports
- Students and learners exploring data visualisation concepts

---

## 🧑‍💻 Author

**Yuvanesh Raju**
Data Science graduate · Berlin, Germany
[LinkedIn](https://linkedin.com/in/yuvaneshraju) · [DataPilot AI Live](https://datapilotaidash.netlify.app)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🌟 Show Your Support

If you found this project useful or interesting, consider giving it a ⭐ on GitHub — it helps a lot!
