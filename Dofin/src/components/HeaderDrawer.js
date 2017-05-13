import React, { Component } from 'react';
import { Image, View} from 'react-native';
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

class DrawerContent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container style={styles.container}>
          <Image source={{uri: 'https://image.freepik.com/free-psd/abstract-background-design_1297-87.jpg'}} style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{uri: 'https://i1.wp.com/img11.deviantart.net/fcd9/i/2010/182/b/9/aang_the_last_airbender_by_cigsace.png?resize=498%2C413'}}
            />
            <Text style={styles.name}>Your Profile Here</Text>
          </Image>
          <Content>
            <List>
              <ListItem icon onPress={() => navigate('SignIn')}>
                <Left>
                    <Icon name="ios-contact" style={{color:"#283593"}} />
                </Left>
                <Body>
                  <Text>Login</Text>
                </Body>
                <Right>
                  <Icon name="arrow-round-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => navigate('Transactions')}>
                <Left>
                    <Icon name="ios-cash" style={{color:"#558B2F"}} />
                </Left>
                <Body>
                  <Text>Expenses</Text>
                </Body>
                <Right>
                  <Icon name="arrow-round-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => navigate('DetailDreams')}>
                <Left>
                    <Icon name="ios-trophy" style={{color:"#F9A825"}} />
                </Left>
                <Body>
                  <Text>Dreams</Text>
                </Body>
                <Right>
                  <Icon name="arrow-round-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => alert('Category Page')}>
                <Left>
                    <Icon name="cube" style={{color:"#757575"}} />
                </Left>
                <Body>
                  <Text>Category</Text>
                </Body>
                <Right>
                  <Icon name="arrow-round-forward" />
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
    alignItems: 'center'
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
export default DrawerContent;
