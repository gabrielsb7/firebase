class No {
  constructor() {
  }
  //-----------------------------------------------------------------------------------------//
  imprimir(nivel) {
    throw new Error('Método não implementado');
  }
}

//-----------------------------------------------------------------------------------------//

class Literal extends No {
  constructor(v) {
    super();
    if(!Literal.validarValor(v))
      throw new Error('Valor inválido na criação da literal');
    this.valor = v;
  }
  
  imprimir(nivel) {
    let tab = "";
    for(let i = 0; i < nivel; i++)
      tab += '\t';   
    console.log(tab + this.valor);
  }
  
  static validarValor(v) {
    if(typeof(v) != 'number')
      return false;
    return true;
  }
}
//-----------------------------------------------------------------------------------------//

class Operador extends No {
  constructor(op) {
    super();
    if(!Operador.validarOperador(op))
      throw new Error('Operador inválido');   
    this.operador = op;
  }

  setDireita(noDireita) {
    if(!Operador.validarNo(noDireita))
      throw new Error('Nó à Direita inválido');    
    this.direita  = noDireita;
  }
  
  getDireita() {
    return this.direita;
  }
  
  setEsquerda(noEsquerda) {
    if(!Operador.validarNo(noEsquerda))
      throw new Error('Nó à Esquerda inválido');
    this.esquerda = noEsquerda;
  }
  
  getEsquerda() {
    return this.esquerda;
  }
  
  getOperador() {
    return this.operador;
  }

  imprimir(nivel) {
    let tab = "";
    this.esquerda.imprimir(nivel + 1);    
    for(let i = 0; i < nivel; i++)
      tab += '\t';    
    console.log(tab + this.operador);
    this.direita.imprimir(nivel + 1);    
  }
  
  static validarOperador(op) {
    if(op != '+' && op != '-' && op != '*' && op != '/')
      return false;
    return true;
  }

  static validarNo(n) {
    if(n instanceof Operador || n instanceof Literal)
      return true;
    return false;
  }
}
//-----------------

let l9 = new Literal(9);
let l2 = new Literal(2);
let l5 = new Literal(5);
let l7 = new Literal(7);

let op1 = new Operador("/");
let op2 = new Operador("*");
let op3 = new Operador("+");

let lista = [l9,op1,l2,op2,l5,op3,l7]; // 9 / 2 * 5 + 7

//-------------------

function resolver() {
  //
  // Resolvendo todos os operadores de * e /
  //
  for(let i = 0; i < lista.length;i++) {
    // se o nó é um operador que não foi resolvido (ou seja, não tem filhos)
    if(lista[i].constructor.name == 'Operador' && lista[i].getEsquerda() == undefined) {        
        if(lista[i].getOperador() == '/' ||  lista[i].getOperador() == '*') {
          lista[i].setEsquerda(lista[i-1]);
          lista[i].setDireita(lista[i+1]);
          lista.splice(i-1,1);
          lista.splice(i,1);
      }
    }

    //
    // Resolvendo todos os operadores de + e -
    //
    i = 0;
    while(lista.length > 1) {
      // se o nó é um operador que não foi resolvido (ou seja, não tem filhos)
      if(lista[i].constructor.name == 'Operador' && lista[i].getEsquerda() == undefined) {        
        { // soma ou subtracao
          lista[i].setEsquerda(lista[i-1]);
          lista[i].setDireita(lista[i+1]);
          lista.splice(i-1,1);
          lista.splice(i,1);
        }
      }    
    }
  }
}

resolver(lista);

lista[0].imprimir(0);

console.log("1" == 1)
console.log("1" === 1)
