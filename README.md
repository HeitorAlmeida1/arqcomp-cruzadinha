# Cruzadinha de Arquitetura Computacional

Jogo de palavras cruzadas, jogável no navegador, sobre os termos de Arquitetura Computacional.
Leia a pista, descubra o termo e digite as letras direto nas casas do tabuleiro.

**Jogue aqui:** _(link do GitHub Pages — será adicionado após a publicação)_

> Atividade avaliativa da Sprint 3 da disciplina de Arquitetura Computacional.
> Site estático, feito com HTML, CSS e JavaScript puros, sem dependências externas.

## Como jogar

1. Leia as pistas, separadas em **Horizontais** e **Verticais**.
2. Clique na casa numerada correspondente à pista e digite a palavra. O cursor avança sozinho
   para a próxima casa.
3. Use as **setas** para mover o cursor e **Backspace** para apagar.
4. Clique em **Conferir** para ver quais palavras estão certas e quais estão erradas.
5. O contador mostra quantas palavras você já acertou (por exemplo, `8 de 14 palavras`).
6. Clique em **Reiniciar** para limpar o tabuleiro e começar de novo.

As respostas são escritas em **letras maiúsculas, sem acento e sem espaço** — por exemplo,
`MEMORIADEMASSA`.

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

> A lista acima cobre os 16 termos da atividade. O tabuleiro utiliza 14 deles, todos cruzados
> entre si. A relação final das palavras no tabuleiro está em
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

## Identidade visual

A aparência é inspirada no visual retrô de Dofus (painéis de pergaminho sobre fundo escuro,
detalhes dourados e botões em relevo), reproduzida inteiramente em CSS. Nenhum recurso gráfico,
fonte ou arte da Ankama é utilizado neste projeto, que não tem qualquer afiliação com a empresa.

## Licença e uso

Projeto acadêmico, criado para fins de estudo.
