"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Package,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { aiScenarios, initialOrders, products } from "@/lib/demo-data";
import { brl } from "@/lib/simulation";

export const businessOffers = [
  {
    name: "Sistemas sob medida",
    shortName: "Sistemas",
    experience: "Sistema de gestão",
    icon: ClipboardList,
    benefit: "Sua gestão organizada em um só lugar.",
    description:
      "Pedidos, vendas, estoque e financeiro em um sistema desenvolvido para o jeito que a sua empresa trabalha.",
    examples: [
      "Sistemas de gestão",
      "Plataformas web",
      "Dashboards e relatórios",
    ],
    action: "Quero desenvolver meu sistema",
  },
  {
    name: "Automações de processos",
    shortName: "Automações",
    experience: "Automação de processos",
    icon: Workflow,
    benefit: "Menos trabalho manual. Mais agilidade.",
    description:
      "Conecte ferramentas e automatize etapas repetitivas para a informação chegar onde precisa, na hora certa.",
    examples: [
      "Fluxos operacionais",
      "Integrações entre sistemas",
      "Atualização de dados",
    ],
    action: "Quero automatizar minha operação",
  },
  {
    name: "Inteligência Artificial",
    shortName: "Inteligência Artificial",
    experience: "Inteligência Artificial",
    icon: Sparkles,
    benefit: "Informação que ajuda sua equipe a agir.",
    description:
      "Aplique IA ao atendimento, à interpretação de informações e ao apoio à decisão, com contexto do seu negócio.",
    examples: [
      "Assistentes empresariais",
      "Análise de informações",
      "Apoio ao atendimento",
    ],
    action: "Quero aplicar IA na minha empresa",
  },
] as const;

