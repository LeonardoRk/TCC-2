import React, {Component} from 'react';
import ClassGeral from './classificacao/ClasGeral';
import ClassTipo from './classificacao/ClassTipo';
import ClassSeparavel from './classificacao/ClassSeparavel';
import ClassOrdem from './classificacao/ClassOrdem';
import ClassLinearidade from './classificacao/ClassLinearidade';
import ClassHomog from './classificacao/ClassHomog';
import ClassExata from './classificacao/ClassExata';
import service from '../Service';

const QTD_TOTAL_PERGUNTA = 20;
const TIPO = "tipo";
const ORDEM = "ordem";
const HOMOGENEIDADE = "homogeneidade";
const LINEARIDADE = "linearidade";
const SEPARAVEL = "separavel";
const EXATA = "exata";

selecionaTodasPerguntas = (nomeAgregacao) => {
    let objetoConcretoClassificacao = null;
    switch(nomeAgregacao){
        case TIPO:
            objetoConcretoClassificacao = new ClassTipo(nomeAgregacao);
            break;
        case ORDEM:
            objetoConcretoClassificacao = new ClassOrdem(nomeAgregacao);
            break;
        case HOMOGENEIDADE:
            objetoConcretoClassificacao = new ClassHomog(nomeAgregacao);
            break;
        case LINEARIDADE:
            objetoConcretoClassificacao = new ClassLinearidade(nomeAgregacao);
            break;
        case SEPARAVEL:
            objetoConcretoClassificacao = new ClassSeparavel(nomeAgregacao);
            break;
        case EXATA:
            objetoConcretoClassificacao = new ClassExata(nomeAgregacao);
            break;
        default:
            throw new Error("Opção inexistente");
    }

    this.perguntasAleatorias = [];
    for(let i = 0 ; i < QTD_TOTAL_PERGUNTA ; i++){
         this.perguntasAleatorias.push(service.itemAleatorio(objetoConcretoClassificacao.perguntas));
    }
    console.log("Todas as perguntas aleatorias");
    console.log(this.perguntasAleatorias);
}

export default class AgregacaoClassificacao extends Component{

    constructor(nomeAgregacao){
        console.log("criando agregação: " + nomeAgregacao);
        super();
        if(nomeAgregacao == TIPO || nomeAgregacao == ORDEM || nomeAgregacao == HOMOGENEIDADE ||
            nomeAgregacao == LINEARIDADE || nomeAgregacao == SEPARAVEL || nomeAgregacao == EXATA){
                
            selecionaTodasPerguntas(nomeAgregacao);

        }else{
            console.log("criação de agregação inválido");
            throw new Error("Nome de Criação agregação inválido");
        }
    }
}