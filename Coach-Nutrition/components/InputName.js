import React,{Component} from 'react';
import {View,TextInput, StyleSheet} from "react-native";
import {Icon} from "native-base";


export default class InputName extends Component{

    render(){
        return(
            <View style={styles.textInputName}>
                <Icon name='ios-nutrition' style=
                    {styles.textInputNameIcon}
                />
                <TextInput
                    style={styles.textInputNameInput}
                    placeholder= {this.props.currentName}
                    onChangeText={this.updateName}
                    autoCorrect={false}
                    value={this.props.name}
                />
            </View>
        );
    }

    updateName = (name)=>{
        this.props.setName(name);
    }
}

const styles = StyleSheet.create({
    textInputName:{
        flexDirection: 'row',
        marginTop:10,
        marginBottom:10,
        marginLeft:40
    },
    textInputNameIcon:{
        fontSize: 20,
        marginTop:10,
        marginRight: 10,
        color: 'red'
    },
    textInputNameInput:{
        width:165,
        height:40,
        borderWidth: 2,
        borderColor: 'black'
    }
})
