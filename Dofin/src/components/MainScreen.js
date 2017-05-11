import React, {Component} from 'react';
import {
  Container,
  Content,
  ListItem,
  Text,
  Header,
  Icon,
  View,
  Left,
  Button,
  Body,
  Title,
  Right,
  Fab,
} from 'native-base';

class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        active: true
    };
  }
  static navigationOptions = {
    header: null
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
      <Container>
          <Header>
              <Left>
                <Button transparent
                  onPress={() => navigate('')}
                >
                    <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                  <Title>Dofin</Title>
              </Body>
              <Right>
                  <Button transparent>
                  </Button>
              </Right>
          </Header>
          <Content>
            <Button
              onPress={()=>navigate('Income')}
            >
            <Text>Simulate Income</Text>
            </Button>
            <Button
              onPress={()=>navigate('Struk')}
            >
            <Text>Simulate Struk</Text>
            </Button>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ marginLeft: 10 }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}>
              <Icon name="share" />
              <Button style={{ backgroundColor: '#34A34F' }}>
                  <Icon name="logo-whatsapp" />
              </Button>
              <Button style={{ backgroundColor: '#3B5998' }}>
                  <Icon name="logo-facebook" />
              </Button>
              <Button disabled style={{ backgroundColor: '#DD5144' }}>
                  <Icon name="mail" />
              </Button>
            </Fab>
          </Content>
      </Container>
    )
  }
}

export default MainScreen
