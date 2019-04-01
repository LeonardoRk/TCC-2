import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Image, Modal, View, Text, Alert} from 'react-native';
import Mundo from './screens/Mundo'

export default class Equacao extends Component {


    _zoomImagem = () => {
        //Alert.alert("click automático?");
        this.setModalVisivel(true);
    }

    _desfazZoomImagem = () => {
        //Alert.alert("NÃO click automático?");
        this.setModalVisivel(false);
    }

    state = {
        modalVisible: false,
    };

    setModalVisivel(visible) {
        this.setState({modalVisible: visible});
    }
    
    render(){
        return(
            <View style={styles.equacao1}>
                <TouchableHighlight style={styles.equacao} 
                                    onLongPress={this._zoomImagem}
                                    onPressOut={this._desfazZoomImagem}
                                    onPress={() =>{this.props.handleClick(this.props.imgSrc)}}
                >
                    <Image style={[styles.image, resizeMode='contain']}
                            source={this.props.imgSrc}
                    >
                    </Image>
                    
                
                </TouchableHighlight>
                <Modal
                    animationType="none"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                            <Image style={styles.imageModal}
                                source={this.props.imgSrc}
                             >
                            </Image> 
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageModal:{
        alignSelf:'center',
        borderWidth:2,
        borderColor:'green',
        borderRadius:35,
    },
    modal:{
        backgroundColor:'#adff2f',
        marginTop:4,
        margin: 4,
        flex:1
    },
    equacao1:{
        height:'80%',
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        borderRadius:20,
        marginTop:15,
        marginBottom:5
    },
    equacao:{
        borderWidth:3,
        borderColor:'green',
        height:'80%',
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        borderRadius:20,
        marginTop:15,
        marginBottom:5
    },
    image:{
        width:"95%",
        height:"90%",
        resizeMode:"contain",
        flex:1
    }
});
