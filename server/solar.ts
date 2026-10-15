import type { CalcResult } from "../shared/schemas";

// Planning assumptions for Jaipur rooftops. Adjust these to match current
// market rates; every calculator figure is derived from them.
export const ASSUMPTIONS = {
  unitsPerKwPerMonth: 125, // ~4.1 units/kW/day average generation in Jaipur
  panelWatts: 550,
  roofSqftPerKw: 90,
  tariffInrPerUnit: 7.5,
  onGridCostPerKw: 60000,
  hybridExtraCostPerKw: 25000, // battery + hybrid inverter premium
  // PM Surya Ghar residential subsidy: ₹30,000/kW for the first 2 kW,
  // ₹18,000 for the 3rd kW, capped at ₹78,000.
  subsidy: { firstTwoKwPerKw: 30000, thirdKw: 18000, cap: 78000 },
};

function subsidyFor(kw: number) {
  const { firstTwoKwPerKw, thirdKw, cap } = ASSUMPTIONS.subsidy;
  const amount = Math.min(kw, 2) * firstTwoKwPerKw + Math.min(Math.max(kw - 2, 0), 1) * thirdKw;
  return Math.min(amount, cap);
}

export function estimate(units: number, backup: boolean): Omit<CalcResult, "summary_hindi"> {
  const a = ASSUMPTIONS;
  const systemKw = Math.max(1, Math.ceil((units / a.unitsPerKwPerMonth) * 2) / 2);
  const panels = Math.ceil((systemKw * 1000) / a.panelWatts);
  const generation = systemKw * a.unitsPerKwPerMonth;
  const monthlySavings = Math.min(generation, units) * a.tariffInrPerUnit;
  const cost = systemKw * (a.onGridCostPerKw + (backup ? a.hybridExtraCostPerKw : 0));
  const subsidy = subsidyFor(systemKw);
  const yearlySavings = monthlySavings * 12;

  return {
    system_type: backup ? "Hybrid सोलर सिस्टम (बैटरी बैकअप के साथ)" : "On-Grid सोलर सिस्टम",
    system_kw: systemKw,
    panels,
    roof_area_sqft: systemKw * a.roofSqftPerKw,
    monthly_generation_units: generation,
    monthly_savings_inr: monthlySavings,
    yearly_savings_inr: yearlySavings,
    approx_cost_inr: cost,
    subsidy_inr: subsidy,
    payback_years: (cost - subsidy) / yearlySavings,
  };
}

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

// Used when no Claude credentials are configured or the AI call fails.
export function templateSummary(units: number, e: Omit<CalcResult, "summary_hindi">) {
  return (
    `आपकी ${units} यूनिट मासिक खपत के लिए ${e.system_kw} kW का ${e.system_type} सही रहेगा। ` +
    `इससे हर महीने लगभग ${Math.round(e.monthly_generation_units)} यूनिट बिजली बनेगी और करीब ${inr(e.monthly_savings_inr)} की बचत होगी। ` +
    `${inr(e.subsidy_inr)} की सरकारी सब्सिडी के बाद आपकी लागत लगभग ${e.payback_years.toFixed(1)} वर्षों में वसूल हो जाएगी।`
  );
}
