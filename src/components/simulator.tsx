"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Clock3, Info } from "lucide-react";
import {
  brl,
  calculatePotential,
  defaultInputs,
  number,
  type SimulatorInputs,
} from "@/lib/simulation";

const controls: {
  key: keyof SimulatorInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}[] = [
  {
    key: "employees",
    label: "Pessoas envolvidas",
    min: 1,
    max: 100,
    step: 1,
    unit: "",
  },
  {
    key: "hoursPerDay",
    label: "Tarefas repetitivas por pessoa / dia",
    min: 0,
    max: 8,
    step: 0.5,
    unit: "h",
  },
  {
    key: "hourlyCost",
    label: "Custo médio por hora",
    min: 0,
    max: 500,
    step: 5,
    unit: "R$",
  },
  {
    key: "daysPerMonth",
    label: "Dias trabalhados por mês",
    min: 1,
    max: 31,
    step: 1,
    unit: "dias",
  },
  {
    key: "automationPercent",
    label: "Potencial estimado de automação",
    min: 0,
    max: 100,
    step: 5,
    unit: "%",
  },
];

export function Simulator({
  onConvert,
}: {
  onConvert: (inputs: SimulatorInputs) => void;
}) {
  const [inputs, setInputs] = useState(defaultInputs);
  const [annual, setAnnual] = useState(false);
  const result = calculatePotential(inputs);
  const renderControl = (control: (typeof controls)[number]) => (
    <div className="ref-range" key={control.key}>
      <label htmlFor={`sim-${control.key}`}>
        {control.label}
        {control.key === "hoursPerDay" && <span> (horas/dia)</span>}
      </label>
      <div>
        <input
          id={`sim-${control.key}`}
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={inputs[control.key]}
          onChange={(event) =>
            setInputs((previous) => ({
              ...previous,
              [control.key]: Number(event.target.value),
            }))
          }
          style={
            {
              "--range-progress": `${((inputs[control.key] - control.min) / (control.max - control.min)) * 100}%`,
            } as React.CSSProperties
          }
        />
        <output htmlFor={`sim-${control.key}`}>
          {number(inputs[control.key])}
          {control.unit === "%" ? "%" : ""}
        </output>
      </div>
    </div>
  );
  return (
    <section id="simulador" className="ref-simulator">
      <div className="ref-container ref-simulator-grid">
        <div className="ref-simulator-copy">
          <span className="ref-eyebrow light">SIMULADOR</span>
          <h2>
            Veja o impacto de um sistema no <span>seu negócio.</span>
          </h2>
          <p>
            Calcule quanto tempo e dinheiro sua empresa pode recuperar com
            processos mais inteligentes.
          </p>
          <div className="ref-simulator-controls">
            {controls.slice(0, 3).map(renderControl)}
            <details className="ref-simulator-advanced">
              <summary>
                Parâmetros da simulação <ChevronDown size={13} />
              </summary>
              {controls.slice(3).map(renderControl)}
            </details>
          </div>
        </div>
        <div className="ref-economy-card">
          <span>Seu potencial de economia</span>
          <div
            className="ref-period"
            role="group"
            aria-label="Período do resultado"
          >
            <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
              Por mês
            </button>
            <button aria-pressed={annual} onClick={() => setAnnual(true)}>
              Por ano
            </button>
          </div>
          <div className="ref-economy-value">
            <output data-testid="monthly-output" hidden={annual}>
              {brl(result.monthly)}
            </output>
            <output data-testid="annual-output" hidden={!annual}>
              {brl(result.annual)}
            </output>
          </div>
          <p>
            Equivalente {annual ? "anual" : "mensal"} do tempo potencialmente
            recuperável
          </p>
          <div className="ref-economy-context">
            <Clock3 size={22} />
            <span>
              <strong>
                <output
                  data-testid="hours-output"
                  aria-label="Horas potencialmente recuperáveis por mês"
                >
                  {number(result.hours)}
                </output>{" "}
                horas por mês
              </strong>
              Com {inputs.daysPerMonth} dias trabalhados e{" "}
              {inputs.automationPercent}% de automação estimada.
            </span>
          </div>
          <a
            className="ref-button cyan"
            href="#contato"
            onClick={() => onConvert({ ...inputs })}
          >
            Quero analisar esse potencial <ArrowRight size={16} />
          </a>
          <small>
            <Info size={12} /> Estimativa ilustrativa, sem garantia de economia
            financeira.
          </small>
        </div>
        <div className="ref-simulator-caption" aria-hidden="true">
          Menos tarefas.
          <br />
          <span>Mais resultados.</span>
        </div>
      </div>
    </section>
  );
}
