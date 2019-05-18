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
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableOpacity} from 'react-native';

import { Navigation } from 'react-native-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

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

  constructor(){
    super();
    this.state={
      visivel:false,
      matricula:""
    };
  }

  enviarEstatisticas = async() => {
    NetInfo.isConnected.fetch().then(async isConnected => {
      console.log("Is connected", isConnected);
      if(isConnected){
        if(this.state.matricula == null || this.state.matricula == "" || this.state.matricula.trim() == "" || this.state.matricula.length != 9){
          Alert.alert("Matrícula incorreta", "Verifique e envie novamente");
        }else{
          // matrícula válida
          // seta loader para aparecer
          // carrega estatisticas local
          // requisita servidor
          this.setState({mostraLoader:true});
          estat = await AsyncStorage.getItem('estatisticas');
          mensagem = '{"' + this.state.matricula + '":' + estat + '}' ;
          console.log(mensagem);
          fetch('https://servidor-aprendo.herokuapp.com/estatisticas', {
            method: 'POST',
            body:JSON.stringify(mensagem)
          })
          .then((res) => { 
            status = res.status; 
            return res.json() 
          })
          .then((jsonData) => {
            this.mostraResposta(jsonData, status)
          })
          .catch(function(error) {
            Alert.alert("Houve um erro com o servidor. Tente mais tarde");
            console.log("Houve um erro com o servidor. Tente mais tarde");
            console.log('There has been a problem with your fetch operation: ' + error.message);
            this.setState({mostraLoader:!this.state.mostraLoader});
            this.setState({visivel:false, matricula:"",mostraLoader:false});
          });
        }
        
        /*
        console.log("iniciando procedimento");
        estat = await AsyncStorage.getItem('estatisticas');
        console.log("as estatisticas");
        console.log(estat);
        fetch('http://servidor-aprendo.herokuapp.com/estatisticas', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body:JSON.stringify(estat)
          })
          .then((res) => { 
            status = res.status; 
            return res.json() 
          })
          .then((jsonData) => {
            this.mostraResposta(jsonData, status)
          })
          .catch(function(error) {
            console.log("Houve um erro com o servidor. Tente mais tarde");
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
          });; */
      }else{
        Alert.alert("Erro internet", "Você não está conectado à internet.. tente mais tarde.");
        console.log("Você não está conectado à internet");
      }
    });
  }

  mostraResposta = async (response, status) => {
    console.log("minha resposta do servidor HEROKU");

    console.log(response);
   
    if(response['sucesso']){
      console.log("Suceso no envio dos dados")
      est = await AsyncStorage.getItem('estatisticas');
      est = JSON.parse(est);

      // zera vitórias de classificação 
      for(var attributename in est['classificacao']){
        if(est['classificacao'][attributename] != false && est['classificacao'][attributename][0] == true){
          console.log('caso de zerar classificacao')
          est['classificacao'][attributename][1] = 0;
          console.log(est['classificacao'][attributename][1]);
        }
      }

      // zera vitórias de resolução
      for(var attributename in est['resolucao']){
        if(est['resolucao'][attributename] != false && est['resolucao'][attributename][0] == true){
          console.log('zerando atributo resolucao')
          est['resolucao'][attributename][1] = 0;
        }
      }
      console.log('TUDO ZERADO')
      console.log(est);
      await AsyncStorage.setItem('estatisticas', JSON.stringify(est));
      console.log('espero que tudo esteja zerado, após envio');
      Alert.alert("Estatísticas enviadas." , "Obrigado pela sua contribuição. Continue jogando.")
    }else{
      console.log("retorno de resposta não esperado, servidor não retornou TRUE")
      Alert.alert('Obrigado');
    }
    this.setState({mostraLoader:!this.state.mostraLoader});
    this.setState({visivel:false, matricula:"",mostraLoader:false});
  }
  
  async componentDidMount(){
    console.log('montado');
    await this.storeData();
  }

  criaMontagem = async () => {
    console.log('criando montagem inicial');
    a = {'classificacao':{
            'exata':false,'homogeneidade':false,'linearidade':false,'ordem':false,'separavel':false,'tipo':false
        }, 'resolucao':{
            'homogêneo':false,'não homogêneo':false,'exato':false,'não exato':false
        }
    }
    await AsyncStorage.setItem('estatisticas',JSON.stringify(a));
    console.log('retorno setagem inicial');
  }
  
  storeData = async () => {
    console.log('no store1')
    try {
      a = null;
      a = await AsyncStorage.getItem('primeira_vez');
      console.log(a);
      if(a == null){
        console.log('primeira vez no jogo');
        let key = "primeira_vez";
        let value = "false";
        await AsyncStorage.setItem(key, value);
        console.log('setado primeira vez');
        await this.criaMontagem();
        console.log('terminou montagem inicial');
      }else{
        console.log("segunda vez ou mais do jogo");
        // nothing to do
      }
    } catch (e) {
      console.log('caiu em erro');
      // saving error
    }
    console.log('fim inicialização');
  }

  
  render() {

    return (
        <View>
            <Modal
                    animationType="none"
                    transparent={false}
                    visible={this.state.visivel}
                    onRequestClose={() => {
                        console.log('Cancelou o envio');
                        this.setState({visivel:false});
                    }}>
                    <View >
                          <Text style={{textAlign:'center', marginTop:5}}>Digite sua matrícula (somente números)</Text>  
                          <TextInput
                            style={{textAlign: 'center', height: 45, borderWidth:2, borderColor:'#000000', borderRadius:5, marginTop:5, marginBottom:5}}
                            placeholder="Ex:140025171"
                            onChangeText={(text) => this.setState({matricula:text})}
                          />
                          <Button
                            title="Confirmar envio"
                            onPress={() => {
                              console.log('alertando');
                              this.enviarEstatisticas();
                              }
                              }>
                          </Button>
                    </View>
                    <ActivityIndicator size="large" color="#0000ff" 
                        style={this.state.mostraLoader ? null : { display: "none" }} />
            </Modal>


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
            <TouchableOpacity style={styles.descolado} onPress={() => this.setState({visivel:true})}>
              <Text style={styles.textButton1}>
              Enviar estatísticas de jogo
              </Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  descolado:{
    width:wp('75%'),
    height:hp('20%'),
    alignSelf: 'center',
    borderWidth:5,
    borderColor: "#cccccc",
    padding: 5,
    marginTop:'60%',
    backgroundColor:'#2368F2',
    textAlign:'center'
  },
  welcome:{
    fontSize:20,
    textAlign:'center',
    padding:20
  },
  sub_welcome:{
    fontSize:15,
    textAlign:'center',
    padding:30
  },
  containerPai:{
    flexDirection:"row",
    flex:1
  },
  container:{
    width:wp(width/2 +'%'),
    height:height/4,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#abcabc',
    margin:10,
    flex:1,
    borderWidth:2,
    borderColor: '#000000'
  },
  overrideColor:{
    backgroundColor:'#cbacba'
  },
  textButton:{
    fontWeight: 'bold',
    fontSize:wp('5%'),
  },
  textButton1:{
    color:'white',
    fontWeight: 'bold',
    fontSize:wp('6%'),
    textAlign: 'center'
  }
});