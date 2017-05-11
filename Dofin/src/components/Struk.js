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
  Form,
  Item,
  Label,
  Input,
  Segment
} from 'native-base';

class FormStruk extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'Struk',
      active: ''
    }
  }
  static navigationOptions = {
    header: null
  }
  simulateClick(){
    return true
  }
  simulateCamera(){
    return true
  }
  activePageNonStruk(){
    this.setState({page: "nonStruk"})
    this.setState({active: "active"})
  }
  activePageStruk(){
    this.setState({page: "Struk"})
    this.setState({active: "active"})

  }
  render(){
    const {goBack} = this.props.navigation
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
              <Segment>
                <Button first onPress={() => this.activePageStruk()}><Text style={{fontSize: 11}}>Struk</Text></Button>
                <Button last onPress={() => this.activePageNonStruk()}><Text style={{fontSize: 11}}>Non Struk</Text></Button>
              </Segment>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}} padder>
          {(this.state.page === 'Struk') && (
            <View>
            <Text>struk</Text>
            <Button primary style={{alignItems: 'center'}}><Text> Save </Text></Button>
            </View>
          )}
          {(this.state.page === "nonStruk") && (
            <View>
            <Form>
              <Item inlineLabel>
                <Input placeholder="Nominal"/>
              </Item>
              <Item>
                <Input placeholder="Item"/>
              </Item>
              <Item>

                <Input placeholder="Category"/>
              </Item>
              <Item>
                <Input placeholder="Location"/>
              </Item>
              <Item>
                <Input placeholder="Date"/>
              </Item>
              <Button
                onPress={() => this.simulateCamera()}
                title="simulateCamera"
              >
                <Icon name="camera" />
              </Button>
            </Form>
            <Button primary style={{alignItems: 'center'}}><Text> Save </Text></Button>
            </View>

          )}
          </Content>
      </Container>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};

export default FormStruk
