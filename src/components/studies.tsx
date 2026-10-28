"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";

const studies = [
  {
    title: "Da encomenda à entrega.",
    sector: "PRODUÇÃO & VENDAS",
    description: "Pedidos, produção e entrega falando a mesma língua.",
    detail:
      "Uma aplicação conceitual para operações que trabalham com encomendas. O pedido alimenta o planejamento de produção, reserva insumos e permite acompanhar a entrega. A proposta centraliza informações que normalmente ficam espalhadas entre mensagens e planilhas.",
    modules: [
      "Gestão de encomendas",
      "Fila de produção",
      "Controle de insumos",
      "Agenda de entregas",
    ],
    className: "study-production",
  },
  {
    title: "Cada produto. Todo o controle.",
    sector: "ESTOQUE & OPERAÇÃO",
    description: "Uma visão integrada de produtos, saldos e reposição.",
    detail:
      "Um estudo de aplicação para negócios com muitos produtos e movimentações. A proposta conecta entradas e saídas de estoque, organiza dados de produtos e sinaliza necessidades de reposição. Uma integração fiscal pode ser planejada conforme os requisitos do negócio.",
    modules: [
      "Catálogo de produtos",
      "Movimentação de estoque",
      "Regras de reposição",
      "Integrações sob análise",
    ],
    className: "study-stock",
  },
];

function StudyDetails({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const s = studies[index];
  useEffect(() => {
    const d = dialog.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="study-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="study-dialog-title"
    >
      <div className="dialog-top">
        <span className="eyebrow">
          ESTUDO DEMONSTRATIVO · NÃO É UM CASE PUBLICADO
        </span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Fechar detalhes da aplicação"
        >
          <X size={20} />
        </button>
      </div>
      <h3 id="study-dialog-title">{s.title}</h3>
      <p>{s.detail}</p>
      <ul>
        {s.modules.map((m) => (
          <li key={m}>
            <Check size={16} />
            {m}
          </li>
        ))}
      </ul>
      <p className="demo-disclaimer">
        Interface e contexto fictícios, criados para demonstrar possibilidades.
        Sem vínculo com cliente ou resultado comercial real.
      </p>
      <a href="#contato" onClick={onClose} className="button button-blue">
        Quero algo assim no meu negócio <ArrowUpRight size={17} />
      </a>
    </dialog>
  );
}

export function Studies() {
  const [detail, setDetail] = useState<number | null>(null);
  return (
    <section className="studies section-pad" id="aplicacoes">
      <div className="section-kicker">
        <span>EXEMPLOS DE APLICAÇÃO</span>
        <span>ESTUDOS DE APLICAÇÃO</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>
          Veja onde uma solução
          <br />
          <span className="text-muted">sob medida pode fazer sentido.</span>
        </h2>
        <p>
          Explorações conceituais de soluções sob medida. Demonstrações, sem
          alegações de cases ou resultados reais.
        </p>
      </div>
      <div className="studies-grid">
        {studies.map((s, index) => (
          <article className={s.className} key={s.title}>
            <div className="study-visual" aria-hidden="true">
              {index === 0 ? (
                <div className="production-preview">
                  <div className="preview-top">
                    <strong>
                      aurora<span> / produção</span>
                    </strong>
                    <span>VISÃO DA OPERAÇÃO</span>
                  </div>
                  <div className="production-board">
                    {["Recebido", "Em produção", "Pronto"].map((status, i) => (
                      <div key={status}>
                        <span>
                          <i />
                          {status} <small>{[2, 3, 1][i]}</small>
                        </span>
                        <div className="mini-order">
                          <small>ENCOMENDA 00{i + 1}</small>
                          <strong>
                            {
                              [
                                "Coleção especial",
                                "Kit essencial",
                                "Edição limitada",
                              ][i]
                            }
                          </strong>
                          <span>{[12, 24, 8][i]} unidades</span>
                          <div
                            className="mini-progress"
                            style={
                              {
                                "--progress": `${[20, 65, 100][i]}%`,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                        {i === 1 && (
                          <div className="mini-order second">
                            <small>ENCOMENDA 004</small>
                            <strong>Coleção especial</strong>
                            <span>16 unidades</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="preview-foot">
                    <span>
                      <Check size={12} /> Informações conectadas
                    </span>
                    <span>Dados demonstrativos</span>
                  </div>
                </div>
              ) : (
                <div className="inventory-preview">
                  <div className="preview-top">
                    <strong>
                      Inventário<span> / visão geral</span>
                    </strong>
                    <span>SIMULAÇÃO</span>
                  </div>
                  <div className="inventory-title">
                    <span>
                      O próximo movimento,
                      <br />
                      <strong>sob controle.</strong>
                    </span>
                    <div className="inventory-cube">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="inventory-rows">
                    {[
                      "Kit de produtos",
                      "Coleção essencial",
                      "Edição especial",
                    ].map((p, i) => (
                      <div key={p}>
                        <span className="mini-product" />
                        <strong>{p}</strong>
                        <span>{[32, 8, 24][i]} un.</span>
                        <i className={i === 1 ? "low" : ""} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="study-meta">
              <span className="eyebrow">
                {s.sector} <small>DEMONSTRAÇÃO</small>
              </span>
              <button onClick={() => setDetail(index)}>
                <h3>{s.title}</h3>
                <ArrowUpRight size={28} />
              </button>
              <p>{s.description}</p>
            </div>
          </article>
        ))}
      </div>
      {detail !== null && (
        <StudyDetails index={detail} onClose={() => setDetail(null)} />
      )}
    </section>
  );
}
