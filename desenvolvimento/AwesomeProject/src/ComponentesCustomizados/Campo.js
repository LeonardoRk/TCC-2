import React, {Component} from 'react';
import {View, Text, Alert, Dimensions, StyleSheet} from 'react-native';
import LinhaCampo from './LinhaCampo';
import service from '../Service'

import Respostas from '../../resource/img/resposta/index';
import Perguntas from '../../resource/img/pergunta/index';


const QTD_LINHAS = 4;

requisitaImagens = (perguntas) => {
    let imagemPergunta = null;
    let imagemResposta = null;

    let arrayImagens = [];
    let chaveResposta = null;
    console.log("Número das perguntas : " + perguntas);
    for(let i = 0 ; i < perguntas.length; i++){
        
        imagemPergunta = Perguntas[perguntas[i]];
        chaveResposta = perguntas[i].toString() + "a";
        imagemResposta = Respostas[chaveResposta];
        arrayImagens.push(imagemPergunta);
        arrayImagens.push(imagemResposta);
    }
    let embaralhado = service.embaralha(arrayImagens);
    return embaralhado;
}

export default class Campo extends Component {

    state = {
        linha1:[], 
        linha2:[],
        linha3:[],
        linha4:[],
        qtdCartasViradas:0
    };

    componentDidMount(){
        this.arrayImagens = requisitaImagens(this.props.perguntas);
        console.log(this.arrayImagens);

        for(let i = 0 ; i < QTD_LINHAS; i++){
            let arrayPartido = this.arrayImagens.slice((i*5), [(i*5)+5]);
            if(i == 0){
                this.setState({linha1: arrayPartido});
            }else if(i == 1){
                this.setState({linha2: arrayPartido});                
            }else if(i == 2){
                this.setState({linha3: arrayPartido});                                
            }else if(i == 3){
                this.setState({linha4: arrayPartido});                                
            }else{
                throw new Error("Caso inexistente");
            }
        }
    }

    handleClick = (imgSrc, tipoClick) =>{
        
        if(tipoClick == "mostra"){
            this.setState({qtdCartasViradas: this.state.qtdCartasViradas + 1});
            if(this.state.qtdCartasViradas == 0){
                this.props.img1(imgSrc);
            }else if(this.state.qtdCartasViradas == 1){
                this.props.img2(imgSrc);
            }
        }else if(tipoClick == "esconde"){
            this.setState({qtdCartasViradas: this.state.qtdCartasViradas - 1});
            if(this.state.qtdCartasViradas == 1){
                this.props.img1(null);
            }else if(this.state.qtdCartasViradas == 2){
                this.props.img2(null);
            }
        }else{
            throw new Error("Caso imprevisto");
        }

     
    }

    render(){
        return(
            <View style={{flex:1}}>
                <LinhaCampo handle={this.handleClick} imagensLinha={this.state.linha1} alturaCampo={this.props.alturaCampo} />
                <LinhaCampo handle={this.handleClick} imagensLinha={this.state.linha2} alturaCampo={this.props.alturaCampo} />
                <LinhaCampo handle={this.handleClick} imagensLinha={this.state.linha3} alturaCampo={this.props.alturaCampo} />
                <LinhaCampo handle={this.handleClick} imagensLinha={this.state.linha4} alturaCampo={this.props.alturaCampo} />
            </View>
        );
    }
}