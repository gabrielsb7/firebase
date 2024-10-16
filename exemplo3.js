//---------------------------------------------------------------
// Terceiro Exemplo de Execução Assíncrona. Agora com o uso do método then
//---------------------------------------------------------------

function devolvePromise(token) {
  // Retorna um objeto Promise. Observe que na área do 1o parâmetro do construtor 
  // temos a declaração da função que a promise vai executar. Diferentemente do 
  // exemplo colocado no arquivo exemplo2.js, estamos definindo a função na área 
  // do parâmetro, ao invés de declarar a função fora desse lugar. 
  return new Promise(
    function (resolve,reject) {
      setTimeout(() => { 
        let sorteio = Math.random() * 100;
        console.log("referência para resolve " + resolve);
        console.log("referência para reject " + reject);
        if(sorteio < 0)
          resolve("(" + sorteio + ") Resolvido após Timeout: " + token);
        else
          reject( "(" + sorteio + ") Rejeitado após o Timeout: " + token);
      }, 3000);     
    });  
}


//------------------------------------------------------//

function execQuandoResolve(value) { 
  // Essa função é executada pelo método 'then' caso a Promise tenha
  // executado com sucesso. O parâmetro 'value' é o que a Promise 
  // devolveu.
  console.log('Ok: ' + value); 
}

//------------------------------------------------------//

function execQuandoReject(value)  { 
  // Essa função é executada pelo método 'then' caso a Promise NÃO tenha
  // executado com sucesso. O parâmetro 'value' é o que a Promise 
  // devolveu.
  console.log('Falha: ' + value);
}

//------------------------------------------------------//

async function exemplo3() {
  try {
    console.log("Ponto 1");
    
    // Declando a variável 'objPromessa' que recebe o resultado de 'devolvePromise'
    // Essa função devolve uma Promise. 
    let objPromessa = devolvePromise("Ponto 1");
    // Mando para o objeto Promise a mensagem 'then'. O método 'then' da classe Promise
    // recebe dois parâmetros: o primeiro é uma referência para uma função que será executada
    // caso a Promise execute com sucesso ('resolved'). O segundo parâmetro (opcional) é uma 
    // referência para uma função que será executada caso a Promise NÃO tenha executado com
    // sucesso. Se não passarmos o 2o parâmetro e ocorrer o 'reject', será gerado uma exceção.
    // Observe que a execução final do then é ASSÍNCRONA; ou seja, a execução não ficará 
    // parada com o envio da mensagem 'then'. Assim, o 'then' é uma notificação do que a Promise
    // irá fazer ao final de sua execução positiva ou negativa.
    objPromessa.then( execQuandoResolve,  execQuandoReject) ;
    
    console.log("Ponto 2");

    // Observe na linha abaixo que não estamos declarando uma variável para receber o 
    // resultado de devolvePromise. Sem problemas! Essa função devolve uma Promise e
    // para ela mando a mensagem 'then'
    devolvePromise("Ponto 2").then( execQuandoResolve,  execQuandoReject) ;
    
    console.log("Ponto 3");

    // Observe que nesse exemplo, não estamos passando para a Promise o que ela fará 
    // caso o 'reject' ocorra. Se 'reject' ocorrer, então será gerada uma exceção e
    // código vai ser abortado, caso o contexto desse try tiver terminado.
    devolvePromise("Ponto 3").then( execQuandoResolve );
    
    console.log("Ponto 4");

    // No caso abaixo, não estamos usando o método 'then'; estamos acessando o resultado
    // da Promise usando o await.
    let resultado = await devolvePromise("Ponto 4") ;
    
    console.log("Ponto 5:" + resultado);

  }
  catch(e) { 
    console.log('Erro: ' + e);
  }
}

//------------------------------------------------------//

exemplo3();
