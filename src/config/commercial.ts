// Only verified commercial details belong here. No invented contact information.
// The API route forwards submissions to BRIEFING_WEBHOOK_URL on the server.
export const commercial = {
  brand: "GoldSystem",
  endpoint: "/api/briefing",
  // Public information supplied in the visual reference and confirmed by the owner.
  phone: "(15) 99999-9999",
  whatsappNumber: "5515999999999",
  email: "contato@goldsystem.com.br",
  location: "Sorocaba/SP",
  clients: ["Delicius", "SREB", "Gferro", "Material de Construção"],
  indicators: [
    { value: "50+", label: "Projetos entregues" },
    { value: "30+", label: "Empresas atendidas" },
    { value: "98%", label: "Satisfação dos clientes" },
    { value: "5+", label: "Anos de experiência" },
  ],
  testimonial: {
    quote:
      "O sistema facilitou muito a nossa rotina. Hoje temos mais controle e agilidade no atendimento. Superou nossas expectativas!",
    name: "Mathias",
    company: "Delicius",
  },
  solutions: [
    "Software sob medida",
    "Automação inteligente",
    "Inteligência Artificial",
    "Sistemas conectados",
    "Quero entender as possibilidades",
  ],
};

export function whatsappLink(
  message = "Olá! Vim pelo site da GoldSystem e gostaria de conversar sobre uma solução para a minha empresa.",
) {
  return `https://wa.me/${commercial.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
