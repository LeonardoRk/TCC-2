import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert} from 'react-native';
import IMAGES from '../../resource/img/pergunta/index';

export default class Mundo extends Component {

    componentDidMount(){
        console.log("O MUNDO ESTÁ MONTADO- Parâmetros enviados");
        console.log('params aleatorio: ' + this.props.perguntas);
        console.log('Respostas corretas: ' + this.props.respostasCorretas);
        console.log('Fase embaralhada: ' + this.props.faseEmbaralhada);
        
        console.log("Pergunta inicial: " + this.props.perguntaAtual);
    }

    render(){
        return(
            <View style={styles.container}>
                
                <Text style={styles.pergunta}>Escolha a ED: {this.props.perguntas[0]} </Text>

                <Image style={[styles.equacao, styles.esquerda]} 
                        source={IMAGES[this.props.faseEmbaralhada[this.props.perguntaAtual-1][0]]}
                ></Image>

                <Image style={[styles.equacao, styles.direita]} 
                        source={IMAGES[this.props.faseEmbaralhada[this.props.perguntaAtual-1][1]]}
                ></Image>

                <Image style={[styles.equacao, styles.esquerda]} 
                        source={IMAGES[this.props.faseEmbaralhada[this.props.perguntaAtual-1][2]]}
                ></Image>

                <Image style={[styles.equacao, styles.direita]} 
                        source={IMAGES[this.props.faseEmbaralhada[this.props.perguntaAtual-1][3]]}
                ></Image>

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
    equacao:{
        width: '70%', 
        height: '20%',
        resizeMode: 'contain',
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