import React from 'react';
import {
  View,
  Text,
  PixelRatio,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import { imgPostRequest } from '../actions';

class CameraScan extends React.Component {
  constructor() {
    super()
    this.state = {
      avatarSource: null,
      videoSource: null
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

  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response =', response);

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let source = { uri: response.uri };

      this.setState({
        avatarSource: source
      });
      this.props.imgPostRequest(this.state.avatarSource)
    }
  });
}

render() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
        { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
          <Image style={styles.avatar} source={this.state.avatarSource} />
        }
        </View>
      </TouchableOpacity>
    </View>
  )
}
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
};

const mapDispatchToProps = dispatch => ({
  imgPostRequest: newImage => dispatch(imgPostRequest(newImage))
});

export default connect(null, mapDispatchToProps)(CameraScan);
