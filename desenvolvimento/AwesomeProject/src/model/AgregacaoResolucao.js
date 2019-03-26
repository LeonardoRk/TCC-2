import React, {Component} from 'react';
import ResolucaoFactory from '../model/ResolucaoFactory'


const QUANTIDADE_PERGUNTAS = 10;

verificaExistencia = (array, numFigura) =>{
    let existe = false;
    for(let j = 0 ; j < array.length; j++){
        if(numFigura == array[j]){
            existe = true;
        }
    }
    return existe;
}

export default class AgregacaoResolucao extends Component{
    constructor(nomeFase){
        super();
        let objetoResolucao = ResolucaoFactory.constroiResolucao(nomeFase);
        let todasPerguntas = [];
        let numFigura = null;
        let jaExiste = false;
        for(let i = 0 ; i < QUANTIDADE_PERGUNTAS; i++){
            numFigura = objetoResolucao.figuraAleatoria();
            jaExiste = verificaExistencia(todasPerguntas, numFigura);
            while(jaExiste){
                numFigura = objetoResolucao.figuraAleatoria();
                jaExiste = verificaExistencia(todasPerguntas, numFigura);
            }
            todasPerguntas.push(numFigura);
        }
        console.log("Todas as perguntas selecionadas : " + todasPerguntas);
        this.todasAsPerguntas = todasPerguntas;
    }
}