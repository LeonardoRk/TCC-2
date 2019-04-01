import React, {Component} from 'react';
import {View, Button, Alert, Text, Dimensions} from 'react-native';
import Campo from '../ComponentesCustomizados/Campo';
import Telao from '../ComponentesCustomizados/Telao';
import {Navigation} from 'react-native-navigation';

const width = Dimensions.get('screen').width;
const heigth = Dimensions.get('screen').height;

const alturaTelao = 2*(heigth/5);
const alturaCampo = 3*(heigth/5);

const carregaPaginaAnterior = () =>{
    Navigation.pop("App");
}

export default class MundoResolucao extends Component {
    state = {
           // '../../../resource/img/pergunta/pergunta1.gif',
           // '../../../resource/img/pergunta/pergunta2.gif',
        img1: null,
        img2: null,
    }

    setaImagem1 = (img1Src) =>{
        this.setState({img1: img1Src});
    }

    setaImagem2 = (img2Src) =>{
        this.setState({img2: img2Src});
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Telao img1={this.state.img1} img2={this.state.img2} alturaTelao={alturaTelao} />
                <Campo pagAnt={carregaPaginaAnterior} img1={this.setaImagem1} img2={this.setaImagem2} perguntas={this.props.todasPerguntas} alturaCampo={alturaCampo} />
            </View>
        );
    }
}