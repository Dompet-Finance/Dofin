import React, {Component} from 'react';

import {
  Text, View, Container, Header, Title, Content, Footer,
  FooterTab, Button, Left, Right, Body, Icon, Card, CardItem,Thumbnail
} from 'native-base';
import {Image} from 'react-native';

import Carousel from 'react-native-looped-carousel';

class CredentialCheck extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkAuth: false
    }
  }
  static navigationOptions = {
    header: null
  }
  render(){
    return (
      <Container>
        <Content style={{backgroundColor: "#E0F7FA"}}>
          <Icon name="ios-cash-outline" style={styles.shadow}/>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text style={{fontSize: 15, color: "#FFF", marginBottom: 5}}>SIGN IN WITH FACEBOOK</Text>
              <Icon name="logo-facebook" style={{fontSize: 25, color: "#FFF"}}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const styles = {
    shadow: {
      color:"#01579B",
      border:2,
      radius:3,
      opacity:0.2,
      x:0,
      y:3,
      fontSize: 300
    }
}

export default CredentialCheck
