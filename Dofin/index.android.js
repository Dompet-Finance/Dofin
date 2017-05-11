import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';

import store from './src/store'
import CameraScan from './src/components/Camera';

export default class Dofin extends Component {
  render() {
    return (
      <App />
  }
}

AppRegistry.registerComponent('Dofin', () => Dofin);
