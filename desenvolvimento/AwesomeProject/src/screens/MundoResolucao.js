import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class MundoResolucao extends Component {
    componentDidMount(){

    }

    render(){
        return(
            <View>
                <Text>Vamos desenhar cartar {this.props.todasPerguntas[0]}</Text>
            </View>
        );
    }
}