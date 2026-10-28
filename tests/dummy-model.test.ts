import { test } from 'node:test';
import assert from 'node:assert/strict';
import { predictDummy, riskZone, type ModelInput } from '../lib/dummy-model.ts';
const base: ModelInput = { amount: 45000000, term: 24, income: 10000000, existingDebt: 500000, overdueMonths: 0, businessYears: 5 };
test('prediction runs deterministically and returns finite bounded output', () => {
  const result = predictDummy(base);
  assert.deepEqual(result, predictDummy(base));
  assert.ok(result.probability >= 0 && result.probability <= 100);
  assert.equal(result.monthlyPrincipal, 1875000);
  assert.equal(result.zone.color, 'green');
});
test('worsening repayment inputs increases the simulated risk', () => {
  const low = predictDummy(base);
  assert.ok(predictDummy({ ...base, income: 3000000 }).probability > low.probability);
  assert.ok(predictDummy({ ...base, overdueMonths: 3 }).probability > low.probability);
  assert.ok(predictDummy({ ...base, amount: 150000000 }).probability > low.probability);
});
test('three-zone boundaries match notebook rules', () => {
  assert.equal(riskZone(19.9).color, 'green'); assert.equal(riskZone(20).color, 'amber');
  assert.equal(riskZone(55).color, 'amber'); assert.equal(riskZone(55.1).color, 'red');
});
test('invalid, non-finite and fractional discrete inputs cannot produce a result', () => {
  for (const invalid of [{ income: 0 }, { amount: NaN }, { term: Infinity }, { overdueMonths: -1 }, { term: 1.5 }]) {
    assert.throws(() => predictDummy({ ...base, ...invalid }));
  }
});
test('simulator can express all three zones without random output', () => {
  const results = [base, { ...base, income: 4000000, overdueMonths: 1 }, { ...base, income: 2000000, overdueMonths: 3 }].map(i => predictDummy(i).zone.color);
  assert.deepEqual(results, ['green', 'amber', 'red']);
});
