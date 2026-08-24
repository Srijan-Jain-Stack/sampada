import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import { 
  ArrowLeft, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Bot,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export default function ZoneDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { zones, decision, isFarmerView } = useGreenhouse();

  const zone = zones.find(z => z.id === id) || zones[0];

  const isStressHigh = zone.cropStress === 'HIGH' || zone.cropStressScore >= 0.7;

  return (
    <PageContainer
      title={zone.name}
      subtitle={`Detailed micro-climate telemetry, phenology analysis and agent scheduling for ${zone.crop}`}
      farmerTitle={`Crop Details: ${zone.crop}`}
      farmerSubtitle={`Simple crop status and watering information for Zone 0${zone.numericId}`}
      actions={
        <button
          onClick={() => navigate('/zones')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Zones</span>
        </button>
      }
    >
      <div className="space-y-8">
        
        {/* 1. Zone Overview Header Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                Zone ID: {zone.id.toUpperCase()} • {zone.variety}
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                {zone.crop}
              </h2>
              <p className="text-xs text-slate-700 font-medium">
                Stage: <strong>{zone.stage}</strong> • Biological Health Score: <strong className="text-emerald-700">{zone.health}%</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
                isStressHigh ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {isStressHigh ? '⚠️ Elevated Crop Stress' : '🟢 Optimal Health'}
              </span>
            </div>
          </div>

          {/* 4 Sensor Gauges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Temp */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-orange-600" /> Temperature
                </span>
                <span className="text-[10px] text-slate-700">Target: {zone.tempTarget}°C</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{zone.temperature}°C</p>
              <span className="text-[10px] text-slate-700 block">SHT40 High-Precision RTD</span>
            </div>

            {/* Humidity */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-teal-600" /> Humidity (RH)
                </span>
                <span className="text-[10px] text-slate-700">Target: {zone.humidityTarget}%</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{zone.humidity}%</p>
              <span className="text-[10px] text-slate-700 block">VPD: 1.42 kPa (Normal)</span>
            </div>

            {/* Soil Moisture */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" /> Soil Moisture
                </span>
                <span className="text-[10px] text-slate-700">Target: {zone.soilMoistureTarget}%</span>
              </div>
              <p className={`text-2xl font-black ${zone.soilMoisture < 40 ? 'text-amber-800' : 'text-slate-900'}`}>
                {zone.soilMoisture}%
              </p>
              <span className="text-[10px] text-slate-700 block">Capacitive Array #4</span>
            </div>

            {/* Light & NDVI */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-600" /> Light & NDVI
                </span>
                <span className="text-[10px] text-slate-700">NDVI: {zone.ndvIndex}</span>
              </div>
              <p className="text-2xl font-black text-amber-700">{zone.lightIntensity} PAR</p>
              <span className="text-[10px] text-slate-700 block">CO2: {zone.co2Level} ppm</span>
            </div>

          </div>
        </div>

        {/* 2. Historical Telemetry Graph (Recharts) */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              24-Hour Micro-Climate Sensor Trends
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Synchronized temperature, soil moisture, and humidity curves
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={zone.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#0d9488" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Zone Scheduled Action & Recommendation */}
        <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/90 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-700" />
              <h4 className="font-extrabold text-slate-900 text-sm">
                Active Zone Actuator Status
              </h4>
            </div>
            <span className="text-xs font-bold text-emerald-800 font-mono">
              {zone.confidence}% AI Confidence
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Current Automated Command</span>
              <p className="text-base font-extrabold text-slate-900">{zone.currentAction}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-700 block">Water Demand</span>
              <p className="text-base font-extrabold text-blue-700">{zone.waterDemand} Liters</p>
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
