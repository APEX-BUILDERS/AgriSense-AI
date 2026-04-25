from fastapi import APIRouter
from app.models.schemas import IrrigationRequest, IrrigationResponse
from app.services.irrigation_service import get_irrigation_recommendation

router = APIRouter()

@router.post("/irrigation/recommend", response_model=IrrigationResponse)
async def irrigation_recommend(request: IrrigationRequest):
    result = await get_irrigation_recommendation(
        request.soil_moisture,
        request.weather,
        request.crop
    )
    return IrrigationResponse(**result)