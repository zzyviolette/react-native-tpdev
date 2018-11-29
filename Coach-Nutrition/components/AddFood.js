import React,{Component} from 'react';
import {StyleSheet} from "react-native";
import Button from "react-native-button";


export default class AddFood extends Component{

    render(){
        return(
            <Button
                style={styles.saveButtonStyle}
                containerStyle={styles.saveButtonContent}
                onPress={this.save}>
                Save
            </Button>
        );
    }

    save = ()=>{
        this.props.save(this.props.params);
    }
}

const styles = StyleSheet.create({
    saveButtonContent:{
        padding: 8,
        marginLeft: 90,
        marginTop:5,
        marginBottom:10,
        marginRight: 85,
        height: 40,
        borderRadius: 6,
        backgroundColor: 'mediumseagreen',
    },
    saveButtonStyle:{
        fontSize: 18,
        color: 'white'
    }
})
