const amountUnits = {
  g: { dimension: 'mass', factor: 1000 },
  mg: { dimension: 'mass', factor: 1 },
  mcg: { dimension: 'mass', factor: 0.001 },
  U: { dimension: 'unit', factor: 1 },
  mU: { dimension: 'unit', factor: 0.001 },
  mEq: { dimension: 'equivalent', factor: 1 },
};

const concentrationUnits = {
  'g/mL': 'g',
  'mg/mL': 'mg',
  'mcg/mL': 'mcg',
  'U/mL': 'U',
  'mU/mL': 'mU',
  'mEq/mL': 'mEq',
};

const doseUnits = {
  'g/kg/dose': { amount: 'g', period: 'dose' },
  'mg/kg/dose': { amount: 'mg', period: 'dose' },
  'mcg/kg/dose': { amount: 'mcg', period: 'dose' },
  'U/kg/dose': { amount: 'U', period: 'dose' },
  'mU/kg/dose': { amount: 'mU', period: 'dose' },
  'mEq/kg/dose': { amount: 'mEq', period: 'dose' },
  'g/kg/day': { amount: 'g', period: 'day' },
  'mg/kg/day': { amount: 'mg', period: 'day' },
  'mcg/kg/day': { amount: 'mcg', period: 'day' },
  'U/kg/day': { amount: 'U', period: 'day' },
  'mU/kg/day': { amount: 'mU', period: 'day' },
  'mEq/kg/day': { amount: 'mEq', period: 'day' },
};

const infusionUnits = {
  'g/kg/min': { amount: 'g', period: 60 },
  'g/kg/h': { amount: 'g', period: 1 },
  'mg/kg/min': { amount: 'mg', period: 60 },
  'mg/kg/h': { amount: 'mg', period: 1 },
  'mcg/kg/min': { amount: 'mcg', period: 60 },
  'mcg/kg/h': { amount: 'mcg', period: 1 },
  'U/kg/min': { amount: 'U', period: 60 },
  'U/kg/h': { amount: 'U', period: 1 },
  'mU/kg/min': { amount: 'mU', period: 60 },
  'mU/kg/h': { amount: 'mU', period: 1 },
  'mEq/kg/min': { amount: 'mEq', period: 60 },
  'mEq/kg/h': { amount: 'mEq', period: 1 },
};

