'use strict'

import React from 'react'
import { AsyncStorage, Alert, View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'

export class LeftDrawer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataUser: {}
    }
  }

  componentDidMount () {
    // AsyncStorage.getItem('data').then((keyValue) => {
    //   let tempData = JSON.parse(keyValue)
    //   this.setState({dataUser: tempData})
    // })
  }

  _logout () {
    // AsyncStorage.removeItem('data', error => {
    //   if (error) {
    //     console.log(error)
    //   } else {
    //     Alert.alert('Anda sudah logout')
    //     Actions.refresh({key: 'MenuDrawer', open: value => false})
    //     Actions.Login()
    //   }
    // })
  }

  render() {

    return (
      <Container>
        <View style={{width: '100%', height: 250, backgroundColor: '#589CEF'}} >
        </View>
        <Content>
          <Button transparent>
            <Text>Bikin Lelang</Text>
          </Button>
          <Button transparent>
            <Text>Lapak Saya</Text>
          </Button>
          <Button transparent>
            <Text>Ikut Lelang</Text>
          </Button>
          <Button transparent>
            <Text>Menang Lelang</Text>
          </Button>
          <Button blockonPress={() => { this._logout() }}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = {
}

export default LeftDrawer
