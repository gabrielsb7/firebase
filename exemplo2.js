//---------------------------------------------------------------
// Segundo Exemplo de Execução Assíncrona. Agora COM Promise
//---------------------------------------------------------------


var tokenGlobal;

//---------------------------------------------------------------

function outraFuncConteudoPromise(resolve, reject) {
  //
  // Exemplo de uso da função assíncrona vinculado a uma Promise com setTimeout
  //
  function execAposTimeout() { 
    let sorteio = Math.random() * 100;
    console.log("referência para resolve " + resolve);
    console.log("referência para reject " + reject);
    if(sorteio < 80)
      resolve("(" + sorteio + ") Resolvido após Timeout: " + tokenGlobal);
    else
      reject( "(" + sorteio + ") Rejeitado após o Timeout: " + tokenGlobal);
    }
  
    setTimeout(execAposTimeout, 5000);
  
    console.log("O setTimeout foi disparado! É que ele internamente usa Promise :) ");
}

//---------------------------------------------------------------

function funcConteudoPromise(resolve, reject) {
  // 1. Esta é a função que o objeto Promise irá executar. Observe que ao instanciarmos
  //    a Promise (abaixo na função funcDevolvePromise) passamos a referência para 
  //    'funcConteudoPromise'
  // 2. Por definição, a função que a Promise recebe como parâmetro em seu construtor 
  //    deve receber dois parâmetros: resolve e reject. Não precisa ter exatamente esses nomes.
  //    O primeiro parâmetro é uma referência para uma função (escrita em código nativo) que
  //    devolve o resultado da Promise se ela foi bem sucedida ('resolve'). O segundo parâmetro é uma 
  //    referência para uma função que devolve o resultado se a Promise tiver algum problema ('reject')
  // 3. Se 'reject' ocorrer, será gerada uma exceção; logo o contexto de uso do objeto Promise
  //    com await deve estar em um bloco de try/catch
  // 4. A FUNÇÃO EXECUTORA COMEÇA A SER EXECUTADA NO MESMO MOMENTO QUE A PROMISE É INSTANCIADA; porém
  //    você só conseguirá pegar o 'result' com await <objPromise>(nesse caso a função onde esse await
  //    estiver presente deverá ser async e irá para MicroTask Queue) ou com o then() (que também irá
  //    para a MicroTask Queue)
  
  let sorteio = Math.random() * 100;
  console.log("referência para resolve " + resolve);
  console.log("referência para reject " + reject);
  if(sorteio < 50)
    resolve("RESOLVED: (" + sorteio + ") : " + tokenGlobal);
  else
    reject("REJECTED: (" + sorteio + ") : " + tokenGlobal);
}

//---------------------------------------------------------------

function funcDevolvePromise(token) {
  tokenGlobal = token;
    
  // * Na Promise, o contexto de execução da função indicada no construtor 
  //   de Promise ('funcConteudoPromise') será Assíncrono!
  // * Para instanciarmos um objeto Promise, passamos a referência para uma função
  //   que em sua declaração recebe dois parâmetros (ver o código da função acima)
  // return new Promise(funcConteudoPromise);  
  
  // * Troque a instrução acima por esta abaixo para você ver outra função 
  //   que poderia ser associada à Promise. No caso desta função, estamos usando 
  //   a função setTimeout
  return new Promise(funcConteudoPromise);  
}

//---------------------------------------------------------------

async function exemplo () {
  try {
    // * A variável 'promessa' receberá o resultado da função funcDevolvePromise
    //   que devolverá um objeto 'Promise'.
    
    let promessa = funcDevolvePromise('X');
    
    // * Só temos duas formas de pegar o conteúdo do resultado de uma promessa. Não é 
    //   acessando a variável; a forma apresentada neste exemplo é o uso do await (no
    //   próximo exemplo mostraremos a outra forma: uso do método 'then'). Assim, na 
    //   instrução abaixo não conseguiremos listar o resultado da promessa.
    console.log( "pré A) resultado = " + promessa.then((e) => {console.log(2)} ));   // Imprime [Object Promise]
    
    // * Abaixo temos uma das formas de acessar o resultado da promessa: o uso do await.
    //   Nesse caso, recuperamos o resultado se for positivo; ou seja, se o 'resolve'
    //   foi utilizado. Se der problema ('reject'), recuperamos o resultado com o uso 
    //   do catch (colocado no final desta função exemplo)
    let resultadoDaPromessa = await promessa;
    console.log( "a) resultado = " +  resultadoDaPromessa); // Lista o resultado
    console.log('ESTOU NO MEIO');
    console.log( "pré b) resultado = " + promessa );   // Lista [Object Promise] de novo
    console.log( "b) resultado = " + await promessa ); // Lista o resultado de novo
    
    // * Como a promessa só é executada uma única vez, vamos chamar novamente a função 
    //  'funcDevolvePromise' para termos uma nova promessa
    promessa = funcDevolvePromise('Y');
    console.log(  "Chamando funcProm com Y " + promessa ); // Lista [Object Promise] 
    console.log( "c) resultado = " + await promessa );     // Lista o resultado
  }
  catch(error) { 
    console.log("DEU ERRO: " + error );  
    //alert('Erro:' + error);
  }
}

//---------------------------------------------------------------

// * Solicito a execução da função 'exemplo'. Como ela trabalhará com 'Promise', ela precisa
//   ser assíncrona
exemplo();

// * Escrevo na console a mensagem. Observe que poderá haver outras coisas sendo escritas na 
//   console após o texto abaixo, caso a 'Promise' não seja resolvida rapidamente
console.log("Após a chamada de exemplo...");

