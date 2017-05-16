import React, { Component } from 'react';
import { Image, View, AsyncStorage} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Icon
} from 'native-base';

import {
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../actions';

const USER_PROFILES = "user_profiles";

class DrawerContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      picture: ''
    }
  }

  _logout(){
    AsyncStorage.removeItem(USER_PROFILES);
    this.props.logout()
    this.props.navigation.navigate("Main")
  }

  componentWillMount(){
    try {
      let self = this
      AsyncStorage.getItem(USER_PROFILES).then((value) => {
        let data
        if (value !== null) {
            data = JSON.parse(value)
            self.setState({name: data.name, picture: data.picture.data.url})
        }else {
          self.setState({name: "admin", picture: ""})
        }
      }).done();
    } catch (e) {

    }

  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container style={styles.container}>
      <TouchableOpacity onPress={()=> navigate("DetailProfile")}>
        <View style={styles.profile}>
          <Image
            style={styles.avatar}
            source={{uri: this.state.picture}}
          />
          <Text style={styles.name}>{this.state.name}</Text>
        </View>
      </TouchableOpacity>
          <Content>
            <List>
              <ListItem icon onPress={() => navigate('Transaction')}>
                <Left>
                    <IconCustom name="grid" size={25} style={{color: "#2196F3"}}/>
                </Left>
                <Body>
                  <Text>Transactions</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => navigate('Struk')}>
                <Left>
                    <IconCustom name="cash-usd" size={25} style={{color: "#2196F3"}}/>
                </Left>
                <Body>
                  <Text>Expenses</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => navigate('DetailDreams')}>
                <Left>
                    <IconCustom name="run-fast" size={25} style={{color: "#2196F3"}}/>
                </Left>
                <Body>
                  <Text>Dreams</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => navigate('DetailCategory')}>
                <Left>
                    <IconCustom name="buffer" size={25} style={{color: "#2196F3"}}/>
                </Left>
                <Body>
                  <Text>Category</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => navigate('Chart')}>
                <Left>
                    <IconCustom name="chart-arc" size={25} style={{color: "#2196F3"}}/>
                </Left>
                <Body>
                  <Text>Chart</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => {this._logout()}}>
                <Left>
                    <IconCustom name="logout" size={25} style={{color: "#2196F3"}}/>
                </Left>
                <Body>
                  <Text>Logout</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward-outline" />
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
        );
    }
}

const styles = {
  container: {
    flex: 1,
  },
  profile: {
    height: 200,
    backgroundColor: '#3949AB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#2196F3"
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 70,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff'
  }
};

const mapsDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapsDispatchToProps)(DrawerContent)
