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
    return arrayImagens;
}
mapeiaCartas = (temporario) =>{
    let mapeado = {};
    for(let j = 0 ; j < temporario.length; j+=2){
        mapeado[temporario[j]] = temporario[j+1];
    }
    return mapeado;
}

export default class Campo extends Component {

    state = {
        linha1:[], 
        linha2:[],
        linha3:[],
        linha4:[],
        qtdCartasViradas:0,
        cartasVirada:[null, null]
    };

    componentDidMount(){
        let temporario = requisitaImagens(this.props.perguntas);
        this.mapeado = mapeiaCartas(temporario);
        this.arrayImagens = service.embaralha(temporario);
        console.log(this.arrayImagens);
        console.log("O mapeado: ");
        console.log(this.mapeado);

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

    validarJogo = () => {
        let ehChave = false;
        let posicao = null;
        let par = false;
        Object.keys(this.mapeado).map((key, index) => {
            if(this.state.cartasVirada[0].props.imgSrc == key){
                ehChave = true;
                posicao = index;
            }
        });


        if(ehChave){
            if(this.state.cartasVirada[1].props.imgSrc == this.mapeado[posicao]){
                par = true;
            }
        }else if(!ehChave){
            let ehValor = false;
            let indice = null;
            for(let j = 0 ; j < this.mapeado.length; j++){
                if(this.state.cartasVirada[0].props.imgSrc == this.mapeado[j]){
                    ehValor = true;
                    indice = j;
                }
            }
            if(ehValor){
                Object.keys(this.mapeado).map((key, index) => {
                    if(index == indice){
                        if(this.state.cartasVirada[1].props.imgSrc == key){
                            par = true;
                        }
                    }
                });
            }
        }else{
            throw new Error("Sem outra opção");
        }
        return par;
    }

    handleClick = (carta, estadoMostrar) =>{
        //Alert.alert("no handle");
        if(estadoMostrar){
            this.setState({qtdCartasViradas: this.state.qtdCartasViradas + 1}, () =>{
                    if(this.state.qtdCartasViradas == 1){
                        this.props.img1(carta.props.imgSrc);
                        this.setState({cartasVirada:[carta, null]});
                    }else if(this.state.qtdCartasViradas == 2){
                        //Alert.alert("validar");
                        this.props.img2(carta.props.imgSrc);
                        this.setState({cartasVirada:[this.state.cartasVirada[0], carta]}, ()=>{
                            let validado = this.validarJogo();
                            console.log("validado: " + validado);
                            if(validado){
                                this.state.cartasVirada[0].esconde();
                                this.state.cartasVirada[1].esconde();
                            }else{
                                this.state.cartasVirada[0].esconde();
                                this.state.cartasVirada[1].esconde();
                            }
                            this.props.img1(null);
                            this.props.img2(null);
                            this.setState({cartasVirada:[null,null]});
                            this.setState({qtdCartasViradas:0});
                        });
                    }
                }
            );
        }else if(!estadoMostrar){
            console.log("esconder");
            this.setState({qtdCartasViradas: this.state.qtdCartasViradas - 1}, () => {
                if(this.state.cartasVirada[0].props.imgSrc == carta.props.imgSrc){
                    this.props.img1(null);
                }else if(this.state.cartasVirada[0].props.imgSrc == carta.props.imgSrc){
                    this.props.img2(null);
                }else{
                    throw new Error("Caso inexistente");
                }
            });
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