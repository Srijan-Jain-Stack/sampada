"""Lesson generator stub
"""

class LessonGenerator:
    def generate(self, event):
        """Create a compact, non-identifying candidate lesson from an outcome."""
        return {
            "context": event.get("context", {}),
            "action": event.get("action", {}),
            "outcome": event.get("outcome", {}),
            "validated_by": 0,
        }
