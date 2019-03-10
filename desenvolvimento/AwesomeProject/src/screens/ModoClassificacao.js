import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions,
    TouchableOpacity} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class ModoClassificacao extends Component{
    static get options(){
        return {
          topBar: {
            title: {
              text: 'Modo de Classificação'
            },
          }
        };
    }

    render(){
        return(
            <ScrollView horizontal="true" style={styles.containerFilho}>
                <Text style={styles.fundo}>
                </Text>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.boxes}>
                        Tipo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.boxes}>
                        Ordem
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.boxes}>
                        Homogeneidade
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.boxes}>
                        Linearidade
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