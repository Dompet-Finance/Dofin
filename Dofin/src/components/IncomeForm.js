import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text
} from 'react-native';

class IncomeForm extends React.Component {

  pressTest() {
    return true
  }

  render() {
    return (
      <View>
        <Text>Income</Text>
        <TextInput />
        <TextInput />
        <Button title="" onPress={() => this.pressTest()}/>
      </View>
    )
  }
};

export default IncomeForm;
