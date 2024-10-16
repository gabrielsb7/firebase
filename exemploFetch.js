funcRequisicaoDois();  // Hoisting, pois a definição da função está abaixo

async function funcRequisicao() {
  var meuHeader = new Headers()
  let conf = { method: 'GET',
             headers: meuHeader,
             mode: 'cors',
             cache: 'default' };
  
  try {
    let resultado = await fetch("https://prjpwa-unilasalle.glitch.me/exemplo/simulacaoWS.txt",
                                conf);
  
    //console.log("requisicao = " + requisicao);
    //let resultado = await requisicao;
    console.log("resultado = " + resultado);
    let objetoJson = await resultado.json();
    //console.log("resultado.text = " + conteudo);
    //let objetoJson = JSON.parse(conteudo);
    console.log("Disciplina = " + objetoJson.Disciplina);
  }
  catch(e) {
    console.log("DEU XABU! " + e);
  }
}


function funcRequisicaoDois() {
  var meuHeader = new Headers()
  let conf = { method: 'GET',
             headers: meuHeader,
             mode: 'cors',
             cache: 'default' };
  
  fetch("https://prjpwa-unilasalle.glitch.me/exemplo/simulacaoWS.txt",conf)
    .then(meuResolve)
    .then(outroResolve)
    .catch(meuReject);  
}

// Função chamada pelo then da Promise que receberá por parâmetro o objeto Response
// com a resposta à requisição
function meuResolve(response) {
  console.log("resultado = " + response);
  return response.json();
}

// Função chamada pelo then da Promise vinculada à chamada de response.json(). O parâmetro
// é a conversão do texto em JSON para um objeto javascript. No nosso caso, esse objeto tem
// os atributos disciplina, professor e conjAlunos (ver o conteúdo do arquivo simulacaoWS.txt)
//
function outroResolve(obj) {
  console.log("Disciplina = " + obj.disciplina);
  console.log("Professor  = " + obj.professor);
  console.log("Alunos = " + obj.conjAlunos);
}

function meuReject(e) {
  console.log("DEU XABU! " + e); 
}
