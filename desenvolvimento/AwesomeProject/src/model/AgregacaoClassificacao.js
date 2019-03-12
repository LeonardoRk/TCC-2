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
 
let objetoConcretoClassificacao = null;

selecionaTodasPerguntas = (nomeAgregacao) => {
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
    let perguntasAleatorias = [];
    for(let i = 0 ; i < QTD_TOTAL_PERGUNTA ; i++){
        perguntasAleatorias.push(service.itemAleatorio(objetoConcretoClassificacao.perguntas));
    }
    console.log("Todas as perguntas aleatorias");
    console.log(perguntasAleatorias);
    
    return perguntasAleatorias;
}

classificacaoDoisTipos = (perguntasAleatorias) => {
    console.log(objetoConcretoClassificacao.props.classificacao);

    let faseInteira = [];
    for(let i = 0 ; i < QTD_TOTAL_PERGUNTA ; i++){
        if(objetoConcretoClassificacao.props.classificacao == TIPO){
            console.log(i);
            console.log(perguntasAleatorias[i]);
            if(perguntasAleatorias[i] == "ordinaria"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoOrdinaria());
            }else if(perguntasAleatorias[i] == "parcial"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoParcial());
            }else{
                throw new Error("Caso inexistente");
            }
        }else{
            throw new Error("Caso inexistente");
        }
    }
    console.log(faseInteira);
    return faseInteira;
};

classificacaoQuatroTipos = () => {
    for(let i = 0 ; i < QTD_TOTAL_PERGUNTA ; i++){
        console.log("classificacao 4 tipos");
    }
}

selecionaCorretas = (faseInteira) => {
    let respostasCorretas = [];
    for (let j = 0 ; j < QTD_TOTAL_PERGUNTA ; j++){
        respostasCorretas.push(faseInteira[j]['correto']);
    }
    console.log("Figuras corretas: " + respostasCorretas);
    return respostasCorretas;
}

juntaCorretoErrado = (object) => {
    let juntos = [];
    juntos.push(object['correto']);
    juntos.push(object['errado'][0]);
    juntos.push(object['errado'][1]);
    juntos.push(object['errado'][2]);
   
    return juntos;
}

embaralha = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

juntaEmbaralhado = (faseInteira) => {
    embaralhado = [];
    for(let i = 0 ; i < QTD_TOTAL_PERGUNTA; i++){
        //console.log(i + '  ' + faseInteira[i]);
        embaralhado.push(embaralha(juntaCorretoErrado(faseInteira[i])));
    }
    console.log("Fase inteira embaralhada: " + embaralhado);
    return embaralhado;
}

export default class AgregacaoClassificacao extends Component{

    constructor(nomeAgregacao){
        console.log("criando agregação: " + nomeAgregacao);
        super();
        
        if(nomeAgregacao == TIPO || nomeAgregacao == ORDEM || nomeAgregacao == HOMOGENEIDADE ||
            nomeAgregacao == LINEARIDADE || nomeAgregacao == SEPARAVEL || nomeAgregacao == EXATA){
                
            this.perguntasAleatorias = selecionaTodasPerguntas(nomeAgregacao);

            if(objetoConcretoClassificacao.perguntas.length == 2){
                console.log("Variação de 2 itens");
                let faseInteira = classificacaoDoisTipos(this.perguntasAleatorias);
                this.respostasCorretas = selecionaCorretas(faseInteira);
                this.faseEmbaralhada = juntaEmbaralhado(faseInteira);

            }else if(objetoConcretoClassificacao.perguntas.length == 4){
                console.log("Variação de 4 itens -ORDEM-");
                classificacaoQuatroTipos();
            }else{
                throw new Error("Quantidade indefinida de perguntas");
            }
        }else{
            console.log("criação de agregação inválido");
            throw new Error("Nome de Criação agregação inválido");
        }
    }
}