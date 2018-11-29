import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker, Permissions} from 'expo';

export default class ImagePicker extends React.Component {



    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this.pickFromGallery}
                />
                {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }


    pickFromGallery = async () => {
        const permissions = Permissions.CAMERA_ROLL;
        const { status } = await Permissions.askAsync(permissions);

        if(status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
                allowsEditing: true,
                aspect: [4, 3],
            }).catch(error => console.log(permissions, { error }));
            console.log(permissions, 'SUCCESS', result.uri);
                if (!result.cancelled) {
                    this.setState({ image: result.uri });
                }
        }
    }

}
