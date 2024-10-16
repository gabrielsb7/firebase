"use strict";

import Aluno from "../Aluno.js";
import DaoAluno from "../DaoAluno.js";

var aluno1 = new Aluno("1234",'123.456.789-09',"José da Silva",'jose@eu.com.br','(21)99999-9999');
var aluno2 = new Aluno("0123",'111.111.111-11',"Maria de Souza",'maria@eu.com.br','(21)98765-4321');

async function incluirAluno(aluno) {
  let dao = new DaoAluno();
  await dao.incluir(aluno);
}

async function listar() {
  let dao = new DaoAluno();
  let arrayAlunos = await dao.obterAlunos();
  console.log(JSON.stringify(arrayAlunos));
}

incluirAluno(aluno1);
incluirAluno(aluno2);
listar();
