import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
} from 'react-native';

class SignUpForm extends React.Component {

  pressTest() {
    return true
  }

  render() {
    return (
      <View>
        <TextInput />
        <TextInput />
        <Button title="" onPress={() => this.pressTest()}/>
      </View>
    )
  }
};

export default SignUpForm;