function SystemPreview() {
  const [view, setView] = useState("Pedidos");
  const total = initialOrders.reduce((sum, order) => sum + order.amount, 0);
  const received = initialOrders
    .filter((order) => order.status === "Concluído")
    .reduce((sum, order) => sum + order.amount, 0);
  return (
    <div className="sales-system-preview">
      <aside
        className="preview-sidebar"
        aria-label="Módulos da prévia do sistema"
      >
        <span>MINHA OPERAÇÃO</span>
        {[
          { name: "Pedidos", icon: ClipboardList },
          { name: "Estoque", icon: Package },
          { name: "Financeiro", icon: CircleDollarSign },
        ].map(({ name, icon: Icon }) => (
          <button
            key={name}
            aria-pressed={view === name}
            onClick={() => setView(name)}
          >
            <Icon size={15} />
            <span>{name}</span>
          </button>
        ))}
        <div>
          <ShieldCheck size={15} />
          <span>
            Informações
            <br />
            conectadas
          </span>
        </div>
      </aside>
      <div className="preview-workspace">
        <div className="preview-workspace-title">
          <div>
            <small>VISÃO DA OPERAÇÃO</small>
            <h3>
              {view === "Pedidos"
                ? "Seus pedidos, organizados."
                : view === "Estoque"
                  ? "Seu estoque, à vista."
                  : "Seu financeiro, conectado."}
            </h3>
          </div>
          <span className="preview-account">GS</span>
        </div>
        <div className="preview-stats">
          <div>
            <span>
              {view === "Estoque"
                ? "Produtos cadastrados"
                : "Valor dos pedidos"}
            </span>
            <strong>{view === "Estoque" ? products.length : brl(total)}</strong>
          </div>
          <div>
            <span>
              {view === "Estoque" ? "Abaixo do mínimo" : "Pedidos em andamento"}
            </span>
            <strong>
              {view === "Estoque"
                ? products.filter((p) => p.stock < p.min).length
                : initialOrders.filter((o) => o.status !== "Concluído").length}
              <i>na simulação</i>
            </strong>
          </div>
        </div>
        {view === "Pedidos" ? (
          <div className="preview-order-list">
            <div className="preview-list-label">
              <span>PEDIDO / CLIENTE</span>
              <span>SITUAÇÃO</span>
            </div>
            {initialOrders.slice(0, 3).map((order) => (
              <div key={order.id}>
                <span className="preview-order-icon">
                  <ClipboardList size={15} />
                </span>
                <div>
                  <strong>{order.id}</strong>
                  <small>{order.client}</small>
                </div>
                <span
                  className={`preview-order-status status-${order.status === "Concluído" ? "done" : order.status === "Recebido" ? "new" : "progress"}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        ) : view === "Estoque" ? (
          <div className="preview-stock-list">
            {products.map((p) => (
              <div key={p.name}>
                <span className="preview-order-icon">
                  <Package size={15} />
                </span>
                <div>
                  <strong>{p.name}</strong>
                  <small>Mínimo: {p.min} unidades</small>
                </div>
                <span className={p.stock < p.min ? "preview-stock-low" : ""}>
                  {p.stock} un.
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="preview-finance">
            <div>
              <span>Recebido na simulação</span>
              <strong>{brl(received)}</strong>
              <CheckCheck size={19} />
            </div>
            <div>
              <span>Previsto na simulação</span>
              <strong>{brl(total - received)}</strong>
              <CircleDollarSign size={19} />
            </div>
            <p>Pedidos concluídos são tratados como recebidos neste exemplo.</p>
          </div>
        )}
        <div className="preview-connected">
          <Check size={13} />
          <span>Do pedido ao financeiro. Tudo na mesma operação.</span>
        </div>
      </div>
    </div>
  );
}

const flow = [
  ["Pedido recebido", "Um novo pedido inicia o processo."],
  ["Informações conferidas", "Regras e dados são verificados."],
  ["Registro organizado", "A informação segue para o sistema."],
  ["Equipe informada", "O próximo passo fica preparado."],
];

function AutomationPreview() {
  const [current, setCurrent] = useState(-1);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      if (current === flow.length - 1) setRunning(false);
      else setCurrent((value) => value + 1);
    }, 550);
    return () => clearTimeout(timer);
  }, [current, running]);
  const completed = current === flow.length - 1 && !running;
  return (
    <div className="sales-automation-preview">
      <div className="sales-preview-intro">
        <span className="preview-feature-symbol">
          <Workflow size={20} />
        </span>
        <div>
          <small>EXEMPLO DE AUTOMAÇÃO</small>
          <h3>Um pedido. Um fluxo conectado.</h3>
        </div>
      </div>
      <div className="sales-flow">
        {flow.map(([name, text], i) => (
          <div className={current >= i ? "executed" : ""} key={name}>
            <span>{current >= i ? <Check size={16} /> : `0${i + 1}`}</span>
            <div>
              <strong>{name}</strong>
              <small>{text}</small>
            </div>
            {i === current && running && (
              <span className="sales-flow-running" />
            )}
          </div>
        ))}
      </div>
      <div className="sales-flow-footer">
        <span role="status">
          {completed
            ? "Simulação concluída. Etapas organizadas."
            : running
              ? "Executando exemplo…"
              : "Veja como as etapas se conectam."}
        </span>
        <button
          disabled={running}
          onClick={() => {
            setCurrent(0);
            setRunning(true);
          }}
        >
          {completed ? <RotateCcw size={15} /> : <Play size={14} />}{" "}
          {completed ? "Simular novamente" : "Simular fluxo"}
        </button>
      </div>
      <p className="sales-preview-note">
        Simulação local. Nenhum registro ou notificação real é enviado.
      </p>
    </div>
  );
}

function AiPreview() {
  const [scenario, setScenario] = useState(0);
  const current = aiScenarios[scenario];
  return (
    <div className="sales-ai-preview">
      <div className="sales-preview-intro">
        <span className="preview-feature-symbol">
          <Sparkles size={20} />
        </span>
        <div>
          <small>IA APLICADA AO NEGÓCIO</small>
          <h3>Do texto ao próximo passo.</h3>
        </div>
      </div>
      <div
        className="sales-ai-options"
        role="group"
        aria-label="Exemplos de aplicação de IA"
      >
        {["Pedidos", "Estoque", "Financeiro"].map((name, i) => (
          <button
            key={name}
            aria-pressed={scenario === i}
            onClick={() => setScenario(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="sales-ai-input">
        <span>INFORMAÇÃO RECEBIDA</span>
        <p>“{current.input}”</p>
      </div>
      <div className="sales-ai-output" aria-live="polite">
        <div>
          <Sparkles size={14} />
          <strong>{current.intent}</strong>
        </div>
        <ul>
          {current.facts.slice(0, 3).map((fact) => (
            <li key={fact}>
              <Check size={12} />
              {fact}
            </li>
          ))}
        </ul>
        <span>
          <ShieldCheck size={13} /> Próxima ação sujeita à revisão humana.
        </span>
      </div>
      <p className="sales-preview-note">
        Exemplo predefinido, sem chamada a um modelo de IA.
      </p>
    </div>
  );
}

export function ProductPreview({
  selected,
  onSelect,
  onExplore,
}: {
  selected: number;
  onSelect: (index: number) => void;
  onExplore: (index: number) => void;
}) {
  return (
    <div className="sales-product-stage">
      <div
        className="sales-product-tabs"
        role="group"
        aria-label="Conheça as soluções GoldSystem"
      >
        {businessOffers.map((offer, index) => (
          <button
            key={offer.name}
            aria-pressed={selected === index}
            onClick={() => onSelect(index)}
          >
            <offer.icon size={16} />
            <span>{offer.shortName}</span>
          </button>
        ))}
      </div>
      <div className="sales-product-window">
        <div className="sales-window-bar">
          <div>
            <span className="preview-brand">&lt;goldsystem&gt;</span>
            <span className="preview-window-divider" />
            <span>
              {
                [
                  "Gestão empresarial",
                  "Automação de processos",
                  "Assistente empresarial",
                ][selected]
              }
            </span>
            <ChevronDown size={12} />
          </div>
          <span className="sales-demo-label">
            <i /> DEMONSTRAÇÃO
          </span>
        </div>
        <div className="sales-preview-body" data-testid="hero-product-preview">
          {selected === 0 ? (
            <SystemPreview />
          ) : selected === 1 ? (
            <AutomationPreview />
          ) : (
            <AiPreview />
          )}
        </div>
        <a
          className="sales-preview-cta"
          href="#experiencias"
          onClick={() => onExplore(selected)}
        >
          <span>
            <strong>{businessOffers[selected].benefit}</strong>Explore a
            demonstração completa
          </span>
          <ArrowUpRight size={20} />
        </a>
      </div>
      <div className="sales-product-caption">
        <span>Um exemplo do que podemos construir para a sua empresa.</span>
        <span>Dados e situações demonstrativos.</span>
      </div>
      <div className="sales-product-side-note">
        <span>
          <CheckCheck size={18} />
        </span>
        <div>
          <strong>Seu negócio é o ponto de partida.</strong>
          <small>A solução acompanha a sua operação.</small>
        </div>
        <ArrowRight size={17} />
      </div>
    </div>
  );
}
