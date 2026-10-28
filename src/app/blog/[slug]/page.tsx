import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReferenceFooter, ReferenceHeader } from "@/components/reference-shell";
import { articles } from "@/lib/articles";
import { whatsappLink } from "@/config/commercial";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article
    ? { title: `${article.title} — GoldSystem`, description: article.excerpt }
    : { title: "Conteúdo não encontrado — GoldSystem" };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <div className="reference-site ref-blog">
      <ReferenceHeader blog />
      <main>
        <header className="ref-blog-hero ref-article-heading">
          <div className="ref-container">
            <Link href="/blog" className="ref-article-back">
              <ArrowLeft size={15} />
              Voltar ao blog
            </Link>
            <span className="ref-eyebrow light">{article.category}</span>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
          </div>
        </header>
        <article className="ref-article-body">
          <span className="ref-article-author">Conteúdo GoldSystem</span>
          {article.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <div className="ref-article-cta">
            <h2>Vamos olhar para a sua operação?</h2>
            <p>
              Conte seu desafio e converse sobre uma solução para a sua empresa.
            </p>
            <a
              className="ref-button cyan"
              href={whatsappLink(
                `Olá! Li o conteúdo "${article.title}" no site da GoldSystem e gostaria de conversar sobre meu projeto.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com um especialista <ArrowRight size={16} />
            </a>
          </div>
        </article>
      </main>
      <ReferenceFooter />
    </div>
  );
}
