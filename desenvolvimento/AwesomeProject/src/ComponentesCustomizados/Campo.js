import React, {Component} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import LinhaCampo from './LinhaCampo';

export default class Campo extends Component {

    render(){
        return(
            <View style={{flex:1}}>
                <LinhaCampo alturaCampo={this.props.alturaCampo} />
                <LinhaCampo alturaCampo={this.props.alturaCampo} />
                <LinhaCampo alturaCampo={this.props.alturaCampo} />
                <LinhaCampo alturaCampo={this.props.alturaCampo} />
            </View>

        );
    }
}