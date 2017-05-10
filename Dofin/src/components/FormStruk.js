import React, {Component} from 'react';
import {
  TextInput,
  View,
  Button
} from 'react-native';

class FormStruk extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  simulateClick(){
    return true
  }
  render(){
    return (
      <View>
        <TextInput value={"Nominal"}/>
        <TextInput value={"Item"}/>
        <TextInput value={"Kategori"}/>
        <TextInput value={"Lokasi"}/>
        <TextInput value={"Tanggal"}/>
        <Button
          onPress={() => this.simulateClick()}
          title="Submit"
          color="#841584"
        />
      </View>
    )
  }
}

export default FormStruk
