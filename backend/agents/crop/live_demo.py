"""Dynamic terminal demo for the SAMPADA Crop Agent.

Run: python live_demo.py
Stop with Ctrl+C.
"""
import json
import time
from datetime import datetime

from crop_agent import CropAgent, CropInput


def main() -> None:
    agent = CropAgent()
    # A simple simulated drying/recovery cycle. Replace these with MQTT sensor
    # readings when Person 5's integration layer is available.
    cycle = [
        (70, 4, 0.72, "Healthy root zone"),
        (63, 10, 0.68, "Moisture decreasing"),
        (55, 26, 0.61, "Crop entering watch state"),
        (48, 62, 0.50, "Critical stress - priority request"),
        (60, 25, 0.55, "Simulated recovery after irrigation"),
    ]
    print("SAMPADA Crop Agent live demo - Ctrl+C to stop\n")
    try:
        while True:
            for soil, wilting, ndvi, label in cycle:
                decision = agent.evaluate(CropInput(
                    zone_id="Z1", crop_type="tomato", growth_stage="flowering",
                    soil_moisture_pct=soil, wilting_score=wilting, ndvi=ndvi,
                    observed_at=datetime.now(),
                ))
                print(f"[{datetime.now().strftime('%H:%M:%S')}] {label}")
                print(json.dumps({
                    "stress_score": decision.stress_score,
                    "recommended_action": decision.recommended_action,
                    "confidence": decision.confidence,
                    "sensor_health": decision.sensor_health,
                    "alerts": decision.alerts,
                    "reason": decision.reason,
                }, indent=2))
                print("-" * 65)
                time.sleep(10)
    except KeyboardInterrupt:
        print("\nLive demo stopped.")


if __name__ == "__main__":
    main()
