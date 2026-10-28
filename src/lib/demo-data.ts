export const statuses = ["Recebido", "Em produção", "Concluído"] as const;
export type OrderStatus = (typeof statuses)[number];
export type Order = {
  id: string;
  client: string;
  product: string;
  amount: number;
  status: OrderStatus;
};
export const initialOrders: Order[] = [
  {
    id: "GS-1048",
    client: "Ateliê Aurora",
    product: "Kit de produtos",
    amount: 2450,
    status: "Em produção",
  },
  {
    id: "GS-1047",
    client: "Casa Nativa",
    product: "Coleção essencial",
    amount: 1380,
    status: "Recebido",
  },
  {
    id: "GS-1046",
    client: "Estúdio Horizonte",
    product: "Kit de produtos",
    amount: 3240,
    status: "Concluído",
  },
  {
    id: "GS-1045",
    client: "Ateliê Aurora",
    product: "Coleção essencial",
    amount: 890,
    status: "Concluído",
  },
  {
    id: "GS-1044",
    client: "Jardim & Forma",
    product: "Edição especial",
    amount: 1860,
    status: "Em produção",
  },
  {
    id: "GS-1043",
    client: "Casa Nativa",
    product: "Edição especial",
    amount: 2680,
    status: "Recebido",
  },
];
export const clients = [
  { name: "Ateliê Aurora", segment: "Design e decoração", initials: "AA" },
  { name: "Casa Nativa", segment: "Varejo", initials: "CN" },
  { name: "Estúdio Horizonte", segment: "Serviços criativos", initials: "EH" },
  { name: "Jardim & Forma", segment: "Paisagismo", initials: "JF" },
];
export const products = [
  { name: "Kit de produtos", stock: 32, min: 10, price: 245 },
  { name: "Coleção essencial", stock: 8, min: 15, price: 138 },
  { name: "Edição especial", stock: 24, min: 10, price: 268 },
];
export const processes = {
  Atendimento: [
    "Solicitação recebida",
    "Assunto identificado",
    "Regras verificadas",
    "Atendimento organizado",
    "Resposta preparada",
  ],
  "Cadastro de pedidos": [
    "Pedido recebido",
    "Dados analisados",
    "Estoque verificado",
    "Registro criado",
    "Notificação preparada",
  ],
  "Controle de estoque": [
    "Saldo consultado",
    "Limite analisado",
    "Reposição identificada",
    "Solicitação criada",
    "Responsável notificado",
  ],
  "Aprovação de orçamento": [
    "Orçamento recebido",
    "Valores analisados",
    "Alçada verificada",
    "Aprovação registrada",
    "Equipe notificada",
  ],
  "Atualização de informações": [
    "Alteração recebida",
    "Dados validados",
    "Duplicidade verificada",
    "Registro atualizado",
    "Sincronização preparada",
  ],
};
export type ProcessName = keyof typeof processes;
export const aiScenarios = [
  {
    title: "Um pedido que chega por mensagem",
    input:
      "Olá! Preciso de 12 unidades do Kit de produtos para sexta. Pode entregar na loja?",
    intent: "Intenção de compra identificada",
    facts: [
      "Produto: Kit de produtos",
      "Quantidade: 12 unidades",
      "Prazo: sexta-feira",
      "Entrega: confirmar endereço",
    ],
    action:
      "Preparar um rascunho de pedido e solicitar a confirmação do endereço e do prazo à equipe comercial. Nenhum pedido é criado sem revisão humana.",
  },
  {
    title: "Um estoque que precisa de atenção",
    input:
      "A Coleção essencial está com 8 unidades. Nosso mínimo é 15 e o fornecedor precisa de 5 dias.",
    intent: "Risco de ruptura identificado",
    facts: [
      "Estoque disponível: 8 unidades",
      "Estoque mínimo: 15 unidades",
      "Déficit: 7 unidades",
      "Prazo do fornecedor: 5 dias",
    ],
    action:
      "Sugerir uma revisão de reposição de pelo menos 7 unidades, considerando a demanda do período. Encaminhar para aprovação do responsável.",
  },
  {
    title: "Uma decisão financeira",
    input:
      "Temos um pedido de R$ 3.240 aguardando pagamento. O cliente pediu para dividir em 3 vezes.",
    intent: "Solicitação de condição de pagamento",
    facts: [
      "Valor do pedido: R$ 3.240",
      "Parcelamento solicitado: 3 vezes",
      "Parcela sem juros: R$ 1.080",
      "Política de crédito: verificar",
    ],
    action:
      "Montar uma proposta de 3 parcelas de R$ 1.080 para análise do financeiro, sujeita à política de crédito da empresa. Nenhuma aprovação automática.",
  },
];
