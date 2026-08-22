# Safety Rules

The safety guard enforces configurable hard limits. These are stored in backend/config/settings.py and can be set via environment variables.

Examples:
- minimum tank level
- maximum irrigation duration
- minimum battery level
- maximum fan/misting duration
- actuator cooldown
- invalid sensor detection

ML layers CANNOT bypass safety checks.
