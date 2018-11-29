import React,{Component} from 'react';
import {Dimensions, Image, Platform, StyleSheet, Text, View} from "react-native";
import Modal from "react-native-modalbox";
import FlatListItem from './FlatListItem';
import Food from "./Food";
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';

var screen = Dimensions.get('window');

import NutritionContentProvider from './../dao/NutritionContentProvider';

let bdContentProvider = new NutritionContentProvider();


export default class MealDescription extends Component{
    state = {
        name:'',
        photo:'',
        date:'',
        hour:'',
        composition:[],
        foodList:[]
    }


    render(){
        return(
            <Modal ref={"myModal"}
                   style={{justifyContent: 'center', borderRadius:Platform.OS === 'ios'?30:0,shadowRadius: 10, width: screen.width-80, height:400}}
                   position='center' backdrop={true}
                   currentPage = {this.getCompType()}
            >
                <View style={styles.contentStyle}>
                    <Text style={styles.formInput1}>
                        Meal description
                    </Text>
                    <View >
                        <Image style={styles.imgStyle} source={this.getImgType()}/>
                    </View>
                <Text style={styles.formInput}>
                    Name : <Text style={styles.form}>{this.state.name}</Text>
                </Text>
                <Text style={styles.formInput}>
                    Date : <Text style={styles.form}>{this.state.date}</Text>
                </Text>
                    <Text style={styles.formInput}>
                        Hour : <Text style={styles.form}>{this.state.hour}</Text>
                    </Text>
                <Text style={styles.compStyle}>
                    Composition
                </Text>
                    <Text style={styles.formInput}>
                        Name, amount, cal,gram :
                    </Text>
                {this.state.composition.map((food, index) =>(
                    <Text style={styles.form} key={index}>
                        {food.name+", "+food.amount+', '+this.getCalGram(food)}
                    </Text>
                ))}
                <Text style={styles.formInput}>
                        Sum Calorie
                </Text>
                <Text style={styles.form}>
                    {this.getSumCalorie()}
                </Text>
                </View>

            </Modal>
        );
    }

    componentWillMount(){
        this.getAllFood();
    }

    componentWillReceiveProps() {
        this.getAllFood();

    }

    getCompType = ()=>
    {
        switch (this.props.typeComp){
            case 'mealComp':
                return 'Add new Meal';
            case 'foodComp':
                return 'Add new food';
            case 'editMeal':
                return 'Edit Meal';
            case 'editFood':
                return 'Edit food';
        }
    }

    getSumCalorie = ()=>{
        var sum = 0;
        for(var i =0; i < this.state.composition.length; i++){
            var food = this.state.composition[i];
            var amount = food.amount;
            var elementFound = FlatListItem.foundElement(food,this.state.foodList,'name');
            if(elementFound !== undefined)
                sum  += parseInt(elementFound.calorie,10) * parseInt(amount,10);
        }

        return sum;
    }

    getAllFood = ()=>{
        var self = this;
        bdContentProvider.searchAllFood(function(ret){
            self.setState({foodList:ret});
        });
    }

    showMealModal = (name,date,composition,photo)=>
    {
        var goodDate = date.split(" ");
        var datereverse = goodDate[0].split("-").reverse().join("-");
        this.setState({name:name});
        this.setState({photo:photo});
        this.setState({date:datereverse+" "});
        this.setState({hour:goodDate[1]})
        this.setState({composition:composition});
        this.refs.myModal.open();
    }

    getCalGram=(food)=>{
        var res= '';
        var elementFound = FlatListItem.foundElement(food,this.state.foodList,'name');
        if(elementFound !== undefined)
            res =elementFound.calorie +', '+elementFound.gram;
        return res;
    }

    isNumber = (element)=>{
        if(!isNaN(element))
        {
            return true;
        }
        return false;
    }

    getImgType = ()=>{
        if(!this.isNumber(this.state.photo)&& this.state.photo.split(":")[0] === "file")
            return {uri:this.state.photo};
        else
            return require('../image/mealPicture.jpg');
    }
}

const styles = StyleSheet.create({
    contentStyle:{
        marginLeft:20
    },
    formInput :{
        fontSize:18,
        fontWeight:'bold',
        marginTop:5,
    },
    formInput1 :{
        fontSize:18,
        fontWeight:'bold',
        marginLeft : 50,
        justifyContent: 'center'
    },
    compStyle:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:5,
        color:'black'
    }
    ,
    form :{
        fontSize:18,
        fontWeight:'bold',
        color:'gray',
        marginTop:2
    },
    comp:{
        fontSize:16,
        fontWeight:'bold',
        color:'gray',
    },
    descriptImgViewStyle:{
        flexDirection:'row',
        backgroundColor:'#EBEBEB'
    },
    imgStyle:{
        width: 120,
        height: 120,
        marginLeft:65,
        marginTop:8,
        marginBottom:5,
        backgroundColor:'red',
        borderColor:'black',
        borderWidth: 2,

    }
})
