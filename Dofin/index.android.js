import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import App from './src/App';

import GetLokasi from './src/components/GetLokasi'

export default class Dofin extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Dofin', () => Dofin);
