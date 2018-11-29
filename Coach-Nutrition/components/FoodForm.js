import React,{Component} from 'react';
import {View, StyleSheet, Text} from "react-native";
import FoodPicker from "./FoodPicker";
import SpinnerComp from './SpinnerComp';
import Button from "react-native-button";
import GramCal from './GramCal';


export default class FoodForm extends Component{

    constructor(props) {
        super(props);
        this.state = {

            foodList:[],

        }
    }

    render(){
        return(
            <View>
            <Text style={{marginLeft:30}}>
                {this.getDetailsDescription()}
            </Text>
            <View style={styles.foodStyle}>
                <View style={{flex: 1, marginRight: 25}}>
                    {this.props.typeComp === "foodComp" ||this.props.typeComp === "editFood"?
                        <GramCal type={this.props.typeComp === "editFood"?this.props.params.calorie+"":"Cal"}
                                 typeComp={"Cal"}
                                 setCal={this.props.setCal} />
                        :
                        <FoodPicker foodList={this.getFoodItems()}
                                    foodname={this.props.foodname}
                                    setFoodName={this.props.setFoodName}/>
                    }
                </View>
                <View style={styles.spinner}>
                    {this.props.typeComp === "foodComp" ||this.props.typeComp === "editFood"?
                        <GramCal type={this.props.typeComp === "editFood"?this.props.params.gram+"":"Gram"}
                                 typeComp={"Gram"}
                                 setGram={this.props.setGram}/>
                        :
                        <SpinnerComp setFoodAmount={this.props.setFoodAmount}/>
                    }
                </View>
                <View style={{flex: 1}}>
                    {this.props.typeComp === "foodComp" ||this.props.typeComp === "editFood"? null :
                        <Button style={styles.validateButton}
                                onPress={this.addFood}>
                            OK
                        </Button>
                    }
                </View>
            </View>
            </View>
        );
    }
    getDetailsDescription = ()=>
    {
        if(this.props.typeComp === "foodComp" || this.props.typeComp === "editFood")
            return "        Cal                      Gram";
        else  if(this.props.typeComp === "mealComp")
            return "FoodName         Amount";

    }
    addFood=()=>{
        this.props.addFood();
    }

    getFoodItems = ()=> {
        var len = this.props.foodList;
        var res = [];
        res.push("Select");
        this.props.foodList.map((item,index)=>{
               res.push(item.name);
            }
        )
        return res
    }

    // componentWillMount(){
    //     this.getFoodItems();
    //
    // }

}
const styles = StyleSheet.create({
    foodStyle:{
        marginTop: 5,
        flexDirection: 'row',
        marginLeft: 30,
        zIndex: 12

    },
    spinner: {
        flex: 1,
        width: 50,
        height:47,
        marginLeft: 20,
        marginRight: 45
    },
    validateButton:{
        backgroundColor: 'mediumseagreen',
        height: 40,
        width: 50,
        padding:8,
        color: 'white',
        borderColor: 'mediumseagreen',

    }
})
