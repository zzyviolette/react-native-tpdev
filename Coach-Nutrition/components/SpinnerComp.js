import React,{Component} from 'react';
import Spinner from "react-native-number-spinner";


export default class SpinnerComp extends Component{

    constructor(props){
        super(props);
        this.state = {
            max:50,
            min:1,
            value:1
        };
    }


    render()
    {
        return(
            <Spinner value={this.state.value}
                     max={this.state.max}
                     min={this.state.min}
                     color='mediumseagreen'
                     numColor="white"
                     onNumChange={this.updateSpinner.bind(this)}
            />
        );
    }


    updateSpinner(num)
    {
        this.setState({value:num});
        this.props.setFoodAmount(num);
    }
}
