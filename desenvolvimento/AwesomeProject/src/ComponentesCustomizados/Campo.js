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
        cartasVirada:[null, null],
        qtdPares:10
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
        console.log("Validar jogo");
        console.log(this.state.cartasVirada[0].props.imgSrc + "  ;  " + this.state.cartasVirada[1].props.imgSrc);
        let ehChave = false;
        let par = false;
        Object.keys(this.mapeado).map((key, index) => {
            if(this.state.cartasVirada[0].props.imgSrc == key){
                ehChave = true;
            }
        });
        console.log("eh chave: " + ehChave);

        if(ehChave){
            if(this.state.cartasVirada[1].props.imgSrc == this.mapeado[this.state.cartasVirada[0].props.imgSrc]){
                par = true;
            }
        }else if(!ehChave){
            let ehValor = false;
            let numeroChave = null;
            Object.keys(this.mapeado).map((key, index) => {
                if(this.state.cartasVirada[0].props.imgSrc == this.mapeado[key]){
                    ehValor = true;
                    numeroChave = key;
                }
            });
            
            console.log("é valor: " + ehValor);
            if(ehValor){
                if(numeroChave == this.state.cartasVirada[1].props.imgSrc){
                    par = true;
                }
            }
        }else{
            throw new Error("Sem outra opção");
        }
        if(par){
            this.setState({qtdPares: this.state.qtdPares-1},()=>{
                if(this.state.qtdPares == 0){
                    Alert.alert("Parabéns", "Você resolveu todas as EDOs de 1ª ordem", [
                        {text: 'Okay', onPress: () =>  this.props.pagAnt()},
                    ], {cancelable:false});
                }
            });
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
                            let paresGemeos = this.validarJogo();
                            console.log("paresGemeos: " + paresGemeos);
                            this.lidaComPares(paresGemeos);
                            this.resetaCampo();
                        });
                       
                    }
                }
            );
        }else if(!estadoMostrar){
            console.log("esconder");
            this.escondeCartaDoTelao(carta.props.imgSrc);
        }else{
            throw new Error("Caso imprevisto");
        }
    }

    lidaComPares = (paresGemeos) => {
        if(!paresGemeos){
            this.state.cartasVirada[0].esconde();
            this.state.cartasVirada[1].esconde();
        }else{
            console.log("desabiitar cartas");
            this.state.cartasVirada[0].desabilita();
            this.state.cartasVirada[1].desabilita();
        }
    }

    resetaCampo = () => {
        this.props.img1(null);
        this.props.img2(null);
        this.setState({cartasVirada:[null,null]});
        this.setState({qtdCartasViradas:0});
    }

    escondeCartaDoTelao = (imageSource) => {
        this.setState({qtdCartasViradas: this.state.qtdCartasViradas - 1}, () => {
            if(this.state.cartasVirada[0].props.imgSrc == imageSource){
                this.props.img1(null);
            }else if(this.state.cartasVirada[1].props.imgSrc == imageSource){
                this.props.img2(null);
            }else{
                throw new Error("Caso não estava virada");
            }
        });
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