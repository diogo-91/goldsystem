# GoldSystem

Website comercial da GoldSystem, com o mesmo destaque para **sistemas sob medida, automações de processos e Inteligência Artificial**. A apresentação parte dos problemas da operação, demonstra o produto e leva o visitante a um briefing de projeto.

[Ver a prévia desktop](docs/previews/desktop.png) · [Ver a prévia mobile](docs/previews/mobile.png) · [Ver as três soluções](docs/previews/solucoes.png)

![Página inicial da GoldSystem](docs/previews/desktop.png)

## Executar

Requisitos: Node.js 24 e npm. Versões usadas na validação: Node 24.19.0 e npm 11.9.0.

```sh
npm ci
npm run dev
```

Para produção:

```sh
npm run build
npm start
```

O servidor usa a porta 3000 por padrão. `npm start -- --port 3001` permite escolher outra porta. O ambiente de nuvem já fornece um checkout isolado; trabalhe nele, sem criar um Git worktree adicional.

Se o cache npm padrão não for gravável no ambiente de nuvem, use `NPM_CONFIG_CACHE=/tmp/goldsystem-npm` antes dos comandos npm. Isso não desativa verificações de integridade ou TLS.

## O que está implementado

- Abertura comercial com três ofertas de igual destaque. A prévia alterna entre um sistema de gestão navegável, uma simulação de automação e exemplos de aplicação de IA.
- Problemas de negócio, benefícios por frente, exemplos de uso e chamadas específicas para proposta. As escolhas chegam ao formulário e à demonstração correspondente.
- Identidade em azul-marinho e azul, tipografia de produto, interfaces reais e animações discretas com GSAP ScrollTrigger. A página não depende de WebGL.
- Laboratório com oito módulos de gestão, criação e filtro de pedidos, alteração de status, indicadores e gráfico derivados dos pedidos, reposição fictícia de estoque, consulta de clientes, chaves de automação e exportação de CSV.
- Simulação de cinco fluxos operacionais e três cenários de IA explicitamente predefinidos. Sem chamadas a modelos ou APIs externas.
- Simulador de automação com cinco parâmetros; contexto transferido para o briefing.
- Três frentes de solução, integrações, estudos demonstrativos com detalhes, comparação interativa por segmento, processo de desenvolvimento, FAQ e chamada comercial final.
- Briefing com validação, consentimento, cópia e download de texto. Envio opcional, confirmado somente após resposta positiva do backend.
- Fontes Geist locais, metadados em português, imagem social local, navegação por teclado, dialogs nativos e respeito a `prefers-reduced-motion`.

Dados do laboratório ficam na memória da página. Alternar abas preserva a sessão; recarregar restaura os dados fictícios. O formulário não grava dados em cookies, localStorage ou banco.

## Estrutura principal

| Local                                | Responsabilidade                                            |
| ------------------------------------ | ----------------------------------------------------------- |
| `src/app/page.tsx`                   | Entrada App Router e configuração de envio lida no servidor |
| `src/components/gold-system.tsx`     | Apresentação comercial, navegação e contexto da proposta    |
| `src/components/product-preview.tsx` | Prévias funcionais e dados das três ofertas                 |
| `src/app/business.css`               | Identidade comercial e adaptações de tela                   |
| `src/components/motion-system.tsx`   | ScrollTrigger e movimento reduzido                          |
| `src/components/dashboard.tsx`       | Módulos de gestão e estado dos pedidos                      |
| `src/components/laboratory.tsx`      | Abas, simulações de automação e IA                          |
| `src/components/simulator.tsx`       | Controles do potencial de automação                         |
| `src/lib/simulation.ts`              | Fórmula, limites e formatação dos resultados                |
| `src/components/contact.tsx`         | Formulário, validação e geração do briefing                 |
| `src/config/commercial.ts`           | Configuração comercial central, sem contatos inventados     |
| `src/app/api/briefing/route.ts`      | Validação do servidor e encaminhamento opcional             |
| `src/lib/delivery.ts`                | Transporte HTTPS, timeout e confirmação do destino          |
| `src/app/globals.css`                | Sistema visual e adaptações responsivas                     |

## Configuração comercial e backend

O site funciona sem credenciais. Por padrão, **Gerar meu briefing** prepara um texto para copiar ou baixar e informa explicitamente que não houve envio.

