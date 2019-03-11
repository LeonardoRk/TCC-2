import React, {Component} from 'react';

export default class ClassGeral extends Component { 

    constructor(nomeClassificacao){
        if(nomeClassificacao == undefined){
            throw new Error("Nome de classificação indefinido");
        }else{
            //nothing to do in here
        }
        super();
        this.classificacao = nomeClassificacao;
        console.log("criando classificação: " + nomeClassificacao);
    }
}