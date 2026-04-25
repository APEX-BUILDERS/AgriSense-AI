from fastapi import APIRouter
from app.models.schemas import YieldRequest, YieldResponse
from app.services.yield_service import predict_yield

router = APIRouter()

@router.post("/yield/predict", response_model=YieldResponse)
async def yield_predict(request: YieldRequest):
    result = await predict_yield(
        request.crop,
        request.land_size,
        request.season
    )
    return YieldResponse(**result)