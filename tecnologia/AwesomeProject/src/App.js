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
  Alert} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.welcome}>Seja bem vindo, jogador(a)!</Text>
        <View style={{marginTop:70, marginHorizontal:30}}>
          <Button
            title="Jogar"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => {
              Alert.alert('You tapped the Decrypt button!');
            }}
          />
        </View>
        <View style={{marginTop:70, marginHorizontal:30}}>
          <Button 
            title="Sair"
            color="#141584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{
    borderWidth: 4.0,
    borderColor: '#000000',
    flex:1
  },
  welcome:{
    fontSize:30,
    textAlign:'center',
    padding:20
  },
  button:{
    margin:10,
    flex:1,
    borderColor: '#000000',
    borderWidth: 2.0,
    justifyContent: 'space-between'
  }
});

/*
return (
  <ScrollView horizontal='true'>
    <Text style={{fontSize:96}}>Scroll me plz</Text>
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Text style={{fontSize:96}}>If you like</Text>
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Text style={{fontSize:96}}>Scrolling down</Text>
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Text style={{fontSize:96}}>What's the best</Text>
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Text style={{fontSize:96}}>Framework around?</Text>
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
    <Text style={{fontSize:80}}>React Native</Text>
  </ScrollView>
);*/