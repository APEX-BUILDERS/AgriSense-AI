from pydantic import BaseModel
from typing import Optional, List

# ---------- CHAT ----------
class ChatRequest(BaseModel):
    message: str
    crop: Optional[str] = None
    location: Optional[str] = None
    season: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    status: str = "success"

# ---------- DISEASE ----------
class DiseaseResponse(BaseModel):
    disease: str
    confidence: str
    treatment: List[str]
    immediate_action: str

# ---------- RECOMMENDATIONS ----------
class RecommendationResponse(BaseModel):
    crop: str
    irrigation: str
    fertilizer: str
    seasonal_tips: str

# ---------- IRRIGATION ----------
class IrrigationRequest(BaseModel):
    soil_moisture: float
    weather: str
    crop: str

class IrrigationResponse(BaseModel):
    water_now: bool
    recommended_water_liters: float
    advice: str

# ---------- YIELD ----------
class YieldRequest(BaseModel):
    crop: str
    land_size: float
    season: str

class YieldResponse(BaseModel):
    expected_yield: str
    estimated_market_value: str
    recommendation: str