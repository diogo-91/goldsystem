"use client";

import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
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
    unit: "pessoas",
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
    key: "daysPerMonth",
    label: "Dias trabalhados por mês",
    min: 1,
    max: 31,
    step: 1,
    unit: "dias",
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
  const result = calculatePotential(inputs);
  return (
    <section id="simulador" className="simulator section-pad">
      <div className="section-kicker">
        <span>03 / O VALOR DO SEU TEMPO</span>
        <span>SIMULADOR DE POSSIBILIDADES</span>
      </div>
      <div className="simulator-heading" data-reveal>
        <h2>
          Seu tempo vale mais
          <br />
          do que <span>tarefas repetitivas.</span>
        </h2>
        <p>
          O que sua equipe poderia fazer com mais tempo?
          <br />
          Explore o potencial de automação da sua operação.
        </p>
      </div>
      <div className="simulator-layout">
        <div className="simulator-controls">
          {controls.map((c) => (
            <div className="range-control" key={c.key}>
              <div>
                <label htmlFor={`sim-${c.key}`}>{c.label}</label>
                <output htmlFor={`sim-${c.key}`}>
                  {c.unit === "R$"
                    ? brl(inputs[c.key])
                    : `${number(inputs[c.key])} ${c.unit}`}
                </output>
              </div>
              <div className="range-track">
                <Minus size={12} aria-hidden="true" />
                <input
                  id={`sim-${c.key}`}
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={inputs[c.key]}
                  onChange={(e) =>
                    setInputs({ ...inputs, [c.key]: Number(e.target.value) })
                  }
                  style={
                    {
                      "--range-progress": `${((inputs[c.key] - c.min) / (c.max - c.min)) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <Plus size={12} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
        <div className="simulator-results">
          <div className="orbit-decoration" aria-hidden="true">
            <svg viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="130" />
              <circle
                className="orbit-progress"
                cx="150"
                cy="150"
                r="130"
                strokeDasharray={`${result.percent * 8.168} 816.8`}
                transform="rotate(-90 150 150)"
              />
            </svg>
            <span>
              {result.percent}%<small>POTENCIAL SIMULADO</small>
            </span>
          </div>
          <div className="recovered">
            <span>MAIS ESPAÇO PARA O QUE IMPORTA</span>
            <div>
              <output
                data-testid="hours-output"
                aria-label="Horas potencialmente recuperáveis por mês"
              >
                {number(result.hours)}
              </output>
              <span>
                horas<small>por mês</small>
              </span>
            </div>
            <p>potencialmente recuperáveis na sua operação.</p>
          </div>
          <div className="equivalent-values">
            <div>
              <span>Equivalente mensal</span>
              <output data-testid="monthly-output">
                {brl(result.monthly)}
              </output>
            </div>
            <div>
              <span>Equivalente anual</span>
              <output data-testid="annual-output">{brl(result.annual)}</output>
            </div>
          </div>
        </div>
      </div>
      <div className="simulator-bottom">
        <p>
          Estimativa ilustrativa, não uma garantia de economia financeira.
          Cálculo: pessoas × horas/dia × dias/mês × percentual automatizável. O
          valor equivalente considera o custo por hora informado.
        </p>
        <a
          className="button button-white"
          href="#contato"
          onClick={() => onConvert({ ...inputs })}
        >
          Quero analisar esse potencial <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
