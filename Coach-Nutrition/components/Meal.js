import React,{Component} from 'react';
import {StyleSheet,Image} from 'react-native';
import NutritionContentProvider from '../dao/NutritionContentProvider';
import FoodMeal from './FoodMeal';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';

let bdContentProvider = new NutritionContentProvider();
@withNavigationFocus('Meal')
export default class Meal extends Component{

    constructor(props){
        super(props);
        this.state=({
            mealList:[],
            data:[],
            typeofComp:'mealComp',
            query:'',
            params:{name:'',date:'',composition:[],photo:require('../image/mealPicture.jpg')}
        });
    }

    static navigationOptions = ({navigation})=>{
        let tabBarLabel = 'Meal';
        let tabBarIcon = ()=>(
            <Image source={require('./../icons/meal3white.png')}
                   style={styles.tabBarImgStyle}
            />
        )
        return{tabBarLabel,tabBarIcon};
    }

    render(){
        return(
            <FoodMeal
                currentList={this.state.mealList}
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
        this.setState({data:this.state.mealList});
    }

    setQuery = (query)=>{
        this.setState({query:query});
    }

    componentWillMount(){
        this.getAllMeal();
    }

    componentWillReceiveProps() {
        this.getAllMeal();

    }
    getAllMeal = ()=>{
        var self = this;
        bdContentProvider.searchAllFoodAndMeal((ret)=>{
            self.setState({mealList:ret});
            this.setState({data:ret})
        })
    }


    updateCurrentList = (list)=>{
        this.setState({mealList:list});
        this.setState({data:list});
    }

    addElement = (e)=>{
        var tmp = this.state.mealList;
        tmp.push(e);
        this.setState({mealList:tmp});

        if(this.state.query.length !== 0){
            tmp = this.state.data;
            tmp.push(e);
            this.setState({data:tmp});
        }else{
            this.setState({data:tmp});
        }
    }

    removeElement = (e)=>{
        var tmp = this.state.mealList;
        tmp.splice(this.state.mealList.indexOf(e),1);
        if(this.state.query.length !== 0)
            this.state.data.splice(this.state.data.indexOf(e),1);
        this.setState({mealList:tmp});
    }



}


const styles = StyleSheet.create({
    tabBarImgStyle:{
        width:26,
        height:26,
        tintColor:'#f15a22'
    }
});
