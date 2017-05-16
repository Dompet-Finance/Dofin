import React from 'react';
import {
  View,
  Text,
  PixelRatio,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
  Button,
  Fab
} from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import ActionButton from 'react-native-action-button';

import { imgPostRequest } from '../actions';

class CameraScan extends React.Component {
  constructor() {
    super()
    this.state = {
      images: null,
    };
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

  ImagePicker.launchCamera(options, (response) => {
    console.log('Response =', response);
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    let type = response.type
    let data = response.data
    let blob = {
      data,
      type
    }

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let source = { uri: response.uri };

      this.setState({
        images: blob
      });
      this.props.imgPostRequest(this.state.images)
    }
  });
}

render() {
  return (
    <ActionButton
      position="right"
      buttonColor="rgba(52,152,219 ,1)"
      onPress={this.selectPhotoTapped.bind(this)}
      icon={<Icon name='camera' style={{color: 'white'}}/>}
    />
  )}
}


const mapDispatchToProps = dispatch => ({
  imgPostRequest: newImage => dispatch(imgPostRequest(newImage))
});

export default connect(null, mapDispatchToProps)(CameraScan);
