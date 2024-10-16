// utils
//Adiciona espaçamento em árvore, galho e código assemblt
const nivelamento = (repeticoes) => '\t'.repeat(repeticoes);

//Checa e retorna o operador em assembly
const geraOperacao = (operador) => {
  const operadores = {
    '+': 'ADD',
    '-': 'SUBT',
    '*': 'MULT',
    '/': 'DIV',
    default: 'HALT'
  }

  return operadores[operador || 'default'];
}

//Valida se o operador faz parte do grupo de operadores
const validaOperador = (operador) => {
  const operadoresRegex = /^(\+|-|\*|\/|)$/;
  return operadoresRegex.test(operador);
};

//Valida se a literal é do tipo numérico
const validaLiterais = (...literais) => {
  return literais.some((literal) => typeof literal !== 'number');
};

//Valida se é uma classe de uma instância galho/árvore
const validaGalho = (...galhos) => {
  return galhos.every((galho) => galho instanceof Galho || galho instanceof Arvore);
};

// arvore
class Galho {
  constructor(operador, literalA, literalB) {
    if (!operador || !literalA || !literalB) {
      throw Error('Valores inválidos');
    } else if (!validaOperador(operador)) {
      throw Error('Operador inválido');
    } else if (validaLiterais(literalA, literalB)) {
      throw Error('Literal inválido');
    }
    this.literais = [literalA, literalB];
    this.operador = operador;
  }

  //Gera um galho a partir das literais e do operador
  gerarNo(nivel) {
    return this.literais.reduce((acc, literal, index) => {
      let expressao = `${nivelamento(nivel + 1)}${literal}\n`;
      if (index === 0) {
        expressao += `${nivelamento(nivel)}${this.operador}\n`;
      }
      return (acc += expressao);
    }, '');
  }

  //Gera código MOVE em assembly
  geraMove(...variaveis) {
    return variaveis.reduce((acc, variavel, index) => {
      return acc += `\tMOVE ${variavel}, ${this.literais[index]}\n`
    }, '');
  }

  //Gera o galho completo em assembly
  gerarASM(variavelA, variavelB) {
    const codigo = this.geraMove(variavelA, variavelB);
    const calculo = `\t${geraOperacao(this.operador)} ${variavelA}, ${variavelB}\n`

    return codigo + calculo;
  }
}

class Arvore {
  constructor(operador, noCima, noBaixo) {
    if (!operador || !noCima || !noBaixo) {
      throw Error('Valores inválidos');
    } else if (!validaOperador(operador)) {
      throw Error('Operador inválido');
    } else if (!validaGalho(noCima, noBaixo)) {
      throw Error('Galho/arvore inválido');
    }
    this.operador = operador;
    this.noCima = noCima;
    this.noBaixo = noBaixo;
  }
  
  //Gera um galho na árvore
  gerarNo(nivel) {
    return [this.noCima, this.noBaixo].reduce((acc, no, index) => {
      let expressao = no.gerarNo(nivel + 1);
      if (index === 0) {
        expressao += `${nivelamento(nivel)}${this.operador}\n`;
      }
      return acc += expressao;
    }, '');
  }

  //Gera código em assembly
  gerarASM(variavelA, variavelB) {
    return `\t${geraOperacao(this.operador)} ${variavelA}, ${variavelB}\n`
  }

  //Gera uma arvore completa a partir de galho ou outras árvores
  gerarArvore(nivel = 0) {
    const raiz = nivelamento(nivel) + this.operador;
    const cima = this.noCima.gerarNo(nivel + 1);
    const baixo = this.noBaixo.gerarNo(nivel + 1);
    console.log('Arvore:\n' + cima + raiz + baixo);
  }

  //Interpreta toda a árvore com seus métodos atribuidos e gera um código completo em assembly
  gerarCodigo() {
    let codigo = '';
    const variaveis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    const cima = this.geraLinhaASM(this.noCima, variaveis);
    codigo += cima.asm;
    variaveis.splice(cima.inicio, cima.fim);

    const baixo = this.geraLinhaASM(this.noBaixo, variaveis);
    codigo += baixo.asm;
    variaveis.splice(baixo.inicio, baixo.fim);

    codigo += this.gerarASM(cima.variavel, baixo.variavel);
    
    console.log('Codigo Assembly:\n' + codigo + '\tHALT');
  }

  //Checa a instância e atribui linhas de cada nó para o código em assembly
  geraLinhaASM(obj, variaveis) {
    let asm = '';
    if (obj instanceof Galho) {
      asm += obj.gerarASM(variaveis[0], variaveis[1]);
      return { asm , inicio: 0, fim: 2, variavel: variaveis[0] };
    } else {
      asm += obj.noCima.gerarASM(variaveis[0], variaveis[1]);
      asm += obj.noBaixo.gerarASM(variaveis[2], variaveis[3]);
      asm += obj.gerarASM(variaveis[0], variaveis[2]);
      return { asm, inicio: 0, fim: 4, variavel: variaveis[0] };
    }
  }
}

//Colocar em sequencia de prioridade para funcionamento correto
const galhoA = new Galho('*', 10, 10);
const galhoB = new Galho('*', 20, 20);
const galhoC = new Galho('/', 30, 30);

const arvore = new Arvore('-', galhoA, galhoB);
const arvore2 = new Arvore('+', arvore, galhoC);
arvore2.gerarArvore();
arvore2.gerarCodigo();

//https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript
