import React, { useState } from 'react';
import { Calculator, DollarSign, Droplets, Zap, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RoiCalculator() {
  const [polyhouseSize, setPolyhouseSize] = useState(1.0); // Acres
  const [cropType, setCropType] = useState('tomato');
  const [waterCostPer1000L, setWaterCostPer1000L] = useState(120); // INR per 1000L tanker
  const [electricityTariff, setElectricityTariff] = useState(7.5); // INR per kWh

  const cropData = {
    tomato: { name: "Protected Tomato (Determinate)", annualGrossRevenue: 850000, waterConsumptionLiters: 1800000, energyKwh: 3800 },
    capsicum: { name: "Coloured Bell Pepper (Capsicum)", annualGrossRevenue: 1200000, waterConsumptionLiters: 1650000, energyKwh: 4200 },
    cucumber: { name: "Parthenocarpic Cucumber", annualGrossRevenue: 750000, waterConsumptionLiters: 1900000, energyKwh: 3400 },
    floriculture: { name: "High-Value Floriculture (Roses / Gerbera)", annualGrossRevenue: 1600000, waterConsumptionLiters: 1500000, energyKwh: 5200 }
  };

  const currentCrop = cropData[cropType];

  const annualWaterSavedLiters = currentCrop.waterConsumptionLiters * polyhouseSize * 0.348;
  const annualWaterCostSaved = (annualWaterSavedLiters / 1000) * waterCostPer1000L;

  const annualEnergySavedKwh = currentCrop.energyKwh * polyhouseSize * 0.38;
  const annualEnergyCostSaved = annualEnergySavedKwh * electricityTariff;

  const annualYieldIncreaseRevenue = currentCrop.annualGrossRevenue * polyhouseSize * 0.1015;

  const totalAnnualBenefitINR = annualWaterCostSaved + annualEnergyCostSaved + annualYieldIncreaseRevenue;
  const hardwareCostINR = 4500 * Math.ceil(polyhouseSize * 1.5); // ₹4,500 per unit
  const paybackDays = Math.max(3, Math.round((hardwareCostINR / totalAnnualBenefitINR) * 365));

  return (
    <section id="roi" className="py-20 bg-white border-t border-emerald-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            ECONOMIC VIABILITY &amp; ROI CALCULATOR
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Calculate Your Farm's Projected Annual Savings
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            See how the +10.15% AAAI yield increase, 34.8% water savings, and solar optimization translate to net rupees in a farmer's pocket.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Input Parameters */}
          <div className="lg:col-span-5 rounded-3xl bg-[#f7faf8] border border-emerald-100 p-6 space-y-5 shadow-sm">
            <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider block border-b border-slate-200 pb-2">
              Polyhouse Parameters
            </span>

            {/* Polyhouse Size Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Greenhouse Area</span>
                <span className="font-mono font-bold text-emerald-800">{polyhouseSize} Acre ({polyhouseSize * 4046} m²)</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="5.0"
                step="0.25"
                value={polyhouseSize}
                onChange={(e) => setPolyhouseSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Crop Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block">Cultivated Crop</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl text-xs text-slate-800 p-2.5 focus:outline-none shadow-2xs"
              >
                <option value="tomato">🍅 Protected Tomato</option>
                <option value="capsicum">🌶️ Coloured Bell Pepper (Capsicum)</option>
                <option value="cucumber">🥒 Parthenocarpic Cucumber</option>
                <option value="floriculture">🌹 Floriculture (Roses / Gerbera)</option>
              </select>
            </div>

            {/* Water Cost Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Water Cost / Tanker Dependency</span>
                <span className="font-mono font-bold text-cyan-800">₹{waterCostPer1000L} / 1,000 L</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={waterCostPer1000L}
                onChange={(e) => setWaterCostPer1000L(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Electricity Tariff */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Commercial / Agri Electricity Tariff</span>
                <span className="font-mono font-bold text-amber-800">₹{electricityTariff} / kWh</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="12.0"
                step="0.5"
                value={electricityTariff}
                onChange={(e) => setElectricityTariff(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Right: Output Projections */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Total Annual Benefit Hero Card */}
            <div className="rounded-3xl bg-emerald-50/80 border border-emerald-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-emerald-200/80 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    Total Estimated Annual Net Benefit
                  </span>
                  <div className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
                    ₹{Math.round(totalAnnualBenefitINR).toLocaleString('en-IN')}
                    <span className="text-sm font-mono text-emerald-700 font-normal"> / year</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 text-center shadow-2xs">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Hardware Payback</span>
                  <span className="text-2xl font-display font-black text-emerald-700">
                    {paybackDays} Days
                  </span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase text-emerald-700 block font-bold">Yield Boost (+10.15%)</span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    +₹{Math.round(annualYieldIncreaseRevenue).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">AAAI '22 Benchmark</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase text-cyan-700 block font-bold">Water Saved (34.8%)</span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {(annualWaterSavedLiters / 100000).toFixed(1)} Lakh Litres
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Saved ₹{Math.round(annualWaterCostSaved).toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase text-amber-700 block font-bold">Energy Optimized</span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {Math.round(annualEnergySavedKwh).toLocaleString('en-IN')} kWh
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Saved ₹{Math.round(annualEnergyCostSaved).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200/80 text-xs text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Estimated hardware investment: <strong className="text-slate-900">₹{hardwareCostINR.toLocaleString('en-IN')}</strong> (3× ESP32 nodes)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
