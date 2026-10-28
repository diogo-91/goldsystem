import test from "node:test";
import assert from "node:assert/strict";
import { calculatePotential, defaultInputs } from "../src/lib/simulation.ts";
import {
  generateBriefing,
  parsePayload,
  validateBriefing,
  type BriefingFields,
} from "../src/lib/briefing.ts";

const valid: BriefingFields = {
  name: "Pessoa de teste",
  company: "Empresa fictícia",
  phone: "15999999999",
  email: "pessoa@example.com",
  segment: "Serviços",
  problem: "Conectar pedidos e estoque.",
  solution: "Software sob medida",
  description: "",
  consent: true,
};

test("simulador calcula horas, equivalente mensal e anual sem arredondamento intermediário", () => {
  assert.deepEqual(calculatePotential(defaultInputs), {
    hours: 132,
    monthly: 4620,
    annual: 55440,
    percent: 60,
  });
  assert.deepEqual(
    calculatePotential({
      employees: 3,
      hoursPerDay: 1.5,
      daysPerMonth: 21,
      hourlyCost: 27,
      automationPercent: 35,
    }),
    {
      hours: 33.075,
      monthly: 893.0250000000001,
      annual: 10716.300000000001,
      percent: 35,
    },
  );
});
test("simulador permite potencial e custo zero e limita entradas fora do domínio", () => {
  assert.equal(
    calculatePotential({ ...defaultInputs, automationPercent: 0 }).annual,
    0,
  );
  assert.equal(
    calculatePotential({ ...defaultInputs, hourlyCost: 0 }).monthly,
    0,
  );
  const result = calculatePotential({
    employees: -1,
    hoursPerDay: 999,
    daysPerMonth: 999,
    hourlyCost: -3,
    automationPercent: 999,
  });
  assert.deepEqual(result, { hours: 248, monthly: 0, annual: 0, percent: 100 });
});
test("briefing exige dados válidos e consentimento explícito", () => {
  assert.deepEqual(validateBriefing(valid), {});
  assert.ok(validateBriefing({ ...valid, consent: false }).consent);
  assert.ok(validateBriefing({ ...valid, email: "inválido" }).email);
  assert.ok(validateBriefing({ ...valid, phone: "123" }).phone);
  assert.ok(validateBriefing({ ...valid, problem: " " }).problem);
});
test("briefing preserva experiência, parâmetros e aviso sobre estimativas", () => {
  const result = generateBriefing(valid, {
    experience: "Automação de processos",
    simulation: defaultInputs,
  });
  assert.match(result, /Automação de processos/);
  assert.match(result, /5 pessoas × 2 h\/dia × 22 dias\/mês/);
  assert.match(result, /Horas recuperáveis\/mês: 132/);
  assert.match(result, /não representa garantia/i);
});
test("validação do servidor recusa payloads malformados, consentimento falso e parâmetros inválidos", () => {
  assert.equal(parsePayload(null), null);
  assert.equal(parsePayload({ fields: { ...valid, consent: "true" } }), null);
  assert.equal(parsePayload({ fields: { ...valid, consent: false } }), null);
  assert.equal(parsePayload({ fields: { ...valid, name: 123 } }), null);
  assert.equal(
    parsePayload({
      fields: valid,
      context: { simulation: { ...defaultInputs, employees: 1000 } },
    }),
    null,
  );
  assert.deepEqual(
    parsePayload({
      fields: valid,
      context: { experience: "Sistema de gestão", simulation: defaultInputs },
      ignored: "not forwarded",
    }),
    {
      fields: valid,
      context: { experience: "Sistema de gestão", simulation: defaultInputs },
    },
  );
});
