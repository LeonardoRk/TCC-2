import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions,
    TouchableOpacity, Alert} from 'react-native';
import AgregacaoClassificacao from '../model/AgregacaoClassificacao'
import {Navigation} from 'react-native-navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const carregaMundo = async (nomeMundo) =>{
    console.log("carregar mundo: " + nomeMundo);
    let agregacaoClassificacao = await new AgregacaoClassificacao(nomeMundo);
    Navigation.push("App", {
        component: {
            name: 'Mundo',
            passProps:{
                perguntas: agregacaoClassificacao.perguntasAleatorias
            }
        },
    });
}

export default class ModoClassificacao extends Component{

    render(){
        return(
            <ScrollView horizontal="true" style={styles.containerFilho}>
                <Text style={styles.fundo}>
                </Text>
                <TouchableOpacity style={styles.item}
                                  onPress={() => {carregaMundo("tipo") }}
                >
                    <Text style={styles.boxes}>
                        Tipo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}
                                onPress={() => {carregaMundo("ordem")}}
                >
                    <Text style={styles.boxes}>
                        Ordem
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}
                                    onPress={() => {carregaMundo("homogeneidade")}}
                >
                    <Text style={styles.boxes}>
                        Homogeneidade
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}
                                    onPress={() => {carregaMundo("linearidade")}}
                >
                    <Text style={styles.boxes}>
                        Linearidade
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}
                                    onPress={() => {carregaMundo("separavel")}}
                >
                    <Text style={styles.boxes}>
                        Separável
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}
                                    onPress={() => {carregaMundo("exata")}}
                >
                    <Text style={styles.boxes}>
                        Exata
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
        width:width * 3,
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