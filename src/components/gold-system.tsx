"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardList,
  Menu,
  MessageSquareText,
  Plug,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { Contact } from "./contact";
import { Laboratory } from "./laboratory";
import { Simulator } from "./simulator";
import { Studies } from "./studies";
import { Comparison } from "./comparison";
import { MotionSystem } from "./motion-system";
import { ProductPreview, businessOffers } from "./product-preview";
import type { BriefingContext } from "@/lib/briefing";

const questions = [
  [
    "Como saber qual solução minha empresa precisa?",
    "O ponto de partida é o problema que você quer resolver. Um sistema pode organizar a gestão, uma automação pode conectar etapas e a IA pode apoiar sua equipe com informações. Avaliamos o contexto para propor uma solução ou uma combinação dessas frentes.",
  ],
  [
    "A solução será desenvolvida para os meus processos?",
    "Sim. O trabalho começa pelo entendimento da sua operação. As funcionalidades, regras e integrações são planejadas a partir das necessidades do negócio e do escopo definido na proposta.",
  ],
  [
    "Posso integrar as ferramentas que já utilizo?",
    "Avaliamos as plataformas existentes e seus recursos de integração. APIs, permissões de acesso e regras do negócio determinam o que pode ser conectado com segurança.",
  ],
  [
    "Quanto custa e quanto tempo leva?",
    "Investimento e prazo dependem do escopo, da complexidade e das integrações. Após entender seu desafio, a proposta detalha o que será desenvolvido, as prioridades e o planejamento das entregas.",
  ],
  [
    "As demonstrações utilizam informações reais?",
    "Não. Os dados de gestão são fictícios. Os exemplos de automação e IA são simulações predefinidas, sem chamadas a serviços externos. Eles mostram possibilidades e não executam ações na sua empresa.",
  ],
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#inicio"
      aria-label="GoldSystem — início"
      className={`business-brand ${inverse ? "inverse" : ""}`}
    >
      <span>&lt;</span>goldsystem<span>&gt;</span>
    </a>
  );
}

function OfferIllustration({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="offer-illustration offer-system-art" aria-hidden="true">
        <span className="offer-art-brand">&lt;goldsystem&gt;</span>
        <div>
          <span>
            Pedidos <Check size={12} />
          </span>
          <span>
            Estoque <Check size={12} />
          </span>
          <span>
            Financeiro <Check size={12} />
          </span>
        </div>
        <small>UMA VISÃO DA SUA OPERAÇÃO</small>
      </div>
    );
  if (index === 1)
    return (
      <div className="offer-illustration offer-flow-art" aria-hidden="true">
        <small>O PROCESSO SEGUE EM FRENTE</small>
        <div>
          <span>Entrada</span>
          <ArrowRight size={16} />
          <span>Regras</span>
          <ArrowRight size={16} />
          <span>
            Ação <Check size={12} />
          </span>
        </div>
        <p>Informação conectada. Próximo passo preparado.</p>
      </div>
    );
  return (
    <div className="offer-illustration offer-ai-art" aria-hidden="true">
      <div>
        <MessageSquareText size={15} />
        <span>Uma informação chega.</span>
      </div>
      <div>
        <Sparkles size={15} />
        <span>Uma possibilidade é identificada.</span>
      </div>
      <small>CONTEXTO + INTELIGÊNCIA + REVISÃO HUMANA</small>
    </div>
  );
}

