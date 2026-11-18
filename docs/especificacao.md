# Cruzadinha de Arquitetura Computacional — Especificação

## 1. Contexto

A disciplina de Arquitetura Computacional apresenta um conjunto de termos técnicos (componentes
do processador, tipos de memória, barramentos e organização de núcleos) que costumam ser
decorados como siglas, sem compreensão do conceito por trás. A atividade avaliativa da Sprint 3
propõe inverter esse hábito: construir um jogo de palavras cruzadas em que a pista precisa
descrever o conceito **sem entregar a resposta**, o que só é possível se o autor entender o
termo. O resultado precisa estar publicado na internet e versionado no GitHub, como em um
projeto real.

## 2. Objetivo

Entregar um jogo de cruzadinha executável no navegador, 100% estático, que apresente no mínimo
12 termos de arquitetura computacional cruzados entre si, permita ao jogador digitar as
respostas nas casas, conferir os acertos e reiniciar a partida — publicado via GitHub Pages e
com histórico de commits distribuído ao longo do desenvolvimento.

## 3. Escopo

**Dentro do escopo**

- Tabuleiro único e fixo, com as 16 palavras da lista oficial, todas cruzadas.
- Pistas numeradas, separadas em **Horizontais** e **Verticais**.
- Digitação letra a letra diretamente nas casas, com navegação por teclado.
- Botão **Conferir**, com destaque visual de palavras corretas e incorretas.
- Contador de acertos no formato `X de 16 palavras`.
- Botão **Reiniciar**, que limpa o tabuleiro e o placar.
- Identidade visual inspirada em Dofus / Retro Survival, construída apenas com CSS.
- Layout responsivo (desktop e celular).
- `README.md` com nome do jogo, como jogar, palavras, pistas e link publicado.

**Fora do escopo**

- Backend, banco de dados, API ou qualquer persistência remota.
- Cadastro, login, ranking ou multijogador.
- Salvamento do progresso entre sessões (`localStorage`).
- Geração automática do tabuleiro, múltiplos níveis ou embaralhamento de palavras.
- Cronômetro, sistema de dicas e pontuação por tempo.
- Qualquer biblioteca, framework ou recurso externo (incluindo arte e fontes da Ankama).

## 4. Funcionalidades

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| F1 | Visualizar o tabuleiro | A página exibe a grade com as casas jogáveis e as casas bloqueadas, com o número da palavra na primeira casa de cada uma. |
| F2 | Ler as pistas | Duas listas numeradas, **Horizontais** e **Verticais**, exibidas ao lado (desktop) ou abaixo (celular) do tabuleiro. |
| F3 | Digitar nas casas | O jogador clica numa casa e digita; o cursor avança sozinho para a próxima casa da palavra. |
| F4 | Navegar pelo teclado | Setas movem o cursor, `Backspace` apaga e volta, `Tab` salta para a próxima palavra. |
| F5 | Destacar a palavra ativa | Ao focar uma casa, a palavra correspondente e sua pista ficam realçadas. |
| F6 | Conferir | O botão **Conferir** compara o preenchimento com o gabarito e marca cada palavra como correta ou incorreta. |
| F7 | Acompanhar o placar | Um contador mostra `X de 16 palavras` corretas, atualizado a cada conferência. |
| F8 | Reiniciar | O botão **Reiniciar** apaga todas as letras, remove as marcações e zera o placar. |
| F9 | Vencer | Ao acertar todas as palavras, uma mensagem de vitória é exibida. |

## 5. Regras de negócio

1. **RN01 — Palavras.** O tabuleiro usa exclusivamente termos da lista oficial, na grafia de
   tabuleiro (maiúsculas, sem acento e sem espaço). Mínimo de 12; esta versão usa as 16, em uma grade de 13 linhas por 16 colunas com 16 cruzamentos.
2. **RN02 — Cruzamentos.** Toda palavra cruza com pelo menos uma outra, e as letras nas
   interseções devem coincidir. Uma alteração em `PALAVRAS` que quebre um cruzamento é inválida.
3. **RN03 — Pistas.** No máximo 15 palavras por pista, escritas com palavras próprias, sem
   conter a resposta, parte dela ou a sigla por extenso, e levando a uma única resposta.
4. **RN04 — Entrada aceita.** Cada casa aceita exatamente uma letra de A a Z. Dígitos, símbolos
   e acentos são descartados; letras minúsculas são convertidas para maiúsculas automaticamente.
