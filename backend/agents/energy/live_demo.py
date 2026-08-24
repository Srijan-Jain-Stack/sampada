"""Dynamic terminal demo for the SAMPADA Energy Agent.

Run: python live_demo.py
Stop with Ctrl+C.
"""
import json
import time
from datetime import datetime, timedelta

from energy_agent import EnergyAgent, EnergyInput


def main() -> None:
    agent = EnergyAgent()
    # Simulated day: battery drains overnight, solar charges midday, loads vary
    cycle = [
        (85, 2500, 300, True, "Morning - battery full, solar ramping up"),
        (72, 2800, 800, True, "Mid-morning - climate system active"),
        (58, 3000, 1200, True, "Noon - peak solar, high load"),
        (45, 1500, 1500, True, "Afternoon - clouds, load > solar"),
        (32, 200, 800, True, "Late afternoon - battery draining"),
        (22, 0, 600, True, "Evening - no solar, critical battery"),
        (15, 0, 400, True, "Night - emergency conservation"),
        (75, 2000, 200, True, "Next morning - grid recharged overnight"),
    ]
    print("SAMPADA Energy Agent live demo - Ctrl+C to stop\n")
    try:
        while True:
            for battery, solar, load, grid, label in cycle:
                decision = agent.evaluate(EnergyInput(
                    zone_id="Z1",
                    battery_pct=battery,
                    solar_watts=solar,
                    load_watts=load,
                    grid_available=grid,
                    observed_at=datetime.now(),
                ))
                print(f"[{datetime.now().strftime('%H:%M:%S')}] {label}")
                print(json.dumps({
                    "battery_pct": decision.battery_pct,
                    "battery_state": decision.battery_state,
                    "solar_watts": decision.solar_watts,
                    "available_energy_wh": decision.available_energy_wh,
                    "energy_budget_wh": decision.energy_budget_wh,
                    "scarcity_state": decision.scarcity_state,
                    "scarcity_score": decision.scarcity_score,
                    "battery_trend_wh_per_hour": decision.battery_trend_wh_per_hour,
                    "hours_to_critical": decision.hours_to_critical,
                    "recommended_action": decision.recommended_action,
                    "conservation_actions": decision.conservation_actions,
                    "confidence": decision.confidence,
                    "sensor_health": decision.sensor_health,
                    "alerts": decision.alerts,
                    "reason": decision.reason,
                }, indent=2))
                print("-" * 65)
                time.sleep(8)
    except KeyboardInterrupt:
        print("\nLive demo stopped.")


if __name__ == "__main__":
    main()