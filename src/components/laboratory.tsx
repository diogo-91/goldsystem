"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CirclePlay,
  RotateCcw,
  Sparkles,
  Workflow,
} from "lucide-react";
import { aiScenarios, processes, type ProcessName } from "@/lib/demo-data";

const Dashboard = dynamic(() => import("./dashboard"), {
  loading: () => <div className="demo-loading">Preparando seu workspace…</div>,
});
const experiences = [
  "Sistema de gestão",
  "Automação de processos",
  "Inteligência Artificial",
];

function AutomationDemo() {
  const [process, setProcess] = useState<ProcessName>("Cadastro de pedidos");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const steps = processes[process];
  useEffect(() => {
    if (!running) return;
    const timeout = window.setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
      else setRunning(false);
    }, 650);
    return () => window.clearTimeout(timeout);
  }, [running, step, steps.length]);
  const complete = !running && step === steps.length - 1;

  return (
    <div className="automation-demo">
      <div className="experiment-intro">
        <span className="eyebrow">DO GATILHO AO RESULTADO</span>
        <h4>
          Uma ação.
          <br />
          <span>Todo um fluxo em movimento.</span>
        </h4>
        <p>
          Escolha um processo e veja como etapas manuais podem se conectar. Sem
          chamadas a serviços externos.
        </p>
      </div>
      <div className="automation-toolbar">
        <label>
          Processo para explorar
          <select
            value={process}
            disabled={running}
            onChange={(e) => {
              setProcess(e.target.value as ProcessName);
              setStep(-1);
            }}
          >
            {Object.keys(processes).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <button
          className="button button-blue"
          disabled={running}
          onClick={() => {
            setStep(0);
            setRunning(true);
          }}
        >
          {running
            ? "Simulando fluxo…"
            : complete
              ? "Executar novamente"
              : "Executar simulação"}
          {complete ? <RotateCcw size={17} /> : <CirclePlay size={18} />}
        </button>
      </div>
      <ol className="flow-steps">
        {steps.map((text, i) => (
          <li
            key={`${process}-${i}`}
            className={
              i < step || complete ? "complete" : i === step ? "current" : ""
            }
          >
            <div className="flow-marker">
              {i < step || complete ? (
                <Check size={20} />
              ) : (
                <span>{String(i + 1).padStart(2, "0")}</span>
              )}
            </div>
            <span>{text}</span>
            {i < 4 && <ChevronRight className="flow-arrow" size={20} />}
          </li>
        ))}
      </ol>
      <div className="flow-result" aria-live="polite">
        <span className={running ? "live-dot running" : "live-dot"} />
        {complete
          ? "Fluxo demonstrativo concluído. Etapas conectadas, informação organizada."
          : running
            ? `Em execução: ${steps[step]}.`
            : "Pronto para experimentar. Você escolhe quando começar."}
      </div>
      <p className="demo-disclaimer">
        Simulação visual com etapas predefinidas. Nenhum registro, mensagem ou
        notificação real é enviado.
      </p>
    </div>
  );
}

