import {Component} from 'react';
import ClassTipo from './classificacao/ClassTipo';
import ClassSeparavel from './classificacao/ClassSeparavel';
import ClassOrdem from './classificacao/ClassOrdem';
import ClassLinearidade from './classificacao/ClassLinearidade';
import ClassHomog from './classificacao/ClassHomog';
import ClassExata from './classificacao/ClassExata';
import service from '../Service';

const TIPO = "tipo";
const QTD_TOTAL_PERGUNTA = 20;
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
        console.log(i);
        console.log(perguntasAleatorias[i]);
        if(objetoConcretoClassificacao.props.classificacao == TIPO){
            if(perguntasAleatorias[i] == "ordinaria"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoOrdinaria());
            }else if(perguntasAleatorias[i] == "parcial"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoParcial());
            }else{
                throw new Error("Caso inexistente");
            }
        }else if(objetoConcretoClassificacao.props.classificacao == HOMOGENEIDADE){
            if(perguntasAleatorias[i] == "homogênea"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoDeHomogeneidade(objetoConcretoClassificacao.props.homogenea,
                                                                                    objetoConcretoClassificacao.edsNaoHomogena));
            }else if(perguntasAleatorias[i] == "NÃO homogênea"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoDeHomogeneidade(objetoConcretoClassificacao.edsNaoHomogena,
                                                                                    objetoConcretoClassificacao.props.homogenea));
            }else{
                throw new Error("Caso inexistente");
            }
        }else if(objetoConcretoClassificacao.props.classificacao == LINEARIDADE){
            if(perguntasAleatorias[i] == "linear"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoLinearidade(objetoConcretoClassificacao.props.linear,
                                                                                objetoConcretoClassificacao.props.naoLinear));
            }else if(perguntasAleatorias[i] == "NÃO linear"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoLinearidade(objetoConcretoClassificacao.props.naoLinear,
                                                                                objetoConcretoClassificacao.props.linear));
            }else{
                throw new Error("Caso inexistente");
            }
        }else if(objetoConcretoClassificacao.props.classificacao == SEPARAVEL){
            if(perguntasAleatorias[i] == "separável"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoDeSeparavel(objetoConcretoClassificacao.props.separavel,
                                                                                objetoConcretoClassificacao.edsNaoSeparavel));
            }else if(perguntasAleatorias[i] == "NÃO separável"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoDeSeparavel(objetoConcretoClassificacao.edsNaoSeparavel,
                                                                                objetoConcretoClassificacao.props.separavel));
            }else{
                throw new Error("Caso inexistente");
            }
        }else if(objetoConcretoClassificacao.props.classificacao == EXATA){
            if(perguntasAleatorias[i] == "exata"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoDeExatas(objetoConcretoClassificacao.props.exatas,
                                                                                objetoConcretoClassificacao.naoExatas));
            }else if(perguntasAleatorias[i] == "NÃO exata"){
                faseInteira.push(objetoConcretoClassificacao.conjuntoDeExatas(objetoConcretoClassificacao.naoExatas,
                                                                            objetoConcretoClassificacao.props.exatas));
            }else{
                throw new Error("Caso inexistente");
            }
        }else{
            throw new Error("Caso inexistente");
        }
    }
    console.log(faseInteira);
    return faseInteira;
}

