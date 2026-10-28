"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Contact } from "./contact";
import { Laboratory } from "./laboratory";
import { Simulator } from "./simulator";
import { Studies } from "./studies";
import { Comparison } from "./comparison";
import { MotionSystem } from "./motion-system";
import type { BriefingContext } from "@/lib/briefing";

const Sculpture = dynamic(() => import("./sculpture"));

const services = [
  {
    name: "Software\nsob medida.",
    text: "Sua operação, traduzida em um sistema. Plataformas web, gestão empresarial e ferramentas que trabalham do seu jeito.",
    tags: "SISTEMAS DE GESTÃO / PLATAFORMAS WEB",
    className: "service-software",
    art: "software",
  },
  {
    name: "O trabalho flui.\nAutomaticamente.",
    text: "Menos etapas manuais. Mais espaço para pensar. Conectamos tarefas, dados e decisões em fluxos inteligentes.",
    tags: "AUTOMAÇÃO / PROCESSOS / DADOS",
    className: "service-automation",
    art: "automation",
  },
  {
    name: "Inteligência\nque faz sentido.",
    text: "IA com contexto de negócio. Assistentes, interpretação de informações e apoio para decisões melhores.",
    tags: "INTELIGÊNCIA ARTIFICIAL / ASSISTENTES",
    className: "service-ai",
    art: "ai",
  },
  {
    name: "Tudo conectado.\nNada perdido.",
    text: "Seus sistemas deixam de trabalhar sozinhos. Integrações e APIs para uma visão única da operação.",
    tags: "INTEGRAÇÕES / APIs / ECOSSISTEMAS",
    className: "service-integrations",
    art: "integrations",
  },
];
const process = [
  [
    "Antes do código,\no seu negócio.",
    "Entendimento",
    "Ouvimos, investigamos e entendemos como sua operação funciona. O ponto de partida é o seu desafio.",
  ],
  [
    "Clareza para\nconstruir melhor.",
    "Planejamento",
    "Transformamos necessidades em um plano: escopo, prioridades, integrações e caminho de implementação.",
  ],
  [
    "Ideias ganham\nforma e função.",
    "Desenvolvimento",
    "Design e engenharia trabalham juntos, com validações ao longo do processo e atenção a cada interação.",
  ],
  [
    "Seu próximo passo.\nE o seguinte.",
    "Evolução",
    "Acompanhamos a implantação e planejamos os próximos movimentos conforme o seu negócio evolui.",
  ],
];
const faqs = [
  [
    "Um sistema sob medida faz sentido para minha empresa?",
    "Se seus processos dependem de planilhas desconectadas, retrabalho ou adaptações constantes, vale investigar. O diagnóstico ajuda a entender se uma solução própria, uma integração ou uma automação é o melhor caminho.",
  ],
  [
    "Vocês podem integrar os sistemas que já utilizamos?",
    "Sim, quando as plataformas oferecem APIs ou outros meios de integração compatíveis. Primeiro avaliamos acesso, documentação, segurança e as regras do seu negócio para definir o que é viável.",
  ],
  [
    "Quanto custa e quanto tempo leva um projeto?",
    "Escopo, complexidade e integrações definem o investimento e o prazo. A proposta é construída após entender o desafio, com entregas e prioridades claras. Não existe um valor único para necessidades diferentes.",
  ],
  [
    "As demonstrações usam dados reais ou uma IA conectada?",
    "Não. Todos os dados do laboratório são fictícios. Os fluxos de automação e exemplos de IA são simulações predefinidas, sem chamadas a APIs externas. Eles mostram possibilidades e não executam ações reais.",
  ],
  [
    "O que acontece quando gero meu briefing?",
    "Sem integração de envio configurada, o briefing é montado somente no seu navegador e pode ser copiado ou baixado. Não exibimos confirmação de envio sem resposta positiva do backend. Os dados do formulário não são salvos em armazenamento local.",
  ],
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#inicio"
      aria-label="GoldSystem — início"
      className={`brand ${inverse ? "brand-inverse" : ""}`}
    >
      <span>&lt;</span>goldsystem<span>&gt;</span>
    </a>
  );
}

