import React,{Component} from 'react';
import {Icon} from "native-base";
import Food from './Food';



export default class Settings extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>{
        let drawerLabel = 'Settings';
        let drawerIcon = ()=>(
            <Icon name='ios-settings' style={{fontSize: 20, color: 'red'}}/>
        );
        return {drawerLabel,drawerIcon};
    }

    render(){
        return(
            <Food navigation={this.props.navigation}/>
        );
    }
}
