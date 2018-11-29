import React,{Component} from 'react';
import {StyleSheet, Text, View, Image, Alert, TouchableHighlight} from 'react-native';
import Swipeout from 'react-native-swipeout';
import NutritionContentProvider from "../dao/NutritionContentProvider";

let bdContentProvider = new NutritionContentProvider();

export default class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            img:this.getImgType(),
            activeRowKey:null,
            numberOfRefresh:0,
            activeRow:-1,
            previousTimeOut:null,
            currentId : -1,
            time:1500
        };
    }

    render(){
        const swipeSetting ={

            onClose:(setId,rowId,direction)=>{},
            onOpen:(setId,rowId,direction) =>{
                this.setState({activeRowKey:this.props.key})
            },
            rowId:this.props.index,
            sectionId:1
        };
        return(
            <Swipeout
                       right={[{
                           onPress:this.editElement,
                           text:'Edit',type:'primary',
                           color:'white',
                           backgroundColor:'#ff8c00'
                       },{
                           onPress:this.removeElement,
                           text:'Delete',type:'delete',
                           color:'white',
                           backgroundColor:'#FF6259'
                       }]}

                       autoClose={true}
                       rowID={this.props.index}
                       close={this.state.activeRow !== this.props.index}

                       onOpen={(secId, rowId, direction) => {

                           if (typeof direction !== "undefined" && this.state) {
                               this.setState({ activeRow: rowId });

                               if (this.state.previousTimeOut != null){
                                   clearTimeout(this.state.previousTimeOut);
                               }

                               this.state.previousTimeOut = setTimeout(
                                   (() => {
                                       if (
                                           this.state &&
                                           this.state.activeRow != null &&
                                           this.state.activeRow == rowId
                                       ) {
                                           this.setState({ activeRow: null });
                                       }
                                   }).bind(this),
                                   this.state.time
                               );
                           }


                       }}
            >
                <View>
                <TouchableHighlight onPress={this.displayDescription}
                                    style={{ backgroundColor: 'transparent' }}
                                    underlayColor={'transparent'}
                >
                <View style={styles.contentStyle}>
                    <View style={styles.descriptImgViewStyle}>
                        <Image style={styles.imgStyle} source={this.getImgType()}/>
                        <View
                            style={styles.descriptViewStyle}>
                            <Text numberOfLines={6} style={styles.flatListItem}>
                                <Text style={styles.flatListItem}>
                                        Name :
                                </Text>
                                <Text style={styles.flatListItem}>
                                    {this.completeText(this.props.item.name,34)}
                                </Text>
                                    <Text style={styles.flatListItem}>
                                        Date :
                                    </Text>


                                    <Text style={styles.flatListItem}>
                                        {this.completeText(this.goodFormDate(this.props.item.date),24)}
                                    </Text>

                                <Text style={styles.flatListItem}>
                                    {this.getTypeMess()}
                                </Text>
                                    <Text style={styles.flatListItem}>
                                        {this.description()}
                                    </Text>
                                </Text>
                        </View>
                    </View>
                    <View style={styles.endViewStyle}/>
                </View>
                </TouchableHighlight>

                </View>
            </Swipeout>
        );
    }
    goodFormDate = (date)=>{
        var goodDate = date.split(" ");
        var datereverse = goodDate[0].split("-").reverse().join("-");
        return (datereverse +"  "+goodDate[1]);
    }

    displayDescription = ()=>{
        if(this.props.typeComp === 'mealComp'){
            this.props.showMealModal(this.props.item.name,
                this.props.item.date,this.props.item.composition,this.props.item.photo);
        }
    }

    isNumber = (element)=>{
        if(!isNaN(element))
        {
            return true;
        }
        return false;
    }

    getImgType = ()=>{
        if(!this.isNumber(this.props.item.photo)&& this.props.item.photo.split(":")[0] === "file")
            return {uri:this.props.item.photo};
        else
            return require('../image/mealPicture.jpg');
    }

    getTypeMess = ()=>{
        if(this.props.typeComp === 'mealComp')
            return  "Composition : "
        else if(this.props.typeComp === 'foodComp')
            return "       Details : \n";
    }

    refreshFlatListItem = ()=>
    {
        this.setState((prevstate)=>{
            return{
                numberOfRefresh: prevstate.numberOfRefresh+1
            };
        })
    }

    description = ()=>
    {
        let res = '';
        if(this.props.typeComp === 'mealComp') res = this.mealDescript(this.props.item.composition);
        else if(this.props.typeComp === 'foodComp') res = this.foodDescript(this.props.item);
        return res;
    }

    mealDescript= (list) =>
    {
        let res = "";
        list.map((l,index) => {
            res += l.name;
            if(index < list.length-1)
                res +=", "
        })
        return res;
    }

    foodDescript = (food)=>
    {

            return 'Cal : '+food.calorie+', gram : '+food.gram ;
    }

    completeText = (text,lenmax)=>
    {
        let res = text;
        let index = text.length;
        for(let i = index; i < lenmax;i++)
        {
            res +=' ';
        }
        return res;
    }

    removeElement =()=>
    {
        Alert.alert(
            'Alert',
            'Are you sure you want to delete ?',
            [
                {text: 'No',onPress:()=>console.log('Cancel Pressed'),style:'canclel'},
                {text: 'Yes',onPress:() => this.clear()}
            ]
        );

    }

    clear = ()=>
    {
        var self = this.props;
        var key;
        if(this.props.typeComp === 'foodComp')
        {
            key = parseInt(this.props.item.id)
            bdContentProvider.deleteFoodById(key);
            this.props.removeElement(this.props.item);
        }
        else if(this.props.typeComp === 'mealComp')
        {
            key = parseInt(this.props.item.key);
            bdContentProvider.deleteMealById(key);
            this.props.removeElement(this.props.item);
        }
        self.refreshFlatList();
    }

    static foundElement = (e,list,bySym)=>
    {
        var found = list.find(function(element)
        {
                switch (bySym) {
                    case 'id':
                        if(e.id === element.id)
                            return element;
                        break;
                    case 'key':
                        if(e.key === element.key)
                            return element;
                        break;
                    case 'name':
                        if(e.name === element.name)
                            return  element
                        break;
                    case 'exist':
                        if(e === element.name)
                            return element
                        break;
                }
        });
        return found;
    }

    editElement = ()=>
    {
        var element = this.props.item;
        var elementFound = FlatListItem.foundElement(element,this.props.currentList,this.props.typeComp === 'foodComp'? 'id':'key');


        this.props.setTypeComp(this.props.typeComp === 'foodComp'?'editFood':'editMeal');

        if(!this.isNumber(element.photo)&& element.photo.split(":")[0] === "file")
        {
            element.photo = elementFound.photo;
        }else{
            element.photo = require('../image/mealPicture.jpg')
        }
        this.props.setParams(element);
        this.props.showModal();
    }
}

const styles = StyleSheet.create({
    flatListItem:{
        color:'gray',
        padding:2,
        fontSize:16
    },
    imgStyle:{
        width: 120,
        height: 120,
        margin:5,
        borderColor:'black',
        borderWidth: 2
    },
    descriptImgViewStyle:{
        flex: 1,
        flexDirection:'row',
        backgroundColor:'#EBEBEB'
    },
    contentStyle:{
        flex: 1,
        flexDirection: 'column'
    },
    descriptViewStyle:{
        flex:1,
        flexDirection:'column'
    },
    endViewStyle:{
        height:1,
        backgroundColor:'white'
    }
})
