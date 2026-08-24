"""Run a simulated SAMPADA Energy Agent decision."""

from energy_agent import EnergyAgent, EnergyInput


if __name__ == "__main__":
    sample = EnergyInput(
        zone_id="Z1",
        battery_pct=22,
        solar_watts=800,
        load_watts=1200,
        grid_available=True,
    )
    print(EnergyAgent().evaluate(sample).model_dump_json(indent=2))