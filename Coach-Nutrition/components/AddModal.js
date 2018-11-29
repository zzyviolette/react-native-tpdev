import React,{Component} from 'react';
import {
    StyleSheet,
    Text,Platform,
    Dimensions,
    Alert,
    View
} from 'react-native';

import Modal from 'react-native-modalbox';
import DatePick from './DatePick';
import Picture from './Picture';
import MealFoodsComposition from './MealFoodsComposition';
import FlatListItem from './FlatListItem';
import  InputName from './InputName';
import FoodForm from './FoodForm';
import  AddFood from './AddFood';

import NutritionContentProvider from "../dao/NutritionContentProvider";


let bdContentProvider = new NutritionContentProvider();
var screen = Dimensions.get('window');

export default class AddModal extends Component{


    constructor(props) {
        super(props);
        this.state = {
            currentName:this.getCurrentName(),
            currentDate:'',
            currentImage:'',
            foodList:[],
            foodname: '',
            foodamount:1,
            mealCompoList:this.props.params.composition,
            gram:'',
            cal:'',
            holder:this.getCurrentName(),
            params:null,
            tmpkey:1,

            dbfoodList:[],
            dbmealList:[]
        }
    }

    render(){
        return(
            <Modal ref={"myModal"}
                   style={{justifyContent: 'center', borderRadius:Platform.OS === 'ios'?30:0,
                           shadowRadius: 10, width: screen.width-80, height:515}}
                   onClosed={this.resetAll}
                   position='center' backdrop={true}
                   currentPage = {this.getCompType()}
            >

                    <Text style={styles.formInput}>
                        {this.getCompType()}
                    </Text>

                    <InputName setName={this.setName.bind(this)}
                               currentName={this.state.currentName}
                               name={this.props.params.name}/>

                    <DatePick setDate={this.setDate.bind(this)}
                              date={this.props.params.date}/>

                    <Text style={{marginLeft:90}}>
                        Choose picture
                    </Text>
                    <Picture setImage={this.setImage.bind(this)}
                             image={this.props.params.photo}/>

                    <FoodForm foodList={this.state.dbfoodList}
                              foodname={this.state.foodname}
                              setFoodName={this.setFoodName.bind(this)}
                              setFoodAmount={this.setFoodAmount.bind(this)}
                              addFood={this.addFood.bind(this)}
                              typeComp={this.props.typeComp}
                              params={this.props.params}
                              setGram={this.setGram.bind(this)}
                              setCal={this.setCal.bind(this)}
                              currentPage = {this.getCompType()}
                    />


                    {this.props.typeComp === "foodComp" ||this.props.typeComp === "editFood"? null:
                        <View style={{flex:1}}>
                            <Text style={{marginLeft:30}}>
                                Composition
                            </Text>
                        <MealFoodsComposition mealCompoList ={this.state.mealCompoList}
                                              removeFood={this.removeFood.bind(this)}
                                              composition={this.props.params.composition}/>
                        </View>
                    }
                    <AddFood save={this.save.bind(this)} params={this.props.params}/>
            </Modal>
        )
    }

    componentWillMount(){
        this.getAllFood();
        this.getAllMeal();
    }

    componentWillReceiveProps() {
        this.getAllFood();
        this.getAllMeal();

    }

    getAllFood = ()=>{
        var self = this;
        bdContentProvider.searchAllFood(function(ret){
            self.setState({ dbfoodList:ret});
        });
    }

    getAllMeal = ()=>{
        var self = this;
        bdContentProvider.searchAllFoodAndMeal((ret)=>{
            self.setState({ dbmealList:ret});
        })
    }


    getCurrentName =() =>
    {
        if(this.props.typeComp === "foodComp")
            return 'Food name';
        else if(this.props.typeComp === "mealComp")
            return 'Meal name';
    }


