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
  Thumbnail
} from 'native-base';

import {
  Image
} from 'react-native'

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class SingleDream extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount(){

  }
  render(){
    const { goBack } = this.props.navigation;
    const {dream, description} = this.props.navigation.state.params.data
    return (
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button transparent
                onPress={() => this.props.navigation.navigate("DetailDreams")}
              >
                  <Icon name='ios-arrow-back-outline' />
              </Button>
            </Left>
            <Body>
              <Title>Detail Your Dream</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}}>
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: "https://cdn.tinybuddha.com/wp-content/uploads/2015/06/Boy-Reaching-for-Stars.png"}} />
                        <Body>
                            <Text>{dream}</Text>
                            <Text note>{description}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image style={{height: 200, width: "100%"}} source={{uri: "https://cdn.tinybuddha.com/wp-content/uploads/2015/06/Boy-Reaching-for-Stars.png"}}/>
                        <Text>
                        </Text>
                        <Button transparent textStyle={{color: '#87838B'}}>
                            <Icon name="logo-facebook" />
                            <Text>Share</Text>
                        </Button>
                    </Body>
                </CardItem>
              </Card>
          </Content>
      </Container>
    )
  }
}

export default connect(null, null)(SingleDream)
