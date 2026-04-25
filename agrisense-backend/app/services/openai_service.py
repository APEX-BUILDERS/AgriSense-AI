# OpenAI service with agriculture-specific prompt engineering
from openai import AsyncOpenAI
from app.core.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """You are AgriSense AI, an expert agricultural assistant. 
You help farmers with:
- Crop disease diagnosis and treatment
- Irrigation scheduling and water management
- Soil health and fertilizer recommendations
- Seasonal planting advice
- Pest control strategies
Always give practical, actionable advice suitable for farmers."""

async def get_ai_response(message: str) -> str:
    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message}
            ],
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"AI service unavailable: {str(e)}"