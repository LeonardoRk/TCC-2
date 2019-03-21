import React, {Component} from 'react';
import {Button, View,Dimensions, Alert, StyleSheet, TouchableOpacity} from 'react-native';

const width = Dimensions.get('screen').width;
const alturaCarta =  null;
const comprimentoCarta = width/5;

export default class Carta extends Component {
    componentDidMount(){
    }

    viraCarta = () =>{
       Alert.alert("metodo viraCarta");
    }
    

    render(){
        this.state = {
            frente:false
        }

        return(
            <View style={styles.carta}>
                <TouchableOpacity style={styles.color}></TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    carta:{
        borderWidth:5,
        borderColor:'green',    
        width: comprimentoCarta,
        flex:1,
        margin:2
    },
    color:{
        backgroundColor:'powderblue',
        height:'100%'
    }
});