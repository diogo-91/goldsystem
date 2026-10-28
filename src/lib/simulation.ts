export type SimulatorInputs = {
  employees: number;
  hoursPerDay: number;
  daysPerMonth: number;
  hourlyCost: number;
  automationPercent: number;
};

export const defaultInputs: SimulatorInputs = {
  employees: 5,
  hoursPerDay: 2,
  daysPerMonth: 22,
  hourlyCost: 35,
  automationPercent: 60,
};

export function calculatePotential(input: SimulatorInputs) {
  const safe = {
    employees: Math.min(100, Math.max(1, Number(input.employees) || 1)),
    hoursPerDay: Math.min(8, Math.max(0, Number(input.hoursPerDay) || 0)),
    daysPerMonth: Math.min(31, Math.max(1, Number(input.daysPerMonth) || 1)),
    hourlyCost: Math.min(500, Math.max(0, Number(input.hourlyCost) || 0)),
    automationPercent: Math.min(
      100,
      Math.max(0, Number(input.automationPercent) || 0),
    ),
  };
  const hours =
    (safe.employees *
      safe.hoursPerDay *
      safe.daysPerMonth *
      safe.automationPercent) /
    100;
  return {
    hours,
    monthly: hours * safe.hourlyCost,
    annual: hours * safe.hourlyCost * 12,
    percent: safe.automationPercent,
  };
}

export const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
export const number = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value);
