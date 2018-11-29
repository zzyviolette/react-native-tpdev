import Expo, { SQLite } from 'expo';
import React, { Component } from 'react';

const DB_NAME = "coach_nutritions";
const DB_DISPLAYNAME = "coach_nutritions";
const DB_VERSION = "1.0";
const DB_SIZE =  200000;

//Food
const TABLE_FOODS = "foods";
const KEY_ID= 'id';
const COLUMN_NAME_FOOD = "name";
const COLUMN_DATE_FOOD = "date";
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

const CREATE_FOODS =
    "CREATE TABLE IF NOT EXISTS " + TABLE_FOODS + "(" +
    KEY_ID + " INTEGER PRIMARY KEY," +
    COLUMN_NAME_FOOD + " TEXT, " +
    COLUMN_DATE_FOOD + " DATENAME ,"+
    COLUMN_GRAM_FOOD + " NUMERIC, " +
    COLUMN_CALORIE_FOOD + " NUMERIC , "+
    COLUMN_PHOTO_FOOD + " TEXT , "+
    "UNIQUE(" + COLUMN_NAME_FOOD +") " +
    "ON CONFLICT IGNORE )";


const CREATE_MEALS =
    "CREATE TABLE IF NOT EXISTS " + TABLE_MEALS + "(" +
    KEY_ID + " INTEGER PRIMARY KEY," +
    COLUMN_NAME_MEAL + " TEXT , " +
    COLUMN_DATE_MEAL + " DATENAME ," +
    COLUMN_PHOTO_MEAL + " TEXT , " +
    "UNIQUE(" + COLUMN_NAME_MEAL + "," + COLUMN_DATE_MEAL+ ") " +
    "ON CONFLICT IGNORE )";


const  CREATE_MENUS =
    "CREATE TABLE IF NOT EXISTS " + TABLE_MENUS + "(" +
    KEY_ID + " INTEGER PRIMARY KEY," +
    COLUMN_AMOUNT + " NUMERIC ," +
    COLUMN_REF_MEAL + " INTEGER ," +
    COLUMN_REF_FOOD + " INTEGER ," +
    "FOREIGN KEY(" + COLUMN_REF_MEAL +") REFERENCES " + TABLE_MEALS + "(" +KEY_ID +") ON DELETE CASCADE," +
    "FOREIGN KEY(" + COLUMN_REF_FOOD +") REFERENCES " + TABLE_FOODS + "("+KEY_ID +") ON DELETE CASCADE ," +
    "UNIQUE(" + COLUMN_REF_MEAL + "," + COLUMN_REF_FOOD+ ") " +
    "ON CONFLICT IGNORE );";

let db ;

export default class NutritionDataBase extends Component {


    open() {
        db = SQLite.openDatabase(
            DB_NAME,
            DB_VERSION,
            DB_DISPLAYNAME,
            DB_SIZE,
            () => {
                this._successCB('open');
            },
            (err) => {
                this._errorCB('open', err);
            });
        return db;
    }

    createTables() {
        db.transaction((tx) => {
            tx.executeSql(CREATE_FOODS
                , [], () => {
                    this._successCB('executeFoodCreateSql');
                }, (err) => {
                    this._errorCB('executeFoodCreateSql', err);
                });
            tx.executeSql(CREATE_MEALS
                , [], () => {
                    this._successCB('executeMealCreateSql');
                }, (err) => {
                    this._errorCB('executeMealCreateSql', err);
                });
            tx.executeSql(CREATE_MENUS
                , [], () => {
                    this._successCB('executeMenuCreateSql');
                }, (err) => {
                    this._errorCB('executeMenuCreateSql', err);
                });
        },  () => {
            this._successCB('transaction create tables');
        },  (err) => {
            this._errorCB('transaction create tables', err);
        },)
    }

    dropTables() {
        db.transaction((tx) => {
            tx.executeSql('drop table ' + TABLE_FOODS, [], () => {
                this._successCB('executeMenuDropSql');
            }, (err) => {
                this._errorCB('executeMenuDropSql', err);
            });
            tx.executeSql('drop table ' + TABLE_MEALS, [], () => {
                this._successCB('executeMenuDropSql');
            }, (err) => {
                this._errorCB('executeMenuDropSql', err);
            });
            tx.executeSql('drop table ' + TABLE_MENUS, [], () => {
                this._successCB('executeMenuDropSql');
            }, (err) => {
                this._errorCB('executeMenuDropSql', err);
            });
        },  () => {
            this._successCB('transaction drop tables');
        },  (err) => {
            this._errorCB('transaction drop tables', err);
        });
    }

    close() {
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            console.log('SQLiteStorage not open');
        }
        db = null;
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
