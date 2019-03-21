import React, {Component} from 'react';
import ResolucaoFactory from '../model/ResolucaoFactory'


const QUANTIDADE_PERGUNTAS = 10;
export default class AgregacaoResolucao extends Component{
    constructor(nomeFase){
        super();
        let objetoResolucao = ResolucaoFactory.constroiResolucao(nomeFase);
        let todasPerguntas = [];
        for(let i = 0 ; i < QUANTIDADE_PERGUNTAS; i++){
            let numFigura = objetoResolucao.figuraAleatoria();
            todasPerguntas.push(numFigura);
        }
        console.log("Todas as perguntas selecionadas : " + todasPerguntas);
        this.todasAsPerguntas = todasPerguntas;
    }
}