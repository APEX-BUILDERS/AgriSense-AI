# Yield prediction service using simple rule-based logic
YIELD_DATA = {
    "wheat":   {"yield_per_acre": 1500, "price_per_kg": 22},
    "rice":    {"yield_per_acre": 2000, "price_per_kg": 20},
    "tomato":  {"yield_per_acre": 8000, "price_per_kg": 15},
    "corn":    {"yield_per_acre": 2500, "price_per_kg": 18},
    "potato":  {"yield_per_acre": 7000, "price_per_kg": 12},
    "onion":   {"yield_per_acre": 5000, "price_per_kg": 25},
}

SEASON_MULTIPLIER = {
    "summer": 0.85,
    "winter": 1.1,
    "monsoon": 0.9,
    "spring": 1.0
}

async def predict_yield(crop: str, land_size: float, season: str) -> dict:
    crop = crop.lower()
    season = season.lower()

    if crop not in YIELD_DATA:
        # Fallback for unknown crops
        return {
            "expected_yield": "Data not available for this crop",
            "estimated_market_value": "N/A",
            "recommendation": f"Please consult local agricultural office for {crop} yield data."
        }

    data = YIELD_DATA[crop]
    multiplier = SEASON_MULTIPLIER.get(season, 1.0)

    total_yield_kg = data["yield_per_acre"] * land_size * multiplier
    market_value = total_yield_kg * data["price_per_kg"]

    recommendation = (
        f"For {land_size} acres of {crop} in {season}, "
        f"expect around {int(total_yield_kg)} kg yield. "
        f"Store 10% as reserve and sell rest at peak market price."
    )

    return {
        "expected_yield": f"{int(total_yield_kg)} kg",
        "estimated_market_value": f"₹{int(market_value):,}",
        "recommendation": recommendation
    }