import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReferenceFooter, ReferenceHeader } from "@/components/reference-shell";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog GoldSystem — Sistemas, automações e IA",
  description:
    "Conteúdos sobre tecnologia aplicada à operação: sistemas personalizados, automação de processos e Inteligência Artificial.",
};

export default function Blog() {
  return (
    <div className="reference-site ref-blog">
      <ReferenceHeader blog />
      <main>
        <section className="ref-blog-hero">
          <div className="ref-container">
            <span className="ref-eyebrow light">BLOG GOLDSYSTEM</span>
            <h1>
              Tecnologia com contexto.
              <br />
              <span>Conhecimento para o seu negócio.</span>
            </h1>
            <p>
              Ideias e orientações para entender as possibilidades antes de dar
              o próximo passo.
            </p>
          </div>
        </section>
        <section className="ref-container ref-blog-grid">
          {articles.map((article) => (
            <article key={article.slug}>
              <Link href={`/blog/${article.slug}`}>
                <div className={`ref-atlas services tile-${article.tile}`} />
                <div>
                  <span className="ref-eyebrow">{article.category}</span>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <span className="ref-blog-read">
                    Ler conteúdo <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>
      <ReferenceFooter />
    </div>
  );
}