function Transformation() {
  return (
    <section className="transformation section-pad" id="transformacao">
      <div className="section-kicker">
        <span>01 / DA COMPLEXIDADE À POSSIBILIDADE</span>
        <span className="small-note">
          <i /> UMA NOVA LÓGICA PARA SUA OPERAÇÃO
        </span>
      </div>
      <div className="transformation-layout">
        <div className="transformation-copy">
          <h2 data-reveal>
            Sua empresa
            <br />
            evoluiu.
            <br />
            <span>
              Seus processos
              <br />
              acompanharam?
            </span>
          </h2>
          <p>
            Pedidos em um lugar. Estoque em outro.
            <br />E a sua equipe conectando tudo à mão.
          </p>
          <span className="transformation-hint">
            A EVOLUÇÃO COMEÇA QUANDO TUDO SE CONECTA <ArrowDown size={14} />
          </span>
        </div>
        <div
          className="network-scene"
          aria-label="Pedidos, estoque, financeiro e clientes convergem para um sistema integrado"
          role="img"
        >
          <div className="network-grid" />
          <svg
            viewBox="0 0 600 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              "M110 90 H300 V250",
              "M490 100 H300 V250",
              "M100 385 H300 V250",
              "M500 380 H300 V250",
            ].map((d) => (
              <path className="network-line" key={d} d={d} />
            ))}
          </svg>
          <div className="network-core">
            <span>&lt;g&gt;</span>
            <small>TUDO CONECTADO</small>
          </div>
          <div className="chaos-piece piece-orders">
            <small>PEDIDOS</small>
            <strong>
              #1048 <span>Recebido</span>
            </strong>
            <div />
            <div />
          </div>
          <div className="chaos-piece piece-stock">
            <small>ESTOQUE</small>
            <strong>
              Produto sincronizado <Check size={13} />
            </strong>
            <span className="fragment-bar" />
          </div>
          <div className="chaos-piece piece-finance">
            <small>FINANCEIRO</small>
            <strong>Informação organizada</strong>
            <span>→ Sem duplicidade</span>
          </div>
          <div className="chaos-piece piece-clients">
            <small>CLIENTES</small>
            <div className="fragment-people">
              <span>AA</span>
              <span>CN</span>
              <span>EH</span>
              <small>Uma visão completa</small>
            </div>
          </div>
          <span className="network-caption">
            UM SISTEMA. A SUA OPERAÇÃO INTEIRA.
          </span>
        </div>
      </div>
      <div className="transformation-result">
        <h3>
          Menos complexidade.
          <br />
          <span>Mais inteligência. Tudo conectado.</span>
        </h3>
        <a
          href="#experiencias"
          className="round-link"
          aria-label="Experimentar o sistema integrado"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}

function ServiceArt({ type }: { type: string }) {
  if (type === "software")
    return (
      <div className="software-art" aria-hidden="true">
        <span className="art-layer layer-1" />
        <span className="art-layer layer-2" />
        <span className="art-layer layer-3">
          <i />
          <i />
          <i />
          <b />
        </span>
      </div>
    );
  if (type === "automation")
    return (
      <div className="automation-art" aria-hidden="true">
        <span>entrada</span>
        <i />
        <span className="art-step">
          processo
          <Check size={13} />
        </span>
        <i />
        <span>
          próximo passo <ArrowRight size={13} />
        </span>
      </div>
    );
  if (type === "ai")
    return (
      <div className="intelligence-art" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
        <i />
      </div>
    );
  return (
    <div className="integrations-art" aria-hidden="true">
      <svg viewBox="0 0 400 170">
        <path d="M20 20H120Q200 20 200 85M20 150H120Q200 150 200 85M380 20H280Q200 20 200 85M380 150H280Q200 150 200 85" />
      </svg>
      <span>&lt; / &gt;</span>
      <small className="api-1">API</small>
      <small className="api-2">ERP</small>
      <small className="api-3">CRM</small>
      <small className="api-4">WEB</small>
    </div>
  );
}

