from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.openai_service import get_ai_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    context_parts = []
    if request.crop:
        context_parts.append(f"Crop: {request.crop}")
    if request.location:
        context_parts.append(f"Location: {request.location}")
    if request.season:
        context_parts.append(f"Season: {request.season}")

    if context_parts:
        full_message = f"[Context - {', '.join(context_parts)}]\n{request.message}"
    else:
        full_message = request.message

    reply = await get_ai_response(full_message)
    return ChatResponse(reply=reply)