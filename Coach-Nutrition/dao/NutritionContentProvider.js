import React, { Component } from 'react';
import NutritionDataBase from "./NutritionDataBase";

//Food
const TABLE_FOODS = "foods";
const KEY_ID= 'id';
const COLUMN_NAME_FOOD = "name";
const COLUMN_NAME_DATE = "date";
const COLUMN_CALORIE_FOOD = "calorie";
const COLUMN_GRAM_FOOD = "gram";
const COLUMN_PHOTO_FOOD = "photo";

//Meal
const TABLE_MEALS = "meals";
const COLUMN_NAME_MEAL = "name";
const COLUMN_DATE_MEAL = "date";
const COLUMN_PHOTO_MEAL = "photo";

const TABLE_MENUS = "menus";
const COLUMN_REF_FOOD = "food_id";
const COLUMN_REF_MEAL = "meal_id";
const COLUMN_AMOUNT = "amount";

let nutritionDataBase = new NutritionDataBase();
let db;


export default class NutritionDataContentProvider extends Component {

    configurationOpen(){
        db = nutritionDataBase.open();
        nutritionDataBase.createTables();
    }

    configurationClose(){
        if(db){
            nutritionDataBase.close();
        }
    }

    drop(){
        nutritionDataBase.dropTables();
    }


    insertFoodArrayData(foodArrayData) {
        let len = foodArrayData.length;
        db.transaction((tx) => {
            for (let i = 0; i < len; i++) {
                let food = foodArrayData[i];
                let name = food.name;
                let date = food.date;
                console.log("DatePick : "+date);
                let calorie = food.calorie;
                let gram = food.gram;
                let photo = food.photo;
                let sql = "INSERT INTO " + TABLE_FOODS + "(" + COLUMN_NAME_FOOD +","+COLUMN_NAME_DATE+"," + COLUMN_CALORIE_FOOD + "," +
                    COLUMN_GRAM_FOOD+ ","  + COLUMN_PHOTO_FOOD+ ")" +
                    "VALUES(?,?,?,?,?)";
                tx.executeSql(sql, [name,date,calorie, gram, photo], () => {

                    }, (err) => {
                        console.log(err);
                    }
                );
            }
        }, () => {
            this._successCB('transaction insert data');
        }, (error) => {
            this._errorCB('transaction', error);
        });
    }

    updateFood(food){
        let id = food.id;
        let name = food.name;
        let date = food.date;
        let calorie = food.calorie;
        let gram = food.gram;
        let photo = food.photo;
        db.transaction((tx)=>{
            tx.executeSql("update "+ TABLE_FOODS + " set " + COLUMN_NAME_FOOD + " = ? , " + COLUMN_CALORIE_FOOD + " = ? , " + COLUMN_GRAM_FOOD +" = ? , " +  COLUMN_PHOTO_FOOD + " = ? ," +  COLUMN_NAME_DATE + " = ? "  + " where " + KEY_ID +" = ? ",[name,calorie,gram,photo,date,id],(tx,{rows:{_array}})=>{

            },);
        },(error)=>{
            console.log(error);
        });
    }


