import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Text} from "react-native";
import FoodItem from "./FoodItem";

var screen = Dimensions.get('window');

export default class MealFoodsComposition extends Component{

    render(){
        return(
            <View style={styles.scrollStyle}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {this.props.mealCompoList.concat(this.props.composition).map((food, index) =>(
                        <FoodItem
                            key={""+index} {...food}
                            index={index} removeFood={this.props.removeFood}
                            removeParamsFood={this.removeParamsFood.bind(this)}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }

    removeParamsFood = (index)=>{
        this.props.composition.splice(index,1);
    }

}
const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 5,
        flexGrow: 1,
        height: 300,
    },
    scrollStyle:{
        width: screen.width - 130,
        height: 10000,
        flex:1,
        justifyContent: 'center',
        marginLeft: 30,
        borderColor:'black',
        borderWidth:3
    }
})
