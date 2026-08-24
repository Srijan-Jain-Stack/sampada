"""In-process state exposed to FastAPI and populated by the MQTT integration."""
from backend.coordinator.coordinator import Coordinator
from backend.learning.learning_commons import LearningStore


class Runtime:
    def __init__(self):
        self.coordinator = Coordinator()
        self.sensor_states = {}
        self.agent_outputs = {}
        self.lessons = LearningStore()
        self.impact = {"water_saved_litres": 0.0, "energy_saved_kwh": 0.0, "cost_saved_inr": 0.0, "co2_reduced_kg": 0.0}

    def record_sensor(self, payload):
        self.sensor_states[payload["zone_id"]] = payload.get("data", payload)

    def record_agent_bid(self, payload):
        """Retain the latest published result for each agent and zone for the UI."""
        self.agent_outputs.setdefault(payload["agent"], {})[payload["zone_id"]] = payload

    def dashboard(self):
        return {
            "zones": self.sensor_states,
            "agents": ["crop", "irrigation", "climate", "energy"],
            "agent_outputs": self.agent_outputs,
            "decisions": self.coordinator.decisions[-20:],
            "impact": self.impact,
        }


runtime = Runtime()
