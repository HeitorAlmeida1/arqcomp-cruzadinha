/**
 * Cruzadinha de Arquitetura Computacional
 *
 * Bloco 1 - Dados
 * Bloco 2 - Montagem do modelo a partir dos dados
 * Bloco 3 - Render do tabuleiro
 */

'use strict';

/* ------------------------------------------------------------------ *
 * Bloco 1 - Dados
 *
 * Cada palavra declara a resposta (maiuscula, sem acento e sem espaco),
 * a pista e a posicao inicial na grade. `linha` e `coluna` sao indices
 * iniciados em zero; `direcao` e 'H' (horizontal) ou 'V' (vertical).
 *
 * O tabuleiro inteiro e derivado deste array: grade, numeracao, listas
 * de pistas e gabarito. Para alterar o jogo, altere apenas aqui.
 * ------------------------------------------------------------------ */

const PALAVRAS = [
  {
    resposta: 'REGISTRADORES',
    pista: 'Pequenos espacos internos do processador que guardam valores em uso imediato.',
    linha: 0, coluna: 1, direcao: 'V',
  },
  {
    resposta: 'EEPROM',
    pista: 'Chip regravavel eletricamente que mantem configuracoes mesmo desligado.',
    linha: 0, coluna: 15, direcao: 'V',
  },
  {
    resposta: 'MEMORIADEMASSA',
    pista: 'Armazenamento permanente de grande capacidade, como discos rigidos e SSDs.',
    linha: 1, coluna: 0, direcao: 'H',
  },
  {
    resposta: 'ADDRESSBUS',
    pista: 'Caminho de mao unica que indica qual posicao da memoria sera acessada.',
    linha: 1, coluna: 13, direcao: 'V',
  },
  {
    resposta: 'MICROCONTROLADOR',
    pista: 'Chip unico que reune processamento, memoria e portas de entrada e saida.',
    linha: 3, coluna: 0, direcao: 'H',
  },
  {
    resposta: 'CPU',
    pista: 'Componente central que busca, decodifica e executa as instrucoes do programa.',
    linha: 3, coluna: 5, direcao: 'V',
  },
  {
    resposta: 'QUADCORE',
    pista: 'Processador com quatro centros de execucao independentes no mesmo encapsulamento.',
    linha: 5, coluna: 4, direcao: 'H',
  },
  {
    resposta: 'RAM',
    pista: 'Memoria volatil de trabalho que perde todo o conteudo ao faltar energia.',
    linha: 6, coluna: 1, direcao: 'H',
  },
  {
    resposta: 'UC',
    pista: 'Comanda o ritmo interno do processador e diz a cada parte o que fazer.',
    linha: 7, coluna: 5, direcao: 'V',
  },
  {
    resposta: 'FLASH',
    pista: 'Tecnologia regravavel em blocos usada em pendrives e cartoes de memoria.',
    linha: 7, coluna: 10, direcao: 'H',
  },
  {
    resposta: 'DUALCORE',
    pista: 'Processador com dois centros de execucao independentes no mesmo encapsulamento.',
    linha: 8, coluna: 1, direcao: 'H',
  },
  {
    resposta: 'CACHE',
    pista: 'Memoria pequena e muito rapida que adianta conteudo usado com frequencia.',
    linha: 8, coluna: 15, direcao: 'V',
  },
  {
    resposta: 'ULA',
    pista: 'Parte do processador responsavel pelas contas e pelas comparacoes logicas.',
    linha: 9, coluna: 13, direcao: 'H',
  },
  {
    resposta: 'ROM',
    pista: 'Memoria somente de leitura, gravada na fabrica e nao alteravel pelo usuario.',
    linha: 10, coluna: 1, direcao: 'H',
  },
  {
    resposta: 'DATABUS',
    pista: 'Caminho de mao dupla por onde trafega a informacao entre processador e memoria.',
    linha: 10, coluna: 7, direcao: 'H',
  },
  {
    resposta: 'DMA',
    pista: 'Tecnica que deixa perifericos acessarem a memoria sem ocupar o processador.',
    linha: 10, coluna: 7, direcao: 'V',
  },
];

/* ------------------------------------------------------------------ *
 * Bloco 2 - Montagem do modelo
 *
 * Transforma o array de dados em uma estrutura pronta para renderizar:
 * dimensoes da grade, matriz de celulas e palavras numeradas.
 * ------------------------------------------------------------------ */

/** Deslocamento por passo, conforme a direcao da palavra. */
function passo(direcao) {
  return direcao === 'V' ? { dLinha: 1, dColuna: 0 } : { dLinha: 0, dColuna: 1 };
}

/** Coordenadas ocupadas por uma palavra, da primeira a ultima letra. */
function coordenadasDa(palavra) {
  const { dLinha, dColuna } = passo(palavra.direcao);
  return Array.from({ length: palavra.resposta.length }, (_, i) => ({
    linha: palavra.linha + dLinha * i,
    coluna: palavra.coluna + dColuna * i,
    letra: palavra.resposta[i],
    indice: i,
  }));
}

