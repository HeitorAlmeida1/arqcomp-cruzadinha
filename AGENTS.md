# AGENTS.md

## Visão geral

Jogo de **cruzadinha (palavras cruzadas) sobre Arquitetura Computacional**, entregue como
atividade avaliativa da disciplina (Sprint 3). O jogador lê uma pista e digita a palavra
diretamente nas casas do tabuleiro, treinando os termos técnicos da aula.

- **Problema que resolve:** fixar o vocabulário de arquitetura de computadores (CPU, ULA, RAM,
  cache, barramentos, etc.) de forma ativa, exigindo compreensão do conceito em vez de
  memorização da sigla.
- **Usuários:** estudantes da disciplina e o professor avaliador.
- **Entrega final:** site estático público no GitHub Pages, com `index.html` na raiz.

## Tecnologias

- **HTML5**, **CSS3** e **JavaScript (ES2020+) puros** — sem frameworks, sem bundler, sem
  transpilador, sem dependências externas.
- **Git / GitHub** para versionamento.
- **GitHub Pages** (branch `main`, pasta `/root`) para publicação.
- **Sem backend e sem banco de dados.** Todo o estado vive na memória da página.

## Comandos

Não há build nem instalação de dependências. O projeto é aberto diretamente.

```bash
# Abrir o jogo (Windows)
start index.html
```

```bash
# Servidor local opcional, caso queira testar como no GitHub Pages
npx serve .
```

```bash
# Fluxo de versionamento
git add .
git commit -m "feat: descricao curta"
git push origin main
```

## Arquitetura

Site estático de página única, com separação estrita entre estrutura, estilo e lógica.

```
/
├── index.html      # Estrutura da página (único HTML, na raiz — exigência da atividade)
├── style.css       # Toda a identidade visual e o layout
├── script.js       # Dados do jogo + lógica (montagem, digitação, conferência, reinício)
├── README.md       # Nome do jogo, como jogar, palavras/pistas e link publicado
├── AGENTS.md       # Este documento
├── .gitignore
└── docs/
    └── especificacao.md   # Especificação funcional e plano de ação
```

**Responsabilidades**

- `index.html` — apenas marcação semântica e os contêineres vazios que o JS preenche
  (`#tabuleiro`, `#pistas-horizontais`, `#pistas-verticais`, `#placar`, botões de ação).
  Nenhuma célula do tabuleiro é escrita à mão no HTML.
- `style.css` — tokens de cor em `:root`, layout do tabuleiro em CSS Grid, estados visuais das
  células (vazia, bloqueada, ativa, correta, incorreta). Nenhuma cor literal fora de `:root`.
- `script.js` — organizado em blocos nesta ordem:
  1. **Dados** — constante `PALAVRAS` com `{ id, resposta, pista, linha, coluna, direcao }`.
  2. **Montagem** — deriva a matriz do tabuleiro e a numeração a partir de `PALAVRAS`.
  3. **Render** — cria as células e as listas de pistas no DOM.
  4. **Interação** — digitação, navegação por teclado, foco e célula ativa.
  5. **Regras** — `conferir()`, `atualizarPlacar()`, `reiniciar()`.

**Fluxo de uma interação**

`evento do usuário` → `handler em script.js` → atualiza o estado em memória →
`função de render` reescreve apenas as classes/valores afetados no DOM.

**Onde criar coisas novas**

- Nova palavra ou pista: **somente** no array `PALAVRAS`. O tabuleiro, a numeração e o placar
  se ajustam sozinhos.
- Novo comportamento de jogo: nova função no bloco de Regras, chamada pelo bloco de Interação.
- Novo elemento visual: classe em `style.css` usando os tokens existentes.

## Padrões de desenvolvimento

- `const` por padrão; `let` apenas quando houver reatribuição real. **Nunca `var`.**
- Nomes de variáveis, funções e comentários **em português**; respostas do tabuleiro em
  MAIÚSCULAS, sem acento e sem espaço (`MEMORIADEMASSA`).
- Funções pequenas, com um único propósito, nomeadas por verbo (`montarTabuleiro`,
  `conferirPalavras`, `atualizarPlacar`).
- Arquivos e pastas em `kebab-case`; classes CSS em `kebab-case` e descritivas do papel
  (`.celula-correta`, não `.verde`).
- Seletores no JS sempre por `id` ou `data-*`, nunca por classe de estilo.
- **Commits** no padrão `tipo: descrição curta`, em português, no imperativo, com os tipos
  `feat`, `fix`, `style` e `docs`. Mínimo de 6 commits, distribuídos em pelo menos 2 dias
  diferentes — um único commit com tudo pronto não é aceito pela atividade.

## Cuidados e restrições

- **Não** adicionar frameworks, bibliotecas, CDNs, bundlers ou qualquer dependência externa.
- **Não** criar backend, banco de dados, API ou armazenamento remoto.
- **Não** mover `index.html` da raiz — o GitHub Pages serve a partir dela.
- **Não** usar caminhos absolutos (`/style.css`); sempre relativos (`style.css`), pois o site
  é publicado em um subdiretório (`/arqcomp-cruzadinha/`).
- **Não** incluir dados pessoais (RA, e-mail, telefone, nome completo) em nenhum arquivo — o
  repositório é público.
- **Pistas:** no máximo 15 palavras, escritas com palavras próprias, sem conter a resposta,
  parte dela ou a sigla por extenso, e com resposta única.
- **Não** reduzir o tabuleiro para menos de 12 palavras, e toda palavra deve cruzar com ao
  menos uma outra.
- Alterações no array `PALAVRAS` exigem revalidar os cruzamentos: letras coincidentes nas
  interseções e nenhuma sobreposição inválida.
- Preservar os quatro requisitos funcionais obrigatórios: digitação nas casas, botão
  **Conferir**, contador de acertos e botão **Reiniciar**.
- A identidade visual é inspirada em Dofus/Retro Survival, mas **sem usar arte, fontes ou
  qualquer recurso da Ankama** — apenas paleta e linguagem visual reproduzidas em CSS.

## Regra geral

Antes de implementar uma alteração, siga as tecnologias, arquitetura, convenções e restrições
descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e
siga os padrões já adotados no projeto.
