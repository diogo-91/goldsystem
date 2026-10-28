import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";

const require = createRequire(import.meta.url);

const fillBriefing = async (page: Page) => {
  await page.getByLabel("Seu nome", { exact: false }).fill("Pessoa de teste");
  await page
    .getByLabel("Empresa", { exact: false })
    .filter({ visible: true })
    .first()
    .fill("Empresa fictícia");
  await page.getByLabel("WhatsApp", { exact: false }).fill("15999999999");
  await page.getByLabel("E-mail", { exact: false }).fill("teste@example.com");
  await page.getByRole("textbox", { name: /^Segmento/ }).fill("Serviços");
  await page
    .getByLabel("O que você tem em mente?")
    .selectOption("Automação inteligente");
  await page
    .getByLabel("Qual desafio você quer resolver?")
    .fill("Conectar os pedidos e o estoque da operação.");
  await page.getByRole("checkbox", { name: /Concordo com o uso/ }).check();
};

test("gestão: criar e filtrar pedido, alterar status e navegar pelos oito módulos", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("tab", { name: /Sistema de gestão/ })
    .scrollIntoViewIfNeeded();
  await expect(page.getByTestId("order-total")).toHaveText(/12.500/);
  await page.getByRole("button", { name: "Novo pedido", exact: true }).click();
  await page.getByRole("dialog").getByLabel("Quantidade").fill("2");
  await page
    .getByRole("button", { name: "Criar pedido demonstrativo" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByTestId("order-total")).toHaveText(/12.990/);
  const search = page.getByRole("textbox", { name: "Buscar pedidos" });
  await search.fill("GS-1049");
  await expect(page.locator(".dash-table-panel tbody tr")).toHaveCount(1);
  await page.getByLabel("Status do pedido GS-1049").selectOption("Concluído");
  await expect(page.locator(".dash-notice")).toContainText(
    "Indicadores atualizados",
  );
  await page.getByLabel("Filtrar por status").selectOption("Recebido");
  await expect(
    page.getByText("Nenhum pedido encontrado.", { exact: false }),
  ).toBeVisible();
  await search.fill("");
  for (const moduleName of [
    "Vendas",
    "Estoque",
    "Clientes",
    "Financeiro",
    "Relatórios",
    "Automações",
    "Visão geral",
  ]) {
    await page
      .locator(".dash-sidebar")
      .getByRole("button", { name: moduleName, exact: true })
      .click();
    await expect(page.locator(".dash-heading h4")).toHaveText(
      moduleName === "Visão geral" ? "Tudo em seu lugar." : moduleName,
    );
  }
  await page
    .locator(".dash-sidebar")
    .getByRole("button", { name: "Estoque", exact: true })
    .click();
  await page.getByRole("button", { name: "Repor +10" }).first().click();
  await expect(page.locator(".stock-list")).toContainText("42 un.");
  await page.getByRole("tab", { name: /Automação de processos/ }).click();
  await page.getByRole("tab", { name: /Sistema de gestão/ }).click();
  await expect(page.getByTestId("order-total")).toHaveText(/12.990/);
});

test("laboratório: fluxo executa todas as etapas e IA mostra apenas exemplos selecionados", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: /Automação de processos/ }).click();
  await page
    .getByLabel("Processo para explorar")
    .selectOption("Controle de estoque");
  await page.getByRole("button", { name: "Executar simulação" }).click();
  await expect(page.locator(".flow-result")).toContainText("concluído", {
    timeout: 15000,
  });
  await expect(page.locator(".flow-steps li.complete")).toHaveCount(5);
  await page.getByRole("tab", { name: /Inteligência Artificial/ }).click();
  await page
    .getByRole("button", { name: /Um estoque que precisa de atenção/ })
    .click();
  await page.getByRole("button", { name: "Explorar interpretação" }).click();
  await expect(page.locator(".ai-response")).toContainText(
    "Déficit: 7 unidades",
  );
  await expect(page.locator(".ai-response")).toContainText(
    "aprovação do responsável",
  );
  await page
    .getByRole("link", { name: "Quero desenvolver minha solução" })
    .click();
  await expect(page.locator(".briefing-context")).toContainText(
    "Inteligência Artificial",
  );
  await expect(page.getByLabel("O que você tem em mente?")).toHaveValue(
    "Inteligência Artificial",
  );
});

