"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Box,
  Check,
  ChevronDown,
  ClipboardList,
  Headset,
  Layers3,
  Play,
  Puzzle,
  Quote,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { ReferenceFooter, ReferenceHeader } from "./reference-shell";
import { SiteDialog } from "./site-dialog";
import { Contact } from "./contact";
import { Laboratory } from "./laboratory";
import { Comparison } from "./comparison";
import { Simulator } from "./simulator";
import { MotionSystem } from "./motion-system";
import { commercial, whatsappLink } from "@/config/commercial";
import type { BriefingContext } from "@/lib/briefing";

const solutions = [
  {
    title: "Gestão Comercial",
    description: "Pedidos, orçamentos, CRM e atendimento.",
    icon: ClipboardList,
    tile: 0,
    module: "Pedidos",
    tab: 0,
  },
  {
    title: "Controle de Estoque",
    description: "Entradas, saídas, alertas e inventário.",
    icon: Box,
    tile: 1,
    module: "Estoque",
    tab: 0,
  },
  {
    title: "Financeiro",
    description: "Contas a pagar e receber, fluxo de caixa e relatórios.",
    icon: BarChart3,
    tile: 2,
    module: "Financeiro",
    tab: 0,
  },
  {
    title: "Automações com IA",
    description: "Elimine tarefas repetitivas e ganhe tempo.",
    icon: Sparkles,
    tile: 3,
    module: "Visão geral",
    tab: 2,
  },
];
const projects = [
  {
    name: "Delicius",
    description: "Sistema de encomendas e produção.",
    tags: ["Encomendas", "Produção", "Vendas"],
    tile: 0,
    detail:
      "Gestão de encomendas, produção e vendas em uma operação organizada. A solução conecta os pedidos ao planejamento de produção e ao acompanhamento das entregas.",
    experience: "Sistema de gestão",
  },
  {
    name: "Material de Construção",
    description: "Controle de produtos via NF-e com importação de itens.",
    tags: ["Estoque", "Fiscal", "Relatórios"],
    tile: 1,
    detail:
      "Gestão de produtos e estoque com importação de itens por NF-e, organização de informações fiscais e relatórios para acompanhar a operação.",
    experience: "Sistema de gestão",
  },
  {
    name: "SREB",
    description: "Site institucional e presença digital.",
    tags: ["Site", "SEO", "Performance"],
    tile: 2,
    detail:
      "Experiência web institucional para apresentar a empresa, organizar seus conteúdos e fortalecer sua presença digital.",
    experience: "Sistemas conectados",
  },
];
const questions = [
  [
    "O sistema é realmente personalizado?",
    "Sim. As funcionalidades, regras e integrações são planejadas a partir da operação da sua empresa e do escopo definido na proposta.",
  ],
  [
    "Qual o prazo de desenvolvimento?",
    "O prazo depende das funcionalidades, integrações e complexidade do projeto. Depois de entender seu desafio, apresentamos um planejamento com prioridades e entregas.",
  ],
  [
    "Preciso de hospedagem ou instalação?",
    "A estrutura necessária é definida para cada projeto. Aplicações web podem ser acessadas pelo navegador; infraestrutura, acesso e implantação são alinhados na proposta.",
  ],
  [
    "Vocês oferecem suporte?",
    "A implantação e os próximos passos da solução são planejados com você. O escopo de suporte e evolução é definido na contratação, conforme as necessidades do projeto.",
  ],
  [
    "É possível integrar com outros sistemas?",
    "Sim, conforme os recursos, APIs e permissões das plataformas envolvidas. Avaliamos a viabilidade e as regras de integração antes de propor a solução.",
  ],
];

