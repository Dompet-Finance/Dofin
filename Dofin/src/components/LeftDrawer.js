'use strict'

import React from 'react'

import {
  DrawerLayoutAndroid,
  View,
  Text,
  Button,
} from 'react-native'

export class LeftDrawer extends React.Component {
  constructor(props) {
    super(props)
  }

  fakeNavigate() {
    return true
  }

  render() {
    var navigationView = (
      <View>
        <Text>
          Im Drawer
        </Text>
      </View>
    )

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        renderNavigationView={() => navigationView}>
        <View>
          <Text>
            Profile
          </Text>
          <Button
            onPress={() => this.fakeNavigate()}
            title="Dashboard"
            />
          <Button
            onPress={() => this.fakeNavigate()}
            title="Transactions"
            />
          <Button
            onPress={() => this.fakeNavigate()}
            title="Dreams"
            />
          <Button
            onPress={() => this.fakeNavigate()}
            title="Setting"
            />
        </View>
      </DrawerLayoutAndroid>
    )
  }
}

const styles = {
}

export default LeftDrawer