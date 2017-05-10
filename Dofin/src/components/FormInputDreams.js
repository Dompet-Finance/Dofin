import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
 } from 'react-native';

class FormDreams extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  testClick() {
    return true
  }
  render() {
    return(
      <View>
        <TextInput value={"description"}/>
        <TextInput value={"motivation"}/>
        <Button
          onPress={() => this.testClick()}
          title="submit"
        />
      </View>
    )
  }
}

export default FormDreams
