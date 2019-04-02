import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default class Telao extends Component {

    render(){
        return(
            <View>
                <View style={{height:this.props.alturaTelao/2, borderColor:'yellow', borderWidth:3}}>
                    <Image source={this.props.img1} style={styles.image} />
                </View>
                <View style={{height:this.props.alturaTelao/2, borderColor:'yellow', borderWidth:3}}>
                    <Image source={this.props.img2} style={styles.image} />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    image:{
        resizeMode:"contain",
        height:'100%',
        width:'100%',
    }
});