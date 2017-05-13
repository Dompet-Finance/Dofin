import React, {Component} from 'react';
import {
  StackNavigator
} from 'react-navigation';

import MainScreen from './components/MainScreen'
import FormIncome from './components/FormIncome'
import Struk from './components/Struk'
import SignIn from './components/SignIn'
import FormDream from './components/FormDream'
import DetailDreams from './components/DetailDreams'
import DetailCharts from './components/DetailCharts'
import Transactions from './components/Transactions'

const App = StackNavigator({
  Main  : {screen: MainScreen},
  Income: {screen: FormIncome},
  Dream: {screen: FormDream},
  Struk : {screen: Struk},
  SignIn: {screen: SignIn},
  DetailDreams: {screen: DetailDreams},
  DetailCharts: {screen: DetailCharts},
  Transactions: {screen: Transactions},

},{ headerMode: 'screen' })
export default App
