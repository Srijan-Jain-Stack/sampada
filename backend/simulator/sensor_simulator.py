"""Simulator for greenhouse components
"""
from .greenhouse import Greenhouse

if __name__ == '__main__':
    gh = Greenhouse(seed=42)
    gh.run_demo()
