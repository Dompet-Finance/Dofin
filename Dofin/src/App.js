import React, {Component} from 'react';
import {
  StackNavigator
} from 'react-navigation';

import MainScreen from './components/MainScreen'
import FormIncome from './components/FormIncome'
import Struk from './components/Struk'
import Drawer from './components/MenuDrawer'
import FormDream from './components/FormDream'
import DetailDreams from './components/DetailDreams'
import DetailCharts from './components/DetailCharts'

const App = StackNavigator({
  Main  : {screen: MainScreen},
  Income: {screen: FormIncome},
  Dream: {screen: FormDream},
  Struk : {screen: Struk},
  Drawer: {screen: Drawer},
  DetailDreams: {screen: DetailDreams},
  DetailCharts: {screen: DetailCharts},

},{ headerMode: 'screen' })
export default App
