import React, {Component} from 'react';
import {
  StackNavigator
} from 'react-navigation';

import MainScreen from './components/MainScreen'
import FormIncome from './components/FormIncome'
import Struk from './components/Struk'

const App = StackNavigator({
  Main  : {screen: MainScreen},
  Income: {screen: FormIncome},
  Struk : {screen: Struk},
},{ headerMode: 'screen' })
export default App