export function GoldSystem({ contactEnabled }: { contactEnabled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroOffer, setHeroOffer] = useState(0);
  const [labTab, setLabTab] = useState(0);
  const [context, setContext] = useState<BriefingContext>({});
  const selectOffer = (index: number) =>
    setContext((previous) => ({
      ...previous,
      experience: businessOffers[index].experience,
    }));
  const exploreOffer = (index: number) => {
    setLabTab(index);
    setHeroOffer(index);
  };
  return (
    <div className="business-site">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="business-utility">
        <div className="business-wrap">
          <span>Tecnologia sob medida para a sua operação.</span>
          <span>
            Sistemas <i /> Automações <i /> Inteligência Artificial
          </span>
        </div>
      </div>
      <header
        className="business-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            document.getElementById("menu-toggle")?.focus();
          }
        }}
      >
        <div className="business-wrap business-header-inner">
          <div className="business-brand-lockup">
            <Brand />
            <span>SISTEMAS. AUTOMAÇÃO. INTELIGÊNCIA.</span>
          </div>
          <nav
            id="main-navigation"
            aria-label="Navegação principal"
            className={menuOpen ? "is-open" : ""}
          >
            {[
              ["Soluções", "solucoes"],
              ["Experiências", "experiencias"],
              ["Como funciona", "processo"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a
              className="business-mobile-contact"
              href="#contato"
              onClick={() => setMenuOpen(false)}
            >
              Conversar sobre meu projeto <ArrowUpRight size={17} />
            </a>
          </nav>
          <a className="business-header-cta" href="#contato">
            Vamos conversar <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            className="icon-button business-menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
      <main id="conteudo">
        <section className="business-hero" id="inicio">
          <div className="business-wrap business-hero-grid">
            <div className="business-hero-copy">
              <span className="business-eyebrow">
                <span /> TECNOLOGIA QUE TRABALHA COM O SEU NEGÓCIO
              </span>
              <h1>
                Sistemas, automações e IA{" "}
                <span>feitos para a sua empresa.</span>
              </h1>
              <p>
                A GoldSystem desenvolve soluções para organizar sua gestão,
                conectar processos e apoiar sua equipe com inteligência. Da
                necessidade do seu negócio a uma ferramenta que faz sentido na
                operação.
              </p>
              <div className="business-hero-actions">
                <a
                  className="business-button primary"
                  href="#contato"
                  onClick={() => selectOffer(heroOffer)}
                >
                  Conversar sobre meu projeto <ArrowUpRight size={18} />
                </a>
                <a
                  className="business-hero-explore"
                  href="#experiencias"
                  onClick={() => exploreOffer(heroOffer)}
                >
                  Ver na prática{" "}
                  <span>
                    <ArrowDown size={17} />
                  </span>
                </a>
              </div>
              <div className="business-hero-assurance">
                <span>
                  <Check size={15} /> Soluções sob medida
                </span>
                <span>
                  <Check size={15} /> Processos conectados
                </span>
              </div>
            </div>
            <ProductPreview
              selected={heroOffer}
              onSelect={setHeroOffer}
              onExplore={exploreOffer}
            />
          </div>
          <div className="business-wrap business-benefit-strip">
            <div>
              <ClipboardList size={22} />
              <span>
                <strong>Organize sua gestão.</strong>Informações e processos no
                lugar certo.
              </span>
            </div>
            <div>
              <Workflow size={22} />
              <span>
                <strong>Agilize sua operação.</strong>Menos etapas manuais no
                dia a dia.
              </span>
            </div>
            <div>
              <Sparkles size={22} />
              <span>
                <strong>Apoie sua equipe.</strong>IA aplicada a desafios do
                negócio.
              </span>
            </div>
          </div>
        </section>
        <section className="business-problems business-wrap" id="desafios">
          <div className="business-section-heading" data-reveal>
            <div>
              <span className="business-eyebrow">
                O DESAFIO É DO SEU NEGÓCIO. A SOLUÇÃO TAMBÉM.
              </span>
              <h2>
                Quando a operação cresce,
                <br />
                <span>os processos precisam acompanhar.</span>
              </h2>
            </div>
            <p>
              Sua equipe conhece a rotina. A tecnologia deve ajudar a fazê-la
              funcionar melhor.
            </p>
          </div>
          <div className="business-problem-grid">
            {[
              [
                "Informações espalhadas?",
                "Centralize o que sua empresa precisa para acompanhar pedidos, clientes e resultados.",
                "Sistemas que organizam",
                ClipboardList,
              ],
              [
                "As mesmas tarefas, todos os dias?",
                "Conecte etapas e ferramentas para reduzir o trabalho repetitivo da sua equipe.",
                "Automações que agilizam",
                Workflow,
              ],
              [
                "Muitos dados, pouca clareza?",
                "Use IA para interpretar informações e preparar próximos passos com revisão humana.",
                "Inteligência que apoia",
                Sparkles,
              ],
            ].map(([title, text, label, Icon], index) => {
              const Symbol = Icon as typeof ClipboardList;
              return (
                <a
                  href="#solucoes"
                  onClick={() => setHeroOffer(index)}
                  key={String(title)}
                >
                  <span className="business-problem-number">0{index + 1}</span>
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                  <span className="business-problem-answer">
                    <Symbol size={16} />
                    {String(label)}
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              );
            })}
          </div>
        </section>
        <section className="business-solutions" id="solucoes">
          <div className="business-wrap">
            <div className="business-section-heading" data-reveal>
              <div>
                <span className="business-eyebrow">
                  O QUE A GOLDSYSTEM DESENVOLVE
                </span>
                <h2>
                  Três frentes de tecnologia.
                  <br />
                  <span>Uma solução para a sua operação.</span>
                </h2>
              </div>
              <p>
                Você traz o desafio. Nós planejamos a tecnologia para
                resolvê-lo.
              </p>
            </div>
            <div className="business-offers-grid">
              {businessOffers.map((offer, index) => (
                <article
                  key={offer.name}
                  className={`business-offer offer-${index}`}
                >
                  <div className="business-offer-top">
                    <span>
                      <offer.icon size={20} />
                    </span>
                    <small>0{index + 1}</small>
                  </div>
                  <h3>{offer.name}</h3>
                  <p className="business-offer-benefit">{offer.benefit}</p>
                  <p>{offer.description}</p>
                  <OfferIllustration index={index} />
                  <ul>
                    {offer.examples.map((example) => (
                      <li key={example}>
                        <Check size={14} />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="business-offer-cta"
                    href="#contato"
                    onClick={() => selectOffer(index)}
                  >
                    {offer.action}
                    <ArrowUpRight size={17} />
                  </a>
                  <a
                    className="business-offer-demo"
                    href="#experiencias"
                    onClick={() => exploreOffer(index)}
                  >
                    Ver demonstração <ArrowRight size={14} />
                  </a>
                </article>
              ))}
            </div>
            <div className="business-integration">
              <span className="business-integration-symbol">
                <Plug size={25} />
              </span>
              <div>
                <h3>
                  As ferramentas que você já usa também entram na conversa.
                </h3>
                <p>
                  Avaliamos integrações com seus sistemas e plataformas,
                  conforme os recursos e APIs disponíveis.
                </p>
              </div>
              <a
                href="#contato"
                onClick={() =>
                  setContext((previous) => ({
                    ...previous,
                    experience: "Sistemas conectados",
                  }))
                }
              >
                Quero conectar meus sistemas <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <Laboratory
          tab={labTab}
          setTab={setLabTab}
          onConvert={(experience) =>
            setContext((previous) => ({ ...previous, experience }))
          }
        />
        <section className="business-process" id="processo">
          <div className="business-wrap">
            <div className="business-section-heading" data-reveal>
              <div>
                <span className="business-eyebrow">
                  CLAREZA DO PRIMEIRO CONTATO À ENTREGA
                </span>
                <h2>
                  Você conhece seu negócio.
                  <br />
                  <span>Nós construímos a tecnologia com você.</span>
                </h2>
              </div>
              <p>
                Um processo definido para transformar a necessidade em uma
                solução utilizável.
              </p>
            </div>
            <div className="business-process-track">
              <span />
            </div>
            <div className="business-process-steps">
              {[
                [
                  "Entendemos seu desafio",
                  "Conhecemos a operação, os processos e o que precisa funcionar melhor.",
                ],
                [
                  "Planejamos a solução",
                  "Definimos funcionalidades, integrações, prioridades e escopo da proposta.",
                ],
                [
                  "Desenvolvemos e validamos",
                  "Construímos a solução e validamos seu funcionamento ao longo do projeto.",
                ],
                [
                  "Implantamos e evoluímos",
                  "Acompanhamos a implantação e planejamos os próximos passos da solução.",
                ],
              ].map(([title, text], index) => (
                <article key={title} data-reveal>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Studies />
        <Simulator
          onConvert={(simulation) =>
            setContext((previous) => ({ ...previous, simulation }))
          }
        />
        <Comparison />
        <section className="business-faq business-wrap" id="perguntas">
          <div>
            <span className="business-eyebrow">PARA DECIDIR COM CLAREZA</span>
            <h2>
              Antes de começar,
              <br />
              <span>vamos tirar suas dúvidas.</span>
            </h2>
            <p>
              Cada projeto começa com entendimento e uma proposta alinhada ao
              seu contexto.
            </p>
          </div>
          <div>
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={19} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="business-final">
          <div className="business-wrap">
            <div>
              <span className="business-eyebrow">
                O PRÓXIMO PASSO COMEÇA COM O SEU DESAFIO
              </span>
              <h2>
                O que pode funcionar melhor
                <br />
                na sua empresa?
              </h2>
              <p>
                Um sistema mais adequado. Um processo mais ágil.
                <br />
                Uma aplicação de IA com propósito. Vamos entender juntos.
              </p>
              <a className="business-button light" href="#contato">
                Vamos conversar sobre sua solução <ArrowUpRight size={19} />
              </a>
            </div>
            <div className="business-final-offers">
              {businessOffers.map((offer, index) => (
                <a
                  href="#contato"
                  key={offer.name}
                  onClick={() => selectOffer(index)}
                >
                  <span>
                    <offer.icon size={21} />
                  </span>
                  <div>
                    <strong>{offer.name}</strong>
                    <small>{offer.benefit}</small>
                  </div>
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <Contact
          enabled={contactEnabled}
          context={context}
          onClear={() => setContext({})}
        />
      </main>
      <footer className="business-footer">
        <div className="business-wrap">
          <div className="business-footer-top">
            <div>
              <Brand />
              <p>
                Sistemas, automações e Inteligência Artificial.
                <br />
                Tecnologia sob medida para a sua empresa.
              </p>
            </div>
            <div className="business-footer-links">
              <span>NOSSAS SOLUÇÕES</span>
              {businessOffers.map((offer, index) => (
                <a
                  key={offer.name}
                  href="#experiencias"
                  onClick={() => exploreOffer(index)}
                >
                  {offer.name}
                </a>
              ))}
            </div>
            <div className="business-footer-links">
              <span>GOLDSYSTEM</span>
              <a href="#processo">Como funciona</a>
              <a href="#experiencias">Experiências</a>
              <a href="#contato">Seu projeto</a>
            </div>
          </div>
          <details className="business-privacy" id="privacidade">
            <summary>
              Privacidade e seus dados <ChevronDown size={14} />
            </summary>
            <p>
              Este site não utiliza rastreamento ou cookies de marketing. As
              demonstrações usam dados fictícios mantidos na memória da página.
              Os campos do formulário ficam no seu navegador até uma ação de
              envio. Copiar ou baixar o briefing não encaminha os dados à
              GoldSystem. Quando uma integração estiver configurada, os dados
              informados e o contexto selecionado serão encaminhados ao backend
              mediante seu consentimento. A retenção dos dados e o canal para
              exercer seus direitos devem ser definidos antes de ativar o envio
              público.
            </p>
          </details>
          <div className="business-footer-bottom">
            <span>
              © {new Date().getFullYear()} GoldSystem. Todos os direitos
              reservados.
            </span>
            <span>Desenvolvido para o seu negócio.</span>
            <a href="#inicio">
              Voltar ao início <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>
      <MotionSystem />
    </div>
  );
}