classificacaoQuatroTipos = (perguntasAleatorias) => {
    console.log(objetoConcretoClassificacao.props.classificacao);
    let faseInteira = [];
    for(let i = 0 ; i < QTD_TOTAL_PERGUNTA ; i++){
        if(objetoConcretoClassificacao.props.classificacao == ORDEM){
            console.log(i);
            console.log(perguntasAleatorias[i]);
            let conjuntoDeOrdens = [];
            if(perguntasAleatorias[i] == "de ordem 1"){
                conjuntoDeOrdens = objetoConcretoClassificacao.conjuntoDeOrdens(objetoConcretoClassificacao.props.ordem1,
                                                                                objetoConcretoClassificacao.props.ordem2,
                                                                                objetoConcretoClassificacao.props.ordem3,
                                                                                objetoConcretoClassificacao.props.ordemSuperior);
                faseInteira.push(conjuntoDeOrdens);
            }else if(perguntasAleatorias[i] == "de ordem 2"){
                conjuntoDeOrdens = objetoConcretoClassificacao.conjuntoDeOrdens(objetoConcretoClassificacao.props.ordem2,
                                                                                objetoConcretoClassificacao.props.ordem1,
                                                                                objetoConcretoClassificacao.props.ordem3,
                                                                                objetoConcretoClassificacao.props.ordemSuperior);
                faseInteira.push(conjuntoDeOrdens);
            }else if(perguntasAleatorias[i] == "de ordem 3"){
                conjuntoDeOrdens = objetoConcretoClassificacao.conjuntoDeOrdens(objetoConcretoClassificacao.props.ordem3,
                                                                                objetoConcretoClassificacao.props.ordem1,
                                                                                objetoConcretoClassificacao.props.ordem2,
                                                                                objetoConcretoClassificacao.props.ordemSuperior);
                faseInteira.push(conjuntoDeOrdens);
            }else if(perguntasAleatorias[i] == "de ordem superior"){
                conjuntoDeOrdens = objetoConcretoClassificacao.conjuntoDeOrdens(objetoConcretoClassificacao.props.ordemSuperior,
                                                                                objetoConcretoClassificacao.props.ordem1,
                                                                                objetoConcretoClassificacao.props.ordem2,
                                                                                objetoConcretoClassificacao.props.ordem3);
                faseInteira.push(conjuntoDeOrdens);
            }else{
                throw new Error("Caso inexistente");
            }
        }else{
            throw new Error("Caso inexistente");
        }
    }
    console.log(faseInteira);
    return faseInteira;
}

selecionaCorretas = (faseInteira) => {
    let respostasCorretas = [];
    for (let j = 0 ; j < QTD_TOTAL_PERGUNTA ; j++){
        respostasCorretas.push(faseInteira[j]['correto']);
    }
    console.log("Figuras correctas: " + respostasCorretas);
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

juntaEmbaralhado = (faseInteira) => {
    embaralhado = [];
    for(let i = 0 ; i < QTD_TOTAL_PERGUNTA; i++){
        //console.log(i + '  ' + faseInteira[i]);
        embaralhado.push(service.embaralha(juntaCorretoErrado(faseInteira[i])));
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
                let faseInteira = classificacaoQuatroTipos(this.perguntasAleatorias);
                this.respostasCorretas = selecionaCorretas(faseInteira);
                this.faseEmbaralhada = juntaEmbaralhado(faseInteira);
            }else{
                throw new Error("Quantidade indefinida de perguntas");
            }
        }else{
            console.log("criação de agregação inválido");
            throw new Error("Nome de Criação agregação inválido");
        }
        objetoConcretoClassificacao.constructor(objetoConcretoClassificacao.props.classificacao);
    }

    nome(){
        return "blue";
    }
}

resetaObjetoClassificacao = (nomeAgregacao) => {
    let novoObjeto = null;
    switch(nomeAgregacao){
        case TIPO:
            novoObjeto = new ClassTipo(nomeAgregacao);
            break;
        case ORDEM:
            novoObjeto = new ClassOrdem(nomeAgregacao);
            break;
        case HOMOGENEIDADE:
            novoObjeto = new ClassHomog(nomeAgregacao);
            break;
        case LINEARIDADE:
            novoObjeto = new ClassLinearidade(nomeAgregacao);
            break;
        case SEPARAVEL:
            novoObjeto = new ClassSeparavel(nomeAgregacao);
            break;
        case EXATA:
            novoObjeto = new ClassExata(nomeAgregacao);
            break;
        default:
            throw new Error("Opção inexistente");
    }
    return novoObjeto;
}