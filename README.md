<div align="center">

<img src="https://img.shields.io/badge/🌾-AgriSense_AI-22c55e?style=for-the-badge&labelColor=0a1a0a&color=22c55e" alt="AgriSense AI" height="40"/>

# AgriSense AI

### AI-Powered Smart Farming Platform

*Helping farmers make smarter decisions with artificial intelligence —*
*disease detection, irrigation advice, yield prediction, and an intelligent crop assistant.*

<br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-2.0.0-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?style=flat-square&logo=openai&logoColor=white)](https://openai.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Railway](https://img.shields.io/badge/Deploy-Railway-7B3FE4?style=flat-square&logo=railway&logoColor=white)](https://railway.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Docs](#-api-reference) · [Deploy](#-deployment) · [Repo](https://github.com/APEX-BUILDERS/AgriSense-AI)

</div>

---

## 📖 Overview

**AgriSense AI** is a full-stack intelligent farming platform that brings modern AI directly into the hands of farmers. The platform combines computer vision, GPT-powered chat, and smart rule-based engines to tackle four of the most critical farming challenges:

- 🌿 Identifying crop diseases before they spread
- 💧 Knowing exactly when and how much to irrigate
- 📈 Estimating harvest yield and market value before planting
- 🤖 Getting expert farming advice in a simple chat interface

The backend is built with **FastAPI (Python)**, the frontend with **Next.js 14 + TypeScript + shadcn/ui**, and data is persisted in **Supabase (PostgreSQL)**. All five features are connected through a clean REST API with full interactive documentation.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI Farming Chat
Context-aware assistant powered by **OpenAI GPT-3.5-turbo**, tuned specifically for agriculture. Farmers can provide their crop, location, and season to get hyper-personalized answers on soil health, fertilizers, pest control, irrigation timing, and more.

</td>
<td width="50%">

### 🌿 Crop Disease Detection
Upload any crop leaf photo and get an instant AI diagnosis. Returns the disease name, confidence score, a numbered treatment plan, and an immediate action recommendation.

</td>
</tr>
<tr>
<td width="50%">

### 💧 Smart Irrigation Advisor
A rule-based engine that takes **soil moisture %**, **current weather**, and **crop type** as inputs and tells you whether to water now, how many liters to use, and why. Handles special cases for water-intensive crops like rice and sugarcane.

</td>
<td width="50%">

### 📈 Yield & Market Value Predictor
Enter your **crop**, **land size in acres**, and **season** to get an estimated harvest yield and market value in ₹. Includes season multipliers for Kharif, Rabi, and Zaid cycles.

</td>
</tr>
<tr>
<td colspan="2">

### 🌱 Crop Recommendations
Detailed crop-specific guidance on irrigation schedules, NPK fertilizer ratios, and seasonal farming tips. For crops not in the local database, it falls back to GPT for an AI-generated answer.

</td>
</tr>
</table>

---

## 🛠 Tech Stack

### Backend (`agrisense-backend/`)

| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | 0.135+ | Web framework — REST API |
| **Uvicorn** | 0.44+ | ASGI server |
| **OpenAI Python SDK** | 2.30+ | GPT-3.5-turbo chat integration |
| **Supabase Python** | — | Database client (PostgreSQL) |
| **Pydantic v2** | 2.12+ | Request/response validation & settings |
| **Python-multipart** | 0.0.26 | Image file upload handling |
| **Python-dotenv** | 1.2+ | Environment variable loading |

### Frontend (`agrisense-frontend/`)

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 14 | React framework with App Router |
| **TypeScript** | 5.0+ | Type-safe development |
| **Tailwind CSS** | 3.4+ | Utility-first CSS |
| **shadcn/ui** | Latest | Accessible component library |
| **Lucide React** | 0.383+ | Icon set |
| **Sonner** | 1.5+ | Toast notifications |

### Infrastructure

| Service | Purpose |
|---|---|
| **Supabase** | PostgreSQL database — stores chats, scans, predictions |
| **Railway** | Backend deployment with health checks |
| **Vercel** | Frontend deployment with auto-deploy on push |

---

## 🏗 Project Structure

```
AgriSense-AI/
│
└── agrisense-backend/                  ← FastAPI Backend
    │
    ├── app/
    │   ├── main.py                     ← App entry point, CORS, route registration
    │   │
    │   ├── api/                        ← Route handlers
    │   │   ├── chat.py                 ← POST /api/chat
    │   │   ├── disease.py              ← POST /api/disease/detect
    │   │   ├── irrigation.py           ← POST /api/irrigation/recommend
    │   │   ├── yield_prediction.py     ← POST /api/yield/predict
    │   │   └── recommendations.py      ← GET  /api/recommendations
    │   │
    │   ├── core/
    │   │   ├── config.py               ← Pydantic settings (reads .env)
    │   │   └── supabase.py             ← Supabase client initialisation
    │   │
    │   ├── models/
    │   │   └── schemas.py              ← All Pydantic request/response models
    │   │
    │   └── services/                   ← Business logic layer
    │       ├── disease_service.py      ← Disease detection engine
    │       ├── irrigation_service.py   ← Rule-based irrigation logic
    │       ├── yield_service.py        ← Yield & market value calculator
    │       ├── recommendation_service.py ← Crop tips + GPT fallback
    │       └── openai_service.py       ← GPT-3.5 wrapper with system prompt
    │
    ├── Procfile                        ← Railway: uvicorn start command
    ├── railway.toml                    ← Railway: build + health check config
    ├── requirements.txt                ← Python dependencies
    └── env.example                     ← Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- Python **3.10+**
- Node.js **18+**
- A [Supabase](https://supabase.com) account and project
- An [OpenAI](https://platform.openai.com) API key

---

### Backend Setup

**1 — Clone the repository**
```bash
git clone https://github.com/APEX-BUILDERS/AgriSense-AI.git
cd AgriSense-AI/agrisense-backend
```

**2 — Create a virtual environment**
```bash
# macOS / Linux
python -m venv venv && source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

**3 — Install dependencies**
```bash
pip install -r requirements.txt
```

**4 — Configure environment variables**
```bash
cp env.example .env
```

Open `.env` and fill in your values:
```env
OPENAI_API_KEY=sk-your-openai-key-here
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_KEY=your-service-role-secret-key
```

**5 — Start the backend**
```bash
uvicorn app.main:app --reload --port 8000
```

| URL | What's there |
|---|---|
| `http://localhost:8000/health` | Health check |
| `http://localhost:8000/docs` | Interactive Swagger API docs |
| `http://localhost:8000/redoc` | ReDoc API docs |

---

### Frontend Setup

**1 — Navigate to the frontend folder**
```bash
cd agrisense-frontend   # (your frontend folder)
```

**2 — Install packages**
```bash
npm install
```

**3 — Set the API URL**

Create `.env.local` in the frontend root:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**4 — Start the frontend**
```bash
npm run dev
```

Open `http://localhost:3000` — keep both terminals running simultaneously.

---

## 🗄 Database Setup (Supabase)

Open your **Supabase Dashboard → SQL Editor** and run:

```sql
-- Chat history
CREATE TABLE chats (
    id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_message TEXT,
    crop      TEXT,
    location  TEXT,
    season    TEXT,
    ai_reply  TEXT,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Disease scan logs
CREATE TABLE disease_scans (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename   TEXT,
    disease    TEXT,
    confidence TEXT,
    timestamp  TIMESTAMPTZ DEFAULT now()
);

-- Irrigation recommendation logs
CREATE TABLE irrigation_recommendations (
    id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    crop               TEXT,
    soil_moisture      FLOAT,
    weather            TEXT,
    water_now          BOOLEAN,
    recommended_liters FLOAT,
    advice             TEXT,
    timestamp          TIMESTAMPTZ DEFAULT now()
);

-- Yield prediction logs
CREATE TABLE yield_predictions (
    id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    crop           TEXT,
    land_size      FLOAT,
    season         TEXT,
    expected_yield TEXT,
    market_value   TEXT,
    timestamp      TIMESTAMPTZ DEFAULT now()
);
```

---

## 📡 API Reference

**Base URL:** `http://localhost:8000` (local) or your Railway URL (production)

All endpoints are prefixed with `/api`. Full interactive docs at `/docs`.

---

### `GET /health`
```json
{ "status": "ok", "app": "AgriSense", "version": "2.0.0" }
```

---

### `POST /api/chat`
AI farming assistant with optional crop context.

```json
// Request
{
  "message": "How do I prevent rust in wheat?",
  "crop": "wheat",
  "location": "Punjab",
  "season": "Rabi"
}

// Response
{
  "reply": "To prevent wheat rust, apply propiconazole fungicide early...",
  "status": "success"
}
```

---

### `POST /api/disease/detect`
Upload a crop leaf image for disease diagnosis.

```
Request: multipart/form-data  →  field name: "file"  →  any image format
```

```json
// Response
{
  "disease": "Late Blight",
  "confidence": "92%",
  "treatment": [
    "Apply copper-based fungicide immediately",
    "Remove and destroy all infected leaves",
    "Avoid overhead irrigation",
    "Spray Mancozeb 2.5g/litre every 7 days"
  ],
  "immediate_action": "Isolate infected plants and apply fungicide within 24 hours."
}
```

---

### `POST /api/irrigation/recommend`
```json
// Request
{ "crop": "rice", "soil_moisture": 22.5, "weather": "Sunny" }

// Response
{
  "water_now": true,
  "recommended_water_liters": 50,
  "advice": "Soil moisture is critically low (22.5%). Irrigate immediately. Note: Water-intensive crop — extra water added."
}
```

Weather options: `Sunny` `Cloudy` `Rainy` `Windy` `Hot`

---

### `POST /api/yield/predict`
```json
// Request
{ "crop": "wheat", "land_size": 5.0, "season": "Rabi" }

// Response
{
  "expected_yield": "8250 kg",
  "estimated_market_value": "₹1,81,500",
  "recommendation": "For 5.0 acres of wheat in rabi, expect around 8250 kg yield. Store 10% as reserve and sell rest at peak market price."
}
```

Supported crops: `wheat` `rice` `tomato` `corn` `potato` `onion`  
Season options: `Kharif` `Rabi` `Zaid`

---

### `GET /api/recommendations?crop=tomato`
```json
{
  "crop": "tomato",
  "irrigation": "Drip irrigation preferred. Water every 2-3 days in summer.",
  "fertilizer": "High potassium needed during fruiting. Use 19:19:19 NPK initially.",
  "seasonal_tips": "Avoid waterlogging. Stake plants at 30cm height."
}
```

Supported crops with local data: `wheat` `rice` `tomato` `corn`  
All other crops → GPT-generated response automatically.

---

## 🔐 Environment Variables

### Backend (`.env`)

| Variable | Description | Required |
|---|---|---|
| `OPENAI_API_KEY` | OpenAI API key for GPT chat | ✅ |
| `SUPABASE_URL` | Supabase project URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key | ✅ |
| `SUPABASE_SERVICE_KEY` | Supabase service role secret key | ✅ |

### Frontend (`.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend URL — `http://localhost:8000` locally |

> ⚠️ **Never commit `.env` or `.env.local` to GitHub.** Both files are already in `.gitignore`. Always use platform environment variables (Railway / Vercel) in production.

---

## 🌐 Deployment

### Backend → Railway

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
3. Select the `AgriSense-AI` repo
4. Set root directory to `agrisense-backend`
5. Add the 4 environment variables in the **Variables** tab
6. In **Settings → Deploy**: Health Check Path = `/health`, Timeout = `60`
7. Railway auto-deploys on every push to `main` ✅

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
2. Set root directory to your frontend folder
3. Add `NEXT_PUBLIC_API_URL` = your Railway backend URL
4. Click **Deploy** — auto-deploys on every push ✅

After deploying, update your frontend `.env.local` (or Vercel env var) from `http://localhost:8000` to your live Railway URL.

---

## 🗺 Roadmap

- [ ] Replace mock disease detection with real MobileNetV2 model (PlantVillage dataset — 38 classes)
- [ ] User authentication with Supabase Auth
- [ ] Live dashboard stats pulled from Supabase (real counts, not static)
- [ ] Weather API integration — auto-fill weather for irrigation advisor
- [ ] Multi-language support — Hindi, Marathi, Punjabi
- [ ] Expand yield data to 50+ Indian crops
- [ ] SMS/WhatsApp alerts for irrigation reminders
- [ ] Mobile app (React Native)
- [ ] Offline mode for low-connectivity rural areas

---

## ⚠️ Security Checklist

- [ ] No API keys or secrets hardcoded in source files
- [ ] `.env` is listed in `.gitignore`
- [ ] Supabase `service_role` key stored only in environment variables
- [ ] OpenAI key rotated if previously exposed in any public commit
- [ ] CORS restricted to your frontend domain in production

---

## 🤝 Contributing

We welcome contributions from the community!

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push and open a Pull Request
git push origin feature/amazing-feature
```

Please follow conventional commits and keep PRs focused on a single feature or fix.

---

## 👥 Team

<div align="center">

Built with ❤️ by **APEX BUILDERS**

*Making modern agriculture accessible to every farmer.*

</div>

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

### 🌾 AgriSense AI

**GitHub Repository → [github.com/APEX-BUILDERS/AgriSense-AI](https://github.com/APEX-BUILDERS/AgriSense-AI)**

*Smart Farming, Powered by AI*

</div>
