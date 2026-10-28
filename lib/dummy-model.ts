/** Deterministic logistic simulator. Hand-set weights, NOT a trained credit model. */
export type ModelInput = {
  amount: number;
  term: number;
  income: number;
  existingDebt: number;
  overdueMonths: number;
  businessYears: number;
};
export const inputLimits: Record<keyof ModelInput, [number, number]> = {
  amount: [1000000, 1000000000], term: [1, 120], income: [100000, 1000000000],
  existingDebt: [0, 1000000000], overdueMonths: [0, 12], businessYears: [0, 60],
};
export function riskZone(p: number) {
  return p < 20 ? { label: "Risiko rendah", color: "green", action: "Verifikasi dokumen dasar" }
    : p <= 55 ? { label: "Tinjauan manual", color: "amber", action: "Lakukan analisis 5C & OTS" }
    : { label: "Risiko tinggi", color: "red", action: "Tinjau indikator risiko utama" };
}
export function predictDummy(input: ModelInput) {
  for (const key of Object.keys(inputLimits) as (keyof ModelInput)[]) {
    const value = input[key]; const [min, max] = inputLimits[key];
    if (!Number.isFinite(value) || value < min || value > max ||
      (["term", "overdueMonths", "businessYears"].includes(key) && !Number.isInteger(value))) {
      throw new Error(`Input ${key} tidak valid (${min}–${max}).`);
    }
  }
  // Principal-only monthly burden: no interest/margin, not an actual bank installment.
  const monthlyPrincipal = input.amount / input.term;
  const burdenRatio = (monthlyPrincipal + input.existingDebt) / input.income;
  const factors = [
    { label: "Rasio beban bulanan", value: Math.min(burdenRatio, 3) * 5 },
    { label: "Riwayat tunggakan", value: input.overdueMonths * .8 },
    { label: "Tenor pembiayaan", value: input.term / 60 * .8 },
    { label: "Usaha di bawah 2 tahun", value: input.businessYears < 2 ? .8 : 0 },
  ];
  const logit = -4.8 + factors.reduce((sum, f) => sum + f.value, 0);
  const probability = Math.round(1000 / (1 + Math.exp(-logit))) / 10;
  return {
    probability, zone: riskZone(probability), monthlyPrincipal, burdenRatio,
    factors: factors.sort((a, b) => b.value - a.value),
    modelVersion: "dummy-logistic-v1",
  };
}
