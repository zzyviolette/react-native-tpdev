import React,{Component} from 'react';
import {TouchableHighlight,StyleSheet,Image} from 'react-native';
import NutritionContentProvider from '../dao/NutritionContentProvider';
import FoodMeal from './FoodMeal';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';


let bdContentProvider = new NutritionContentProvider();
@withNavigationFocus('Food')
export default class Food extends Component{

    constructor(props){
        super(props);
        this.state=({
            foodList:[],
            data:[],
            typeofComp:'foodComp',
            query:'',
            params:{name:'',date:'',photo:require('../image/mealPicture.jpg')}
        });
    }

    static navigationOptions = ({navigation})=>{

        let tabBarLabel = 'Food';

        let tabBarIcon = ()=>(

            <Image source={require('./../icons/foodwhite.png')}
                   style={styles.tabBarImgStyle}
            />

        );

        return{tabBarLabel,tabBarIcon};
    }


    render(){

        return(

            <FoodMeal
                currentList={this.state.foodList}
                data={this.state.data}
                typeComp={this.state.typeofComp}
                navigation={this.props.navigation}
                params={this.state.params}
                headerType={this.props.headerType}
                updateCurrentList={this.updateCurrentList.bind(this)}
                addElement={this.addElement.bind(this)}
                removeElement={this.removeElement.bind(this)}
                setData={this.setData.bind(this)}
                setCurrentList={this.setCurrentList.bind(this)}
                setQuery={this.setQuery.bind(this)}
                query={this.state.query}
            />);
    }


    setData = (data)=>{
        this.setState({data:data});
    }

    setCurrentList = (currentList)=>{
        this.setState({data:this.state.foodList});
    }

    setQuery = (query)=>{
        this.setState({query:query});
    }

    componentWillMount(){
        this.getAllFood();
    }

    addElement = (e)=>{
        var tmp = this.state.foodList;
        tmp.push(e);
        this.setState({foodList:tmp});

        if(this.state.query.length !== 0){
            tmp = this.state.data;
            tmp.push(e);
            this.setState({data:tmp});
        }else{
            this.setState({data:tmp});
        }
    }

    componentWillReceiveProps() {
        this.getAllFood();

    }
    getAllFood = ()=>{
        var self = this;
        bdContentProvider.searchAllFood(function(ret){
            self.setState({foodList:ret});
            self.setState({data:ret});
        });
    }

    updateCurrentList = (list)=>{
        this.setState({foodList:list});
        this.setState({data:list});
    }

    removeElement = (e)=>{
        var tmp = this.state.foodList;
        tmp.splice(this.state.foodList.indexOf(e),1);
        if(this.state.query.length !== 0)
            this.state.data.splice(this.state.data.indexOf(e),1);
        this.setState({foodList:tmp});
    }


}

const styles = StyleSheet.create({
    tabBarImgStyle:{
        width:26,
        height:26,
        tintColor:'#f15a22'
    }
});


