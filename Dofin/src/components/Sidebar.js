import React, {Component} from 'react';
import {
  Text,
  View
} from 'native-base';

class Sidebar extends Component {
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
  render(){
    return (
      <Container>
        <View style={{width: '100%', height: 250, backgroundColor: '#589CEF'}} >
        </View>
        <Content>


          <Button onPress={Actions.CreateAuction}>
            <Text style={Styles.TextMenu}>Bikin Lelang</Text>
          </Button>

          <Button onPress={Actions.MyAuctions}>
            <Text style={Styles.TextMenu}>Lapak Saya</Text>
          </Button>

          <Button onPress={Actions.JoinedAuctions}>
            <Text style={Styles.TextMenu}>Ikut Lelang</Text>
          </Button>

          <Button onPress={Actions.WonAuctions}>
            <Text style={Styles.TextMenu}>Menang Lelang</Text>
          </Button>
          <Button block onPress={() => { this._logout() }}>
            <Text style={Styles.LogoutText}>Logout</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Sidebar