export function GoldSystem({ contactEnabled }: { contactEnabled: boolean }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [demoModule, setDemoModule] = useState("Visão geral");
  const [context, setContext] = useState<BriefingContext>({});
  const [projectIndex, setProjectIndex] = useState<number | null>(null);
  const [projectCatalogOpen, setProjectCatalogOpen] = useState(false);
  const [projectOffset, setProjectOffset] = useState(0);
  const [clientOffset, setClientOffset] = useState(0);
  const openContact = (experience?: string) => {
    setDemoOpen(false);
    setProjectIndex(null);
    setProjectCatalogOpen(false);
    if (experience) setContext((previous) => ({ ...previous, experience }));
    setContactOpen(true);
  };
  const openDemo = (nextTab = 0, module = "Visão geral") => {
    setDemoModule(module);
    setTab(nextTab);
    setDemoOpen(true);
  };
  useEffect(() => {
    const syncHash = () => {
      if (location.hash === "#contato") setContactOpen(true);
      if (location.hash === "#experiencias") setDemoOpen(true);
    };
    const timer = setTimeout(syncHash, 0);
    window.addEventListener("hashchange", syncHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);
  const currentProject = projectIndex === null ? null : projects[projectIndex];
  return (
    <div className="reference-site">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <ReferenceHeader />
      <main id="conteudo">
        <section className="ref-hero" id="inicio">
          <div className="ref-container ref-hero-inner">
            <div className="ref-hero-copy">
              <span className="ref-eyebrow light">
                SISTEMAS · AUTOMAÇÕES · INTELIGÊNCIA ARTIFICIAL
              </span>
              <h1>
                Tecnologia
                <br />
                que transforma
                <br />
                negócios <span>reais.</span>
              </h1>
              <p>
                Desenvolvemos sistemas personalizados e automações com
                Inteligência Artificial para empresas que querem mais
                eficiência, controle e crescimento.
              </p>
              <div className="ref-hero-actions">
                <button
                  className="ref-button cyan"
                  onClick={() => openContact("Sistema de gestão")}
                >
                  Quero um sistema personalizado <ArrowRight size={17} />
                </button>
                <button
                  className="ref-button outline play-button"
                  onClick={() => openDemo()}
                >
                  <span>
                    <Play size={14} fill="currentColor" />
                  </span>
                  Ver como funciona
                </button>
              </div>
              <div className="ref-social-proof">
                <div aria-hidden="true">
                  {["D", "S", "G", "M"].map((letter) => (
                    <span key={letter}>{letter}</span>
                  ))}
                </div>
                <p>
                  <strong>+30 empresas</strong>
                  <br />
                  já confiam na GoldSystem
                </p>
              </div>
            </div>
            <div className="ref-hero-overlays">
              <div className="ref-assistant">
                <span>
                  <Sparkles size={18} />
                  Assistente com IA
                </span>
                <button onClick={() => openDemo(2)}>
                  <Sparkles size={12} />
                  Analisar informações do negócio
                </button>
                <button onClick={() => openDemo(1)}>
                  <Workflow size={12} />
                  Automatizar um processo
                </button>
                <button onClick={() => openDemo(0)}>
                  <ClipboardList size={12} />
                  Organizar pedidos e gestão
                </button>
              </div>
              <div className="ref-productivity">
                <strong>+32%</strong>
                <span>mais produtividade</span>
                <div aria-hidden="true">
                  {[18, 28, 23, 37, 42, 38, 57, 74, 91].map((height, index) => (
                    <i key={index} style={{ height: height + "%" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="ref-hero-image-note">
            Visual ilustrativo de sistema.
          </span>
        </section>
        <section
          className="ref-clients"
          aria-label="Empresas que confiam na GoldSystem"
        >
          <div className="ref-container">
            <div className="ref-client-list">
              {commercial.clients.map((_, index) => {
                const name =
                  commercial.clients[
                    (index + clientOffset) % commercial.clients.length
                  ];
                const Icon = [BadgeCheck, Workflow, Layers3, Box][
                  (index + clientOffset) % commercial.clients.length
                ];
                return (
                  <span key={name}>
                    <Icon size={28} />
                    <strong>{name}</strong>
                  </span>
                );
              })}
            </div>
            <div className="ref-clients-more">
              <span>
                <strong>Empresas de</strong>
                <br />
                diversos setores.
              </span>
              <button
                aria-label="Empresas anteriores"
                onClick={() =>
                  setClientOffset(
                    (value) =>
                      (value + commercial.clients.length - 1) %
                      commercial.clients.length,
                  )
                }
              >
                <ArrowLeft size={14} />
              </button>
              <button
                aria-label="Próximas empresas"
                onClick={() =>
                  setClientOffset(
                    (value) => (value + 1) % commercial.clients.length,
                  )
                }
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>
        <section className="ref-solutions" id="solucoes">
          <div className="ref-container ref-solutions-grid">
            <div className="ref-section-intro" data-reveal>
              <span className="ref-eyebrow">SOLUÇÕES SOB MEDIDA</span>
              <h2>
                Sistemas completos para cada etapa <span>do seu negócio.</span>
              </h2>
              <p>
                Do atendimento ao financeiro, tudo integrado em um único
                sistema, desenvolvido para a sua realidade.
              </p>
              <button className="ref-button dark" onClick={() => openDemo()}>
                Conheça todas as soluções <ArrowRight size={16} />
              </button>
            </div>
            {solutions.map((solution) => (
              <button
                className="ref-solution-card"
                key={solution.title}
                onClick={() => openDemo(solution.tab, solution.module)}
                aria-label={`Conhecer ${solution.title}`}
              >
                <div
                  className={`ref-atlas services tile-${solution.tile}`}
                  role="img"
                  aria-label={`Imagem ilustrativa de ${solution.title}`}
                />
                <div>
                  <span className="ref-card-icon">
                    <solution.icon size={19} />
                  </span>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <ArrowRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </section>
        <Simulator
          onConvert={(simulation) => {
            setContext((previous) => ({ ...previous, simulation }));
            openContact("Automação de processos");
          }}
        />
        <section className="ref-projects" id="projetos">
          <div className="ref-container">
            <div className="ref-project-controls">
              <button
                aria-label="Projetos anteriores"
                onClick={() =>
                  setProjectOffset(
                    (value) => (value + projects.length - 1) % projects.length,
                  )
                }
              >
                <ArrowLeft size={17} />
              </button>
              <button
                aria-label="Próximos projetos"
                onClick={() =>
                  setProjectOffset((value) => (value + 1) % projects.length)
                }
              >
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="ref-projects-grid">
              <div className="ref-section-intro" data-reveal>
                <span className="ref-eyebrow">PROJETOS REAIS</span>
                <h2>
                  Soluções que geram <span>resultados de verdade.</span>
                </h2>
                <p>
                  Cada projeto é único, desenvolvido para a realidade e os
                  objetivos de cada cliente.
                </p>
                <button
                  className="ref-button dark"
                  onClick={() => {
                    setProjectIndex(null);
                    setProjectCatalogOpen(true);
                  }}
                >
                  Ver todos os projetos <ArrowRight size={16} />
                </button>
              </div>
              {projects.map((_, index) => {
                const projectId = (index + projectOffset) % projects.length;
                const project = projects[projectId];
                return (
                  <button
                    className="ref-project-card"
                    key={project.name}
                    onClick={() => setProjectIndex(projectId)}
                    aria-label={`Ver projeto ${project.name}`}
                  >
                    <div
                      className={`ref-atlas editorial tile-${project.tile}`}
                    />
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div>
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="ref-project-image-note">
              Imagens ilustrativas dos projetos.
            </p>
          </div>
        </section>
        <section className="ref-why" id="como-funciona">
          <div className="ref-container ref-why-grid">
            <div className="ref-section-intro" data-reveal>
              <span className="ref-eyebrow light">
                POR QUE ESCOLHER A GOLDSYSTEM
              </span>
              <h2>
                Mais que sistemas.
                <br />
                <span>Parceria para o seu crescimento.</span>
              </h2>
              <a
                className="ref-button outline"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com um especialista <ArrowRight size={16} />
              </a>
            </div>
            <div className="ref-benefits">
              {[
                {
                  title: "Atendimento consultivo",
                  text: "Entendemos o seu negócio antes de propor soluções.",
                  icon: Headset,
                },
                {
                  title: "Soluções personalizadas",
                  text: "Tecnologia construída para os processos da sua empresa.",
                  icon: Puzzle,
                },
                {
                  title: "Foco em resultados",
                  text: "Tecnologia que faz a diferença no dia a dia da operação.",
                  icon: BarChart3,
                },
                {
                  title: "Implantação acompanhada",
                  text: "Planejamento e proximidade em cada etapa do projeto.",
                  icon: ShieldCheck,
                },
              ].map(({ title, text, icon: Icon }) => (
                <div key={title}>
                  <span>
                    <Icon size={26} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ref-container ref-process-line">
            <span>COMO TRABALHAMOS</span>
            {["Entendemos", "Planejamos", "Desenvolvemos", "Implantamos"].map(
              (step, index) => (
                <span key={step}>
                  <i>0{index + 1}</i>
                  {step}
                  {index < 3 && <ArrowRight size={13} />}
                </span>
              ),
            )}
          </div>
        </section>
        <section className="ref-proof" id="sobre">
          <div className="ref-testimonial">
            <div>
              <Quote size={30} />
              <blockquote>“{commercial.testimonial.quote}”</blockquote>
              <div>
                <span>M</span>
                <div>
                  <strong>{commercial.testimonial.name}</strong>
                  <small>{commercial.testimonial.company}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="ref-stats">
            <div>
              {commercial.indicators.map((indicator) => (
                <div key={indicator.label}>
                  <strong>{indicator.value}</strong>
                  <span>{indicator.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="ref-faq">
          <div className="ref-container ref-faq-grid">
            <div className="ref-section-intro" data-reveal>
              <span className="ref-eyebrow">DÚVIDAS FREQUENTES</span>
              <h2>Tire suas dúvidas.</h2>
              <p>
                Reunimos as principais perguntas para ajudar você a entender
                como funciona o nosso trabalho.
              </p>
              <a
                className="ref-button dark"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com um especialista <ArrowRight size={15} />
              </a>
            </div>
            <div className="ref-faq-list">
              {questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={16} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <div className="ref-expert-card">
              <div className="ref-atlas editorial tile-3" aria-hidden="true" />
              <div>
                <h3>
                  Prefere conversar
                  <br />
                  com um especialista?
                </h3>
                <p>Tire suas dúvidas e receba uma proposta personalizada.</p>
                <a
                  className="ref-button cyan"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chamar no WhatsApp <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ReferenceFooter
        onOpenContact={() => openContact()}
        onExplore={(index) => openDemo(index)}
      />
      <SiteDialog
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Conheça as soluções na prática"
        id="demo"
        className="ref-demo-dialog"
      >
        <Laboratory
          tab={tab}
          setTab={setTab}
          initialModule={demoModule}
          onConvert={(experience) => openContact(experience)}
        />
        <Comparison />
      </SiteDialog>
      <SiteDialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title="Vamos conversar sobre seu projeto"
        id="briefing"
        className="ref-contact-dialog"
      >
        <Contact
          enabled={contactEnabled}
          context={context}
          onClear={() => setContext({})}
        />
      </SiteDialog>
      <SiteDialog
        open={currentProject !== null || projectCatalogOpen}
        onClose={() => {
          setProjectIndex(null);
          setProjectCatalogOpen(false);
        }}
        title={
          projectCatalogOpen
            ? "Projetos da GoldSystem"
            : currentProject?.name || "Conheça o projeto"
        }
        id="case"
        className="ref-case-dialog"
      >
        {projectCatalogOpen && (
          <div className="ref-project-catalog">
            {projects.map((project, index) => (
              <button
                type="button"
                className="ref-project-card"
                key={project.name}
                onClick={() => {
                  setProjectCatalogOpen(false);
                  setProjectIndex(index);
                }}
              >
                <div className={`ref-atlas editorial tile-${project.tile}`} />
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <span className="ref-catalog-link">
                    Conhecer projeto <ArrowRight size={15} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
        {currentProject && (
          <div className="ref-case-detail">
            <button
              className="ref-case-back"
              onClick={() => {
                setProjectIndex(null);
                setProjectCatalogOpen(true);
              }}
            >
              <ArrowLeft size={15} /> Todos os projetos
            </button>
            <div
              className={`ref-atlas editorial tile-${currentProject.tile}`}
            />
            <span className="ref-eyebrow">PROJETO GOLDSYSTEM</span>
            <h3>{currentProject.name}</h3>
            <p>{currentProject.detail}</p>
            <ul>
              {currentProject.tags.map((tag) => (
                <li key={tag}>
                  <Check size={16} />
                  {tag}
                </li>
              ))}
            </ul>
            <p className="ref-project-image-note">
              Imagem ilustrativa da aplicação.
            </p>
            <button
              className="ref-button cyan"
              onClick={() => openContact(currentProject.experience)}
            >
              Quero algo assim no meu negócio <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </SiteDialog>
      <MotionSystem />
    </div>
  );
}
