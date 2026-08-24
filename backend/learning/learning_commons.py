"""Privacy-preserving lesson cards.  Lessons never command actuators directly."""
from hashlib import sha256
from backend.schemas.learning import AnonymousLesson, RawLesson

class Anonymizer:
    def anonymize(self, raw: RawLesson) -> AnonymousLesson:
        conditions = raw.conditions if isinstance(raw.conditions, dict) else {}
        moisture = conditions.get("soil_moisture")
        if moisture is None:
            band = "unknown"
        elif moisture < 20:
            band = "dry"
        elif moisture > 70:
            band = "wet"
        else:
            band = "normal"
        outcome = raw.outcome if isinstance(raw.outcome, dict) else {}
        reward = 1.0 if outcome.get("success") else 0.0
        fingerprint = f"{raw.crop}|{band}|{raw.action}|{raw.timestamp}"
        return AnonymousLesson(
            lesson_id=sha256(fingerprint.encode()).hexdigest()[:16], crop_type=raw.crop,
            condition_band=band, action=raw.action, result=raw.outcome, reward=reward,
            timestamp=raw.timestamp,
        )

class LearningStore:
    def __init__(self):
        self.lessons = []

    def save(self, lesson: AnonymousLesson):
        self.lessons.append(lesson)
        return True

    def list(self):
        return list(self.lessons)
