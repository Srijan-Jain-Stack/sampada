"""Explainability and TTS stubs
"""

class ExplanationEngine:
    def explain(self, decision):
        # TODO: produce human readable explanation
        return "Decision explanation (stub)"

class TTS:
    def speak(self, text: str):
        # TODO: call gTTS or other provider if available
        return False