function AiDemo() {
  const [scenario, setScenario] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const current = aiScenarios[scenario];
  useEffect(() => {
    if (!loading) return;
    const timeout = window.setTimeout(() => {
      setResult(scenario);
      setLoading(false);
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, [loading, scenario]);

  return (
    <div className="ai-demo">
      <div className="ai-scenarios">
        <span className="eyebrow">INTELIGÊNCIA COM CONTEXTO</span>
        <h4>
          Informação que vira
          <br />
          <span>próximo passo.</span>
        </h4>
        <p>
          Explore como uma solução com IA poderia apoiar decisões da sua equipe.
        </p>
        <div role="group" aria-label="Situação empresarial">
          {aiScenarios.map((s, i) => (
            <button
              key={s.title}
              disabled={loading}
              className={scenario === i ? "selected" : ""}
              aria-pressed={scenario === i}
              onClick={() => {
                setScenario(i);
                setResult(null);
              }}
            >
              {String(i + 1).padStart(2, "0")} <span>{s.title}</span>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
      </div>
      <div className="ai-console">
        <div className="ai-console-top">
          <span>
            <Sparkles size={16} /> Assistente empresarial
          </span>
          <span className="demo-badge">EXEMPLO PREDEFINIDO</span>
        </div>
        <div className="ai-message">
          <span>ENTRADA DEMONSTRATIVA</span>
          <p>“{current.input}”</p>
        </div>
        {result === null && !loading && (
          <button
            className="button button-blue"
            onClick={() => setLoading(true)}
          >
            Explorar interpretação <ArrowRight size={17} />
          </button>
        )}
        <div className="ai-response" aria-live="polite" aria-busy={loading}>
          {loading && (
            <div className="ai-thinking">
              <span />
              <span />
              <span /> Preparando exemplo demonstrativo…
            </div>
          )}
          {result !== null && !loading && (
            <>
              <span className="ai-intent">
                <Check size={15} />
                {aiScenarios[result].intent}
              </span>
              <ul>
                {aiScenarios[result].facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="ai-action">
                <span>AÇÃO SUGERIDA · REVISÃO HUMANA</span>
                <p>{aiScenarios[result].action}</p>
              </div>
            </>
          )}
        </div>
        <p className="demo-disclaimer">
          Conteúdo ilustrativo predefinido. Não utiliza um modelo de IA nem
          processa dados reais.
        </p>
      </div>
    </div>
  );
}

export function Laboratory({
  onConvert,
}: {
  onConvert: (experience: string) => void;
}) {
  const [tab, setTab] = useState(0);
  const baseId = useId();
  return (
    <section className="laboratory section-pad" id="experiencias">
      <div className="section-kicker">
        <span>02 / TECNOLOGIA PARA EXPERIMENTAR</span>
        <span className="small-note">
          <i /> INTERATIVO, DE VERDADE.
        </span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>
          Não apenas mostramos.
          <br />
          <span className="text-muted">Deixamos você experimentar.</span>
        </h2>
        <p>
          Uma pequena amostra do que acontece quando a tecnologia se adapta ao
          seu negócio.
        </p>
      </div>
      <div
        className="lab-tabs"
        role="tablist"
        aria-label="Experiências interativas"
      >
        {experiences.map((name, i) => (
          <button
            key={name}
            id={`${baseId}-tab-${i}`}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            onKeyDown={(e) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
                return;
              e.preventDefault();
              const next =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? 2
                    : (tab + (e.key === "ArrowRight" ? 1 : -1) + 3) % 3;
              setTab(next);
              document.getElementById(`${baseId}-tab-${next}`)?.focus();
            }}
          >
            <span>0{i + 1}</span>
            {name}
            {i === 0 ? (
              <span className="tab-icon">↗</span>
            ) : i === 1 ? (
              <Workflow size={18} />
            ) : (
              <Sparkles size={18} />
            )}
          </button>
        ))}
      </div>
      {experiences.map((name, i) => (
        <div
          key={name}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={tab !== i}
          tabIndex={0}
          className="lab-panel"
        >
          {i === 0 ? (
            <>
              <div className="product-caption">
                <span>
                  Imagine tudo funcionando.{" "}
                  <strong>Agora imagine tudo conectado.</strong>
                </span>
                <span>Seu próximo sistema começa aqui. ↓</span>
              </div>
              <Dashboard />
            </>
          ) : i === 1 ? (
            <AutomationDemo />
          ) : (
            <AiDemo />
          )}
        </div>
      ))}
      <div className="lab-conversion">
        <p>Gostaria de ter algo assim na sua empresa?</p>
        <a
          href="#contato"
          className="text-link"
          onClick={() => onConvert(experiences[tab])}
        >
          Quero desenvolver minha solução <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
