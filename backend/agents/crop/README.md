# SAMPADA Crop Intelligence Agent

The Crop Agent evaluates stress and publishes a request to the Coordinator. It never actuates pumps or overrides safety controls.

## Improvements included

- Any crop/stage/substrate can be loaded from `data/crop_profiles.json`.
- Profiles retain FAO-56/CROPWAT fields: `Kc`, root depth and allowable depletion.
- Soil moisture and visual wilting are primary signals; NDVI is a deliberately low-weight, slow background signal.
- Stale, frozen and sudden-jump readings are detected and lower confidence.
- The agent tracks moisture decline, critical duration and post-irrigation recovery.
- It reports `sensor_health`, `alerts`, freshness, signal quality and profile provenance.
- An unknown or unverified crop returns `PROFILE_CONFIGURATION_REQUIRED` instead of a real-world irrigation request.

## Crop profiles

FAO CROPWAT/FAO-56 is a sound baseline for crop coefficients, growth stages, root depth and depletion. Soil-moisture percentages must still be calibrated for the crop variety, substrate, pot/bed geometry and installed sensor. Add a reviewed record per crop/stage/substrate in `data/crop_profiles.json`:

```json
{"crop_type":"capsicum","growth_stage":"fruiting","substrate":"cocopeat","optimal_min":58,"optimal_max":72,"critical_min":45,"kc_initial":0.6,"kc_mid":1.05,"kc_end":0.9,"root_depth_m":0.6,"depletion_fraction":0.35,"default_duration_minutes":5,"source":"FAO-56 baseline + local trial","verified":true}
```

## Public FAO bootstrap integration

`FaoCropCalendarClient` connects to FAO's public Crop Calendar API for crop, country and growing-season context. It is reference context only, never a real-time control input. CROPWAT distributes its standard values as downloaded files rather than a stable profile API; import a TSV with `crop`, `Kini`, `Kmax`, and `Kend` columns:

```python
from crop_agent import append_profile, import_cropwat_tsv
profile = import_cropwat_tsv("crop_params.tsv", "Capsicum")
append_profile(profile, "data/crop_profiles.json")
```

The imported profile is intentionally `verified: false`. Set local moisture thresholds, duration and substrate after calibration, then mark it verified. Until then, the agent returns `PROFILE_CONFIGURATION_REQUIRED` instead of recommending irrigation.

## Run and test

```powershell
python -m pip install -r requirements.txt
python example.py
python -m unittest discover -s tests -v
```

## Dynamic live demo

Run a continuously updating sensor simulation with:

```powershell
python -m backend.agents.crop.live_demo
```

It cycles through healthy, drying, critical and recovery states every ten seconds. Stop it with `Ctrl+C`. In the full system, replace the simulated input block with MQTT messages from `sampada/sensors/Z1`.

Publish `CropDecision.model_dump_json()` to `sampada/agents/crop`. Person 2 owns water quantity; Person 5 applies scheduling and hard safety rules. After a Coordinator-approved irrigation event, call `record_irrigation_outcome()` to evaluate recovery.
