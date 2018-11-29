import React,{Component} from 'react';
import DatePicker from "react-native-datepicker";
import {StyleSheet, View} from "react-native";
import Modal from "react-native-modalbox";


export default class DatePick extends Component{
    state = {
        date:this.props.date
    }

    render(){
        return(
            <View style={styles.contentStyle}>
                <View style={styles.datePickerViewStyle}>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={this.state.date}
                        maxDate={new Date()}
                        mode="datetime"
                        placeholder="select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date=>this.updateDate(date)}
                    />
                </View>
            </View>
        );
    }

    updateDate = (date)=>
    {
        this.setState({date:date});
        this.props.setDate(date);
    }


}
const styles = StyleSheet.create({
    datePickerStyle:{
        width: 200,
        marginBottom: 15
    },
    datePickerViewStyle:{
        width: 100
    },
    contentStyle:{
        flexDirection: "row",
        marginLeft: 30
    }
})
