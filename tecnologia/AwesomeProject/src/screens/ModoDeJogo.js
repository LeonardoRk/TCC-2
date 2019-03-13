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

import Navigation from 'react-native-navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class ModoDeJogo extends Component {
  static get options(){
    return {
      topBar: {
        title: {
          text: 'Modo de jogo'
        },
      }
    };
  }
  render() {
    return (
        <View style={styles.containerPai}>
         
          <TouchableOpacity onPress={() => {Alert.alert('clicou class')} }
              style={styles.container}>
            <Text style={styles.textButton}>Classificação</Text>
          </TouchableOpacity>
         
        
          <TouchableOpacity onPress={() => {Alert.alert('clicou')} }
              style={[styles.container, styles.overrideColor]}>
            <Text style={styles.textButton}>Resolução</Text>
          </TouchableOpacity>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPai:{
    flexDirection:"row",
    alignItems: 'center',
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