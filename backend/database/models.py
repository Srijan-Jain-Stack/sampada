"""SQLAlchemy models for core tables
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, Boolean
from datetime import datetime
from backend.database.database import Base

class SensorReading(Base):
    __tablename__ = 'sensor_readings'
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    data = Column(JSON)

class AgentDecision(Base):
    __tablename__ = 'agent_decisions'
    id = Column(Integer, primary_key=True, index=True)
    agent = Column(String)
    zone_id = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    bid = Column(JSON)

class Action(Base):
    __tablename__ = 'actions'
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    action = Column(JSON)

class SafetyEvent(Base):
    __tablename__ = 'safety_events'
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    event = Column(JSON)

class FarmerOverride(Base):
    __tablename__ = 'farmer_overrides'
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    override = Column(JSON)

class LearningLesson(Base):
    __tablename__ = 'learning_lessons'
    id = Column(Integer, primary_key=True, index=True)
    lesson = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