Para ativar o envio, configure no servidor:

```dotenv
BRIEFING_WEBHOOK_URL=https://seu-backend.example/briefings
# Opcional, se o destino exigir autenticação:
BRIEFING_WEBHOOK_TOKEN=valor-inserido-em-configuracao-segura
NEXT_PUBLIC_SITE_URL=https://seu-dominio-verificado.example
```

Use os placeholders somente como orientação; configure seus valores reais em um arquivo local ignorado ou no gerenciador seguro da hospedagem. Não exponha o token com prefixo `NEXT_PUBLIC_`. O domínio do webhook deve estar permitido na saída de rede do ambiente.

O destino pode ser uma Supabase Edge Function ou outro endpoint HTTPS controlado pela GoldSystem. Recebe `POST` JSON:

```json
{
  "fields": {
    "name": "…",
    "company": "…",
    "phone": "…",
    "email": "…",
    "segment": "…",
    "problem": "…",
    "solution": "…",
    "description": "…",
    "consent": true
  },
  "context": {
    "experience": "…",
    "simulation": {
      "employees": 5,
      "hoursPerDay": 2,
      "daysPerMonth": 22,
      "hourlyCost": 35,
      "automationPercent": 60
    }
  },
  "briefing": "Texto completo…"
}
```

O endpoint deve responder `2xx` **depois** de aceitar a entrega. O site aplica timeout de 10 segundos, recusa redirecionamentos e informa falha sem exibir sucesso se o destino não confirmar. A confirmação se refere ao recebimento pelo backend; entrega de e-mail, armazenamento e atendimento dependem dele.

Antes de habilitar envio público, definir retenção de dados, acesso ao backend, proteção contra abuso e canal para exercício dos direitos de privacidade. Rever o texto de privacidade do site conforme a operação real. Nenhum telefone, e-mail comercial, depoimento ou case de cliente foi inventado.

## Verificação

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Os testes de unidade usam o runner nativo do Node. Cobrem a fórmula e limites, consentimento, validação do payload, preservação de contexto e sucesso/falha de transporte HTTPS com mocks. Nenhum dado real é enviado nos testes.

Os testes Playwright usam Chromium do sistema quando disponível, a variável `PLAYWRIGHT_CHROMIUM_EXECUTABLE` quando definida, ou o navegador instalado pelo Playwright. Para preparar o navegador fora da nuvem:

```sh
npx playwright install chromium
```

O Playwright inicia a versão de produção; execute o build antes. Se já houver servidor na porta 3000, ele deve corresponder ao build atual. Não reconstrua `.next` enquanto estiver validando um servidor existente.

O cenário de contato integrado abre um servidor temporário na porta 3002 e simula respostas HTTP no navegador. Verifica carregamento, bloqueio de edição, falha e confirmação sem chamar um webhook externo. Mantenha essa porta disponível durante os testes.

São exercitados pedidos, busca, filtros, módulos, fluxos de automação, cenários de IA, sliders, comparação, briefing, cópia, download, API sem backend, teclado, modal, menu mobile e contraste com axe. Capturas completas em 1440, 1280, 768 e 390 px ficam em `test-results/`; o relatório fica em `playwright-report/` (ambos ignorados). Use `npx playwright show-report` para inspecionar localmente.

As capturas documentam o HTML e as interfaces efetivamente renderizadas no navegador. As prévias selecionadas para revisão ficam em `docs/previews/`.

## Publicação

O projeto requer hospedagem com suporte ao servidor Next.js se o envio de briefing for ativado. Configure o domínio real para os metadados sociais e valide o destino comercial. Os exemplos de aplicações são estudos fictícios; substituir por cases reais exige autorização.

LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 são metas. A validação de layout e funcionalidade em Chromium local não comprova Core Web Vitals em produção. Medir em dispositivos e redes representativos após publicar, incluindo navegadores móveis reais.

Na Vercel, importe este repositório com o preset Next.js, diretório raiz `./`, instalação `npm ci`, build `npm run build` e Node.js 24.x. Mantenha o diretório de saída padrão. A integração com o GitHub pode publicar novas versões a cada push. O envio comercial e o banco de dados dependem da configuração do backend escolhido.
