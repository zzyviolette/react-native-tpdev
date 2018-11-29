import React,{Component} from 'react';
import {
    View,
    Image,
    TouchableHighlight, Text, StyleSheet,
} from 'react-native';
import {SearchBar} from "react-native-elements";
const addButtonImg = require('../icons/addbtn.png');
export default class Header extends Component{
    render(){

        return(
            <View>

                    <View style={styles.headerViewStyle1}>
                        <View
                            style={{flex: 1,marginLeft: 30+(this.props.typeComp === "statsComp") ?-10:10}}>
                            <Text style={(this.props.typeComp === "statsComp")?styles.statsLabelStyle1 :styles.statsLabelStyle }>{
                                this.getScreenDescript()
                            }</Text>
                        </View>
                        <View style={styles.headerViewStyle1}>
                            {this.getaddButton()}
                        </View>
                        }
                    </View>


                {(this.props.typeComp === "statsComp") ? null :
                    <View style={styles.headerViewStyle1}>
                        <View
                            style={{flex: 1}}>
                            {this.getToolbar()}
                        </View>
                    </View>
                }
            </View>


        )
    }
    openDrawer = ()=>{
        this.props.navigation.openDrawer();
    }
    getScreenDescript = ()=>{
        if(this.props.headerType !== '' && this.props.headerType !== undefined){
            return this.props.headerType
        }else if(this.props.typeComp === "statsComp") {
            return 'Statistic';
        }else if(this.props.typeComp === "foodComp") {
            return 'Foods';
        }else if(this.props.typeComp === "mealComp") {
            return 'Meals';
        }else {
            return '';
        }
    }

    getaddButton = ()=>{
        if (this.props.typeComp === "statsComp")
            return null;
        else
            return (<TouchableHighlight
                    style={{marginRight: 10}}
                    underlayColor='#f15a22'
                    onPress={this.showModal}
                >
                <Image
                    style={styles.addButtonImgStyle}
                    source={addButtonImg}
                />
            </TouchableHighlight>);
    }

    getToolbar= () => {
        if (this.props.typeComp === "statsComp")
            return <Text style={styles.statsLabelStyle}>Stats section</Text>;
        else
            return ( <SearchBar placeholder="Type Here..." lightTheme round
                                containerStyle={styles.toolbarStyle}
                                inputStyle={{backgroundColor: 'white'}}
                                onChangeText={this.handlerSearch}/>);
    }

    handlerSearch = (text)=>{
        this.props.setQuery(text);
        if(text === '') this.props.setCurrentList(this.props.currentList)
        else    this.props.setData(this.findMeal(this.props.query));
    };


    findMeal(query) {
        console.log("Saerch : "+query);
        if (query === '') {
            return [];
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        return this.props.currentList.filter(element => element.name.search(regex) >= 0);
    }

    showModal = ()=>{
        this.props.showModal();
    }
}

const styles = StyleSheet.create({
    toolbarStyle:{
        backgroundColor: "#f15a22",
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    statsLabelStyle:{
        textAlign: 'center',
        marginLeft:60,
        marginBottom: 5,
        fontSize:30,
        color:'white'
    },
    statsLabelStyle1:{
        textAlign: 'center',
        marginBottom: 5,
        fontSize:30,
        color:'white'
    },
    addButtonImgStyle:{

        width: 35,
        height:36
    },
    drawerTouchableStyle :{
        marginLeft: 10,
        marginTop: 20,
        marginBottom:15
    },
    drawerIconStyle:{
        fontSize: 20,
        color: 'black'
    },
    drawerViewStyle:{
        height:90,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerViewStyle:{
        backgroundColor:'gray',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        borderBottomColor:'black',
        borderTopColor:'black',
        borderBottomWidth:1,
        borderTopWidth:1,
        height:64
    },
    headerViewStyle1:{
        backgroundColor:'#f15a22',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        borderTopColor:'white',
        borderTopWidth:1,
        height:64
    },

})

