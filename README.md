# Cruzadinha de Arquitetura Computacional

Jogo de palavras cruzadas, jogável no navegador, sobre os termos de Arquitetura Computacional.
Leia a pista, descubra o termo e digite as letras direto nas casas do tabuleiro.

**Jogue aqui:** _(link do GitHub Pages — será adicionado após a publicação)_

> Atividade avaliativa da Sprint 3 da disciplina de Arquitetura Computacional.
> Site estático, feito com HTML, CSS e JavaScript puros, sem dependências externas.

## Como jogar

1. Leia as pistas, separadas em **Horizontais** e **Verticais**.
2. Clique na pista (ou na casa numerada) e digite a palavra. O cursor avança sozinho para a
   próxima casa.
3. Clique em **Conferir** para ver quais palavras estão certas e quais estão erradas. Cada
   pista recebe um selo: *certa*, *errada* ou *faltam letras*.
4. O contador mostra quantas palavras você já acertou (por exemplo, `8 de 16 palavras`).
5. Clique em **Reiniciar** para limpar o tabuleiro e começar de novo.

As respostas são escritas em **letras maiúsculas, sem acento e sem espaço** — por exemplo,
`MEMORIADEMASSA`. Se você digitar com acento, o jogo converte sozinho (`ó` vira `O`).

### Atalhos de teclado

| Tecla | Ação |
|-------|------|
| Letras | Escreve na casa e avança para a próxima |
| Setas | Movem o cursor pelo tabuleiro, pulando as casas bloqueadas |
| Espaço | Troca entre a palavra horizontal e a vertical de um cruzamento |
| Tab / Shift+Tab | Vai para a próxima palavra / palavra anterior |
| Backspace | Apaga a letra e volta uma casa |
| Home / End | Vai para a primeira / última casa da palavra |

## Palavras e pistas

| Resposta | Pista |
|----------|-------|
| CPU | Componente central que busca, decodifica e executa as instruções do programa. |
| ULA | Parte do processador responsável pelas contas e pelas comparações lógicas. |
| UC | Comanda o ritmo interno do processador e diz a cada parte o que fazer. |
| REGISTRADORES | Pequenos espaços internos do processador que guardam valores em uso imediato. |
| RAM | Memória volátil de trabalho que perde todo o conteúdo ao faltar energia. |
| ROM | Memória somente de leitura, gravada na fábrica e não alterável pelo usuário. |
| EEPROM | Chip regravável eletricamente que mantém configurações mesmo desligado. |
| FLASH | Tecnologia regravável em blocos usada em pendrives e cartões de memória. |
| CACHE | Memória pequena e muito rápida que adianta conteúdo usado com frequência. |
| MEMORIADEMASSA | Armazenamento permanente de grande capacidade, como discos rígidos e SSDs. |
| DMA | Técnica que deixa periféricos acessarem a memória sem ocupar o processador. |
| ADDRESSBUS | Caminho de mão única que indica qual posição da memória será acessada. |
| DATABUS | Caminho de mão dupla por onde trafega a informação entre processador e memória. |
| MICROCONTROLADOR | Chip único que reúne processamento, memória e portas de entrada e saída. |
| DUALCORE | Processador com dois centros de execução independentes no mesmo encapsulamento. |
| QUADCORE | Processador com quatro centros de execução independentes no mesmo encapsulamento. |

> A lista acima cobre os 16 termos da atividade, e o tabuleiro utiliza todos eles, cruzados
> entre si numa grade de 13 x 16. O layout completo está em
> [docs/especificacao.md](docs/especificacao.md).

## Tecnologias

- HTML5, CSS3 e JavaScript puros (sem framework, sem build, sem bibliotecas)
- Git e GitHub
- GitHub Pages para publicação

## Estrutura do projeto

```
/
├── index.html              # Página do jogo
├── style.css               # Identidade visual e layout
├── script.js               # Palavras, pistas e lógica do jogo
├── AGENTS.md               # Guia técnico do projeto
├── .gitignore
└── docs/
    ├── especificacao.md        # Especificação e plano de ação
    └── modelo-especificacao.md # Modelo para novas especificações
```

## Executar localmente

Basta abrir o arquivo `index.html` no navegador — não há instalação nem build.

```bash
start index.html
```

Opcionalmente, para testar servido por HTTP, como no GitHub Pages:

```bash
npx serve .
```

## O tabuleiro

As 16 palavras foram encaixadas numa grade de **13 linhas por 16 colunas**, com **16
cruzamentos** — cada palavra cruza pelo menos uma outra. O layout foi gerado e validado por
script, garantindo que não exista nenhuma sequência de letras não intencional na grade e que
todas as interseções tenham letras coincidentes.

Todo o tabuleiro (casas, numeração, pistas e gabarito) é derivado de um único array `PALAVRAS`
em [script.js](script.js): para trocar uma palavra ou uma pista, basta editar esse array.

## Identidade visual

A aparência é inspirada no visual retrô de Dofus (painéis de pergaminho sobre fundo escuro,
detalhes dourados e botões em relevo), reproduzida inteiramente em CSS. Nenhum recurso gráfico,
fonte ou arte da Ankama é utilizado neste projeto, que não tem qualquer afiliação com a empresa.

## Licença e uso

Projeto acadêmico, criado para fins de estudo.
