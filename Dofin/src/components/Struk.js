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
  Segment,
  ActionSheet
} from 'native-base';
import { connect } from 'react-redux';
import { expenseRequest } from '../actions';

class FormStruk extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'Struk',
      active: '',
      amount: '',
      description: '',
      category: ''
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
  _onChangeInputAmount(amount){
    this.setState({ amount: Number(amount) })
  }
  _onChangeInputCategory(category){
    this.setState({ category: category })
  }
  _sendData() {
    this.props.expenseRequest(this.state)
  }

  render(){
    const {goBack} = this.props.navigation
    const BUTTONS = [
      'Food and Drink',
      'Travel',
      'Entertainment',
      'Transportation',
      'Healthcare',
      'Clothing',
      'Rent',
      'Education',
      'Cancel'
    ];
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
              <Form>
                <Item inlineLabel>
                  <Input
                    name="amount"
                    onChangeText={text => this._onChangeInputAmount(text)}
                    placeholder="Amount"
                    // keyboardType = 'numeric'
                  />
                </Item>
                <Item>
                  <Input
                    name="item"
                    // onChangeText={text => this.setState({form: text})}
                    placeholder="Item"
                  />
                </Item>
                <Item>
                  <Input
                    name="description"
                    // onChangeText={text => this.setState({form: text})}
                    placeholder="Description"
                  />
                </Item>
                <Item>
                  <Icon name='cube'/>
                  <Label onPress={() => ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: 8,
                      destructiveButtonIndex: 9,
                      title: 'Category'
                    },
                    (buttonIndex) => {
                      this.setState({category: BUTTONS[buttonIndex]})
                    }
                  )}> Category </Label>
                  <Input
                    name="category"
                    value={this.state.category}
                  />
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
            </View>
          )}
          {(this.state.page === "nonStruk") && (
            <View>
              <Form>
                <Item inlineLabel>
                  <Input
                    name="amount"
                    onChangeText={text => this._onChangeInputAmount(text)}
                    placeholder="Amount"
                    // keyboardType = 'numeric'
                  />
                </Item>
                <Item>
                  <Input
                    name="item"
                    // onChangeText={text => this.setState({form: text})}
                    placeholder="Item"
                  />
                </Item>
                <Item>
                  <Input
                    name="description"
                    // onChangeText={text => this.setState({form: text})}
                    placeholder="Description"
                  />
                </Item>
                <Item>
                  <Icon name='cube'/>
                  <Label onPress={() => ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: 8,
                      destructiveButtonIndex: 9,
                      title: 'Category'
                    },
                    (buttonIndex) => {
                      this.setState({category: BUTTONS[buttonIndex]})
                    }
                  )}> Category </Label>
                  <Input
                    name="category"
                    value={this.state.category}
                  />
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
                <Button primary style={{alignItems: 'center'}} onPress={() => this._sendData()}><Text> Save </Text></Button>
              </Form>
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

const mapDispatchToProps = dispatch => {
  return {
    expenseRequest: newExpense => dispatch(expenseRequest(newExpense))
  }
}


export default connect(null, mapDispatchToProps)(FormStruk)