export function GoldSystem({ contactEnabled }: { contactEnabled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [context, setContext] = useState<BriefingContext>({});
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            document.getElementById("menu-toggle")?.focus();
          }
        }}
      >
        <div className="header-inner">
          <Brand />
          <nav
            id="main-navigation"
            aria-label="Navegação principal"
            className={menuOpen ? "is-open" : ""}
          >
            {[
              ["Soluções", "solucoes"],
              ["Experiências", "experiencias"],
              ["Nossa abordagem", "abordagem"],
            ].map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a
              className="mobile-contact"
              href="#contato"
              onClick={() => setMenuOpen(false)}
            >
              Vamos conversar <ArrowUpRight size={16} />
            </a>
          </nav>
          <a href="#contato" className="header-contact">
            Vamos conversar <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            className="menu-toggle icon-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
      <main id="conteudo">
        <section className="hero section-pad" id="inicio">
          <div className="hero-eyebrow">
            <span className="eyebrow">
              <i /> ENGENHARIA DIGITAL. POSSIBILIDADES REAIS.
            </span>
            <span className="hero-edition">
              FEITO PARA O SEU PRÓXIMO PASSO. <ArrowUpRight size={11} />
            </span>
          </div>
          <div className="hero-main">
            <div className="hero-type">
              <h1>
                <span className="hero-line">
                  <span>O futuro da</span>
                </span>
                <span className="hero-line">
                  <span>sua empresa</span>
                </span>
                <span className="hero-line">
                  <span>não vem pronto.</span>
                </span>
                <span className="sr-only"> Ele é desenvolvido.</span>
              </h1>
              <div className="hero-description">
                <span className="hero-caption-line" />
                <p>
                  Criamos sistemas personalizados, automações e soluções com
                  Inteligência Artificial para transformar a forma como sua
                  empresa trabalha.
                </p>
              </div>
            </div>
            <div className="hero-object">
              <Sculpture />
            </div>
          </div>
          <div className="hero-developed" aria-hidden="true">
            Ele é <span>desenvolvido.</span>
            <span className="developed-dot">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M24 3v42M3 24h42M9 9l30 30M9 39 39 9" />
              </svg>
            </span>
          </div>
          <div className="hero-bottom">
            <div className="hero-actions">
              <a
                href="#contato"
                className="button button-blue magnetic"
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--mx",
                    `${(e.clientX - r.left - r.width / 2) * 0.035}px`,
                  );
                  e.currentTarget.style.setProperty(
                    "--my",
                    `${(e.clientY - r.top - r.height / 2) * 0.07}px`,
                  );
                }}
                onPointerLeave={(e) => {
                  e.currentTarget.style.setProperty("--mx", "0px");
                  e.currentTarget.style.setProperty("--my", "0px");
                }}
              >
                Vamos construir seu sistema <ArrowUpRight size={19} />
              </a>
              <a href="#transformacao" className="explore-link">
                Explore a experiência{" "}
                <span>
                  <ArrowDown size={17} />
                </span>
              </a>
            </div>
            <p>
              Transformamos complexidade
              <br />
              <strong>em possibilidades.</strong>
            </p>
            <span className="hero-scroll-mark">
              ROLE PARA DESCOBRIR <ArrowDown size={13} />
            </span>
          </div>
          <div className="hero-footline">
            <span>SOFTWARE SOB MEDIDA</span>
            <span>AUTOMAÇÃO INTELIGENTE</span>
            <span>INTELIGÊNCIA ARTIFICIAL</span>
            <span>SISTEMAS CONECTADOS</span>
          </div>
        </section>
        <Transformation />
        <Laboratory
          onConvert={(experience) =>
            setContext((prev) => ({ ...prev, experience }))
          }
        />
        <Simulator
          onConvert={(simulation) =>
            setContext((prev) => ({ ...prev, simulation }))
          }
        />
        <section className="services section-pad" id="solucoes">
          <div className="section-kicker">
            <span>04 / CONSTRUÍDO PARA IR ALÉM</span>
            <span>DA IDEIA À OPERAÇÃO</span>
          </div>
          <div className="services-heading" data-reveal>
            <h2>
              Toda grande operação
              <br />
              merece uma tecnologia
              <br />
              <span className="text-muted">à altura.</span>
            </h2>
            <p>
              Quatro frentes. Infinitas combinações.
              <br />
              Uma solução com a sua lógica.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <article
                className={`service ${s.className}`}
                key={s.name}
                data-reveal
              >
                <div className="service-top">
                  <span>0{i + 1}</span>
                  <ArrowUpRight size={20} />
                </div>
                <h3>
                  {s.name.split("\n").map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h3>
                <p>{s.text}</p>
                <ServiceArt type={s.art} />
                <span className="service-tags">{s.tags}</span>
              </article>
            ))}
          </div>
        </section>
        <Studies />
        <Comparison />
        <section className="process section-pad" id="processo">
          <div className="section-kicker">
            <span>07 / UM CAMINHO CONSTRUÍDO JUNTO</span>
            <span>DO PRIMEIRO PORQUÊ AO PRÓXIMO PASSO</span>
          </div>
          <div className="section-heading" data-reveal>
            <h2>
              Grandes sistemas começam
              <br />
              <span className="text-muted">com boas perguntas.</span>
            </h2>
            <p>
              Um processo claro, próximo e orientado ao que realmente importa
              para o seu negócio.
            </p>
          </div>
          <div className="process-track">
            <span className="process-track-fill" />
          </div>
          <div className="process-steps">
            {process.map(([title, name, text], i) => (
              <article key={name} data-reveal>
                <div>
                  <span>0{i + 1}</span>
                  <small>{name.toUpperCase()}</small>
                </div>
                <h3>
                  {title.split("\n").map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="faq section-pad" id="perguntas">
          <div>
            <span className="eyebrow">ANTES DO PRÓXIMO PASSO</span>
            <h2>
              Boas perguntas.
              <br />
              <span className="text-muted">Respostas claras.</span>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={19} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="finale section-pad">
          <div className="finale-top">
            <Brand inverse />
            <span className="small-note">
              A COMPLEXIDADE ENCONTROU SUA FORMA.
            </span>
          </div>
          <div className="finale-sculpture">
            <Sculpture finale />
          </div>
          <div className="finale-copy" data-reveal>
            <span className="eyebrow">O FUTURO COMEÇA COM UMA DECISÃO.</span>
            <h2>
              Sua próxima
              <br />
              grande ideia merece
              <br />
              <span>se tornar realidade.</span>
            </h2>
            <p>
              Conte o desafio que sua empresa enfrenta.
              <br />
              Vamos pensar juntos em uma solução construída para o seu negócio.
            </p>
            <a href="#contato" className="button button-white magnetic">
              Vamos desenvolver seu projeto <ArrowUpRight size={18} />
            </a>
          </div>
          <span className="finale-bottom">
            DA COMPLEXIDADE À POSSIBILIDADE. DA IDEIA AO SISTEMA.
          </span>
        </section>
        <Contact
          enabled={contactEnabled}
          context={context}
          onClear={() => setContext({})}
        />
      </main>
      <footer className="site-footer section-pad">
        <div className="footer-top">
          <Brand />
          <p>
            Engenharia para o que
            <br />
            ainda pode ser.
          </p>
          <a href="#inicio" className="text-link">
            Voltar ao início <ArrowUpRight size={16} />
          </a>
        </div>
        <details className="privacy" id="privacidade">
          <summary>
            Privacidade e seus dados <ChevronDown size={14} />
          </summary>
          <p>
            Este site não usa ferramentas de rastreamento nem cookies de
            marketing. Dados das demonstrações são fictícios e ficam na sessão
            da página. O formulário mantém o que você digita somente na memória
            do navegador. Ao copiar ou baixar o briefing, você decide onde
            compartilhá-lo. Se o envio estiver configurado, os dados informados
            e o contexto selecionado serão encaminhados ao backend para análise
            do projeto, mediante seu consentimento. A política de retenção e o
            canal para exercer seus direitos devem ser definidos pela GoldSystem
            antes de ativar o envio público.
          </p>
        </details>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GoldSystem.</span>
          <span>Desenvolvido com propósito.</span>
          <span>SOFTWARE. AUTOMAÇÃO. POSSIBILIDADES.</span>
        </div>
      </footer>
      <MotionSystem />
    </>
  );
}
