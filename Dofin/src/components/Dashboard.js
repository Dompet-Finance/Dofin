'use strict'

import React from 'react'

import {
  View,
  Text,
  TouchableHighlight,
  Button,
} from 'react-native'

class Overview extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Income
        </Text>
        <Text>
          Expenses
        </Text>
        <Text>
          Balance
        </Text>
      </View>
    )
  }
}

class Graph extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Expenses by category
        </Text>
      </View>
    )
  }
}

class Dreams extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Dream come true
        </Text>
      </View>
    )
  }
}

class FapButton extends React.Component {
  render() {
    return (
      <Button
        onPress={() => alert()}
        title="+"
        />
    )
  }
}

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Overview />
        <Graph />
        <Dreams />
        <FapButton />
      </View>
    )
  }
}

const styles = {
}

export default Dashboard