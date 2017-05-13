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
    this.state = {
      income: 0,
      expense: 0,
    }
  }

  render() {
    return (
      <View>
        <AppBar />
        <NotificationList />
        { this.state.expense > this.state.income
          &&
          (<Text>
            Overlimit
          </Text>)
        }
      </View>
    )
  }
}

const styles = {
}

export default Transactions