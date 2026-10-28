# Validação realizada

Validação nesta máquina Linux x64, com Node.js 24.19.0, npm 11.9.0 e Chromium com renderização gráfica por software.

| Verificação | Resultado |
| --- | --- |
| Reinstalação pelo lockfile (`npm ci`) | Aprovada |
| Build de produção (`npm run build`) | Aprovado |
| ESLint (`npm run lint`) | Sem erros ou avisos |
| TypeScript (`npm run typecheck`) | Aprovado |
| Testes de unidade (`npm test`) | 8 aprovados; nenhum ignorado |
| Suíte de navegador (`npm run test:e2e`) | 13 cenários aprovados |
| Repetição dos cenários afetados pelos ajustes finais | 8 aprovados |
| Capturas finais em 1440, 1280, 768 e 390 px | 4 verificações aprovadas; sem overflow horizontal ou erros de execução |
| axe nos três estados principais do laboratório | Nenhuma violação séria ou crítica nos critérios verificados |
| Auditoria das dependências de produção | Nenhuma vulnerabilidade reportada |

Os testes exercitam criação e atualização de pedidos, filtros, indicadores, oito módulos, reposição demonstrativa, automação, cenários predefinidos de IA, fórmula do simulador, transferência de contexto, comparação por segmento, validação e cópia do briefing, download, modal, teclado e menu mobile. A cena 3D foi verificada com movimento padrão, movimento reduzido e fallback sem WebGL.

O modo de contato integrado foi testado com respostas HTTP simuladas: espera e bloqueio de edição, erro sem confirmação falsa, aceite do destino e preservação da confirmação após copiar o texto. O transporte HTTPS foi testado com mocks de aceite, erro e falha de rede.

O relatório da suíte completa está em `playwright-report/`. As capturas finais estão em `test-results/`. Esses artefatos são locais e ignorados pelo Git. As capturas congelam somente o frame real da cena durante a fotografia da página para evitar omissões do compositor de software do Chromium; as verificações funcionais usam a cena ao vivo.

## Limites desta validação

- Nenhum webhook comercial, banco ou serviço de envio real está configurado. Por padrão, o formulário gera, copia e baixa o briefing sem enviar dados.
- Não foram medidos Core Web Vitals em produção nem testados dispositivos móveis físicos. As metas de LCP, INP e CLS devem ser verificadas em uma hospedagem e rede representativas.
- Os estudos de aplicação e dados do laboratório são demonstrativos. Não representam cases aprovados ou resultados comerciais.
- Este registro descreve a validação técnica realizada antes do primeiro commit e push. A publicação do site não foi verificada.
- `install_script` e `start_skill` foram persistidos no rascunho de configuração do ambiente. Publicação e restauração em uma nova tarefa não foram verificadas.
