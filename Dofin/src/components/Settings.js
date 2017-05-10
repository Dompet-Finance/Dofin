'use strict'

import React from 'react'

import {
  View,
  Text,
  Button,
} from 'react-native'

class AppBar extends React.Component {
  render() {
    return (
      <View>
        <Text>
          AppBar
        </Text>
      </View>
    )
  }
}

class SettingItem extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Setting A
        </Text>
        <Text>
          On / Off
        </Text>
      </View>
    )
  }
}

export class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <AppBar />
        <SettingItem />
        <SettingItem />
        <SettingItem />
      </View>
    )
  }
}

const styles = {
}

export default Settings