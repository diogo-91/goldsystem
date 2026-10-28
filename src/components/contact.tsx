"use client";

import { useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Copy,
  LoaderCircle,
  X,
} from "lucide-react";
import { commercial } from "@/config/commercial";
import {
  generateBriefing,
  validateBriefing,
  type BriefingContext,
  type BriefingFields,
} from "@/lib/briefing";

const initial: BriefingFields = {
  name: "",
  company: "",
  phone: "",
  email: "",
  segment: "",
  problem: "",
  solution: "",
  description: "",
  consent: false,
};

export function Contact({
  enabled,
  context,
  onClear,
}: {
  enabled: boolean;
  context: BriefingContext;
  onClear: () => void;
}) {
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BriefingFields, string>>
  >({});
  const [briefing, setBriefing] = useState("");
  const [deliveredBriefing, setDeliveredBriefing] = useState("");
  const [generatedFor, setGeneratedFor] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "sent" | "copied" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const effectiveFields = {
    ...fields,
    solution:
      fields.solution ||
      (context.experience === "Sistemas conectados"
        ? "Sistemas conectados"
        : context.experience?.includes("Inteligência")
          ? "Inteligência Artificial"
          : context.experience?.includes("Automação") || context.simulation
            ? "Automação inteligente"
            : context.experience
              ? "Software sob medida"
              : ""),
  };
  function update(key: keyof BriefingFields, value: string | boolean) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setBriefing("");
    setDeliveredBriefing("");
    setStatus("idle");
    setMessage("");
  }
  function validate() {
    const nextErrors = validateBriefing(effectiveFields);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setStatus("error");
      setMessage("Revise os campos destacados para continuar.");
      return false;
    }
    return true;
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    const text = generateBriefing(effectiveFields, context);
    setBriefing(text);
    setDeliveredBriefing("");
    setGeneratedFor(JSON.stringify(context));
    if (!enabled) {
      setStatus("idle");
      setMessage(
        "Seu briefing está pronto para copiar ou baixar. Nenhum dado foi enviado.",
      );
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch(commercial.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: effectiveFields, context }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.delivered !== true)
        throw new Error(
          result.error ||
            "O recebimento não foi confirmado. Você pode copiar o briefing abaixo.",
        );
      setStatus("sent");
      setDeliveredBriefing(text);
      setMessage(
        "O destino confirmou o recebimento do seu briefing. Obrigado por compartilhar seu desafio.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "O destino não confirmou o recebimento a tempo. Copie seu briefing ou tente novamente.",
      );
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(briefing);
      setStatus("copied");
      setMessage(
        deliveredBriefing === briefing
          ? "Briefing copiado. O recebimento deste texto já foi confirmado pelo destino."
          : "Briefing copiado. Nenhum envio foi realizado por esta ação.",
      );
    } catch {
      setMessage(
        "Não foi possível copiar automaticamente. Selecione e copie o texto abaixo, ou baixe o arquivo.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([briefing], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "meu-briefing-goldsystem.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  const input = (
    key: "name" | "company" | "phone" | "email" | "segment",
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <label className="form-field" key={key} htmlFor={`contact-${key}`}>
      <span>
        {label} <small>*</small>
      </span>
      <input
        id={`contact-${key}`}
        disabled={status === "loading"}
        name={key}
        type={type}
        autoComplete={
          {
            name: "name",
            company: "organization",
            phone: "tel",
            email: "email",
            segment: "off",
          }[key]
        }
        value={fields[key]}
        placeholder={placeholder}
        maxLength={key === "email" ? 254 : key === "phone" ? 30 : 160}
        required
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `error-${key}` : undefined}
        onChange={(e) => update(key, e.target.value)}
      />
      {errors[key] && (
        <span className="field-error" id={`error-${key}`}>
          {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <section id="contato" className="contact section-pad">
      <div className="contact-intro">
        <span className="eyebrow">FALE SOBRE O SEU PROJETO</span>
        <h2>
          Vamos entender
          <br />
          o que a sua
          <br />
          <span>empresa precisa.</span>
        </h2>
        <p>
          Conte seu desafio, os processos envolvidos e o que você gostaria de
          melhorar. Esse é o ponto de partida para uma proposta sob medida.
        </p>
        <div className="contact-mode">
          <i />
          {enabled
            ? "Envio de briefing disponível"
            : "Prepare seu briefing, sem compromisso."}
          <p>
            {enabled
              ? "Seus dados serão encaminhados somente após sua confirmação."
              : "O envio direto ainda não está disponível. Você poderá copiar ou baixar o briefing. Nenhum dado será enviado."}
          </p>
        </div>
      </div>
      <form
        ref={formRef}
        onSubmit={submit}
        noValidate
        className="briefing-form"
      >
        {(context.experience || context.simulation) && (
          <div className="briefing-context">
            <div>
              <span>UM PONTO DE PARTIDA PARA SEU PROJETO</span>
              <strong>{context.experience || "Simulador de automação"}</strong>
              {context.simulation && (
                <small>Parâmetros do simulador incluídos no briefing.</small>
              )}
            </div>
            <button
              className="icon-button"
              disabled={status === "loading"}
              type="button"
              onClick={() => {
                onClear();
                setBriefing("");
              }}
              aria-label="Remover contexto da experiência"
            >
              <X size={17} />
            </button>
          </div>
        )}
        <div className="form-grid">
          {input("name", "Seu nome", "Como podemos chamar você?")}
          {input("company", "Empresa", "Nome da sua empresa")}
          {input("phone", "WhatsApp", "DDD + número", "tel")}
          {input("email", "E-mail", "voce@empresa.com.br", "email")}
          {input("segment", "Segmento", "Ex.: indústria, comércio, serviços")}
          <label className="form-field" htmlFor="contact-solution">
            <span>
              O que você tem em mente? <small>*</small>
            </span>
            <select
              disabled={status === "loading"}
              name="solution"
              id="contact-solution"
              required
              value={effectiveFields.solution}
              onChange={(e) => update("solution", e.target.value)}
              aria-invalid={Boolean(errors.solution)}
              aria-describedby={errors.solution ? "error-solution" : undefined}
            >
              <option value="" disabled>
                Selecione uma possibilidade
              </option>
              {commercial.solutions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {errors.solution && (
              <span className="field-error" id="error-solution">
                {errors.solution}
              </span>
            )}
          </label>
        </div>
        <label className="form-field" htmlFor="contact-problem">
          <span>
            Qual desafio você quer resolver? <small>*</small>
          </span>
          <textarea
            id="contact-problem"
            disabled={status === "loading"}
            name="problem"
            placeholder="Conte sobre o processo que pode funcionar melhor…"
            maxLength={2000}
            required
            rows={3}
            value={fields.problem}
            onChange={(e) => update("problem", e.target.value)}
            aria-invalid={Boolean(errors.problem)}
            aria-describedby={errors.problem ? "error-problem" : undefined}
          />
          {errors.problem && (
            <span className="field-error" id="error-problem">
              {errors.problem}
            </span>
          )}
        </label>
        <label className="form-field" htmlFor="contact-description">
          <span>
            Algo mais que devemos saber? <small>OPCIONAL</small>
          </span>
          <textarea
            id="contact-description"
            disabled={status === "loading"}
            name="description"
            placeholder="Integrações, particularidades ou uma ideia que ainda está no papel."
            maxLength={4000}
            rows={2}
            value={fields.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </label>
        <label className="consent">
          <input
            type="checkbox"
            disabled={status === "loading"}
            name="consent"
            checked={fields.consent}
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby="consent-description"
            onChange={(e) => update("consent", e.target.checked)}
          />
          <span id="consent-description">
            Concordo com o uso destes dados para preparar meu briefing e, se o
            envio estiver disponível, encaminhá-lo para análise do projeto. Os
            campos ficam apenas nesta página até uma ação de envio.{" "}
            <a href="#privacidade">Saiba mais.</a>
          </span>
        </label>
        {errors.consent && (
          <span className="field-error">{errors.consent}</span>
        )}
        <button
          type="submit"
          className="button button-blue contact-submit"
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Aguardando confirmação…"
            : enabled
              ? "Enviar meu briefing"
              : "Gerar meu briefing"}
          {status === "loading" ? (
            <LoaderCircle className="spin" size={18} />
          ) : (
            <ArrowUpRight size={19} />
          )}
        </button>
        <div
          role="status"
          className={`form-message ${status === "error" ? "error" : ""}`}
        >
          {briefing && generatedFor !== JSON.stringify(context)
            ? "Seu contexto foi atualizado. Gere o briefing novamente para incluir as novas escolhas."
            : message}
        </div>
        {briefing && generatedFor === JSON.stringify(context) && (
          <div className="generated-briefing">
            <div>
              <strong>Seu próximo projeto, em palavras.</strong>
              <span>
                {deliveredBriefing === briefing
                  ? "Recebimento confirmado pelo destino."
                  : "Este texto não foi confirmado como enviado."}
              </span>
            </div>
            <label className="sr-only" htmlFor="generated-briefing-text">
              Briefing gerado
            </label>
            <textarea
              id="generated-briefing-text"
              value={briefing}
              readOnly
              rows={10}
            />
            <div className="briefing-actions">
              <button
                className="button button-blue"
                disabled={status === "loading"}
                type="button"
                onClick={copy}
              >
                {status === "copied" ? <Check size={16} /> : <Copy size={16} />}{" "}
                {status === "copied" ? "Copiado" : "Copiar briefing"}
              </button>
              <button
                className="text-button"
                type="button"
                disabled={status === "loading"}
                onClick={download}
              >
                Baixar .txt <ArrowDownToLine size={16} />
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
