// função construtora
function Aluno(nome, faltas, notas) {
  // Variaveis locais da classe/objeto
  // a palavra reservada "this" referese ao proprio objeto
  this.nome = nome;
  this.faltas = faltas;
  this.notas = notas;

  /*
  OBS: Quando a função está dentro de um objeto (Classe), ela passa a se chamar Método 
   */
  // metodo de calculo de média
  (this.calcularMedia = function () {
    /* 
      A função reduce do JavaScript serve para iterar sobre um array e 
      utilizar o valor de cada item para criar um objeto final com base em alguma regra. 
      Como o próprio nome da função sugere, ela “reduz” os itens de um vetor a um valor único.
    */
    const soma = this.notas.reduce(function (acc, valorAtual) {
      return acc + valorAtual;
    });
    return soma / this.notas.length;
  }),
    // metodo que adiciona falta
    (this.adicionaFalta = function () {
      // o incremento está antes porque estamos adicionando mais um ao mesmo "tempo "
      // da execução do retorno, se não o return irá retorna o valor atual e só depois adicionar mais um
      // mas ai já não vale de nada.
      return ++this.faltas;
    });
}

// criando alunos com a função construtora
const aluno1 = new Aluno("Raphael", 4, [7.5, 8.5, 9, 8]);
const aluno2 = new Aluno("Maria", 6, [8.5, 8.5, 9, 10]);

// objeto literal
let curso = {
  nome: "DH",
  notaAprovacao: 7,
  faltasMaximas: 5,
  listaEstudantes: [aluno1, aluno2],
  // função para adicionar um aluno a lista de estudantes do objeto literal
  adicionarAluno(nome, faltas, notas) {
    const aluno = new Aluno(nome, faltas, notas);
    this.listaEstudantes.push(aluno);
  },
  // helper valida se um aluno em especifico foi aprovado ou não
  // utilizamos helper ou mais funções para reduzir o tanto de trabalho que só uma função tem que fazer
  // ou seja, em vez de nossa função "principal" - verificaAprovacao - ter que calcular media, adicionar falta e ainda
  // fazer uma cadeia de if para aprovar, agora ela só calcula media e adicona falta, e outra função faz o trabalho
  // de verificação - SRP
  checkSeAprovado(media, faltaMais1, aluno) {
    if (media >= this.notaAprovacao && faltaMais1 < this.faltasMaximas) {
      return this.listaEstudantes[aluno].nome + " esta aprovado(a)";
    } else if (
      faltaMais1 == this.faltasMaximas &&
      this.notaAprovacao * 1.1 < media
    ) {
      // notação com ponto para acessar atributo do objeto. Ex: Carro.roda
      return this.listaEstudantes[aluno].nome + " esta aprovado(a)";
    } else {
      // notação em array para aessar atributo do objeto. Ex: Carro.roda
      return this.listaEstudantes[aluno]["nome"] + " esta reprovado(a)";
    }
  },
  // verificando se aluno foi aprovado
  verificaAprovacao(aluno) {
    let media = this.listaEstudantes[aluno].calcularMedia();
    let faltaMais1 = this.listaEstudantes[aluno].adicionaFalta();
    // tentando e tratando, e se der erro mostra o erro, caso não der retorna o valor do helper
    try {
      return this.checkSeAprovado(media, faltaMais1, aluno);
    } catch (error) {
      console.log(error);
    }
  },
  //helper valida se todos os alunos na memoria estão aprovados ou não
  checkSeAprovados() {
    let alunosAprovados = [];
    for (let i = 0; i < this.listaEstudantes.length; i++) {
      let media = this.listaEstudantes[i].calcularMedia();
      let faltaMais1 = this.listaEstudantes[i].adicionaFalta();
      if (media >= this.notaAprovacao && faltaMais1 < this.faltasMaximas) {
        alunosAprovados.push(this.listaEstudantes[i].nome + ": " + true);
      } else if (
        faltaMais1 == this.faltasMaximas &&
        this.notaAprovacao * 1.1 < media
      ) {
        alunosAprovados.push(this.listaEstudantes[i].nome + ": " + true);
      } else {
        alunosAprovados.push(this.listaEstudantes[i]["nome"] + ": " + false);
      }
    }
    return alunosAprovados;
  },
  //verificando se alunos foram aprovados
  verificaAprovacoes() {
    // tentando e tratando, e se der erro mostra o erro, caso não der retorna o valor do helper
    try {
      return this.checkSeAprovados();
    } catch (error) {
      console.log(error);
    }
  },
};

curso.adicionarAluno("Felipe", 2, [5, 6, 7, 8]);
curso.adicionarAluno("Marcos", 0, [4, 5, 9, 7]);
curso.adicionarAluno("Dayana", 1, [7, 9, 9.5, 5]);
curso.adicionarAluno("Adrielly", 3, [8, 7, 6.5, 9]);
// console.log(curso.listaEstudantes)
//console.log(curso.verificaAprovacoes())
//console.log(curso.verificaAprovacao(5));
console.log(curso.listaEstudantes);