test("simulador, comparação e briefing conservam o contexto sem fingir envio", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  let submissions = 0;
  page.on("request", (request) => {
    if (request.url().includes("/api/briefing")) submissions++;
  });
  await page.goto("/");
  await expect(page.getByTestId("hours-output")).toHaveText("132");
  await expect(page.getByTestId("monthly-output")).toHaveText(/4.620/);
  const employees = page.getByRole("slider", { name: "Pessoas envolvidas" });
  await employees.fill("10");
  await expect(page.getByTestId("hours-output")).toHaveText("264");
  await expect(page.getByTestId("annual-output")).toHaveText(/110.880/);
  await page.getByLabel("Experimente outro negócio").selectOption("Indústria");
  await expect(page.locator(".system-map")).toContainText("Produção");
  await page
    .getByRole("button", { name: "Software pronto", exact: true })
    .click();
  await expect(page.locator(".system-map")).not.toContainText("Produção");
  await expect(page.locator(".system-map")).toContainText(
    "Módulo indisponível",
  );
  await page
    .getByRole("link", { name: "Quero analisar esse potencial" })
    .click();
  await page.getByRole("button", { name: "Gerar meu briefing" }).click();
  await expect(
    page.getByText("Informe seu nome", { exact: false }),
  ).toBeVisible();
  await fillBriefing(page);
  await page.getByRole("button", { name: "Gerar meu briefing" }).click();
  const text = page.getByRole("textbox", { name: "Briefing gerado" });
  await expect(text).toHaveValue(/10 pessoas × 2 h\/dia × 22 dias\/mês/);
  await expect(page.locator(".form-message")).toContainText(
    "Nenhum dado foi enviado",
  );
  await page.getByRole("button", { name: "Copiar briefing" }).click();
  await expect(
    page.getByRole("button", { name: "Copiado", exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Empresa fictícia",
  );
  expect(submissions).toBe(0);
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Baixar .txt" }).click();
  expect((await download).suggestedFilename()).toBe(
    "meu-briefing-goldsystem.txt",
  );
});

test("API valida entradas e informa indisponibilidade do envio sem backend", async ({
  request,
}) => {
  const invalid = await request.post("/api/briefing", {
    data: { fields: { consent: false } },
  });
  expect(invalid.status()).toBe(400);
  const unavailable = await request.post("/api/briefing", {
    data: {
      fields: {
        name: "Teste",
        company: "Fictícia",
        phone: "15999999999",
        email: "teste@example.com",
        segment: "Serviços",
        problem: "Integrar estoque",
        solution: "Automação inteligente",
        description: "",
        consent: true,
      },
      context: {},
    },
  });
  expect(unavailable.status()).toBe(503);
  expect(await unavailable.json()).toHaveProperty("error");
});

test("briefing integrado: bloqueia edição durante envio e exige aceite do destino (HTTP simulado)", async ({
  page,
}) => {
  const server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      "3002",
    ],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1",
        BRIEFING_WEBHOOK_URL: "https://backend.example/briefings",
      },
      stdio: "ignore",
    },
  );
  try {
    let available = false;
    for (let attempt = 0; attempt < 80; attempt++) {
      if (server.exitCode !== null)
        throw new Error(
          "O servidor de teste de contato não iniciou na porta 3002.",
        );
      available = await fetch("http://127.0.0.1:3002")
        .then((response) => response.ok)
        .catch(() => false);
      if (available) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    expect(available).toBe(true);
    await page
      .context()
      .grantPermissions(["clipboard-read", "clipboard-write"]);
    let attempts = 0;
    let release: () => void = () => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("**/api/briefing", async (route) => {
      attempts++;
      if (attempts === 1) {
        await gate;
        await route.fulfill({
          status: 502,
          json: {
            error:
              "O destino não confirmou o recebimento. Copie seu briefing ou tente novamente.",
          },
        });
      } else {
        await route.fulfill({ status: 201, json: { delivered: true } });
      }
    });
    await page.goto("http://127.0.0.1:3002");
    await fillBriefing(page);
    await page
      .getByRole("button", { name: "Enviar meu briefing", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Aguardando confirmação…" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("textbox", { name: /^Seu nome/ }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Copiar briefing" }),
    ).toBeDisabled();
    release();
    await expect(page.locator(".form-message")).toContainText(
      "não confirmou o recebimento",
    );
    await expect(
      page.getByRole("button", { name: "Copiar briefing" }),
    ).toBeEnabled();
    await page
      .getByRole("button", { name: "Enviar meu briefing", exact: true })
      .click();
    await expect(page.locator(".form-message")).toContainText(
      "confirmou o recebimento do seu briefing",
    );
    expect(attempts).toBe(2);
    await page.getByRole("button", { name: "Copiar briefing" }).click();
    await expect(page.locator(".generated-briefing")).toContainText(
      "Recebimento confirmado pelo destino.",
    );
    await expect(page.locator(".form-message")).toContainText(
      "já foi confirmado pelo destino",
    );
  } finally {
    server.kill("SIGTERM");
    await new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        server.kill("SIGKILL");
        resolve();
      }, 3000);
      server.once("exit", () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }
});

