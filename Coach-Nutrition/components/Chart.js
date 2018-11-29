import React from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {
    LineChart,
} from 'react-native-chart-kit'
import NutritionContentProvider from '../dao/NutritionContentProvider';
import DatePicker from "react-native-datepicker";

let bdContentProvider = new NutritionContentProvider();
let maxdate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6);
export default class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [{
                    data: []
                }]
            },

            date:'',
        }
    }

    render(){
        return(

            <View style={styles.container}>

                <Text style={styles.title}>
                    The total calories of seven days
                </Text>
                <View style={{ height : 50}}>

                    <DatePicker
                        style={styles.datePickerStyle}
                        date={this.state.date}
                        maxDate={maxdate}
                        mode="date"
                        placeholder="select start date"
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
                                marginLeft: 36,
                                borderWidth: 1,
                                borderRadius:6,
                                borderColor:'#ffa726',

                            },
                            dateText:{
                                color: 'white',
                                justifyContent: 'flex-start',
                                fontSize: 16,
                            },
                            placeholderText: {
                                fontSize: 16,
                                color: 'white'
                            }
                        }}
                        onDateChange={date=>this.updateDate(date)}
                    />


                </View>

                <View style={styles.chart}>
                    <LineChart
                        data = {this.state.data}
                        width={Dimensions.get('window').width} // from react-native
                        height={300}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces:2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                                // transform: [{rotateX:'45deg'}]

                            },

                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,

                        }}
                    />
                </View>
                <View style={styles.info}>

                    <Text style={ styles.xyText}>X - Date (Day / Month) {"\n"}{"\n"}Y - Total calories{"\n"}</Text>

                </View>
            </View>
        );

    }


    updateDate = (date)=>
    {
        this.setState({date:date});
        var d = new Date(date.toString());
        d.setDate(d.getDate()+6);
        var year = d.getFullYear();
        var mon = d.getMonth()+1;
        var day = d.getDate();
        var endDate = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        this.getData(date.toString(),endDate.toString())
    }

    componentWillReceiveProps() {

        this.setState({date:''});
        this.setState( {data: {
            labels: [],
                datasets: [{
                data: []
            }]
        }
        });
    }


    getData(startDate,endDate){

        bdContentProvider.searchDataOfRecentSevenDays(startDate,endDate,(ret)=>{
            let xlabels = [];
            let yvalues = [];

            for(let i = 0; i< ret.length; i++){
                xlabels[i] = ret[i]['date'].substr(8,2)+'/'+ret[i]['date'].substr(5,2);
                yvalues[i] = ret[i]['calorie_total'];
            }
            this.setState({data:{
                    labels: xlabels,
                    datasets: [{
                        data: yvalues
                    }]
                }});

        });

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fb8c00'
    },
    title:{
        fontSize:24,
        backgroundColor:'#fb8c00',
        textAlign:'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        color: `rgba(255, 255, 255, 1)`,
    },
    chart:{
        marginTop: 10
    },
    info:{
        marginTop: 10,
        backgroundColor:'#fb8c00',
        justifyContent: 'center',
    },
    xyText:{
        color :`rgba(255, 255, 255, 1)`,
        justifyContent: 'center',
        marginLeft:20,
        fontSize:18
    },
    yearText:{
        color :`rgba(255, 255, 255, 1)`,
        textAlign:'center',
        fontSize:18

    },
    datePickerStyle:{
        width: 200,
        marginBottom: 15,
        marginLeft:80,
    },
    datePickerViewStyle:{
        width: 100
    },
    contentStyle:{
        flexDirection: "row",
        marginLeft: 30
    }

})

