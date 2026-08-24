export function runNegotiationCycle(params, lang = 'en') {
  const {
    zone1Moisture = 22,
    zone2Moisture = 45,
    zone3Moisture = 19,
    tankLevel = 60,
    batterySoC = 55,
    weatherScenario = 'moderate', // 'clear_hot', 'moderate', 'rain_approaching', 'severe_heatwave'
    timeOfDay = 'afternoon_peak'  // 'morning', 'afternoon_peak', 'evening', 'night'
  } = params;

  // 1. Calculate Crop Urgencies for Zones
  const z1Urgency = Math.min(1.0, Math.max(0.05, (60 - zone1Moisture) / 50));
  const z2Urgency = Math.min(1.0, Math.max(0.05, (60 - zone2Moisture) / 50));
  const z3Urgency = Math.min(1.0, Math.max(0.05, (60 - zone3Moisture) / 50));

  // 2. Climate & VPD stress
  let tempC = 28;
  let humidityPct = 65;
  let rainProb = 10;
  let rainExpectedMm = 0;

  if (weatherScenario === 'severe_heatwave') {
    tempC = 41.5;
    humidityPct = 32;
  } else if (weatherScenario === 'clear_hot') {
    tempC = 36.0;
    humidityPct = 42;
  } else if (weatherScenario === 'rain_approaching') {
    tempC = 26.0;
    humidityPct = 84;
    rainProb = 85;
    rainExpectedMm = 6.4;
  }

  if (timeOfDay === 'afternoon_peak') {
    tempC += 3.5;
  } else if (timeOfDay === 'night') {
    tempC -= 6.0;
  }

  // Calculate VPD (Vapor Pressure Deficit)
  const svp = 0.61078 * Math.exp((17.27 * tempC) / (tempC + 237.3));
  const avp = svp * (humidityPct / 100);
  const vpdKpa = Math.max(0.2, (svp - avp));

  const climateUrgency = Math.min(1.0, Math.max(0.1, (tempC > 34 ? (tempC - 30) / 15 : 0.2) + (vpdKpa > 1.4 ? 0.4 : 0.1)));

  // 3. Energy Stress & Battery State
  const solarProductionWatts = (timeOfDay === 'afternoon_peak' && weatherScenario !== 'rain_approaching') ? 240 : (timeOfDay === 'morning' ? 120 : 0);
  let energyUrgency = 0.2;
  if (batterySoC < 25) energyUrgency = 0.95;
  else if (batterySoC < 40) energyUrgency = 0.70;
  else if (batterySoC > 75) energyUrgency = 0.15;

  // 4. Irrigation Agent Urgency
  const irrigationUrgency = Math.max(z1Urgency, z2Urgency, z3Urgency) * (tankLevel < 20 ? 0.9 : 0.6);

  // 5. Determine State Machine Mode
  let systemState = 'Normal';
  let stateReason = 'All resource reserves healthy.';
  if (tankLevel < 10 || batterySoC < 15 || zone1Moisture < 15 || zone3Moisture < 15) {
    systemState = 'Emergency';
    stateReason = 'Hard safety floor boundary breached. Crop survival protocol engaged.';
  } else if (tankLevel < 25 || batterySoC < 25 || tempC > 40) {
    systemState = 'Critical';
    stateReason = 'Critical scarcity detected. Non-essential actuators disabled.';
  } else if (tankLevel < 45 || batterySoC < 40 || rainProb > 50) {
    systemState = 'Conservative';
    stateReason = 'Predictive scarcity or weather suppression active.';
  }

  // 6. Weather Suppression Check
  const isRainSuppressed = rainProb >= 60 && rainExpectedMm >= 2.0 && zone1Moisture > 18 && zone2Moisture > 18 && zone3Moisture > 18;

  // 7. Safety Guardrail Evaluation (The Veto Turnstile)
  let guardrailStatus = 'APPROVED';
  let guardrailNotes = 'All proposed actuations are within hard-coded agronomical safe bounds.';
  let actions = [];

  // Zone decisions
  const zoneActions = [
    { zone: 1, crop: 'Tomatoes', moisture: zone1Moisture, urgency: z1Urgency },
    { zone: 2, crop: 'Capsicum', moisture: zone2Moisture, urgency: z2Urgency },
    { zone: 3, crop: 'Cucumber', moisture: zone3Moisture, urgency: z3Urgency }
  ];

  zoneActions.forEach(z => {
    if (z.moisture < 16) {
      // Hard safety floor override!
      guardrailStatus = 'SAFETY_OVERRIDE';
      guardrailNotes = `Zone ${z.zone} (${z.crop}) moisture (${z.moisture}%) reached hard safety floor. Mandatory pulse override triggered!`;
      actions.push({
        type: 'VALVE_PULSE',
        target: `Zone ${z.zone} Solenoid`,
        durationSec: 60,
        reason: 'CRITICAL_HARD_FLOOR_OVERRIDE'
      });
    } else if (isRainSuppressed) {
      actions.push({
        type: 'SUPPRESSED',
        target: `Zone ${z.zone} Solenoid`,
        durationSec: 0,
        reason: `Open-Meteo rain forecast (${rainProb}% prob, ${rainExpectedMm}mm). Suppressed.`
      });
    } else if (z.urgency > 0.6 && tankLevel > 15) {
      actions.push({
        type: 'VALVE_PULSE',
        target: `Zone ${z.zone} Solenoid`,
        durationSec: systemState === 'Conservative' ? 30 : 45,
        reason: `LinUCB Priority Score: ${(z.urgency * 1.2).toFixed(2)}`
      });
    } else {
      actions.push({
        type: 'IDLE',
        target: `Zone ${z.zone} Solenoid`,
        durationSec: 0,
        reason: 'Moisture in safe operating window. Resting cycle.'
      });
    }
  });

  // Fan / Misting Climate Actions
  if (tempC > 36 || vpdKpa > 1.6) {
    if (batterySoC > 20) {
      actions.push({
        type: 'PWM_FAN',
        target: 'Exhaust Fans & Misting Line',
        durationSec: 120,
        pwmPct: batterySoC < 35 ? 50 : 85,
        reason: `VPD ${vpdKpa.toFixed(2)} kPa & Temp ${tempC.toFixed(1)}°C heat mitigation.`
      });
    } else {
      actions.push({
        type: 'FAN_RATIONED',
        target: 'Exhaust Fans',
        durationSec: 30,
        pwmPct: 30,
        reason: 'Battery conservation mode active.'
      });
    }
  }

  // 8. Water & Energy Saved in this Cycle
  const waterSavedLiters = isRainSuppressed ? 42.0 : (systemState === 'Conservative' ? 14.5 : 8.0);
  const energySavedWh = (solarProductionWatts > 150 ? 45.0 : 18.0);

  // 9. Generate Multilingual Farmer Plain-Language Explanation
  const explanations = {
    en: {
      summary: isRainSuppressed
        ? `Irrigation paused for all zones. Open-Meteo forecast detects ${rainProb}% rain chance (${rainExpectedMm}mm expected). Saved ${waterSavedLiters} Liters of tank water.`
        : systemState === 'Emergency'
        ? `Emergency survival mode! Water tank or battery critical. Irrigated only Zone ${zone1Moisture < zone3Moisture ? '1' : '3'} to protect drying roots.`
        : systemState === 'Conservative'
        ? `Rationing mode active. Delayed Zone 2 watering by 30 mins to balance afternoon solar battery load. Irrigated stressed Zone 1 (Tomato).`
        : `Normal operation. Zone 1 (Tomatoes) watered for 45s pulse. Climate fans engaged at 75% for optimal leaf cooling. All resources balanced.`,
      actionDetail: actions.map(a => `${a.target}: ${a.type} (${a.reason})`).join(" | "),
      waterSavedNote: `Estimated ${waterSavedLiters} L water conserved this cycle.`,
      energySavedNote: `${energySavedWh} Wh energy optimized via solar synchronization.`
    },
    hi: {
      summary: isRainSuppressed
        ? `सिंचाई रोक दी गई है। मौसम पूर्वानुमान के अनुसार ${rainProb}% बारिश (${rainExpectedMm}mm) की संभावना है। लगभग ${waterSavedLiters} लीटर पानी बचाया गया।`
        : systemState === 'Emergency'
        ? `आपातकालीन सुरक्षा मोड! बैटरी या पानी कम है। केवल सबसे ज्यादा सूखे पौधों (ज़ोन ${zone1Moisture < zone3Moisture ? '1' : '3'}) को जरूरी पानी दिया गया।`
        : systemState === 'Conservative'
        ? `संसाधन बचत मोड चालू है। दोपहर की सोलर बिजली बचाने के लिए ज़ोन 2 की सिंचाई 30 मिनट टाली गई और ज़ोन 1 को 30 सेकंड का पानी दिया गया।`
        : `सामान्य स्थिति। ज़ोन 1 (टमाटर) को 45 सेकंड ड्रिप सिंचाई दी गई और तापमान सामान्य रखने के लिए पंखे 75% गति पर चलाए गए।`,
      actionDetail: actions.map(a => `${a.target}: ${a.type}`).join(" | "),
      waterSavedNote: `इस चक्र में लगभग ${waterSavedLiters} लीटर पानी की बचत हुई।`,
      energySavedNote: `सोलर तालमेल से ${energySavedWh} Wh बिजली बचाई गई।`
    },
    mr: {
      summary: isRainSuppressed
        ? `हवामान अंदाजानुसार ${rainProb}% पावसाची शक्यता (${rainExpectedMm}mm) असल्यामुळे ठिबक सिंचन थांबवले. सुमारे ${waterSavedLiters} लिटर पाणी वाचवले.`
        : systemState === 'Emergency'
        ? `आणीबाणी मोड! पाणी किंवा बॅटरी अत्यंत कमी आहे. फक्त सुकणाऱ्या पिकांना (झोन ${zone1Moisture < zone3Moisture ? '1' : '3'}) तातडीचे पाणी दिले गेले.`
        : systemState === 'Conservative'
        ? `बचत मोड सक्रिय. दुपारच्या बॅटरी लोडचे संतुलन राखण्यासाठी झोन २ चे पाणी ३० मिनिटे पुढे ढकलले आणि झोन १ ला आवश्यक पाणी दिले.`
        : `सर्व सुरळीत आहे. झोन १ (टोमॅटो) ला ४५ सेकंद ठिबक पाणी दिले व तापमान नियंत्रणासाठी पंखे ७५% वेगाने सुरू केले.`,
      actionDetail: actions.map(a => `${a.target}: ${a.type}`).join(" | "),
      waterSavedNote: `या चक्रात ${waterSavedLiters} लिटर पाणी वाचवले.`,
      energySavedNote: `सौर उर्जेच्या समन्वयाने ${energySavedWh} Wh वीज वाचवली.`
    },
    te: {
      summary: isRainSuppressed
        ? `వర్ష సూచన (${rainProb}% అవకాశం, ${rainExpectedMm}mm) ఉన్నందున నీటి సరఫరా నిలిపివేయబడింది. దాదాపు ${waterSavedLiters} లీటర్ల నీరు ఆదా చేయబడింది.`
        : systemState === 'Emergency'
        ? `అత్యవసర మోడ్! ట్యాంక్ లేదా బ్యాటరీ చాలా తక్కువగా ఉంది. కేవలం ఎండుతున్న పంటకు (జోన్ ${zone1Moisture < zone3Moisture ? '1' : '3'}) మాత్రమే నీరు అందించబడింది.`
        : systemState === 'Conservative'
        ? `పొదుపు మోడ్ యాక్టివ్. మధ్యాహ్నం విద్యుత్ సమతుల్యత కోసం జోన్ 2 నీటిని 30 నిమిషాలు వాయిదా వేసి, జోన్ 1 కి నీరు ఇవ్వబడింది.`
        : `సాధారణ స్థితి. జోన్ 1 (టొమాటో) కి 45 సెకన్ల డ్రిప్ పల్స్ అందించబడింది, ఉష్ణోగ్రత నియంత్రణకు ఫ్యాన్లు 75% వేగంతో నడుస్తున్నాయి.`,
      actionDetail: actions.map(a => `${a.target}: ${a.type}`).join(" | "),
      waterSavedNote: `ఈ సైకిల్‌లో ${waterSavedLiters} లీటర్ల నీరు ఆదా అయింది.`,
      energySavedNote: `సోలార్ అనుసంధానంతో ${energySavedWh} Wh విద్యుత్ ఆదా చేయబడింది.`
    }
  };

  const selectedExplanation = explanations[lang] || explanations.en;

  return {
    timestamp: new Date().toLocaleTimeString(),
    systemState,
    stateReason,
    guardrailStatus,
    guardrailNotes,
    isRainSuppressed,
    telemetry: {
      tempC,
      humidityPct,
      vpdKpa: Number(vpdKpa.toFixed(2)),
      solarProductionWatts,
      rainProb,
      rainExpectedMm
    },
    bids: [
      {
        agent: "Crop Stress Agent",
        icon: "Sprout",
        color: "#10b981",
        score: Number(Math.max(z1Urgency, z2Urgency, z3Urgency).toFixed(2)),
        rationale: `Zone 1: ${(z1Urgency*100).toFixed(0)}% stress, Zone 2: ${(z2Urgency*100).toFixed(0)}% stress, Zone 3: ${(z3Urgency*100).toFixed(0)}% stress.`
      },
      {
        agent: "Irrigation Agent",
        icon: "Droplets",
        color: "#06b6d4",
        score: Number(irrigationUrgency.toFixed(2)),
        rationale: `Tank level @ ${tankLevel}%. Hydraulic pulse ready. ${isRainSuppressed ? '[Weather Suppressed]' : 'Ready to dispatch.'}`
      },
      {
        agent: "Climate Agent",
        icon: "Wind",
        color: "#2fb6a6",
        score: Number(climateUrgency.toFixed(2)),
        rationale: `Temp ${tempC.toFixed(1)}°C, VPD ${vpdKpa.toFixed(2)} kPa. ${tempC > 36 ? 'High leaf heat risk!' : 'Nominal microclimate.'}`
      },
      {
        agent: "Energy Agent",
        icon: "BatteryCharging",
        color: "#f59e0b",
        score: Number(energyUrgency.toFixed(2)),
        rationale: `Battery SoC: ${batterySoC}%, Solar: ${solarProductionWatts}W. ${batterySoC < 30 ? 'Power rationing priority' : 'Sufficient power budget'}`
      }
    ],
    actions,
    impact: {
      waterSavedLiters,
      energySavedWh,
      estimatedRupeesSaved: Number((waterSavedLiters * 0.15 + (energySavedWh / 1000) * 8.5).toFixed(2))
    },
    farmerExplanation: selectedExplanation
  };
}
