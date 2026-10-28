import { calculatePotential, type SimulatorInputs } from "./simulation.ts";

export type BriefingFields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  segment: string;
  problem: string;
  solution: string;
  description: string;
  consent: boolean;
};
export type BriefingContext = {
  experience?: string;
  simulation?: SimulatorInputs;
};
export type BriefingPayload = {
  fields: BriefingFields;
  context: BriefingContext;
};

export function validateBriefing(
  fields: BriefingFields,
): Partial<Record<keyof BriefingFields, string>> {
  const errors: Partial<Record<keyof BriefingFields, string>> = {};
  if (!fields.name?.trim() || fields.name.length > 120)
    errors.name = "Informe seu nome (até 120 caracteres).";
  if (!fields.company?.trim() || fields.company.length > 160)
    errors.company = "Informe sua empresa (até 160 caracteres).";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email ?? "") ||
    fields.email.length > 254
  )
    errors.email = "Informe um e-mail válido.";
  const digits = (fields.phone ?? "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15 || fields.phone.length > 30)
    errors.phone = "Informe um WhatsApp com DDD.";
  if (!fields.segment?.trim() || fields.segment.length > 120)
    errors.segment = "Informe o segmento da empresa.";
  if (!fields.problem?.trim() || fields.problem.length > 2000)
    errors.problem = "Descreva seu desafio (até 2.000 caracteres).";
  if (!fields.solution?.trim() || fields.solution.length > 160)
    errors.solution = "Escolha uma solução.";
  if (
    typeof fields.description !== "string" ||
    fields.description.length > 4000
  )
    errors.description = "Use até 4.000 caracteres.";
  if (fields.consent !== true)
    errors.consent =
      "Precisamos do seu consentimento para preparar o briefing.";
  return errors;
}

export function generateBriefing(
  fields: BriefingFields,
  context: BriefingContext = {},
) {
  const lines = [
    "BRIEFING DE PROJETO — GOLDSYSTEM",
    "",
    `Nome: ${fields.name.trim()}`,
    `Empresa: ${fields.company.trim()}`,
    `WhatsApp: ${fields.phone.trim()}`,
    `E-mail: ${fields.email.trim()}`,
    `Segmento: ${fields.segment.trim()}`,
    `Solução desejada: ${fields.solution}`,
    "",
    `Desafio: ${fields.problem.trim()}`,
    ...(fields.description.trim()
      ? [`Informações complementares: ${fields.description.trim()}`]
      : []),
    ...(context.experience
      ? ["", `Experiência explorada: ${context.experience}`]
      : []),
  ];
  if (context.simulation) {
    const i = context.simulation;
    const result = calculatePotential(i);
    lines.push(
      "",
      "SIMULAÇÃO ILUSTRATIVA DE AUTOMAÇÃO",
      `${i.employees} pessoas × ${i.hoursPerDay} h/dia × ${i.daysPerMonth} dias/mês.`,
      `Custo/hora: R$ ${i.hourlyCost}. Potencial automatizável: ${i.automationPercent}%.`,
      `Horas recuperáveis/mês: ${result.hours}. Equivalente mensal: R$ ${result.monthly}. Equivalente anual: R$ ${result.annual}.`,
      "Estimativa ilustrativa. Não representa garantia de economia financeira.",
    );
  }
  lines.push(
    "",
    "Consentimento para preparar e, quando disponível, encaminhar o briefing: concedido.",
  );
  return lines.join("\n");
}

export function parsePayload(value: unknown): BriefingPayload | null {
  if (!value || typeof value !== "object") return null;
  const { fields, context } = value as Record<string, unknown>;
  if (!fields || typeof fields !== "object") return null;
  const f = fields as Record<string, unknown>;
  const stringKeys = [
    "name",
    "company",
    "phone",
    "email",
    "segment",
    "problem",
    "solution",
    "description",
  ];
  if (
    stringKeys.some((key) => typeof f[key] !== "string") ||
    typeof f.consent !== "boolean"
  )
    return null;
  const cleanFields = Object.fromEntries(
    [...stringKeys, "consent"].map((key) => [key, f[key]]),
  ) as BriefingFields;
  if (Object.keys(validateBriefing(cleanFields)).length) return null;
  const cleanContext: BriefingContext = {};
  if (context && typeof context === "object") {
    const c = context as Record<string, unknown>;
    if (typeof c.experience === "string")
      cleanContext.experience = c.experience.slice(0, 160);
    if (c.simulation && typeof c.simulation === "object") {
      const s = c.simulation as Record<string, unknown>;
      const bounds: Record<keyof SimulatorInputs, [number, number]> = {
        employees: [1, 100],
        hoursPerDay: [0, 8],
        daysPerMonth: [1, 31],
        hourlyCost: [0, 500],
        automationPercent: [0, 100],
      };
      const keys = Object.keys(bounds) as (keyof SimulatorInputs)[];
      if (
        keys.every(
          (key) =>
            typeof s[key] === "number" &&
            Number.isFinite(s[key]) &&
            (s[key] as number) >= bounds[key][0] &&
            (s[key] as number) <= bounds[key][1],
        )
      ) {
        cleanContext.simulation = Object.fromEntries(
          keys.map((key) => [key, s[key]]),
        ) as SimulatorInputs;
      } else return null;
    }
  }
  return { fields: cleanFields, context: cleanContext };
}