5. **RN05 — Casas bloqueadas.** Posições fora de qualquer palavra não recebem foco nem digitação.
6. **RN06 — Numeração.** A numeração é única por casa inicial e segue a ordem de leitura
   (esquerda→direita, cima→baixo). Uma casa que inicia duas palavras exibe um único número,
   compartilhado pela pista horizontal e pela vertical.
7. **RN07 — Conferência.** Uma palavra só é considerada correta quando **todas** as suas casas
   estão preenchidas e idênticas ao gabarito. Palavra incompleta conta como incorreta, mas é
   sinalizada de forma distinta de "errada".
8. **RN08 — Casas compartilhadas.** Numa interseção, a mesma letra vale para as duas palavras;
   ela pode estar correta para uma e incorreta para a outra, e o destaque não pode se sobrepor
   de forma ambígua.
9. **RN09 — Placar.** O contador reflete o resultado da última conferência; editar uma casa
   depois disso limpa as marcações daquela palavra e exige nova conferência.
10. **RN10 — Reinício.** O **Reiniciar** é imediato e irreversível, sem confirmação, pois não há
    progresso persistido.
11. **RN11 — Gabarito.** As respostas ficam no código (site estático) — não há proteção contra
    inspeção, e isso é aceito nesta versão.
12. **RN12 — Privacidade.** Nenhum dado pessoal (RA, e-mail, telefone) pode constar no
    repositório, que é público.

## 6. Interface

### 6.1 Identidade visual

Inspirada em Dofus / Retro Survival: painéis de pergaminho claros sobre fundo verde-escuro
quase preto, bordas marcadas, cantos arredondados e botão primário laranja em relevo. Tudo
reproduzido em CSS puro — **nenhum recurso gráfico da Ankama é utilizado**.

| Token | Valor | Uso |
|-------|-------|-----|
| `--fundo` | `#14180f` | Fundo da página |
| `--fundo-painel` | `#11170d` (com transparência) | Painéis escuros, cabeçalho |
| `--pergaminho` | `#f4e9c6` | Casas do tabuleiro e painel de pistas |
| `--pergaminho-escuro` | `#ded8b8` | Faixas alternadas, rodapé de painel |
| `--tinta` | `#17140e` | Texto sobre pergaminho |
| `--ouro` | `#ffc348` | Títulos, números das pistas, destaques |
| `--laranja` | `#ff941b` → `#d95408` | Botão primário (gradiente) |
| `--contorno` | `#7a8667` | Bordas de painéis e botões secundários |
| `--acerto` | verde sóbrio | Palavra correta após conferir |
| `--erro` | vermelho queimado | Palavra incorreta após conferir |

Tipografia: `Tahoma, Verdana, sans-serif` (fonte de sistema, sem download), com títulos em
caixa alta, peso alto e `letter-spacing` aumentado.

### 6.2 Organização da tela

- **Cabeçalho:** título do jogo em dourado, subtítulo com a disciplina.
- **Barra de ações:** placar `X de 16 palavras` à esquerda; botões **Conferir** (laranja, em
  destaque) e **Reiniciar** (secundário, escuro) à direita.
- **Área principal:** tabuleiro em CSS Grid à esquerda; painel de pistas à direita, dividido em
  **Horizontais** e **Verticais**. Em telas estreitas, o painel desce para baixo do tabuleiro.
- **Rodapé:** aviso de projeto acadêmico e link do repositório.

### 6.3 Estados visuais das casas

| Estado | Aparência |
|--------|-----------|
| Bloqueada | Fundo escuro, sem borda interna, não focável |
| Vazia | Pergaminho, borda fina escura |
| Ativa | Contorno dourado e leve brilho |
| Palavra ativa | Pergaminho levemente dourado nas demais casas da palavra |
| Correta | Fundo verde suave, letra escura |
| Incorreta | Fundo avermelhado, letra escura |
| Incompleta | Contorno tracejado, sem preenchimento colorido |

### 6.4 Mensagens

- Após conferir: `8 de 16 palavras corretas.`
- Vitória: `Parabéns! Você completou a cruzadinha.`
- Sem nenhuma letra digitada ao conferir: `Preencha ao menos uma palavra antes de conferir.`

## 7. Critérios de aceitação

1. O tabuleiro exibe as 16 palavras da lista oficial e cada uma cruza com ao menos uma outra.
2. As pistas aparecem numeradas e separadas em Horizontais e Verticais, coerentes com os
   números mostrados nas casas do tabuleiro.
3. Clicar numa casa jogável e digitar uma letra escreve a letra em maiúscula e move o cursor
   para a próxima casa da mesma palavra.
4. Casas bloqueadas não recebem foco nem aceitam digitação.
5. O botão **Conferir** marca visualmente, e de forma distinta, as palavras corretas e as
   incorretas.
