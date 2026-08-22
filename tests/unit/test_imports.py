"""Unit and integration tests (basic importability and interfaces)
"""

def test_import_modules():
    import backend
    from backend.schemas.agent import AgentBid
    assert AgentBid
