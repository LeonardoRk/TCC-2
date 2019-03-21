import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions,
    TouchableOpacity, Alert} from 'react-native';
import {Navigation} from 'react-native-navigation'
import AgregacaoResolucao from '../model/AgregacaoResolucao'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const carregaMundoResolução = async (nomeMundo) =>{
    let agregacaoResolucao = await new AgregacaoResolucao(nomeMundo);
    console.log("Dado pronto: " + agregacaoResolucao.todasAsPerguntas);
    Navigation.push("App", {
        component: {
          name: 'MundoResolucao',
          passProps:{
              todasPerguntas:agregacaoResolucao.todasAsPerguntas
          }
        }
      });
}

export default class ModoResolucao extends Component{

    render(){
        return(
            <ScrollView horizontal="true" style={styles.containerFilho}>
                <Text style={styles.fundo}>
                </Text>
                <TouchableOpacity onPress={() => {carregaMundoResolução("homogêneo")}} style={styles.item}>
                    <Text style={styles.boxes}>
                        Homogênea
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {carregaMundoResolução("não homogêneo")}} style={styles.item}>
                    <Text style={styles.boxes}>
                        Não Homogênea
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {carregaMundoResolução("exato")}} style={styles.item}>
                    <Text style={styles.boxes}>
                        Exata
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {carregaMundoResolução("não exato")}} style={styles.item}>
                    <Text style={styles.boxes}>
                        Não Exata
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerPai:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerFilho:{
        flex:1,
    },
    fundo:{
        position:'absolute',
        flex:1,
        margin:1,
        borderRadius:1,
        width:width * 2,
        height:height/19,
        borderWidth: 10,
        borderColor: '#cccccc',
        backgroundColor: '#cccccc',
        alignSelf:'center'
    },
    item:{
        alignSelf:'center'
    },
    boxes:{
        marginLeft:35,
        marginRight:35,
        borderRadius:4,
        borderColor: '#dddddd',
        backgroundColor: '#dddddd',
        textAlignVertical:'center',
        textAlign:'center',
        height:height/10,
        width:width/3
    }
});