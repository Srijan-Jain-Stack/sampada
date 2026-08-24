"""Run a simulated SAMPADA Crop Agent decision."""

from crop_agent import CropAgent, CropInput


if __name__ == "__main__":
    sample = CropInput(
        zone_id="Z1",
        crop_type="tomato",
        growth_stage="flowering",
        soil_moisture_pct=47,
        wilting_score=68,
        ndvi=0.42,
        ndvi_trend=-0.08,
    )
    print(CropAgent().evaluate(sample).model_dump_json(indent=2))
