"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { commercial, whatsappLink } from "@/config/commercial";

export function ReferenceBrand() {
  return (
    <Link
      href="/#inicio"
      className="ref-brand"
      aria-label="GoldSystem — início"
    >
      <span>&lt;</span>
      <strong>gold</strong>system<span>&gt;</span>
    </Link>
  );
}

export function ReferenceHeader({ blog = false }: { blog?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="ref-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          document.getElementById("menu-toggle")?.focus();
        }
      }}
    >
      <div className="ref-container ref-header-inner">
        <ReferenceBrand />
        <nav
          id="main-navigation"
          aria-label="Navegação principal"
          className={open ? "is-open" : ""}
        >
          {[
            ["Início", "/#inicio"],
            ["Soluções", "/#solucoes"],
            ["Projetos", "/#projetos"],
            ["Como funciona", "/#como-funciona"],
            ["Sobre", "/#sobre"],
            ["Blog", "/blog"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={
                blog
                  ? label === "Blog"
                    ? "active"
                    : ""
                  : label === "Início"
                    ? "active"
                    : ""
              }
              aria-current={blog && label === "Blog" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <a
          className="ref-header-contact"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale com um especialista <ArrowRight size={15} />
        </a>
        <button
          id="menu-toggle"
          className="ref-menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export function ReferenceFooter({
  onOpenContact,
  onExplore,
}: {
  onOpenContact?: () => void;
  onExplore?: (tab: number) => void;
}) {
  return (
    <footer className="ref-footer">
      <div className="ref-container">
        <div className="ref-footer-grid">
          <div className="ref-footer-brand">
            <ReferenceBrand />
            <p>
              Sistemas personalizados para empresas
              <br />
              que buscam mais eficiência e resultados.
            </p>
          </div>
          <div className="ref-footer-links">
            <strong>Links</strong>
            {[
              ["Início", "/#inicio"],
              ["Soluções", "/#solucoes"],
              ["Projetos", "/#projetos"],
              ["Como funciona", "/#como-funciona"],
              ["Sobre", "/#sobre"],
              ["Blog", "/blog"],
            ].map(([label, href]) => (
              <Link href={href} key={label}>
                {label}
              </Link>
            ))}
            <Link href="/#contato" onClick={onOpenContact}>
              Contato
            </Link>
          </div>
          <div className="ref-footer-contacts">
            <strong>Contato</strong>
            <a href={`tel:+${commercial.whatsappNumber}`}>
              <Phone size={15} />
              {commercial.phone}
            </a>
            <a href={`mailto:${commercial.email}`}>
              <Mail size={15} />
              {commercial.email}
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sorocaba%20SP"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={15} />
              {commercial.location}
            </a>
          </div>
          <div className="ref-footer-content">
            <strong>Explore as soluções</strong>
            <div>
              {[
                { name: "Sistema de gestão", icon: ClipboardList },
                { name: "Automação de processos", icon: Workflow },
                { name: "Inteligência Artificial", icon: Sparkles },
              ].map(({ name, icon: Icon }, index) =>
                onExplore ? (
                  <button
                    type="button"
                    aria-label={`Experimentar ${name}`}
                    key={name}
                    onClick={() => onExplore(index)}
                  >
                    <Icon size={18} />
                  </button>
                ) : (
                  <Link
                    key={name}
                    href="/#experiencias"
                    aria-label={`Experimentar ${name}`}
                  >
                    <Icon size={18} />
                  </Link>
                ),
              )}
            </div>
            <Link href="/blog">
              Conteúdo para o seu negócio <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <details className="ref-privacy" id="privacidade">
          <summary>Privacidade e uso de dados</summary>
          <p>
            As demonstrações usam dados fictícios. O formulário mantém as
            informações na memória desta página e só as encaminha mediante uma
            ação sua. Copiar ou baixar o briefing não envia dados. O WhatsApp
            abre uma mensagem preparada: você confirma o envio no próprio
            aplicativo. O envio pelo formulário, quando disponível, depende do
            seu consentimento e da sua confirmação. Dúvidas e solicitações sobre
            seus dados podem ser encaminhadas para {commercial.email}.
          </p>
        </details>
        <div className="ref-footer-bottom">
          <span>
            © {new Date().getFullYear()} GoldSystem. Todos os direitos
            reservados.
          </span>
          <span>
            Desenvolvido com tecnologia e inovação.{" "}
            <strong>&lt;goldsystem&gt;</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
