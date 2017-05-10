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

class NotificationList extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Notification List
        </Text>
      </View>
    )
  }
}

export class Transactions extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <AppBar />
        <NotificationList />
      </View>
    )
  }
}

const styles = {
}

export default Transactions