6. O contador mostra o número de palavras corretas no formato `X de 16 palavras`.
7. O botão **Reiniciar** limpa todas as letras, remove as marcações e zera o contador.
8. Nenhuma pista contém a resposta, parte dela ou a sigla por extenso, e nenhuma ultrapassa
   15 palavras.
9. O projeto usa apenas HTML, CSS e JavaScript puros, com `index.html` na raiz e sem
   dependências externas.
10. O site abre corretamente pelo link do GitHub Pages em uma janela anônima.
11. O repositório tem no mínimo 6 commits, em pelo menos 2 dias diferentes, no padrão
    `tipo: descrição`.
12. O `README.md` traz o nome do jogo, como jogar, a lista de palavras com as pistas e o link
    publicado; nenhum dado pessoal consta no repositório.

## 8. Palavras e pistas

Grafia de tabuleiro em maiúsculas, sem acento e sem espaço. As 16 pistas estão escritas; o
tabuleiro usa todas as 16, encaixadas em uma grade de 13 x 16.

| # | Resposta | Letras | Pista |
|---|----------|--------|-------|
| 1 | CPU | 3 | Componente central que busca, decodifica e executa as instruções do programa. |
| 2 | ULA | 3 | Parte do processador responsável pelas contas e pelas comparações lógicas. |
| 3 | UC | 2 | Comanda o ritmo interno do processador e diz a cada parte o que fazer. |
| 4 | REGISTRADORES | 13 | Pequenos espaços internos do processador que guardam valores em uso imediato. |
| 5 | RAM | 3 | Memória volátil de trabalho que perde todo o conteúdo ao faltar energia. |
| 6 | ROM | 3 | Memória somente de leitura, gravada na fábrica e não alterável pelo usuário. |
| 7 | EEPROM | 6 | Chip regravável eletricamente que mantém configurações mesmo desligado. |
| 8 | FLASH | 5 | Tecnologia regravável em blocos usada em pendrives e cartões de memória. |
| 9 | CACHE | 5 | Memória pequena e muito rápida que adianta conteúdo usado com frequência. |
| 10 | MEMORIADEMASSA | 14 | Armazenamento permanente de grande capacidade, como discos rígidos e SSDs. |
| 11 | DMA | 3 | Técnica que deixa periféricos acessarem a memória sem ocupar o processador. |
| 12 | ADDRESSBUS | 10 | Caminho de mão única que indica qual posição da memória será acessada. |
| 13 | DATABUS | 7 | Caminho de mão dupla por onde trafega a informação entre processador e memória. |
| 14 | MICROCONTROLADOR | 16 | Chip único que reúne processamento, memória e portas de entrada e saída. |
| 15 | DUALCORE | 8 | Processador com dois centros de execução independentes no mesmo encapsulamento. |
| 16 | QUADCORE | 9 | Processador com quatro centros de execução independentes no mesmo encapsulamento. |

## 9. Plano de ação

Cada etapa é um commit. Distribuir em pelo menos 2 dias diferentes.

| # | Etapa | Entrega | Commit sugerido |
|---|-------|---------|-----------------|
| 1 | Base do projeto | `.gitignore`, `AGENTS.md`, `docs/especificacao.md`, `README.md` inicial | `docs: adiciona especificacao e guia do projeto` |
| 2 | Montagem do tabuleiro | Array `PALAVRAS` com posições validadas e esqueleto do `index.html` | `feat: define palavras, pistas e posicoes do tabuleiro` |
| 3 | Render da grade | Grade e numeração geradas por JS a partir de `PALAVRAS` | `feat: adiciona tabuleiro com 16 palavras cruzadas` |
| 4 | Pistas | Listas Horizontais e Verticais renderizadas e numeradas | `feat: exibe pistas horizontais e verticais` |
| 5 | Digitação | Entrada nas casas, avanço automático e navegação por teclado | `feat: permite digitar letras nas casas` |
| 6 | Conferência e placar | `conferir()`, marcação de certo/errado e contador `X de 16` | `feat: implementa botao Conferir e contador de acertos` |
| 7 | Reiniciar | Limpeza do tabuleiro, das marcações e do placar | `feat: implementa botao Reiniciar` |
| 8 | Identidade visual | Paleta, painéis, botões e estados visuais no `style.css` | `style: aplica identidade visual inspirada em Dofus` |
| 9 | Responsividade e polimento | Layout em celular, foco visível, mensagem de vitória | `style: ajusta layout para telas pequenas` |
| 10 | Documentação e publicação | README completo e GitHub Pages ativo | `docs: adiciona README com regras e link publicado` |
