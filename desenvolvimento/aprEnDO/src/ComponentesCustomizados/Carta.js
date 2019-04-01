import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Alert
} from 'react-native';

const width = Dimensions.get('screen').width;
const comprimentoCarta = width/5;

export default class Carta extends Component {
    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    state = {
        deixarDesabilitado: false,
        mostrar:false
    }

    componentDidMount(){
        if(this.state.mostrar){
            this.mostra();
        }else if(this.state.mostrar == false){
            this.esconde();
        }else{
            throw new Error("Caso indefinido");
        }
    }

    esconde(){
        this.setState({mostrar: !this.state.mostrar});
        Animated.spring(this.animatedValue,{
            toValue: 0,
            friction: 8,
            tension: 10
        }).start();
    }

    mostra(){
        this.setState({mostrar: !this.state.mostrar});
        Animated.spring(this.animatedValue,{
            toValue: 180,
            friction: 8,
            tension: 10
        }).start();
    }

    viraCarta() {
        if(this.state.mostrar){
            this.mostra();
        }else if(this.state.mostrar == false){
            this.esconde();
        }else{
            throw new Error("Caso indesejado");
        }  
        this.props.handle(this, this.state.mostrar);
    }

    desabilita = () => {
        this.setState({deixarDesabilitado: !this.state.deixarDesabilitado}, () => {
        });
    }

    render() {
        const frontAnimatedStyle = {
        transform: [
            { rotateY: this.frontInterpolate }
        ]
        }
        const backAnimatedStyle = {
        transform: [
            { rotateY: this.backInterpolate }
        ]
        }

        return (
        <View style={styles.carta}>
            
            <TouchableOpacity disabled={this.state.deixarDesabilitado}  onPress={() => this.viraCarta()}>
                    <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <Image source={this.props.imgSrc} style={styles.image} />
                    </Animated.View>
                    </View>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    carta:{   
        width: comprimentoCarta,
        flex:1,
        margin:2,
    },
    desabilitado: {
        borderWidth:5,
        borderColor:'gray', 
        backgroundColor:'gray',
        height:'100%',
        backfaceVisibility: 'hidden',
    },
    flipCard: {
        borderWidth:5,
        borderColor:'green', 
        backgroundColor:'powderblue',
        height:'100%',
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        borderWidth:3,
        borderColor:'black',
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        flex:1,
        width:'98%',
    },
    image:{
        resizeMode:"contain",
        //width:comprimentoCarta-5, 
        height:'100%',
        width:'95%',
    }
});