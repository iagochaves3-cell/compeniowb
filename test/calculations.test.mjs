import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDose, calculateInfusion } from '../src/calculations.mjs';

test('dose calculation converts mass units and reconstructs the prescribed dose', () => {
  const result = calculateDose({
    weightKg: '10',
    dose: '5',
    doseUnit: 'mg/kg/dose',
    concentration: '1000',
    concentrationUnit: 'mcg/mL',
  });

  assert.equal(result.dosePerAdministration, 50);
  assert.equal(result.volumePerDoseMl, 50);
  assert.equal(result.reconstructedPerKg, 5);
});

test('daily dose is divided by frequency and applies an absolute per-dose cap', () => {
  const result = calculateDose({
    weightKg: 20,
    dose: 10,
    doseUnit: 'mg/kg/day',
    dosesPerDay: 4,
    concentration: 50,
    concentrationUnit: 'mg/mL',
    maximum: 30,
    maximumScope: 'dose',
  });

  assert.equal(result.capped, true);
  assert.equal(result.dosePerAdministration, 30);
  assert.equal(result.dosePerDay, 120);
  assert.equal(result.volumePerDoseMl, 0.6);
  assert.equal(result.reconstructedPerKg, 6);
});

test('infusion conversion calculates mL/h and reconstructs mcg/kg/min', () => {
  const result = calculateInfusion({
    weightKg: 10,
    dose: 5,
    doseUnit: 'mcg/kg/min',
    quantity: 4,
    quantityUnit: 'mg',
    finalVolumeMl: 50,
  });

  assert.equal(result.concentration, 0.08);
  assert.equal(result.concentrationUnit, 'mg/mL');
  assert.equal(result.amountUnit, 'mcg');
  assert.equal(result.amountPerHour, 3000);
  assert.equal(result.pumpRateMlPerHour, 37.5);
  assert.equal(result.reconstructedPerKg, 5);
  assert.equal(result.volumeFor6HoursMl, 225);
});

test('rejects results outside the finite numeric range', () => {
  assert.throws(() => calculateDose({
    weightKg: 1e308,
    dose: 10,
    doseUnit: 'mg/kg/dose',
    concentration: 1,
    concentrationUnit: 'mg/mL',
  }), /intervalo numérico/);
});

test('rejects incompatible units instead of silently converting dimensions', () => {
  assert.throws(() => calculateInfusion({
    weightKg: 5,
    dose: 1,
    doseUnit: 'mcg/kg/min',
    quantity: 1,
    quantityUnit: 'U',
    finalVolumeMl: 10,
  }), /não correspondem/);
});

test('rejects invalid frequency and non-positive values', () => {
  assert.throws(() => calculateDose({
    weightKg: 5,
    dose: 1,
    doseUnit: 'mg/kg/day',
    dosesPerDay: 2.5,
    concentration: 1,
    concentrationUnit: 'mg/mL',
  }), /inteiro entre 1 e 24/);
  assert.throws(() => calculateDose({
    weightKg: 0,
    dose: 1,
    doseUnit: 'mg/kg/dose',
    concentration: 1,
    concentrationUnit: 'mg/mL',
  }), /maior que zero/);
});
