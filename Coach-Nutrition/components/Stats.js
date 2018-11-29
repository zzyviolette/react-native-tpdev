import React,{Component} from 'react';
import {Icon,} from "native-base";
import Chart from "./Chart";
import {Image, Platform, StyleSheet, TouchableHighlight, View} from "react-native";
import Header from "./Header";
import {withNavigationFocus} from "react-navigation-is-focused-hoc";
import Modal from "react-native-modalbox";

@withNavigationFocus('Stats')
export default class Stats extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>{
        let tabBarLabel = 'Stats';
        let tabBarIcon = ()=>(
            <Image source={require('./../icons/statwhite.png')}
                   style={styles.tabBarImgStyle}
            />
        );
        return{tabBarLabel,tabBarIcon};
    }
    render(){
        return(
            <View style={{flex:1,marginTop:Platform.OS ==='ios'?34:0}}>
                <View>
                    <Header typeComp = {"statsComp"} navigation={this.props.navigation}/>
                </View>
                <Chart navigation={this.props.navigation} />
            </View>
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
