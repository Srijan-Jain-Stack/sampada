from backend.agents.climate.climate_agent import ClimateAgent


agent = ClimateAgent()


# =========================================================
# TEST 1: TOMATO - NORMAL
# JSON says tomato:
# temperature = 18-30
# humidity = 60-80
# =========================================================

bid = agent.generate_bid({
    "zone_id": "Z1",
    "crop_type": "tomato",
    "temperature": 25,
    "humidity": 70
})

print("\nTEST 1 - Normal Tomato")
print(bid)

assert bid.recommended_action == "MONITOR"


# =========================================================
# TEST 2: TOMATO - TOO HOT
# =========================================================

bid = agent.generate_bid({
    "zone_id": "Z1",
    "crop_type": "tomato",
    "temperature": 35,
    "humidity": 70
})

print("\nTEST 2 - Hot Tomato")
print(bid)

assert bid.recommended_action == "FAN"


# =========================================================
# TEST 3: TOMATO - TOO HUMID
# =========================================================

bid = agent.generate_bid({
    "zone_id": "Z1",
    "crop_type": "tomato",
    "temperature": 25,
    "humidity": 90
})

print("\nTEST 3 - Humid Tomato")
print(bid)

assert bid.recommended_action == "FAN"


# =========================================================
# TEST 4: TOMATO - TOO DRY
# =========================================================

bid = agent.generate_bid({
    "zone_id": "Z1",
    "crop_type": "tomato",
    "temperature": 25,
    "humidity": 40
})

print("\nTEST 4 - Dry Tomato")
print(bid)

assert bid.recommended_action == "MIST"


# =========================================================
# TEST 5: CUCUMBER - NORMAL
# =========================================================

bid = agent.generate_bid({
    "zone_id": "Z2",
    "crop_type": "cucumber",
    "temperature": 24,
    "humidity": 75
})

print("\nTEST 5 - Normal Cucumber")
print(bid)

assert bid.recommended_action == "MONITOR"


# =========================================================
# TEST 6: CUCUMBER - TOO HOT
# =========================================================

bid = agent.generate_bid({
    "zone_id": "Z2",
    "crop_type": "cucumber",
    "temperature": 32,
    "humidity": 75
})

print("\nTEST 6 - Hot Cucumber")
print(bid)

assert bid.recommended_action == "FAN"


print("\n====================================")
print("ALL CLIMATE AGENT TESTS PASSED")
print("====================================")
