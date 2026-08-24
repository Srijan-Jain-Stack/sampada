"""Small persistence helpers used by the coordinator and API layer."""
from backend.database.database import SessionLocal
from backend.database import models


def _save(model, **values):
    with SessionLocal() as session:
        row = model(**values)
        session.add(row)
        session.commit()
        session.refresh(row)
        return row

def save_sensor_reading(payload: dict):
    return _save(models.SensorReading, zone_id=payload["zone_id"], data=payload.get("data", payload))


def save_agent_decision(payload: dict):
    return _save(models.AgentDecision, agent=payload["agent"], zone_id=payload["zone_id"], bid=payload)


def save_action(payload: dict):
    return _save(models.Action, zone_id=payload["zone_id"], action=payload)


def save_safety_event(payload: dict):
    return _save(models.SafetyEvent, event=payload)


def save_lesson(payload: dict):
    return _save(models.LearningLesson, lesson=payload)
