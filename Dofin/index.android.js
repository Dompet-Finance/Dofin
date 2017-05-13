import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';
import store from './src/store'

export default class Dofin extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Dofin', () => Dofin);
