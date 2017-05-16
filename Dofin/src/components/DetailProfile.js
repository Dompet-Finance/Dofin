import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Icon,
  View,
  Left,
  Button,
  Body,
  Title,
  Right,
  ActionSheet,
  Form,
  Item,
  Label,
  Input,
  Spinner,
  Card,
  CardItem,
  Thumbnail,
  ListItem
} from 'native-base';

import {
  Image,
  AsyncStorage
} from 'react-native'

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';
const USER_PROFILES = "user_profiles";

class DetailProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      picture: ''
    }
  }
  static navigationOptions = {
    header: null
  }

  componentWillMount(){
    let self = this
    AsyncStorage.getItem(USER_PROFILES).then((value) => {
      let data
      if (value !== null) {
          data = JSON.parse(value)
          self.setState({name: data.name, picture: data.picture.data.url, email: data.email})
      }else {
        self.setState({name: "admin", picture: '', email: "admin@mail.com"})

      }
    }).done();
  }

  render(){
    const { goBack } = this.props.navigation;
    return (
      <Container>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button transparent
                onPress={() => this.props.navigation.navigate("MainScreen")}
              >
                  <Icon name='ios-arrow-back-outline' />
              </Button>
            </Left>
            <Body>
              <Title>Profile</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}}>
          <Card style={{ flex: 0 }}>
            <CardItem style={styles.profile}>
                <Image
                  style={styles.avatar}
                  source={{uri: this.state.picture}}
                />
                <Text style={styles.name}>{this.state.name}</Text>
                <Text note style={{color: '#FFF'}}>{this.state.email}</Text>
            </CardItem>
          </Card>

          </Content>
      </Container>
    )
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
    flexDirection: 'column',
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

export default connect(null, null)(DetailProfile)
