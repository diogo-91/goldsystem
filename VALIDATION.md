# Validação da revisão comercial

Validação realizada em 28/10/2026, nesta máquina Linux x64, com Node.js 24.19.0, npm 11.9.0 e Chromium.

A apresentação foi refeita para dar o mesmo destaque a sistemas sob medida, automações de processos e Inteligência Artificial. A abertura mostra o produto, os problemas de negócio e chamadas específicas para proposta. As prévias em `docs/previews/` são capturas do site efetivamente renderizado.

| Verificação                             | Resultado                                                 |
| --------------------------------------- | --------------------------------------------------------- |
| Build de produção (`npm run build`)     | Aprovado                                                  |
| ESLint (`npm run lint`)                 | Sem erros ou avisos                                       |
| TypeScript (`npm run typecheck`)        | Aprovado                                                  |
| Testes de unidade (`npm test`)          | 8 aprovados; nenhum ignorado                              |
| Suíte de navegador (`npm run test:e2e`) | 13 cenários aprovados; nenhum ignorado                    |
| Layout em 1440, 1280, 768 e 390 px      | Sem overflow horizontal ou erros de execução              |
| axe nas prévias e no laboratório        | Nenhuma violação séria ou crítica nos estados verificados |

Foram exercitados criação e atualização de pedidos, filtros, indicadores, oito módulos, reposição demonstrativa, automação, cenários predefinidos de IA, cálculo do simulador, transferência de contexto, comparação por segmento, briefing, cópia, download, modal, teclado e menu mobile.

Também foram verificados os caminhos comerciais: as três ofertas alternam a prévia, abrem a demonstração correspondente e preenchem a solução desejada no formulário. O modo de contato integrado foi testado com respostas HTTP simuladas, sem encaminhar dados para um destino externo.

A página não depende mais de WebGL ou de uma escultura 3D. As animações de entrada e rolagem respeitam a preferência por movimento reduzido.

## Limites

- Os dados, aplicações e exemplos de IA são demonstrativos, sem resultados comerciais ou clientes inventados.
- O envio real de propostas depende de um backend configurado. Por padrão, o formulário gera, copia e baixa o briefing sem enviar dados.
- Um WhatsApp ou e-mail comercial real ainda precisa ser fornecido para conectar um canal direto de atendimento.
- Core Web Vitals em produção, dispositivos móveis físicos e o deploy na hospedagem não foram verificados nesta revisão.
- O rascunho do ambiente preserva `install_script` e `start_skill`; a publicação do ambiente é independente do envio de código ao GitHub.
