import React, {Component} from 'react';
import {
  StackNavigator
} from 'react-navigation';

import MainScreen from './components/MainScreen'
import FormIncome from './components/FormIncome'
import Struk from './components/Struk'
import Drawer from './components/MenuDrawer'

const App = StackNavigator({
  Main  : {screen: MainScreen},
  Income: {screen: FormIncome},
  Struk : {screen: Struk},
  Drawer: {screen: Drawer}
},{ headerMode: 'screen' })
export default App