    searchFoodById(id,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from "+ TABLE_FOODS + " where " +KEY_ID +" = ? ",[id],(tx,{rows:{_array}})=>{
                callback(JSON.stringify(_array));
            },);
        },(error)=>{
            console.log(error);
        });
    }


    searchFoodByName(name,callback) {
        console.log("Name : "+name);
        db.transaction((tx)=>{
            tx.executeSql("select * from " + TABLE_FOODS + " where " + COLUMN_NAME_FOOD + " = ?" ,[name],(tx, {rows: {_array}})=>{
                callback(_array[0][KEY_ID]);
            },);
        },(error)=>{
            console.log(error);

        });

    }


    searchAllFood(callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from " + TABLE_FOODS, [],(tx,{rows:{_array}})=>{
                callback(_array);
            },);
        },(error)=>{
            console.log(error);
        });
    }

    deleteFoodById(id) {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_FOODS + " where " + KEY_ID + " = ?", [id], () => {

            });
        });
        this.deleteMenuByFoodId(id);
    }



    deleteFoodByName(name) {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_FOODS + " where " + COLUMN_NAME_FOOD +" = ? " , [name], () => {

            });
        });
    }

    deleteAllFood() {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_FOODS, [], () => {

            });
        });
    }

    insertMealArrayData(mealArrayData) {
        let len = mealArrayData.length;
        db.transaction((tx) => {
            for (let i = 0; i < len; i++) {
                let meal = mealArrayData[i];
                let name = meal.name;
                let date = meal.date;
                let photo = meal.photo;
                let sql = "INSERT INTO " + TABLE_MEALS + "(" + COLUMN_NAME_MEAL + "," + COLUMN_DATE_MEAL + "," + COLUMN_PHOTO_MEAL +")" +
                    "VALUES(?,?,?)";
                tx.executeSql(sql, [name, date,photo], () => {

                    }, (err) => {
                        console.log(err);
                    }
                );
            }
        }, () => {
            this._successCB('transaction insert data');
        }, (error) => {
            this._errorCB('transaction', error);
        });
    }


    updateMealById(id,name,photo){
        db.transaction((tx)=>{
            tx.executeSql("update "+ TABLE_MEALS + " set " + COLUMN_NAME_MEAL + " = ? , " +  COLUMN_PHOTO_MEAL + " = ? " + " where " + KEY_ID +" = ? ",[name,photo,id],(tx,{rows:{_array}})=>{

            },);
        },(error)=>{
            console.log(error);
        });
    }

    searchMealById(id,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from "+ TABLE_MEALS + " where " +KEY_ID +" = ? ",[id],(tx,{rows:{_array}})=>{
                callback(JSON.stringify(_array));
            },);
        },(error)=>{
            console.log(error);
        });
    }


    searchMealIdByNameAndDate(name,date,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from "+ TABLE_MEALS + " where " + COLUMN_NAME_MEAL +" = ? and " + COLUMN_DATE_MEAL + " = ? ",[name,date],(tx,{rows:{_array}})=>{

                callback( _array[0][KEY_ID]);
            },);
        },(error)=>{
            console.log(error);
        });
    }

    searchMealByName(name,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from " + TABLE_MEALS + " where " + COLUMN_NAME_MEAL + " = ?" ,[name],(tx, {rows: {_array}})=>{
                callback(JSON.stringify(_array));
            },);
        },(error)=>{
            console.log(error);

        });

    }

    searchMealByDate(date,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from " + TABLE_MEALS + " where " + COLUMN_DATE_MEAL + " = ?" ,[date],(tx, {rows: {_array}})=>{
                callback(JSON.stringify(_array));
            },);
        },(error)=>{
            console.log(error);

        });

    }

    searchAllMeal(callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from " + TABLE_MEALS, [],(tx,{rows:{_array}})=>{
                callback(_array);
            },);
        },(error)=>{
            console.log(error);
        });
    }

    deleteMealById(id) {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_MEALS + " where " + KEY_ID + " = ?", [id], () => {

            });
        });
        this.deleteMenuByMealId(id);
    }



    deleteMealByName(name) {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_MEALS + " where " + COLUMN_NAME_MEAL +" = ? " , [name], () => {

            });
        });
    }

    deleteAllMeal() {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_MEALS, [], () => {

            });
        });
    }

    insertMenuArrayData(menuArrayData) {
        let len = menuArrayData.length;
        db.transaction((tx) => {
            for (let i = 0; i < len; i++) {
                let menu = menuArrayData[i];
                let amount = menu.amount;
                let meal_id= menu.meal_id;
                let food_id = menu.food_id;
                let sql = "INSERT INTO " + TABLE_MENUS + "(" + COLUMN_AMOUNT + "," + COLUMN_REF_MEAL + "," +
                    COLUMN_REF_FOOD + ")" +
                    "VALUES(?,?,?)";
                tx.executeSql(sql, [amount, meal_id,food_id], () => {

                    }, (err) => {
                        console.log(err);
                    }
                );
            }
        }, () => {
            this._successCB('transaction insert data');
        }, (error) => {
            this._errorCB('transaction', error);
        });
    }

    searchMenuById(id,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from "+ TABLE_MENUS + " where " +KEY_ID +" = ? ",[id],(tx,{rows:{_array}})=>{
                callback(JSON.stringify(_array));
            },);
        },(error)=>{
            console.log(error);
        });
    }

    searchMenuByFoodId(id,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from "+ TABLE_MENUS + " where " + COLUMN_REF_FOOD +" = ? ",[id],(tx,{rows:{_array}})=>{
                callback(JSON.stringify(_array));
            },);
        },(error)=>{
            console.log(error);
        });
    }

    searchMenuByMealId(id,callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from "+ TABLE_MENUS + " where " + COLUMN_REF_MEAL +" = ? ",[id],(tx,{rows:{_array}})=>{
                callback(_array);
            },);
        },(error)=>{
            console.log(error);
        });
    }

    searchAllMenu(callback) {
        db.transaction((tx)=>{
            tx.executeSql("select * from " + TABLE_MENUS, [],(tx,{rows:{_array}})=>{
                callback(_array);
            },);
        },(error)=>{
            console.log(error);
        });
    }

    deleteMenuById(id) {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_MENUS + " where " + KEY_ID + " = ?", [id], () => {

            });
        });
    }

    deleteMenuByFoodId(id) {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_MENUS + " where " + COLUMN_REF_FOOD + " = ?", [id], () => {

            });
        });
    }

    deleteMenuByMealId(id) {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_MENUS + " where " + COLUMN_REF_MEAL + " = ?", [id], () => {

            });
        });
    }

    deleteAllMenu() {
        db.transaction((tx) => {
            tx.executeSql("delete from " + TABLE_MENUS, [], () => {

            });
        });
    }

    insertMealFood(mealFoodArrayData){
        let len = mealFoodArrayData.length;
        for (let i = 0; i < len; i++) {
            let meal = mealFoodArrayData[i];
            let name = meal.name;
            let date = meal.date;
            let photo = meal.photo;
            let foodlist = meal.composition;

            db.transaction((tx) => {

                let sql = "INSERT INTO " + TABLE_MEALS + "(" + COLUMN_NAME_MEAL + "," + COLUMN_DATE_MEAL + "," + COLUMN_PHOTO_MEAL + ")" +
                    "VALUES(?,?,?)";
                tx.executeSql(sql, [name, date, photo], () => {
                    }, (err) => {
                        console.log(err);
                    }
                );

            }, () => {
                this._successCB('transaction insert data');
            }, (error) => {
                this._errorCB('transaction', error);
            });

            let meal_id = -1;
            this.searchMealIdByNameAndDate(name,date,(mealId)=>{
                meal_id = mealId;

                for(let j = 0; j < foodlist.length; j++) {
                    let food = foodlist[j];
                    let food_id = -1;
                    this.searchFoodByName(food.name, (foodId) => {
                        food_id = foodId;
                        let amount = food.amount;
                        db.transaction((tx) => {
                            let menuSql = "INSERT INTO " + TABLE_MENUS + "(" + COLUMN_AMOUNT + "," + COLUMN_REF_MEAL + "," +
                                COLUMN_REF_FOOD + ")" +
                                "VALUES(?,?,?)";
                            tx.executeSql(menuSql, [amount, meal_id, food_id], () => {

                                }, (err) => {
                                    console.log(err);
                                }
                            );

                        }, () => {
                            this._successCB('transaction insert data');
                        }, (error) => {
                            this._errorCB('transaction', error);
                        });
                    });
                }
            });


        }

    }


    updateMeal(meal){

        let id = meal.key;
        this.deleteMealById(parseInt(id));
        this.insertMealFood([meal]);
    }

    searchAllFoodAndMeal(callback) {

        console.log("entre search all food")
        let query = "SELECT ml.name as meal,ml.date,ml.photo,f.name,f.gram,f.calorie," +
            "m.amount,ml.id as mealID, f.id as foodId "+" FROM meals ml" +
            " INNER JOIN menus m ON ml.id = m.meal_id " +
            " INNER JOIN foods f ON f.id = m.food_id ORDER BY ml.date DESC ";
        db.transaction((tx)=>{
            tx.executeSql(query, [],(tx,{rows:{_array}})=>{
                let repas = [];
                console.log("entre search all food")
                for(let i in _array) {
                    let index = this.indexObject(_array[i]["mealID"],repas);
                    console.log("index"+index);
                    if(  index == -1 ){
                        repas.push({key:_array[i]["mealID"].toString(),name:_array[i]["meal"],date:_array[i]["date"],photo:_array[i]["photo"],composition:[{name:_array[i]["name"],amount:_array[i]["amount"]}]});
                    }else{
                        repas[index]["composition"].push({name:_array[i]["name"],amount:_array[i]["amount"]});
                    }
                }
                console.log("repas"+repas.length);
                callback(repas);

            },);
        },(error)=>{
            console.log(error);
        });
    }

    searchDataOfRecentSevenDays(startDate,endDate,callback) {

        let query = "SELECT date(created_date) as date,calorie_total FROM" +
            "    (SELECT  ml.name as meals, ml.date created_date,f.gram," +
            "    SUM(m.amount * f.calorie) as calorie_total," +
            "    m.amount,ml.id as mealID,f.id FROM meals ml" +
            "    INNER JOIN menus m ON ml.id = m.meal_id" +
            "    INNER JOIN foods f ON f.id = m.food_id" +
            "    WHERE date(created_date) >= ? and date(created_date) <= ? "+
            "    GROUP BY date(created_date) ORDER BY date(created_date) LIMIT 7 ) "
        // +
        // "    ORDER BY created_date LIMIT 7 ";

        db.transaction((tx)=>{
            tx.executeSql(query, [startDate,endDate],(tx,{rows:{_array}})=>{

                callback(_array);
            },);
        },(error)=>{
            console.log(error);
        });
    }

    indexObject(obj, list) {
        let i ;
        if(list.length>0){
            for (i = 0; i < list.length; i++) {
                if (list[i]["key"] == obj){
                    return i;
                }
            }
        }

        return -1;
    }




    _successCB(name) {
        console.log('SQLiteStorage ' + name + " success");
    }

    _errorCB(name, err) {
        console.log('SQLiteStorage ' + name);
        console.log(err);
    }

    render() {
        return null;
    }


}
