import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
 } from 'react-native';

class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  pressButton() {
    return true
  }
  render() {
    return(
      <View>
        <TextInput value={"Username"}/>
        <TextInput value={"Password"}/>
        <Button
          onPress={() => this.pressButton()}
          title="submit"
        />
      </View>
    )
  }
}

export default SignIn
