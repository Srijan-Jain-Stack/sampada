"""Learning Commons components
"""
from backend.schemas.learning import AnonymousLesson, RawLesson

class Anonymizer:
    def anonymize(self, raw: RawLesson) -> AnonymousLesson:
        # TODO: remove private identifiers
        return AnonymousLesson(lesson_id="stub", crop_type=raw.crop, condition_band="normal", action=raw.action, result=raw.outcome, reward=0.0, timestamp=raw.timestamp)

class LearningStore:
    def __init__(self):
        self.lessons = []

    def save(self, lesson: AnonymousLesson):
        self.lessons.append(lesson)
        return True