    getCompType = ()=>
    {
        switch (this.props.typeComp){
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

    setName = (name)=>
    {
        if(this.props.typeComp === "mealComp"||
            this.props.typeComp === "editMeal")
            this.setState({currentName:name});

        else if(this.props.typeComp === "foodComp" ||
                this.props.typeComp === "editFood")
            this.setState({foodname: name});
    }

    setDate(date)
    {
        this.state.currentDate = date;
    }
    setImage = (img)=>
    {
        this.state.currentImage = img;
    }

    setFoodName = (name)=>
    {
        this.state.foodname = name;
    }

    setFoodAmount = (amount)=>
    {
        this.state.foodamount = amount;
    }

    setGram = (gram)=>
    {
        this.setState({gram:gram});
    }

    setCal = (cal) =>
    {
        this.setState({cal:cal});
    }

    showAddModal = ()=>
    {
        this.refs.myModal.open();
    }

    isNumber = (element)=>
    {
        if(!isNaN(element))
        {
            return true;
        }
        return false;
    }

    addFood (){

        if(this.state.foodname.length === 0){
            Alert.alert("EmptyFood", "Please complete required field");
            return
        }

        if(this.state.foodname !== "" && this.state.foodname === "Select"){
            Alert.alert("FoodNoExist", "Please select food !");
            return;
        }


        if(FlatListItem.foundElement(this.state.foodname,
            this.state.mealCompoList.concat(this.props.params.composition),'exist') !== undefined){
            Alert.alert("FoodExist", "Food exist in composition list");
            return;
        }

        var tmpList = [{name:this.state.foodname,amount:this.state.foodamount}];
        this.setState({mealCompoList:tmpList.concat(this.state.mealCompoList)});
    }

    removeFood = (index)=>{
        var tmpList = this.state.mealCompoList;
        tmpList.splice(index,1);
        this.setState({mealCompoLis:tmpList});
    }

    foodCond = ()=>{

        var foodcond  = !(this.props.typeComp === 'foodComp')||
                        !this.isNumber(this.state.gram)||
                        !this.isNumber(this.state.cal)||
                         this.state.foodname === ''||
                         this.state.currentDate === '';
        return (foodcond);
    }

    mealCond = ()=>{

        const mealcond =  !(this.props.typeComp === 'mealComp')||
                            this.state.mealCompoList.length === 0||
                            this.state.currentName ==='' ||
                            this.state.currentDate === '';

        return(mealcond);

    }

    editMealCond = (params,mealComp)=>{
        if(this.props.typeComp === 'editMeal' )
            this.interMealList(params.composition,mealComp);
        return(this.props.typeComp === 'editMeal' && mealComp.length === 0);
    }

    editFoodCond = () =>{
        return (this.props.typeComp !== 'editFood');
    }

    save = (params)=>
    {
        let img = '';
        if(this.state.currentImage.toString().split(":")[0] === "file"){
            img =  this.state.currentImage;
        }
        const mealname = this.state.currentName;
        const mealComp = this.state.mealCompoList;
        const date = this.state.currentDate;
        const foodname = this.state.foodname;
        const cal = this.state.cal;
        const gram = this.state.gram;


        if( this.foodCond() && this.mealCond(mealComp) &&
            this.editMealCond(params,mealComp)&&this.editFoodCond())
        {
            Alert.alert("Please complete all required fields");
            return
        }

        switch (this.props.typeComp )
        {
            case 'foodComp':
                this.insertFood(foodname,date,img,cal,gram);break;
            case 'mealComp':
                this.insertMeal(mealname,date,img,mealComp);break;
            case 'editFood':
                this.editFood(params,foodname,date,img,cal,gram);
                break;
            case 'editMeal':
                this.editMeal(params,mealname,date,img,mealComp);break;
        }

    }


    insertFood = (foodname,date,img,cal,gram)=>{
        var element = FlatListItem.foundElement(foodname,this.state.dbfoodList,'exist');
        var self = this.props;

        if(element !== undefined)
        {
            Alert.alert("NameExist", "Please remove this food before add");
            return;
        }
        const newFood = {
            name:foodname,
            date:date,
            calorie:cal,
            gram:gram,
            photo:img
        }
        bdContentProvider.insertFoodArrayData([newFood]);

        bdContentProvider.searchAllFood(function(ret){
            self.updateCurrentList(ret);
        });
        this.props.refreshFlatList();
        this.refs.myModal.close();
    }

    insertMeal = async (mealname,date,img,mealComp)=>{
        var element = FlatListItem.foundElement(mealname,this.state.dbmealList,'exist');
        if(element !== undefined)
        {
            Alert.alert("NameExist", "Please remove this meal before !");
            return;
        }

        const newMeal ={
            name:mealname,
            date:date,
            composition:mealComp,
            photo:img
        }
        bdContentProvider.insertMealFood([newMeal]);

        bdContentProvider.searchMealIdByNameAndDate(mealname,date,(id)=>{
            let meal_id = id;
            this.props.addElement({key: ""+meal_id,
                name:mealname,
                date:date,
                composition:mealComp,
                photo:img});

            this.props.refreshFlatList();
            this.refs.myModal.close();
        });
    }
    editFood = (params,foodname,date,img,cal,gram) =>
    {
        var element = this.props.params;

        if(element !== undefined)
        {
            const realname = foodname !== ''?foodname:params.name;
            const realdate = date !== ''?date:params.date;
            const realimg = img !==''?img:params.photo;
            const realCal = cal !==''?cal:params.calorie;
            const realGram = gram !== ''?gram:params.gram;
            element.name = realname;
            element.date= realdate;
            element.photo = realimg;
            element.calorie = realCal;
            element.gram = realGram;
            bdContentProvider.searchAllFood((ret)=>{console.log(ret)})
            bdContentProvider.updateFood(element);
            bdContentProvider.searchAllFood((ret)=>{console.log(ret)})
        }
        this.props.refreshFlatList();
        this.refs.myModal.close();
    }
    editMeal = (params,mealname,date,img,mealComp) =>{
        var element = this.props.params;

        if(element !== undefined)
        {
            const realname = mealname !== '' ?mealname:params.name;
            const realdate = date !== ''?date:params.date;
            const realimg = img !==''?img:params.photo;
            const realcomp = mealComp;
            element.name = realname;
            element.date= realdate;
            element.photo = realimg;
            element.composition = realcomp;
            bdContentProvider.updateMeal(element);
        }
        this.props.refreshFlatList();
        this.refs.myModal.close();
    }

    interMealList = (paramList,currentList)=>{
        var elementFound;
        for(var i = 0; i < paramList.length;i++){
            elementFound = FlatListItem.foundElement(paramList[i],currentList,'name');
            if(elementFound === undefined)
                currentList.push(paramList[i])
        }
    }

    resetAll = ()=>
    {
        this.setState({currentName:''});
        this.state.foodamount = 1;
        this.setState({mealCompoList:[]});
        this.setState({currentImage:''});

        if (this.props.typeComp === "editFood" ||
            this.props.typeComp === "editMeal")
            this.props.resetTypeComp();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height:50,
        backgroundColor:'red'
    },
    spinner2: {
        flex: 1,
        width: 50,
        height:47,
        marginLeft: 40,
        marginRight: 65
    },
    formInput :{
        fontSize:16,
        fontWeight:'bold',
        textAlign: 'center',
        marginTop: 40
    },
    textInputName:{
        flexDirection: 'row',
        marginTop:10,
        marginBottom:10,
        marginLeft:40
    },
    textInputNameIcon:{
        fontSize: 20,
        marginTop:10,
        marginRight: 10,
        color: 'red'
    },
    textInputNameInput:{
        width:165,
        height:40,
        borderWidth: 2,
        borderColor: 'black'
    },
    numberInput1:{
        height: 32,
        width:80,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor:'red'
    },
    numberInput2:{
        height: 32,
        width:75,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor:'red'
    },
    contentContainer: {
        paddingVertical: 5,
        justifyContent: 'space-between'
    },
    scrollStyle:{
        width: screen.width - 130,
        height: 100,
        flex:1,
        justifyContent: 'center',
        marginLeft: 30,
        borderColor:'black',
        borderWidth:3
    }
})