test("teclado, estudos demonstrativos e movimento reduzido", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const first = page.getByRole("tab", { name: /Sistema de gestão/ });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: /Automação de processos/ }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Da encomenda à entrega." }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Da encomenda à entrega." }).click();
  await page
    .getByRole("link", { name: "Quero algo assim no meu negócio" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

// Chromium's software compositor can omit live WebGL surfaces in tall captures.
// Freeze the actual rendered buffers only for screenshots; interaction tests use
// the live canvases. Nothing in the application is replaced or mocked for users.
async function freezeRenderedFrames(page: Page) {
  await page.evaluate(async () => {
    for (const canvas of document.querySelectorAll<HTMLCanvasElement>(".sculpture.is-ready canvas")) {
      const frame = document.createElement("img");
      frame.src = canvas.toDataURL();
      await frame.decode();
      frame.alt = "";
      frame.className = "capture-webgl-frame";
      frame.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
      canvas.after(frame);
      canvas.dataset.captureVisibility = canvas.style.visibility;
      canvas.style.visibility = "hidden";
    }
  });
}

async function restoreRenderedFrames(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll<HTMLCanvasElement>("canvas[data-capture-visibility]").forEach(canvas => {
      canvas.style.visibility = canvas.dataset.captureVisibility || "";
      delete canvas.dataset.captureVisibility;
    });
    document.querySelectorAll(".capture-webgl-frame").forEach(frame => frame.remove());
  });
}

for (const width of [1440, 1280, 768, 390]) {
  test(`layout ${width}px: página completa, sem overflow ou erros de execução`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "O futuro da",
    );
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await freezeRenderedFrames(page);
    await page.screenshot({
      path: testInfo.outputPath(`goldsystem-${width}.png`),
      fullPage: true,
      animations: "disabled",
    });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: testInfo.outputPath(`hero-${width}.png`),
      animations: "disabled",
    });
    await restoreRenderedFrames(page);
    if (width === 390) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .locator("header")
        .getByRole("link", { name: "Experiências", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    expect(errors).toEqual([]);
  });
}

test("WebGL indisponível mantém a escultura vetorial sem erros de execução", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).startsWith("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page.waitForTimeout(1500);
  await expect(page.locator(".sculpture").first()).not.toHaveClass(/is-ready/);
  await expect(page.locator(".sculpture-poster").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.screenshot({ path: testInfo.outputPath("fallback-vetorial.png") });
  expect(errors).toEqual([]);
});

test("movimento padrão: escultura e narrativa respondem à rolagem", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".hero .sculpture")).toHaveClass(/is-ready/, {
    timeout: 20000,
  });
  const fragment = page.locator(".piece-orders");
  const before = await fragment.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.locator(".transformation-result").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const after = await fragment.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  expect(after).not.toBe(before);
  await expect(page.locator(".network-line").first()).toHaveCSS(
    "stroke-dashoffset",
    "0px",
  );
});

test("acessibilidade: sem violações sérias ou críticas nos estados principais", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addScriptTag({
    content: readFileSync(require.resolve("axe-core/axe.min.js"), "utf8"),
  });
  const check = async () =>
    page.evaluate(async () => {
      // axe is injected only by this test, never into the application bundle.
      const axe = (
        window as unknown as {
          axe: {
            run: (
              node: Document,
              config: object,
            ) => Promise<{
              violations: {
                id: string;
                impact: string;
                nodes: { target: string[]; failureSummary: string }[];
              }[];
            }>;
          };
        }
      ).axe;
      const result = await axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      });
      return result.violations
        .filter((v) => ["serious", "critical"].includes(v.impact))
        .map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        }));
    });
  expect(await check()).toEqual([]);
  await page.getByRole("tab", { name: /Automação de processos/ }).click();
  expect(await check()).toEqual([]);
  await page.getByRole("tab", { name: /Inteligência Artificial/ }).click();
  expect(await check()).toEqual([]);
});
