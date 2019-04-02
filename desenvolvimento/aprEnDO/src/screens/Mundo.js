import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight, Modal, Alert} from 'react-native';
import IMAGES from '../../resource/img/pergunta/index';
import Equacao from '../Equacao';
import {Navigation} from 'react-native-navigation';

const carregaPaginaAnterior = () =>{
    Navigation.pop("App");
}

export default class Mundo extends Component {
    
    checaSeAcerto = (numeroTentativa) => {
        if(this.state.perguntaAtual == this.props.totalQuestoes){
            Alert.alert("Parabéns,", "você está preparado para classificar EDO's", [
                {text: 'Okay', onPress: () =>  carregaPaginaAnterior()},
            ], {cancelable:false});
        }else{
            if(numeroTentativa == this.state.numeroPerguntaCorreta){
                this.setState({perguntaAtual: this.state.perguntaAtual+1});
                this.setState({numeroPerguntaCorreta:this.props.respostasCorretas[this.state.perguntaAtual]});
            //Alert.alert("Pergunta atual " + this.state.perguntaAtual.toString());
            }else{
                Alert.alert("Tente novamente");
                /*
                    CONTAGEM TENTATIVA DE ITEM ERRADO
                */
        
            }
        }
    }

    state= {
        perguntaAtual:1,
        numeroPerguntaCorreta: this.props.respostasCorretas[0],
    }
    
    componentDidMount(){
        console.log("O MUNDO ESTÁ MONTADO- Parâmetros enviados");
        console.log('params aleatorio: ' + this.props.perguntas);
        console.log('Respostas corretas: ' + this.props.respostasCorretas);
        console.log('Fase embaralhada: ' + this.props.faseEmbaralhada);
        console.log("Pergunta inicial: " + this.state.perguntaAtual);
    }

    render(){
        return(
            <View style={styles.container}>
                
                <View>
                    <Text>{this.state.perguntaAtual} / {this.props.totalQuestoes}</Text>
                </View>
                <Text style={styles.pergunta}>Escolha a ED: {this.props.perguntas[this.state.perguntaAtual-1]} </Text>
                <Equacao handleClick={this.checaSeAcerto}
                    imgSrc={IMAGES[this.props.faseEmbaralhada[this.state.perguntaAtual-1][0]]}/>
                <Equacao handleClick={this.checaSeAcerto}
                    imgSrc={IMAGES[this.props.faseEmbaralhada[this.state.perguntaAtual-1][1]]}/>
                <Equacao handleClick={this.checaSeAcerto}
                    imgSrc={IMAGES[this.props.faseEmbaralhada[this.state.perguntaAtual-1][2]]}/>
                <Equacao handleClick={this.checaSeAcerto}
                    imgSrc={IMAGES[this.props.faseEmbaralhada[this.state.perguntaAtual-1][3]]}/>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        /*borderWidth:5,
        borderColor:'red'*/
    },
    pergunta:{
        fontSize:20,
        textAlign:'center',
        paddingTop:20,
        /*borderWidth:5,
        borderColor:'black'*/
    },
    esquerda:{
        alignSelf: 'flex-start',
        marginLeft:20
    },
    direita:{
        alignSelf: 'flex-end',
        marginRight:20
    }
});