import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Campo from '../ComponentesCustomizados/Campo';
import Telao from '../ComponentesCustomizados/Telao';
import Images from '../../../resource/'

const width = Dimensions.get('screen').width;
const heigth = Dimensions.get('screen').height;

const alturaTelao = 2*(heigth/5);
const alturaCampo = 3*(heigth/5);

export default class MundoResolucao extends Component {
    
    render(){
        return(
            <View style={{flex:1}}>
                <Telao alturaTelao={alturaTelao} />
                <Campo alturaCampo={alturaCampo} />
            </View>
        );
    }
}