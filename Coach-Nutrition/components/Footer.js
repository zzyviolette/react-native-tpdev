import React,{Component} from 'react';
import { StyleSheet,View,Text,Image} from 'react-native';

export  default class Footer extends Component{

    render(){
        return(
            <View style={styles.mainViewStyle}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle :{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    tabBarImgStyle:{
        width:26,
        height:26,
        tintColor:'#0067a7'
    }
});
