import unittest
from datetime import datetime, timedelta
from crop_agent import CropAgent, CropInput
from crop_agent.fao import FaoCropCalendarClient, import_cropwat_tsv
from pathlib import Path
from tempfile import TemporaryDirectory

class CropAgentTests(unittest.TestCase):
    def setUp(self): self.agent=CropAgent(); self.now=datetime.now()
    def item(self, **extra):
        values={"zone_id":"Z1","crop_type":"tomato","growth_stage":"flowering","soil_moisture_pct":67,"wilting_score":5,"observed_at":self.now}; values.update(extra); return CropInput(**values)
    def test_healthy_crop_is_monitored(self):
        decision=self.agent.evaluate(self.item()); self.assertEqual(decision.recommended_action,"MONITOR"); self.assertEqual(decision.sensor_health,"healthy")
    def test_critical_crop_requests_priority_but_no_water_allocation(self):
        decision=self.agent.evaluate(self.item(soil_moisture_pct=45,wilting_score=70)); self.assertEqual(decision.recommended_action,"REQUEST_PRIORITY_IRRIGATION"); self.assertEqual(decision.resource_demand["water_litres"],0)
    def test_unknown_crop_requires_verified_profile(self):
        decision=self.agent.evaluate(self.item(crop_type="banana")); self.assertEqual(decision.recommended_action,"PROFILE_CONFIGURATION_REQUIRED"); self.assertFalse(decision.profile_verified)
    def test_stale_ndvi_is_flagged(self):
        decision=self.agent.evaluate(self.item(ndvi=.2,ndvi_observed_at=self.now-timedelta(days=20))); self.assertEqual(decision.signal_quality["ndvi"],"stale"); self.assertEqual(decision.sensor_health,"degraded")
    def test_frozen_sensor_is_flagged(self):
        for h in range(3): self.agent.evaluate(self.item(observed_at=self.now+timedelta(hours=h)))
        decision=self.agent.evaluate(self.item(observed_at=self.now+timedelta(hours=3))); self.assertEqual(decision.sensor_health,"fault_suspected")
    def test_irrigation_feedback_reports_recovery(self):
        self.agent.record_irrigation_outcome("Z1",45,60,70,25); decision=self.agent.evaluate(self.item(soil_moisture_pct=60,wilting_score=25)); self.assertEqual(decision.recovery_status,"recovering")
    def test_crop_calendar_client_uses_documented_endpoint(self):
        seen=[]; client=FaoCropCalendarClient(fetch_json=lambda url: seen.append(url) or [{"name":"Tomato"}])
        self.assertEqual(client.crops()[0]["name"],"Tomato"); self.assertTrue(seen[0].endswith("/crops"))
    def test_cropwat_import_creates_unverified_profile(self):
        with TemporaryDirectory() as directory:
            source=Path(directory)/"crop_params.tsv"; source.write_text("crop\tKini\tKmax\tKend\nCapsicum\t0.6\t1.05\t0.9\n",encoding="utf-8")
            profile=import_cropwat_tsv(source,"Capsicum")
        self.assertEqual(profile.kc_mid,1.05); self.assertFalse(profile.verified)

if __name__ == "__main__": unittest.main()