function positive(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${name} deve ser um número maior que zero.`);
  }
  return number;
}

function matchingUnits(amountUnit, concentrationUnit) {
  const concentrationAmount = concentrationUnits[concentrationUnit];
  if (
    !amountUnits[amountUnit] ||
    !amountUnits[concentrationAmount] ||
    amountUnits[amountUnit].dimension !== amountUnits[concentrationAmount].dimension
  ) {
    throw new Error('As unidades da dose e da concentração não correspondem.');
  }
}

export function calculateDose({
  weightKg,
  dose,
  doseUnit,
  concentration,
  concentrationUnit,
  dosesPerDay = 1,
  maximum,
  maximumScope = 'dose',
}) {
  const weight = positive(weightKg, 'Peso');
  const prescribed = positive(dose, 'Dose');
  const solutionConcentration = positive(concentration, 'Concentração');
  const unit = doseUnits[doseUnit];
  if (!unit || !concentrationUnits[concentrationUnit]) {
    throw new Error('Selecione unidades reconhecidas para dose e concentração.');
  }
  matchingUnits(unit.amount, concentrationUnit);

  const frequency = unit.period === 'day' ? positive(dosesPerDay, 'Doses por dia') : 1;
  if (!Number.isInteger(frequency) || frequency > 24) {
    throw new Error('Doses por dia deve ser um número inteiro entre 1 e 24.');
  }
  if (!['dose', 'day'].includes(maximumScope)) {
    throw new Error('Selecione se o limite máximo é por dose ou por dia.');
  }

  const amountUnit = amountUnits[unit.amount];
  const concentrationAmountUnit = concentrationUnits[concentrationUnit];
  const prescribedAmount = prescribed * weight;
  let totalPerDay = unit.period === 'day' ? prescribedAmount : prescribedAmount * frequency;
  let totalPerDose = totalPerDay / frequency;
  let capped = false;

  if (maximum !== '' && maximum !== undefined && maximum !== null) {
    const maximumAmount = positive(maximum, 'Limite máximo');
    const cap = maximumAmount * amountUnit.factor;
    if (maximumScope === 'day' && totalPerDay * amountUnit.factor > cap) {
      totalPerDay = maximumAmount;
      totalPerDose = totalPerDay / frequency;
      capped = true;
    } else if (maximumScope === 'dose' && totalPerDose * amountUnit.factor > cap) {
      totalPerDose = maximumAmount;
      totalPerDay = totalPerDose * frequency;
      capped = true;
    }
  }

  const finalConcentration = solutionConcentration * amountUnits[concentrationAmountUnit].factor;
  const volumePerDoseMl = (totalPerDose * amountUnit.factor) / finalConcentration;
  const reconstructedPerKgPerDose = (volumePerDoseMl * finalConcentration) /
    amountUnit.factor / weight;
  const reconstructedPerKg = unit.period === 'day'
    ? reconstructedPerKgPerDose * frequency
    : reconstructedPerKgPerDose;
  if (![totalPerDose, totalPerDay, volumePerDoseMl, reconstructedPerKg]
    .every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error('O resultado excede o intervalo numérico; revise os valores informados.');
  }
  const amountLabel = unit.amount;

  return {
    capped,
    dosePerAdministration: totalPerDose,
    dosePerDay: totalPerDay,
    amountUnit: unit.amount,
    doseUnit: `${amountLabel}/kg/${unit.period}`,
    frequency,
    reconstructedPerKg,
    volumePerDoseMl,
  };
}

export function calculateInfusion({
  weightKg,
  dose,
  doseUnit,
  quantity,
  quantityUnit,
  finalVolumeMl,
}) {
  const weight = positive(weightKg, 'Peso');
  const prescribed = positive(dose, 'Dose');
  const medicationQuantity = positive(quantity, 'Quantidade do medicamento');
  const finalVolume = positive(finalVolumeMl, 'Volume final');
  const unit = infusionUnits[doseUnit];
  if (!unit || !amountUnits[quantityUnit]) {
    throw new Error('Selecione unidades reconhecidas para dose e quantidade.');
  }
  if (amountUnits[unit.amount].dimension !== amountUnits[quantityUnit].dimension) {
    throw new Error('As unidades da dose e da quantidade preparada não correspondem.');
  }

  const factor = amountUnits[unit.amount].factor;
  const amountPerKgPerHour = prescribed * factor * unit.period;
  const amountPerHour = amountPerKgPerHour * weight;
  const concentrationPerMl = (medicationQuantity * amountUnits[quantityUnit].factor) / finalVolume;
  const pumpRateMlPerHour = amountPerHour / concentrationPerMl;
  const reconstructedPerKg = pumpRateMlPerHour * concentrationPerMl /
    weight / factor / unit.period;
  if (![amountPerHour, concentrationPerMl, pumpRateMlPerHour, reconstructedPerKg]
    .every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error('O resultado excede o intervalo numérico; revise os valores informados.');
  }

  return {
    amountUnit: unit.amount,
    amountPerHour: amountPerHour / factor,
    amountPerMinute: amountPerHour / factor / 60,
    concentration: medicationQuantity / finalVolume,
    concentrationUnit: `${quantityUnit}/mL`,
    doseUnit,
    pumpRateMlPerHour,
    reconstructedPerKg,
    solutionDurationHours: finalVolume / pumpRateMlPerHour,
    volumeFor6HoursMl: pumpRateMlPerHour * 6,
    volumeFor12HoursMl: pumpRateMlPerHour * 12,
    volumeFor24HoursMl: pumpRateMlPerHour * 24,
  };
}
