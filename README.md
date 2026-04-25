# AI Store Manager Agent 🛒🤖

> **Full-stack ecommerce analytics dashboard** — Upload your store's CSV data and instantly get KPI metrics, revenue trends, category breakdowns, and AI-generated business insights.

🌐 **Live Demo:** [v0-ai-agent-one.vercel.app](https://v0-ai-agent-one.vercel.app)

---

## 📌 Overview

AI Store Manager Agent is a full-stack SaaS analytics tool built for ecommerce merchants who need fast, clear answers from their sales data — without writing a single SQL query.

Upload a CSV export from your store, and the platform automatically computes KPIs, renders interactive charts, and generates an AI-driven executive summary with key insights and recommended actions. Built with a Shopware/merchant-first context in mind, the tool reduces time-to-insight from hours to seconds for non-technical users.

---

## ✨ Features

- **CSV Upload with Drag & Drop** — Browser-side parsing using PapaParse; no data ever leaves your machine
- **Auto Schema Detection** — Intelligently maps uploaded columns to expected fields
- **KPI Cards** — Instant computation of Total Revenue, Total Orders, Top Product by Revenue, and Low-Stock SKU count
- **Revenue by Category** — Bar chart breaking down performance across product categories
- **Revenue Over Time** — Area/line chart showing 6-month revenue trend
- **AI Insights Panel** — Auto-generated executive summary, 3 key insights, and 3 recommended actions based on actual data
- **Demo Mode** — One-click "Load Demo Data" with a 55-row fictional store dataset (6 months, multiple categories)
- **Modular Architecture** — AI layer cleanly separated in `lib/mockInsights.js` for easy OpenAI/GPT-4o swap-in
- **Responsive UI** — Fully mobile-friendly layout with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript (no TypeScript) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| CSV Parsing | PapaParse |
| AI Layer | Mock insights engine (OpenAI-ready) |
| Deployment | Vercel |

---

## 📂 Project Structure

```
ai-store-manager/
├── app/
│   ├── page.js                  # Main dashboard page
│   ├── layout.js                # Root layout
│   └── api/
│       └── analyze/
│           └── route.js         # AI analysis API route
├── components/
│   ├── FileUpload.jsx            # Drag-and-drop CSV uploader
│   ├── KpiCards.jsx              # Revenue / Orders / Stock KPI tiles
│   ├── RevenueByCategory.jsx     # Bar chart component
│   ├── RevenueOverTime.jsx       # Area/line chart component
│   └── InsightsPanel.jsx         # AI executive summary panel
├── lib/
│   └── mockInsights.js           # Contextual AI insight generator
├── jsconfig.json                 # Path alias config (@/)
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/ai-store-manager-agent.git

# Navigate into the project
cd ai-store-manager-agent

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📊 CSV Format

The uploader expects a CSV with the following columns (column names are flexible — schema detection handles mapping):

| Column | Description |
|---|---|
| `order_id` | Unique order identifier |
| `date` | Order date (YYYY-MM-DD) |
| `product_name` | Product title |
| `category` | Product category |
| `quantity` | Units ordered |
| `unit_price` | Price per unit |
| `revenue` | Total line revenue |
| `stock_remaining` | Current stock level |

> Don't have data? Click **"Load Demo Data"** to instantly populate the dashboard with 55 rows of sample store data across 6 months.

---

## 🤖 AI Integration

The insight engine lives in `lib/mockInsights.js` and generates contextual, data-driven summaries from the actual uploaded payload — not hardcoded strings.

**To connect a real LLM (OpenAI GPT-4o):**

1. Add your API key to `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```

2. In `app/api/analyze/route.js`, replace the mock call with:
   ```javascript
   import OpenAI from 'openai';
   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

   const response = await openai.chat.completions.create({
     model: 'gpt-4o',
     messages: [{ role: 'user', content: yourPrompt }],
   });
   ```

The API route is already structured to make this a drop-in replacement.

---

## 🗺️ Data Flow

```
CSV Upload
    ↓
PapaParse (browser-side parsing)
    ↓
Schema Detection + KPI Computation
    ↓
Recharts renders Bar & Area charts
    ↓
POST /api/analyze  →  mockInsights.js  →  Insights Panel
```

---

## 📸 Screenshots

> *(Add screenshots of the dashboard, KPI cards, and insights panel here)*

---

## 🌐 Deployment

The project is deployed on **Vercel** via GitHub integration.

To deploy your own instance:

```bash
npm install -g vercel
vercel --prod
```

Or connect your GitHub repo directly to [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 🧑‍💻 Author

**Yuvanesh Raju**
Data Science graduate · Berlin, Germany
[LinkedIn](https://linkedin.com/in/yuvaneshraju) · [DataPilot AI](https://datapilotaidash.netlify.app)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🌟 Show Your Support

If this project helped you or sparked an idea, drop a ⭐ on GitHub — it means a lot!
