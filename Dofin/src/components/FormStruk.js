import React, {Component} from 'react';
import {
  TextInput,
  View
} from 'react-native';

class FormStruk extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return (
      <View>
        <TextInput value={"Nominal"}/>
        <TextInput value={"Item"}/>
        <TextInput value={"Kategori"}/>
        <TextInput value={"Lokasi"}/>
        <TextInput value={"Tanggal"}/>
      </View>
    )
  }
}

export default FormStruk
