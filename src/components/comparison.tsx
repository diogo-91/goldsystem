"use client";

import { useState } from "react";
import { ArrowRight, Check, LockKeyhole, MoveUpRight } from "lucide-react";

const sectors = {
  Comércio: ["Vendas", "Estoque", "Pedidos", "Financeiro", "Clientes"],
  Indústria: ["Produção", "Insumos", "Qualidade", "Financeiro", "Expedição"],
  Serviços: ["Projetos", "Agenda", "Contratos", "Financeiro", "Clientes"],
};
export function Comparison() {
  const [custom, setCustom] = useState(true);
  const [sector, setSector] = useState<keyof typeof sectors>("Comércio");
  const items = custom
    ? sectors[sector]
    : [
        "Vendas",
        "Estoque",
        "Financeiro",
        "Módulo indisponível",
        "Módulo indisponível",
      ];
  return (
    <section className="comparison section-pad" id="abordagem">
      <div className="section-kicker">
        <span>TECNOLOGIA QUE ACOMPANHA O SEU NEGÓCIO</span>
        <span>PERSONALIZAÇÃO NA PRÁTICA</span>
      </div>
      <h2 data-reveal>
        O sistema acompanha
        <br />
        a lógica do seu negócio.
        <br />
        <span>Experimente a diferença.</span>
      </h2>
      <div className="comparison-body">
        <div className="comparison-copy">
          <p>
            Seu negócio tem seu próprio jeito de funcionar. Sua tecnologia
            também deveria ter.
          </p>
          <div
            className="comparison-toggle"
            role="group"
            aria-label="Comparar tipos de software"
          >
            <button
              aria-pressed={!custom}
              className={!custom ? "selected" : ""}
              onClick={() => setCustom(false)}
            >
              Software pronto
            </button>
            <button
              aria-pressed={custom}
              className={custom ? "selected" : ""}
              onClick={() => setCustom(true)}
            >
              Sob medida <MoveUpRight size={14} />
            </button>
          </div>
          <label className="sector-label">
            Experimente outro negócio
            <select
              value={sector}
              onChange={(e) =>
                setSector(e.target.value as keyof typeof sectors)
              }
            >
              {Object.keys(sectors).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <p className="comparison-explanation" aria-live="polite">
            {custom
              ? `Uma operação de ${sector.toLowerCase()}, com módulos que acompanham a sua lógica. Tudo integrado, do início ao próximo passo.`
              : "Uma estrutura fixa para necessidades diferentes. Troque o segmento: os módulos continuam iguais."}
          </p>
          <span className="small-note">
            COMPARAÇÃO CONCEITUAL E DEMONSTRATIVA
          </span>
        </div>
        <div className={`system-comparison ${custom ? "custom" : "fixed"}`}>
          <div className="comparison-label">
            <span>
              <i />
              {custom ? "SISTEMA QUE SE ADAPTA" : "ESTRUTURA FIXA"}
            </span>
            <span>{sector.toUpperCase()}</span>
          </div>
          <div className="system-map">
            <svg
              viewBox="0 0 600 280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M300 140 100 60M300 140 500 60M300 140 100 220M300 140 500 220M300 140 300 245" />
            </svg>
            <div className="map-center">
              {custom ? "Seu negócio" : "Sistema padrão"}
              <span>{custom ? "NO CENTRO DE TUDO" : "PROCESSOS FIXOS"}</span>
            </div>
            {items.map((item, i) => (
              <div
                className={`map-module map-module-${i} ${item.includes("indisponível") ? "unavailable" : ""}`}
                key={`${custom}-${sector}-${i}`}
              >
                {item.includes("indisponível") ? (
                  <LockKeyhole size={13} />
                ) : (
                  <Check size={13} />
                )}
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="comparison-foot">
            <span>
              {custom
                ? "Processos conectados às suas necessidades."
                : "Sua operação precisa se ajustar aos módulos."}
            </span>
            <ArrowRight size={17} />
          </div>
        </div>
      </div>
    </section>
  );
}
