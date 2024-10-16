// Determino que a declaração das variáveis e constantes deverão ser feitas com o uso de 
// 'var' ou 'let' ou 'const'
"use strict"; 

// Criando a classe Teste. Ela terá somente um único atributo (nome). Observe que, em javascript,
// não é necessário formalmente indicar a presença dele. Basta usá-lo no código. Entretanto, 
// ele terá a visibilidade pública.
class Teste {
  //-----------------------------------------------------------------------------------------//
  // Construtor da classe Teste. O objeto recém-criado com new executará esse método no momento
  // de sua instanciação. Usamos o método construtor para fazer a inicialização do novo objeto
  //-----------------------------------------------------------------------------------------//  
  constructor(n) {
    // 1. Temos o envio da mensagem 'setNome' para o objeto referenciado por 'this'
    // 2. 'this' é uma referência para o objeto que estiver executando o método
    this.setNome(n);
  }
  
  //-----------------------------------------------------------------------------------------//
  // Método que retorna o estado do atributo nome do objeto Teste
  //-----------------------------------------------------------------------------------------//
  getNome() {
    return this.nome;
  }
   
  //-----------------------------------------------------------------------------------------//
  // Método que promove a alteração do estado do atributo nome, desde que o novo valor passado
  // seja aderente às regras de validação para esse atributo
  //-----------------------------------------------------------------------------------------//  
  setNome(nome) {
    // Se o valor passado não for válido, disparo uma exceção passando um objeto Error
    if(!Teste.validarNome(nome))
      throw new Error("Nome Inválido: " + nome);
    // promovo a alteração do estado do atributo nome, uma vez que passou pela verificação
    this.nome = nome;
  }
   
  //-----------------------------------------------------------------------------------------//
  /*
   * Método de validação de nome. É um método estático (ou seja, não preciso de uma instância
   * da classe Teste para sua execução) e aplica as regras que indicam se um nome é válido ou não.
   */
  //-----------------------------------------------------------------------------------------//
  static validarNome(nome) {
    // Se o tipo do parâmetro não for 'string', então o valor inválido!
    if(typeof(nome) !== 'string')
      return false;
    // Verifico se é uma string vazia. Não preciso verificar se é 'null' ou 'undefined'
    // pois com a verificação do tipo, não teremos essa possibilidade neste ponto
    if(nome == "") 
      return false;
    // verifico se a string tem mais de 40 caracteres
    if (nome.length > 40) 
      return false;
    // Abaixo temos a criação de um objeto Regex (expressão regular)  que é denotado por /...../
    const padraoNome = /[A-Z][a-z] */;
    // Verifico se a string recebida está aderente às regras do objeto Regex
    if (!padraoNome.test(nome)) 
      return false;
    return true;
  }
} // Fim da classe Teste

//----------------------------------------------------------------------------------------------//
// Exemplo de uso da classe Teste
try {
  // * Estamos declarando a variável local obj1 
  // * Instanciamos um novo objeto da classe Teste com o operador 'new'
  // * Missão do operador new: criar um novo objeto
  //   Ações: (1) Aloca memória para o novo objeto na HEAP
  //          (2) Solicita que o novo objeto execute o seu método construtor
  // * Se não ocorrer uma exceção, o operador de atribuição será executado. Assim, 
  //   a variável 'obj1' fará referência para o novo objeto criado.
  let obj1 = new Teste("João");
  // * JSON significa JavaScript Object Notation. É uma representação na forma de string de um 
  //   objeto Javascript. 
  // * O formato JSON basicamente tem as seguintes regras:
  //   1. Um objeto começa com { e fecha .
  //   2. Para cada atributo, temos a notação "atributo" : "valor",
  //   3. Se o valor for número, booleano, null, undefined ou objeto 
  //      não precisa de aspas
  //   4. Para representar arrays, usamos [ e ]
  // * Em JavaScript há a classe JSON. Essa possui o método estático stringify que retorna a 
  //   representação do objeto na forma de uma string codificada em JSON
  alert("Instanciou o objeto Teste: " + JSON.stringify(obj1));
  // * Observe que posso fazer a alteração do atributo sem usar o método setNome, pois o atributo
  //   é público
  obj1.nome = "XPTO!";
  // * Exibindo uma caixa de mensagem com o nome do objeto Teste
  alert("Nome do Objeto Teste: " + obj1.nome);
  // * Criamos uma variável 'obj2' que irá referenciar o mesmo objeto Teste que é referenciado 
  //   por 'obj1'. Repare que não "clonamos" o objeto; obj2 referenciará o mesmo que obj1
  let obj2 = obj1;
  obj2.nom = "Novo atributo";
  // * Altero o estado do atributo nome do objeto
  obj2.setNome("Maria");
  // * Escrevendo na console. Observe que obj1 e obj2 estão referenciando o mesmo objeto
  console.log(obj1);
  // * Vai disparar a exceção, pois 123 não é um valor válido para nome
  obj2.setNome(123);
}
catch(e) {
  // * informará que 'e' é um object (escreverá 'object')
  alert("Tipo de e: " + typeof(e));  
  // * Informará que o object executou o construtor da classe 'Error' (escreverá 'Error')
  alert("Tipo de e: " + e.constructor.name);  
  // * Mostro o objeto referenciado por 'e' e a stack de execução
  alert("Deu erro na instanciação de Teste\n-->" + e + "\nStack:\n" + e.stack);  
}
