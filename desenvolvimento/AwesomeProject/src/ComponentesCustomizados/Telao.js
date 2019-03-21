import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinhaCampo from './LinhaCampo';

export default class Telao extends Component {

    render(){
        return(
            <View>
                <View style={{height:this.props.alturaTelao/2, borderColor:'yellow', borderWidth:3}}>
                    <Text> Eq. 1</Text>
                </View>
                <View style={{height:this.props.alturaTelao/2, borderColor:'yellow', borderWidth:3}}>
                    <Text> Eq. 2</Text>
                </View>
            </View>

        );
    }
}