/**
 * Numera as casas iniciais em ordem de leitura (cima -> baixo, esquerda ->
 * direita). Uma casa que inicia uma palavra horizontal e uma vertical
 * recebe um unico numero, compartilhado pelas duas pistas.
 */
function numerarInicios(palavras) {
  const chaves = palavras.map((p) => `${p.linha},${p.coluna}`);
  const unicas = [...new Set(chaves)];

  unicas.sort((a, b) => {
    const [la, ca] = a.split(',').map(Number);
    const [lb, cb] = b.split(',').map(Number);
    return la - lb || ca - cb;
  });

  return new Map(unicas.map((chave, indice) => [chave, indice + 1]));
}

/**
 * Constroi o modelo completo do jogo.
 * @returns {{
 *   linhas: number,
 *   colunas: number,
 *   celulas: Map<string, object>,
 *   palavras: object[]
 * }}
 */
function construirModelo(dados) {
  const numeros = numerarInicios(dados);
  const celulas = new Map();

  const palavras = dados.map((dado, indice) => ({
    id: `p${indice}`,
    resposta: dado.resposta,
    pista: dado.pista,
    linha: dado.linha,
    coluna: dado.coluna,
    direcao: dado.direcao,
    numero: numeros.get(`${dado.linha},${dado.coluna}`),
    coordenadas: coordenadasDa(dado),
  }));

  for (const palavra of palavras) {
    for (const { linha, coluna, letra, indice } of palavra.coordenadas) {
      const chave = `${linha},${coluna}`;
      const celula = celulas.get(chave) || {
        chave,
        linha,
        coluna,
        letra,
        numero: numeros.get(chave),
        palavras: [],
      };

      celula.palavras.push({ id: palavra.id, indice });
      celulas.set(chave, celula);
    }
  }

  const linhas = Math.max(...[...celulas.values()].map((c) => c.linha)) + 1;
  const colunas = Math.max(...[...celulas.values()].map((c) => c.coluna)) + 1;

  return { linhas, colunas, celulas, palavras };
}

const MODELO = construirModelo(PALAVRAS);

/* ------------------------------------------------------------------ *
 * Bloco 3 - Render do tabuleiro
 *
 * A grade e escrita inteiramente por JavaScript a partir do MODELO.
 * Casas jogaveis recebem um <input> de uma letra; as demais sao
 * casas bloqueadas, apenas decorativas.
 * ------------------------------------------------------------------ */

const elementos = {
  tabuleiro: document.getElementById('tabuleiro'),
  placarNumero: document.getElementById('placar-numero'),
  placarTotal: document.getElementById('placar-total'),
};

/** Guarda o <input> de cada casa jogavel, indexado por "linha,coluna". */
const entradas = new Map();

function criarCasaBloqueada() {
  const casa = document.createElement('div');
  casa.className = 'casa casa--bloqueada';
  casa.setAttribute('role', 'presentation');
  return casa;
}

function criarCasaJogavel(celula) {
  const casa = document.createElement('div');
  casa.className = 'casa';
  casa.setAttribute('role', 'gridcell');

  if (celula.numero !== undefined) {
    const numero = document.createElement('span');
    numero.className = 'casa__numero';
    numero.textContent = celula.numero;
    numero.setAttribute('aria-hidden', 'true');
    casa.append(numero);
  }

  const entrada = document.createElement('input');
  entrada.className = 'casa__entrada';
  entrada.type = 'text';
  entrada.maxLength = 1;
  entrada.inputMode = 'text';
  entrada.autocomplete = 'off';
  entrada.autocapitalize = 'characters';
  entrada.spellcheck = false;
  entrada.dataset.linha = celula.linha;
  entrada.dataset.coluna = celula.coluna;
  entrada.setAttribute('aria-label', descreverCasa(celula));

  casa.append(entrada);
  entradas.set(celula.chave, entrada);
  return casa;
}

/** Rotulo acessivel: lista as palavras as quais a casa pertence. */
function descreverCasa(celula) {
  const partes = celula.palavras.map(({ id, indice }) => {
    const palavra = MODELO.palavras.find((p) => p.id === id);
    const sentido = palavra.direcao === 'H' ? 'horizontal' : 'vertical';
    return `letra ${indice + 1} da pista ${palavra.numero} ${sentido}`;
  });
  return partes.join(', ');
}

function renderizarTabuleiro() {
  const fragmento = document.createDocumentFragment();

  for (let linha = 0; linha < MODELO.linhas; linha++) {
    const faixa = document.createElement('div');
    faixa.className = 'tabuleiro__linha';
    faixa.setAttribute('role', 'row');

    for (let coluna = 0; coluna < MODELO.colunas; coluna++) {
      const celula = MODELO.celulas.get(`${linha},${coluna}`);
      faixa.append(celula ? criarCasaJogavel(celula) : criarCasaBloqueada());
    }
    fragmento.append(faixa);
  }

  elementos.tabuleiro.style.setProperty('--colunas', MODELO.colunas);
  elementos.tabuleiro.replaceChildren(fragmento);
}

function iniciar() {
  elementos.placarTotal.textContent = MODELO.palavras.length;
  elementos.placarNumero.textContent = '0';
  renderizarTabuleiro();
}

iniciar();
