import React, {Component} from 'react';
import {View,Text,  Alert, Dimensions, StyleSheet} from 'react-native';
import Carta from './Carta';

export default class LinhaCampo extends Component{
   
    render(){
        return (
            <View style={this.styles.linhaCampo}>
                <Carta handle={this.props.handle} imgSrc={this.props.imagensLinha[0]}/>
                <Carta handle={this.props.handle} imgSrc={this.props.imagensLinha[1]}/>
                <Carta handle={this.props.handle} imgSrc={this.props.imagensLinha[2]}/>
                <Carta handle={this.props.handle} imgSrc={this.props.imagensLinha[3]}/>
                <Carta handle={this.props.handle} imgSrc={this.props.imagensLinha[4]}/>     
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

