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
  Image
} from 'react-native'

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';

class SingleDream extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    header: null
  }

  render(){
    const { goBack } = this.props.navigation;
    const {data} = this.props.navigation.state.params
    return (
      <Container>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button transparent
                onPress={() => this.props.navigation.navigate("DetailCategory")}
              >
                  <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Detail Category</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}}>
          <Card style={{ flex: 0 }}>
            <CardItem>
            <ListItem avatar>
                <Left>
                      <IconCustom name={data.icon} style={{width: 50, fontSize: 30}}/>
                </Left>
                <Right>
                  <Text style={{color: data.color}}>{data.category}</Text>
                </Right>
            </ListItem>
            </CardItem>
          </Card>

          </Content>
      </Container>
    )
  }
}

export default connect(null, null)(SingleDream)
