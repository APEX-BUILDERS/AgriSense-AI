# Recommendation service - rule based + AI fallback
from app.services.openai_service import get_ai_response

CROP_RULES = {
    "wheat": {
        "irrigation": "Water every 10-14 days. Needs 450-650mm water per season.",
        "fertilizer": "Apply NPK 120:60:40 kg/ha. Top dress urea at tillering stage.",
        "seasonal_tips": "Sow in October-November. Harvest in March-April."
    },
    "rice": {
        "irrigation": "Maintain 5cm standing water during vegetative stage.",
        "fertilizer": "Apply 100kg Urea, 50kg DAP per acre.",
        "seasonal_tips": "Transplant in June-July. Watch for brown planthopper."
    },
    "tomato": {
        "irrigation": "Drip irrigation preferred. Water every 2-3 days in summer.",
        "fertilizer": "High potassium needed during fruiting. Use 19:19:19 NPK initially.",
        "seasonal_tips": "Avoid waterlogging. Stake plants at 30cm height."
    },
    "corn": {
        "irrigation": "Critical watering at tasseling and silking stage.",
        "fertilizer": "Apply 150kg Urea per hectare in split doses.",
        "seasonal_tips": "Plant in rows 75cm apart. Harvest when husks turn brown."
    }
}

async def get_recommendations(crop: str) -> dict:
    crop = crop.lower().strip()
    
    if crop in CROP_RULES:
        data = CROP_RULES[crop]
        return {"crop": crop, **data}
    
    # AI fallback for unknown crops
    ai_reply = await get_ai_response(
        f"Give irrigation, fertilizer, and seasonal tips for {crop} crop. Be concise."
    )
    return {
        "crop": crop,
        "irrigation": "See AI recommendation below",
        "fertilizer": "See AI recommendation below",
        "seasonal_tips": ai_reply
    }