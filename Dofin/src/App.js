import React, {Component} from 'react';
import {
  StackNavigator
} from 'react-navigation';

import MainScreen from './components/MainScreen'

const App = StackNavigator({
  Main: {screen: MainScreen},
},{ headerMode: 'screen' })
export default App
