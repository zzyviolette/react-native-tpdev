import React,{Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import { updateFocus, getCurrentRouteKey } from 'react-navigation-is-focused-hoc'


import Home  from './components/Home'
import Meal  from "./components/Meal";
import Food  from "./components/Food";
import Stats from './components/Stats';
import Settings from './components/Settings';


let routeConfigs = {
    Home:{
        screen:Home
    },
    Food:{
        screen:Food
    },
    Meal:{
        screen:Meal
    },
    Stats:{
        screen:Stats
    }
}


let tabNavigatorConfig = {
    tabBarPosition:'bottom',
    animationsEnabled:true,
    swipeEnabled:true,
    tabBarOptions:{
        activeTintColor:'orange',
        labelStyle:{
            fontSize:13
        },
        style:{
            backgroundColor:'white',
            padding: -10
        }
    }
}

const Nav = createBottomTabNavigator(routeConfigs,tabNavigatorConfig);
import NutritionContentProvider from './dao/NutritionContentProvider';
let bdContentProvider = new NutritionContentProvider();

export  default class App extends Component{

    render() {
        return(
            <Nav onNavigationStateChange={(prevState, currentState) => {
                updateFocus(currentState)
            }}/>
        );
    }


    componentWillMount(){
        bdContentProvider.configurationOpen();
    }

    componentWillUnmount() {
        bdContentProvider.configurationClose();
    }


}
