'use strict'

import React from 'react'

import {
  View,
  Text,
  TouchableHighlight,
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

class CategoryList extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Category List
        </Text>
      </View>
    )
  }
}

class MonthOption extends React.Component {
  fakeRender() {
    return true
  }

  render() {
    return (
      <View>
        <Text>
          Month
        </Text>
        <Button
          title='filter'
          onPress={() => this.fakeRender()}
          />
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
        <CategoryList />
        <MonthOption />
      </View>
    )
  }
}

const styles = {
}

export default Transactions