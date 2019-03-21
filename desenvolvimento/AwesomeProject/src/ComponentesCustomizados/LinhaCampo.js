import React, {Component} from 'react';
import {View, Alert, Dimensions, StyleSheet} from 'react-native';
import Carta from './Carta';

export default class LinhaCampo extends Component{
    
    render(){
        return (
            <View style={this.styles.linhaCampo}>
                <Carta />
                <Carta />
                <Carta />
                <Carta />
                <Carta />     
            </View>
        );
    }

    styles = StyleSheet.create({
        linhaCampo:{
            height: this.props.alturaCampo/2,
            flexDirection: 'row',
            flex:1,
            borderColor:'black',
            borderWidth:2,
            padding:2,
            marginBottom:2
        },
    });
}

