"""Final decision layer joining independently produced agent bids."""
from collections import defaultdict
from typing import Iterable, List

from backend.coordinator.bandit import Bandit
from backend.coordinator.negotiation import negotiate
from backend.coordinator.scheduler import schedule
from backend.coordinator.safety import SafetyGuard
from backend.schemas.agent import AgentBid

class Coordinator:
    def __init__(self, action_engine=None, safety_guard=None, bandit=None):
        self.action_engine = action_engine
        self.safety_guard = safety_guard or SafetyGuard()
        self.bandit = bandit or Bandit()
        self.bids = []
        self.decisions = []

    def receive_bids(self, bids: Iterable[dict | AgentBid]):
        """Validate and retain agent messages without changing their payload contract."""
        accepted = []
        for bid in bids:
            parsed = bid if isinstance(bid, AgentBid) else AgentBid.model_validate(bid)
            payload = parsed.model_dump()
            self.bids.append(payload)
            accepted.append(payload)
        return accepted

    @staticmethod
    def irrigation_context(sensor_state, crop_bid):
        """Build Irrigation Agent input from its sensor state plus Crop output.

        Crop owns calibrated crop interpretation; irrigation consumes that same
        measured moisture and crop stress rather than asking for a second reading.
        """
        context = dict(sensor_state)
        moisture = crop_bid.get("soil_moisture_pct")
        if moisture is not None:
            context["crop_soil_moisture_pct"] = moisture
        context["crop_stress_score"] = crop_bid.get("stress_score")
        return context

    def decide(self, sensor_states=None, execute=False):
        """Negotiate one action per zone, then apply an immutable safety veto."""
        sensor_states = sensor_states or {}
        grouped = defaultdict(list)
        for bid in self.bids:
            grouped[bid["zone_id"]].append(bid)
        outcomes = []
        for zone_id, zone_bids in grouped.items():
            baseline = negotiate(zone_bids)
            # The bandit only selects among bids with the same highest priority. This
            # keeps learning from silently displacing an urgent, explainable request.
            contenders = [b for b in zone_bids if b["priority"] == baseline["priority"]]
            choice = self.bandit.choose(baseline, [b["agent"] for b in contenders])
            winner = contenders[choice]
            action = schedule(winner)
            allowed, safety_reason = self.safety_guard.check(action, sensor_states.get(zone_id, {}))
            result = {
                "zone_id": zone_id,
                "winning_bid": winner,
                "action": action if allowed else None,
                "allowed": allowed,
                "reason": f"{winner['reason']} {safety_reason}".strip(),
            }
            if allowed and execute and self.action_engine:
                result["execution"] = self.action_engine.execute(action, result)
            outcomes.append(result)
        self.decisions.extend(outcomes)
        self.bids.clear()
        return outcomes
