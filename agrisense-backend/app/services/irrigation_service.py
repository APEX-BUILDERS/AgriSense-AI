# Rule-based irrigation recommendation service
async def get_irrigation_recommendation(soil_moisture: float, weather: str, crop: str) -> dict:
    
    water_now = False
    recommended_liters = 0
    advice = ""

    weather = weather.lower()
    crop = crop.lower()

    # Rule 1: Don't water if it's raining
    if weather == "rainy":
        water_now = False
        recommended_liters = 0
        advice = "No irrigation needed. Rain provides sufficient water today."

    # Rule 2: Soil is dry enough to water
    elif soil_moisture < 30:
        water_now = True
        recommended_liters = 40 if weather == "sunny" else 25
        advice = f"Soil moisture is critically low ({soil_moisture}%). Irrigate immediately."

    # Rule 3: Moderate moisture
    elif soil_moisture < 60:
        water_now = True
        recommended_liters = 20
        advice = f"Soil moisture is moderate ({soil_moisture}%). Light irrigation recommended."

    # Rule 4: Soil is already moist
    else:
        water_now = False
        recommended_liters = 0
        advice = f"Soil moisture is sufficient ({soil_moisture}%). No irrigation needed today."

    # Crop-specific adjustment
    if crop in ["rice", "sugarcane"] and water_now:
        recommended_liters += 10
        advice += " Note: Water-intensive crop — extra water added."

    return {
        "water_now": water_now,
        "recommended_water_liters": recommended_liters,
        "advice": advice
    }