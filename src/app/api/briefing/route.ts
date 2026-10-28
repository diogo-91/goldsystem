import { NextResponse } from "next/server";
import { parsePayload } from "@/lib/briefing";
import { forwardBriefing } from "@/lib/delivery";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json(
      { error: "Origem não autorizada." },
      { status: 403 },
    );
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { error: "Envie um briefing em JSON." },
      { status: 415 },
    );
  }
  let data: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 16000)
      return NextResponse.json(
        { error: "Briefing muito extenso." },
        { status: 413 },
      );
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Não foi possível ler o briefing." },
      { status: 400 },
    );
  }
  const payload = parsePayload(data);
  if (!payload)
    return NextResponse.json(
      { error: "Revise os campos e o consentimento." },
      { status: 400 },
    );
  const webhook = process.env.BRIEFING_WEBHOOK_URL;
  if (!webhook)
    return NextResponse.json(
      {
        error: "O envio ainda não está disponível. Gere e copie seu briefing.",
      },
      { status: 503 },
    );
  try {
    await forwardBriefing(payload, webhook, process.env.BRIEFING_WEBHOOK_TOKEN);
    return NextResponse.json({ delivered: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "O destino não confirmou o recebimento. Seu briefing não foi confirmado como enviado. Tente novamente ou copie o texto.",
      },
      { status: 502 },
    );
  }
}
