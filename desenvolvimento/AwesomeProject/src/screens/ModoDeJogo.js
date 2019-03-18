/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Button} from 'react-native';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity} from 'react-native';

import { Navigation } from 'react-native-navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const goClassificacao = (id) => {
  Navigation.push(id, {
    component: {
      name: 'ModoClassificacao',
    }
  });
};

const goResolucao = (id) => {
  Navigation.push(id, {
    component: {
      name: 'ModoResolucao',
    }
  });
};

export default class ModoDeJogo extends Component {
  render() {
    return (
        <View>
          <Text style={styles.welcome}>Seja bem vindo, jogador(a)!</Text>
          <Text style={styles.sub_welcome}>O que deseja resolver?</Text>
          <View style={styles.containerPai}>
            <TouchableOpacity onPress={() => {
                goClassificacao("App");
              }}
                style={styles.container}>
              <Text style={styles.textButton}>Classificação</Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={() => {goResolucao("App")} }
                style={[styles.container, styles.overrideColor]}>
              <Text style={styles.textButton}>Resolução</Text>
            </TouchableOpacity>
          </View>
          <Button onPress={() => {goEstatisticas("App")}}>
              title = "Enviar estatísticas"
          </Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome:{
    fontSize:30,
    textAlign:'center',
    padding:20
  },
  sub_welcome:{
    fontSize:20,
    textAlign:'center',
    padding:30
  },
  containerPai:{
    flexDirection:"row",
    flex:1
  },
  container:{
    width:width/2,
    height:height/2,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#abcabc',
    margin:10,
    flex:1
  },
  overrideColor:{
    backgroundColor:'#cbacba'
  },
  textButton:{
    fontSize:20,
  }
});