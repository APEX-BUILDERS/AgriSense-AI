# Recommendations API route
from fastapi import APIRouter, Query
from app.services.recommendation_service import get_recommendations

router = APIRouter()

@router.get("/recommendations")
async def recommendations(crop: str = Query(..., description="Crop name e.g. wheat, rice, tomato")):
    result = await get_recommendations(crop)
    return result