# Validação do layout de referência

Revisão realizada em 28/10/2026, em Linux x64, com Node.js 24.19.0, npm 11.9.0 e Chromium.

A página segue a referência aprovada: abertura fotográfica escura, azul luminoso, cartões de soluções, simulador, projetos, benefícios, depoimento, indicadores e FAQ. As capturas em `docs/previews/` mostram o site renderizado no navegador.

| Verificação                                        | Resultado                                                 |
| -------------------------------------------------- | --------------------------------------------------------- |
| Build de produção                                  | Aprovado                                                  |
| ESLint                                             | Sem erros ou avisos                                       |
| TypeScript                                         | Aprovado, inclusive no build final                        |
| Testes de unidade                                  | 8 aprovados; nenhum ignorado                              |
| Testes de navegador                                | 14 cenários aprovados; nenhum ignorado                    |
| Layout em 1440, 1280, 768 e 390 px                 | Sem overflow horizontal ou erros de execução              |
| axe na página, demonstrações, formulário e galeria | Nenhuma violação séria ou crítica nos estados verificados |
| Blog e artigo em 390 px                            | Sem overflow e sem violações sérias ou críticas do axe    |
| Conferência adicional em 320, 360, 1024 e 1920 px  | Sem overflow ou erros; menu de 320 px visível e navegável |

A suíte completa aprovou 13 cenários e identificou contraste insuficiente no botão do formulário. Após a correção, o cenário de acessibilidade foi reexecutado e aprovado. Os demais testes já estavam aprovados; não houve cenários ignorados.

Foram exercitados pedidos, filtros, oito módulos, reposição demonstrativa, automação, cenários predefinidos de IA, cálculo mensal/anual, transferência de contexto, comparação por segmento, briefing, cópia, download, API, teclado, dialogs, galeria, artigos, página 404 e menu mobile. As três frentes e os cartões de soluções abrem a experiência correspondente. As animações respeitam a preferência por movimento reduzido.

O contato integrado foi verificado com respostas HTTP simuladas, incluindo falha e confirmação, sem enviar dados para um destino externo. Os links de WhatsApp e e-mail foram conferidos; nenhuma mensagem foi enviada durante os testes.

## Conteúdo e limites

- Clientes, projetos, depoimento, indicadores e contatos da referência foram confirmados pelo responsável para publicação.
- Fotografias são ilustrações geradas. O laboratório usa dados fictícios; o simulador apresenta uma estimativa calculada pelos controles.
- O briefing pode continuar pelo WhatsApp, ser copiado ou baixado. O envio pelo formulário depende de um backend configurado.
- O deploy e as métricas de desempenho em produção não foram verificados. Dispositivos físicos e outros navegadores permanecem fora desta validação local.
