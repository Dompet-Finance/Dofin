import React from 'react';
import {
  View, Text, PixelRatio, Image, TouchableOpacity,
} from 'react-native';
import {
  Icon, Button, Fab
} from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import { imgPostRequest } from '../actions';
import { setLoading } from '../actions/cameraAction';

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
      // console.log('Response =', response);
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
        }, () => {
          this.props.setLoading(true)
          this.props.imgPostRequest(this.state.images)
        });

      }
    });
  }

  // render() {
  //   return (
  //     <ActionButton
  //       position="center"
  //       buttonColor="rgba(52,152,219 ,1)"
  //       onPress={this.selectPhotoTapped.bind(this)}
  //       icon={<Icon name='camera' style={{color: 'white'}}/>}
  //     />
  //   )
  // }

  render() {
    return (
      <Button
        transparent
        onPress={this.selectPhotoTapped.bind(this)}
        >
        <Icon name='camera' style={{color: '#2196F3'}}/>
      </Button>
    )
  }

}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
     height: 1,
     width: 0
    },
  }
};

const mapDispatchToProps = dispatch => ({
  imgPostRequest: newImage => dispatch(imgPostRequest(newImage)),
  setLoading: bool => dispatch(setLoading(bool)),
});

export default connect(null, mapDispatchToProps)(CameraScan);
