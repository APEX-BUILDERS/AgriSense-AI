from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import DiseaseResponse
from app.services.disease_service import detect_disease

router = APIRouter()

@router.post("/disease/detect", response_model=DiseaseResponse)
async def detect(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload an image file")
    image_bytes = await file.read()
    result = await detect_disease(image_bytes)
    return DiseaseResponse(**result)