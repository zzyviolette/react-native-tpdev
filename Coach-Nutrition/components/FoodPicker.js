import React,{Component} from 'react';
import Autocomplete from "react-native-autocomplete-input";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IOSPicker from 'react-native-ios-picker';
import Food from './Food';

let year = (new Date()).getFullYear();
export default class FoodPicker extends Component{
    state ={
        selectedValue : 'Hello',
        list:[]
    };


    render(){
        return(
            <View style={{
                width: 90,
                marginRight: 5,
                flex: 1,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0
            }}>
                <IOSPicker
                    style={{borderColor:'mediumseagreen',backgroundColor:'mediumseagreen',  height:10}}
                    textStyle={{color :`rgba(255, 255, 255, 1)`, fontSize:15, textAlign:'center'}}
                    data={this.props.foodList}
                    mode='modal'
                    selectedValue={this.state.selectedValue}
                    onValueChange={this.updateText}  >
                    {
                        this.state.list.map((item,index)=>{
                                <Text  key={index}>
                                    {index}
                                </Text>
                            }
                        )
                    }

                </IOSPicker>
            </View>
        );
    }
    updateText = (item,index)=>
    {
        this.props.setFoodName(item);
    }
}

const styles = StyleSheet.create({
    autoCompleteStyle:{
        height: 20,
        borderWidth: 2,
        borderColor: 'gray'
    },
    containerStyle:{
        backgroundColor:'mediumseagreen'
    }
})
