import React,{Component} from 'react';
import Meal from './Meal';
import {Icon} from "native-base";
import Food from "./Food";
import {Image, StyleSheet} from "react-native";


export default class Home extends Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>{
        let tabBarLabel = 'Home';
        let tabBarIcon = ()=>(
            <Image source={require('./../icons/home.png')}
                   style={styles.tabBarImgStyle}
            />
        )
        return{tabBarLabel,tabBarIcon};
    }

    render(){
        return(
            <Food navigation={this.props.navigation} headerType={"Home"}/>
        );
    }
}

const styles = StyleSheet.create({
    tabBarImgStyle:{
        width:26,
        height:26,
        tintColor:'#f15a22'
    }
});
