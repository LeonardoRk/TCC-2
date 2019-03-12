import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert} from 'react-native';

export default class Mundo extends Component {

    componentDidMount(){
        console.log("O MUNDO ESTÁ MONTADO- Parâmetros enviados");
        console.log('params aleatorio: ' + this.props.perguntas);
        console.log('Respostas corretas: ' + this.props.respostasCorretas);
        console.log('Fase embaralhada: ' + this.props.faseEmbaralhada);

        this.state = {
            perguntaAtual: 1,
        }
        console.log("Pergunta inicial: " + this.state.perguntaAtual);
    }

    render(){
        icon = require('../../resource/img/pergunta/pergunta7.gif');
        return(
            <View style={styles.container}>
                <Text style={styles.pergunta}>Escolha a ED: {this.props.perguntas[this.state.perguntaAtual-1]} </Text>

                <Image style={[styles.equacao, styles.esquerda]} 
                        source={this.props.image}
                ></Image>

                <Image style={[styles.equacao, styles.direita]} 
                        source={require('../../resource/img/pergunta/pergunta7.gif')}
                ></Image>

                <Image style={[styles.equacao, styles.esquerda]} 
                        source={require('../../resource/img/pergunta/pergunta32.gif')}
                ></Image>

                <Image style={[styles.equacao, styles.direita]} 
                        source={require('../../resource/img/pergunta/pergunta11.gif')}
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