import React,{Component} from 'react';
import Button from "react-native-button";
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import AddModal from './AddModal';



export default class FoodItem extends Component{




    render(){
        return(

            <TouchableHighlight onPress={this.remove}
                                style={{ backgroundColor: 'transparent' }}
                                underlayColor={'transparent'}
            >
                <Text style={{fontSize:15}}>
                    {"Name : "+this.props.name+", amount : "+this.props.amount}
                </Text>
            </TouchableHighlight>
        );
    }

    remove = ()=>
    {
       this.props.removeFood(this.props.index);
       this.props.removeParamsFood(this.props.index);
    }

}
