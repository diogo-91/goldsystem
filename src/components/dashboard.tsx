"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Plus,
  Search,
  Settings2,
  Users,
  Workflow,
  X,
  ChartNoAxesCombined,
} from "lucide-react";
import {
  clients,
  initialOrders,
  products,
  statuses,
  type Order,
  type OrderStatus,
} from "@/lib/demo-data";
import { brl } from "@/lib/simulation";

const modules = [
  { name: "Visão geral", icon: LayoutDashboard },
  { name: "Pedidos", icon: ClipboardList },
  { name: "Vendas", icon: ChartNoAxesCombined },
  { name: "Estoque", icon: Boxes },
  { name: "Clientes", icon: Users },
  { name: "Financeiro", icon: CircleDollarSign },
  { name: "Relatórios", icon: Settings2 },
  { name: "Automações", icon: Workflow },
];

function OrderForm({
  onAdd,
  onClose,
}: {
  onAdd: (client: string, product: string, amount: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [product, setProduct] = useState(products[0].name);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);
  const selected = products.find((p) => p.name === product)!;
  return (
    <dialog
      ref={dialog}
      className="order-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="order-form-title"
    >
      <div className="dialog-top">
        <span className="eyebrow">AMBIENTE DEMONSTRATIVO</span>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Fechar novo pedido"
        >
          <X size={20} />
        </button>
      </div>
      <h3 id="order-form-title">
        Um novo pedido.
        <br />
        Tudo conectado.
      </h3>
      <p>
        Experimente cadastrar um pedido fictício e acompanhe os indicadores.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          onAdd(String(data.get("client")), product, selected.price * quantity);
          onClose();
        }}
      >
        <label>
          Cliente demonstrativo
          <select name="client">
            {clients.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          Produto
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            {products.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
          </select>
        </label>
        <label>
          Quantidade
          <input
            type="number"
            required
            min="1"
            max="1000"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>
        <div className="order-total">
          <span>Total demonstrativo</span>
          <strong>{brl(selected.price * quantity)}</strong>
        </div>
        <button className="button button-blue" type="submit">
          Criar pedido demonstrativo <Plus size={16} />
        </button>
      </form>
    </dialog>
  );
}

export default function Dashboard({
  initialModule = "Visão geral",
}: {
  initialModule?: string;
}) {
  const [module, setModule] = useState(initialModule);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos os status");
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState("");
  const [stock, setStock] = useState(products);
  const [flows, setFlows] = useState([true, true, false]);
  const total = orders.reduce((sum, o) => sum + o.amount, 0);
  const completed = orders.filter((o) => o.status === "Concluído");
  const received = completed.reduce((sum, o) => sum + o.amount, 0);
  const matching = orders.filter(
    (o) =>
      `${o.id} ${o.client} ${o.product}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")) &&
      (filter === "Todos os status" || o.status === filter),
  );
  const breakdown = clients.map((client) => ({
    ...client,
    value: orders
      .filter((o) => o.client === client.name)
      .reduce((sum, o) => sum + o.amount, 0),
  }));
  const max = Math.max(...breakdown.map((c) => c.value), 1);

  function downloadReport() {
    const cell = (s: string) =>
      `"${(/^[=+@-]/.test(s) ? "'" : "") + s.replaceAll('"', '""')}"`;
    const csv =
      "\uFEFFPedido,Cliente,Produto,Valor,Status\n" +
      orders
        .map((o) =>
          [o.id, o.client, o.product, o.amount.toFixed(2), o.status]
            .map(cell)
            .join(","),
        )
        .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "goldsystem-relatorio-demonstrativo.csv";
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Relatório demonstrativo exportado.");
  }

  return (
    <div className="dashboard">
      <div className="dash-top">
        <div className="dash-workspace">
          <span className="workspace-logo">
            <span />
            <span />
            <span />
            <span />
          </span>
          <strong>Horizonte</strong>
          <span className="workspace-divider">/</span>
          <span>Workspace</span>
          <ChevronDown size={13} />
        </div>
        <span className="demo-badge">
          <i /> DADOS FICTÍCIOS
        </span>
        <span className="avatar">GS</span>
      </div>
      <div className="dash-layout">
        <aside
          className="dash-sidebar"
          aria-label="Módulos do sistema demonstrativo"
        >
          <span className="sidebar-caption">WORKSPACE</span>
          <nav>
            {modules.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => {
                  setModule(name);
                  setNotice("");
                }}
                className={module === name ? "active" : ""}
                aria-pressed={module === name}
              >
                <Icon size={16} />
                <span>{name}</span>
                {name === "Pedidos" && <small>{orders.length}</small>}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="live-dot" /> Todos os módulos conectados
            <span>Explore. Este espaço é seu.</span>
          </div>
        </aside>
        <div className="dash-main">
          <div className="dash-heading">
            <div>
              <span className="dash-breadcrumb">
                Workspace <span>/</span> {module}
              </span>
              <h4>
                {module === "Visão geral" ? "Tudo em seu lugar." : module}
              </h4>
              <p>
                {module === "Visão geral"
                  ? "Uma visão clara de toda a sua operação."
                  : "Uma demonstração de como seus dados se conectam."}
              </p>
            </div>
            <button className="dash-primary" onClick={() => setAdding(true)}>
              <Plus size={15} /> Novo pedido
            </button>
          </div>
          <div className="dash-notice" aria-live="polite">
            {notice}
          </div>
          <div className="dash-metrics">
            <div>
              <span>
                Valor dos pedidos <ArrowUpRight size={14} />
              </span>
              <strong data-testid="order-total">{brl(total)}</strong>
              <small>{orders.length} pedidos demonstrativos</small>
            </div>
            <div>
              <span>
                Em andamento <ClipboardList size={14} />
              </span>
              <strong>
                {orders.length - completed.length}
                <small> pedidos</small>
              </strong>
              <small>Recebidos e em produção</small>
            </div>
            <div>
              <span>
                Concluídos <Check size={14} />
              </span>
              <strong>
                {completed.length}
                <small> pedidos</small>
              </strong>
              <small>{brl(received)} em valor simulado</small>
            </div>
          </div>
          {(module === "Visão geral" ||
            module === "Vendas" ||
            module === "Relatórios") && (
            <div className="dash-chart-panel">
              <div className="panel-title">
                <div>
                  <h5>Pedidos por cliente</h5>
                  <span>
                    Valores derivados dos registros desta demonstração
                  </span>
                </div>
                <span className="chart-key">
                  <i /> Valor total
                </span>
              </div>
              <div
                className="bar-chart"
                role="img"
                aria-label={breakdown
                  .map((c) => `${c.name}: ${brl(c.value)}`)
                  .join(". ")}
              >
                {breakdown.map((c) => (
                  <div className="chart-column" key={c.name}>
                    <span className="chart-value">{brl(c.value)}</span>
                    <div className="chart-bar-track">
                      <div
                        style={{
                          height: `${Math.max(3, (c.value / max) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="chart-label">{c.name}</span>
                  </div>
                ))}
              </div>
              {module === "Relatórios" && (
                <button className="text-button" onClick={downloadReport}>
                  Exportar registros em CSV <ArrowDownToLine size={15} />
                </button>
              )}
            </div>
          )}
          {(module === "Visão geral" ||
            module === "Pedidos" ||
            module === "Vendas") && (
            <div className="dash-table-panel">
              <div className="panel-title">
                <h5>
                  {module === "Visão geral"
                    ? "Últimos pedidos"
                    : "Todos os pedidos"}
                </h5>
                <span>{matching.length} registros</span>
              </div>
              <div className="table-controls">
                <label className="table-search">
                  <Search size={15} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Buscar pedidos"
                    placeholder="Buscar pedido ou cliente..."
                  />
                </label>
                <label className="sr-only" htmlFor="order-status-filter">
                  Filtrar por status
                </label>
                <select
                  id="order-status-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>Todos os status</option>
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      <th>Cliente</th>
                      <th>Valor</th>
                      <th>Status · altere para testar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matching.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong>{order.id}</strong>
                          <small>{order.product}</small>
                        </td>
                        <td>{order.client}</td>
                        <td className="table-amount">{brl(order.amount)}</td>
                        <td>
                          <select
                            className={`status-select status-${statuses.indexOf(order.status)}`}
                            aria-label={`Status do pedido ${order.id}`}
                            value={order.status}
                            onChange={(e) => {
                              setOrders((prev) =>
                                prev.map((o) =>
                                  o.id === order.id
                                    ? {
                                        ...o,
                                        status: e.target.value as OrderStatus,
                                      }
                                    : o,
                                ),
                              );
                              setNotice(
                                `Pedido ${order.id}: ${e.target.value}. Indicadores atualizados.`,
                              );
                            }}
                          >
                            {statuses.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {matching.length === 0 && (
                <p className="empty-state">
                  Nenhum pedido encontrado. Experimente outra busca.
                </p>
              )}
            </div>
          )}
          {module === "Estoque" && (
            <div className="dash-table-panel">
              <div className="panel-title">
                <h5>Inventário demonstrativo</h5>
                <span>{stock.length} produtos</span>
              </div>
              <div className="stock-list">
                {stock.map((p) => (
                  <div key={p.name}>
                    <div>
                      <strong>{p.name}</strong>
                      <small>
                        Mínimo: {p.min} unidades · {brl(p.price)}/un.
                      </small>
                    </div>
                    <span
                      className={p.stock < p.min ? "stock-warning" : "stock-ok"}
                    >
                      {p.stock} un.
                    </span>
                    <button
                      className="dash-secondary"
                      onClick={() => {
                        setStock(
                          stock.map((s) =>
                            s.name === p.name
                              ? { ...s, stock: s.stock + 10 }
                              : s,
                          ),
                        );
                        setNotice(
                          `10 unidades adicionadas ao estoque fictício de ${p.name}.`,
                        );
                      }}
                    >
                      Repor +10
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {module === "Clientes" && (
            <div className="dash-table-panel">
              <div className="panel-title">
                <h5>Relacionamentos organizados</h5>
                <span>Empresas fictícias</span>
              </div>
              <div className="client-list">
                {clients.map((c) => (
                  <div key={c.name}>
                    <span className="client-avatar">{c.initials}</span>
                    <div>
                      <strong>{c.name}</strong>
                      <small>{c.segment}</small>
                    </div>
                    <span>
                      {orders.filter((o) => o.client === c.name).length} pedidos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {module === "Financeiro" && (
            <div className="dash-table-panel">
              <div className="panel-title">
                <h5>Recebimentos simulados</h5>
                <span>Concluído = recebido nesta simulação</span>
              </div>
              <div className="financial-summary">
                <span>
                  A receber<strong>{brl(total - received)}</strong>
                </span>
                <span>
                  Recebido<strong>{brl(received)}</strong>
                </span>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Referência</th>
                      <th>Cliente</th>
                      <th>Valor</th>
                      <th>Situação simulada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.client}</td>
                        <td>{brl(o.amount)}</td>
                        <td>
                          <span
                            className={
                              o.status === "Concluído"
                                ? "stock-ok"
                                : "stock-warning"
                            }
                          >
                            {o.status === "Concluído" ? "Recebido" : "Previsto"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {module === "Automações" && (
            <div className="dash-table-panel">
              <div className="panel-title">
                <h5>Regras da sua operação</h5>
                <span>Ativação apenas demonstrativa</span>
              </div>
              <div className="automation-rules">
                {[
                  "Notificar a equipe ao receber um pedido",
                  "Avisar quando o estoque estiver baixo",
                  "Preparar o resumo financeiro diário",
                ].map((text, i) => (
                  <div key={text}>
                    <Workflow size={18} />
                    <span>{text}</span>
                    <button
                      className={`toggle ${flows[i] ? "on" : ""}`}
                      role="switch"
                      aria-checked={flows[i]}
                      aria-label={text}
                      onClick={() =>
                        setFlows(
                          flows.map((f, index) => (index === i ? !f : f)),
                        )
                      }
                    >
                      <span />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="dash-bottom">
            <span>
              <i /> Simulação local. Nenhum dado real é utilizado.
            </span>
            <span>Construído para se adaptar.</span>
          </div>
        </div>
      </div>
      {adding && (
        <OrderForm
          onClose={() => setAdding(false)}
          onAdd={(client, product, amount) => {
            const id = `GS-${1049 + orders.length - initialOrders.length}`;
            setOrders((prev) => [
              { id, client, product, amount, status: "Recebido" },
              ...prev,
            ]);
            setNotice(`Pedido ${id} criado. Indicadores atualizados.`);
            setModule("Pedidos");
            setQuery("");
            setFilter("Todos os status");
          }}
        />
      )}
    </div>
  );
}
