import React, {Component} from 'react';
import DadosGerais from '../../../resource/DADOS_GERAIS.json'

export default class ClassGeral extends Component { 

    constructor(nomeClassificacao){
        if(nomeClassificacao == undefined){
            throw new Error("Nome de classificação indefinido");
        }else{
            //nothing to do in here
        }
        super();
        this.classificacao = nomeClassificacao;
        console.log(DadosGerais);
        console.log("criando classificação: " + nomeClassificacao);
    }
}