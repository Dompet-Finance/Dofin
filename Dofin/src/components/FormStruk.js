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
  simulateCamera(){
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
        <Button
          onPress={() => this.simulateCamera()}
          title="simulateCamera"
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};

export default FormStruk
