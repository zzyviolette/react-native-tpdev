import React,{Component} from 'react';
import {FlatList,View,Platform} from 'react-native';
import AddModal from './AddModal';
import Header from "./Header";
import FlatListItem from "./FlatListItem";
import MealDescription from "./MealDescription";
import Footer from "./Footer";
export default class FoodMeal extends Component{


    constructor(props){

        super(props);
        this.state=({
            deleteRowKey:null,
            loadind:false,
            refresh:false,
            typeComp:this.props.typeComp,
            typeCompTmp:this.props.typeComp,
            params:this.props.params,
            paramsTmp:this.props.params,
            data:this.props.data,
        });
        this._onPressAdd = this._onPressAdd.bind(this);

    }

    render(){
        return(
            <View style={{flex:1,marginTop:Platform.OS ==='ios'?34:0}}>

                <Header currentList={this.props.currentList}
                        navigation={this.props.navigation}
                        typeComp = {this.state.typeComp}
                        query={this.props.query}
                        setQuery={this.props.setQuery}
                        setCurrentList={this.props.setCurrentList}
                        setData={this.props.setData}
                        showModal={this._onPressAdd.bind(this)}
                        headerType={this.props.headerType}/>
                <FlatList
                    extraData={this.state.refresh}
                    ref={"flatList"}
                    data={this.props.data}

                    renderItem={({item,index})=>{
                        return(
                            <FlatListItem
                                key={index}
                                item={item}
                                index={index}
                                typeComp={this.state.typeComp}
                                query={this.state.query}
                                navigation={this.props.navigation}
                                data={this.props.data}
                                currentList={this.props.currentList}
                                refreshFlatList={this.refreshFlatList.bind(this)}
                                setTypeComp={this.setTypeComp.bind(this)}
                                setParams={this.setParams.bind(this)}
                                showModal={this._onPressAdd.bind(this)}
                                showMealModal={this.onPressMeal.bind(this)}
                                updateCurrentList={this.props.updateCurrentList}
                                removeElement={this.props.removeElement}>
                            </FlatListItem>)
                    }}
                    keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>
                <AddModal ref={'addModal'}
                          refreshFlatList={this.refreshFlatList.bind(this)}
                          typeComp={this.state.typeComp}
                          params={this.state.params}
                          data={this.state.data}
                          resetTypeComp={this.resetTypeComp.bind(this)}
                          updateCurrentList={this.props.updateCurrentList}
                          addElement={this.props.addElement}
                >
                </AddModal>
                <MealDescription ref={'mealComposition'}>
                </MealDescription>
                <Footer/>
            </View>
        );

    }

    getCompType = ()=>
    {
        switch (this.state.typeComp){
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

    resetTypeComp = ()=> {
        this.setState({typeComp:this.state.typeCompTmp});
        this.setState({params:this.state.paramsTmp});
    }
    setTypeComp = (type) => {
        this.setState({typeComp:type});
    }
    setParams = (params)=>{
        this.setState({params:params});
    }

    refreshFlatList = ()=>{
        if(this.state.typeComp === 'editMeal'||
            this.state.typeComp === 'editFood')
        {
            this.setState({typeComp:this.state.typeCompTmp});
            this.setState({params:this.state.paramsTmp});
        }
        this.setState({
            refresh: !this.state.refresh
        })
        this.refs.flatList.scrollToEnd();
    }

    _onPressAdd(){
        this.refs.addModal.showAddModal();
    }

    onPressMeal = (name,date,composition,photo)=>{
        this.refs.mealComposition.showMealModal(name,date,composition,photo);
    }
}
