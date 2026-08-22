"""Learning storage/repository
"""
class LearningStore:
    def __init__(self):
        self.store = []

    def add(self, lesson):
        self.store.append(lesson)
        return True
