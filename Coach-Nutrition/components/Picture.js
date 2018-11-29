import React,{Component} from 'react';
import {Image, View, TouchableHighlight, StyleSheet} from "react-native";
import {ImagePicker, Permissions} from "expo";

export default class Picture extends Component{

    state = {
        img:(this.props.image===''||this.props.image == require('../image/mealPicture.jpg'))? require('../image/mealPicture.jpg') : {uri:this.props.image}
    }

    render(){
        return(
            <View style={styles.pictureViewStyle}>
                <TouchableHighlight onPress={this.pickFromGallery}
                                    style={styles.toolbarStyle}
                                    underlayColor={'transparent'}
                >
                    <Image
                        style={styles.imgStyle}
                        source={this.state.img}
                    />
                </TouchableHighlight>
            </View>
        );
    }


    pickFromGallery = async () => {
        const permissions = Permissions.CAMERA_ROLL;
        const { status } = await Permissions.askAsync(permissions);

        if(status === 'granted')
        {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
                allowsEditing: true,
                aspect: [4, 3],
            }).catch(error => console.log(permissions, { error }));

            if(!result.cancelled){
                this.setState({img:{uri :result.uri}});
                this.props.setImage(result.uri);
            }
        }
    }
}
const styles = StyleSheet.create({
    pictureViewStyle:{
        marginBottom: 5,
        marginLeft:60
    },
    TouchableStyle:{
        backgroundColor: 'transparent'
    },
    imgStyle:{
        width: 167,
        height: 105,
        margin:5,
        borderWidth: 3,
        borderColor: 'black'
    }
})
