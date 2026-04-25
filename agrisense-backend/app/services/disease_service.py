# Disease detection - mock model with enhanced response
import random

DISEASE_DATABASE = {
    "blight": {
        "disease": "Late Blight",
        "confidence": "92%",
        "treatment": [
            "Apply copper-based fungicide immediately",
            "Remove and destroy all infected leaves",
            "Avoid overhead irrigation",
            "Spray Mancozeb 2.5g/litre every 7 days"
        ],
        "immediate_action": "Isolate infected plants and apply fungicide within 24 hours."
    },
    "rust": {
        "disease": "Leaf Rust",
        "confidence": "87%",
        "treatment": [
            "Use triazole fungicides (Propiconazole)",
            "Improve air circulation around plants",
            "Remove infected plant debris",
            "Apply sulfur-based spray as preventive"
        ],
        "immediate_action": "Apply fungicide spray today and remove visibly infected leaves."
    },
    "healthy": {
        "disease": "No Disease Detected",
        "confidence": "95%",
        "treatment": [
            "Continue regular watering schedule",
            "Maintain proper fertilization",
            "Monitor weekly for early signs"
        ],
        "immediate_action": "No action needed. Plant appears healthy."
    },
    "mosaic": {
        "disease": "Mosaic Virus",
        "confidence": "81%",
        "treatment": [
            "Remove and burn infected plants immediately",
            "Control aphid population with insecticide",
            "Disinfect all gardening tools",
            "Plant virus-resistant varieties next season"
        ],
        "immediate_action": "Remove infected plants immediately to prevent spread to healthy crops."
    }
}

async def detect_disease(image_bytes: bytes) -> dict:
    # Mock prediction - replace with real ML model later
    mock_result = random.choice(list(DISEASE_DATABASE.values()))
    return mock_result