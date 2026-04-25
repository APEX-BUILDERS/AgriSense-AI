from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, disease, recommendations
from app.api import irrigation, yield_prediction
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="AgriSense API",
    description="AI-Powered Smart Farming Platform",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    logging.info("AgriSense API starting up with Supabase backend...")

# All routes
app.include_router(chat.router, prefix="/api")
app.include_router(disease.router, prefix="/api")
app.include_router(recommendations.router, prefix="/api")
app.include_router(irrigation.router, prefix="/api")
app.include_router(yield_prediction.router, prefix="/api")

@app.get("/health")
async def health():
    return {"status": "ok", "app": "AgriSense", "version": "2.0.0"}

