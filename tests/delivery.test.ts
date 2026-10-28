import test from "node:test";
import assert from "node:assert/strict";
import { forwardBriefing } from "../src/lib/delivery.ts";
import type { BriefingPayload } from "../src/lib/briefing.ts";

const payload: BriefingPayload = {
  fields: {
    name: "Teste",
    company: "Empresa fictícia",
    phone: "15999999999",
    email: "teste@example.com",
    segment: "Serviços",
    problem: "Integrar a operação.",
    solution: "Automação inteligente",
    description: "",
    consent: true,
  },
  context: { experience: "Automação de processos" },
};

test("encaminhamento aguarda confirmação HTTP e preserva o briefing e contexto", async () => {
  let called = false;
  const transport: typeof fetch = async (destination, options) => {
    called = true;
    assert.equal(String(destination), "https://backend.example/briefings");
    assert.equal(options?.method, "POST");
    assert.equal(options?.redirect, "error");
    assert.deepEqual(options?.headers, { "Content-Type": "application/json" });
    const body = JSON.parse(String(options?.body));
    assert.deepEqual(body.fields, payload.fields);
    assert.match(body.briefing, /Automação de processos/);
    return new Response(null, { status: 201 });
  };
  await forwardBriefing(
    payload,
    "https://backend.example/briefings",
    undefined,
    transport,
  );
  assert.equal(called, true);
});
test("falhas do backend ou da rede nunca são confirmadas como sucesso", async () => {
  await assert.rejects(
    forwardBriefing(
      payload,
      "https://backend.example/briefings",
      undefined,
      async () => new Response(null, { status: 500 }),
    ),
    /Delivery rejected/,
  );
  await assert.rejects(
    forwardBriefing(
      payload,
      "https://backend.example/briefings",
      undefined,
      async () => {
        throw new Error("Network unavailable");
      },
    ),
    /Network unavailable/,
  );
});
test("encaminhamento recusa HTTP e não inicia transporte inseguro", async () => {
  let called = false;
  await assert.rejects(
    forwardBriefing(
      payload,
      "http://backend.example/briefings",
      undefined,
      async () => {
        called = true;
        return new Response();
      },
    ),
    /HTTPS required/,
  );
  assert.equal(called, false);
});
