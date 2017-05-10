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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
          Im Drawer
        </Text>
      </View>
    )

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        renderNavigationView={() => navigationView}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>
            Profile
          </Text>
          <Button
            onPress={() => this.fakeNavigate()}
            title="Learn More"
            color="#841584"
          />
          <Button
            onPress={() => this.fakeNavigate()}
            title="Learn More"
            color="#841584"
          />
          <Button
            onPress={() => this.fakeNavigate()}
            title="Learn More"
            color="#841584"
          />
        </View>
      </DrawerLayoutAndroid>
    )
  }
}

const styles = {
}

export default LeftDrawer