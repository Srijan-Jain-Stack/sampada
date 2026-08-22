"""Learning components test
"""
from backend.learning.learning_commons import Anonymizer, LearningStore
from backend.schemas.learning import RawLesson

def test_learning_anonymizer_store():
    raw = RawLesson(crop='tomato', conditions={'soil_moisture': 10}, action={'cmd': 'irrigate'}, outcome={'success': True}, timestamp='2026-01-01T00:00:00Z')
    a = Anonymizer()
    anon = a.anonymize(raw)
    store = LearningStore()
    assert store.save(anon)
