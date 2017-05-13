import React, { Component } from 'react';
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
  Picker,
  Spinner,
  Card,
  CardItem
} from 'native-base';
import { Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {postIcon} from '../actions';

class ModalIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: ''
    }
  }
  static navigationOptions = {
    header: null
  }
  sendIcon(){
    this.props.navigation.navigate("Category", {color: this.state.selectedColor})
  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container>
          <Header>
            <Left>
              <Button transparent
                onPress={() => goBack()}
              >
                  <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Icons</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.sendIcon()}>
                {(this.state.selectedIcon !== "") && (<Icon name="md-checkmark"/>)}
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}}>
            <Card>
              <TouchableOpacity onPress={() => this.setState({selectedIcon: "ios-glasses-outline"})}>
                <View>
                  <CardItem>
                    <Icon active name="md-egg" style={{color:"red"}}/>
                    <Text>Red</Text>
                  </CardItem>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({selectedIcon: "ios-notifications-outline"})}>
                <View>
                  <CardItem>
                    <Icon active name="md-egg" style={{color:"green"}}/>
                    <Text>Green</Text>
                  </CardItem>
                </View>
              </TouchableOpacity>
            </Card>
          </Content>
      </Container>
    );
  }
}

export default connect(null, null)(ModalIcons)
