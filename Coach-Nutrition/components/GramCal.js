import React,{Component} from 'react';
import {Image, View, TouchableHighlight, TextInput, StyleSheet} from "react-native";


export default class GramCal extends Component{

    render(){
        return(
            <TextInput
                style={styles.numberInput2}
                keyboardType={'numeric'}
                placeholderTextColor={'white'}
                placeholder= {this.props.type}
                onChangeText={this.setText}
            />
        );
    }
    setText=  (text)=> {
        if(this.props.typeComp === "Cal")
            this.props.setCal(text);
        else if(this.props.typeComp === "Gram")
            this.props.setGram(text);
    }
}

const styles = StyleSheet.create({
    numberInput2:{
        height: 32,
        width:75,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor:'mediumseagreen',
        marginLeft: 29
    }
})

