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
  Spinner
} from 'native-base';

import {incomeRequest} from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      category: '',
      description: '',
      loading: false,
    }
  }
  static navigationOptions = {
    header: null
  }
  _sendData(){
    this.setState({
      loading: !this.state.visible
    });
    setInterval(() => {
      this.props.navigation.dispatch(resetAction)
    }, 3000);
    this.props.incomeRequest(this.state)
  }
  _onChangeInputAmount(event){
    this.setState({amount: event.nativeEvent.text})
  }
  _onChangeInputCategory(event){
    this.setState({category: event.nativeEvent.text})
  }
  _onChangeInputDescription(event){
    this.setState({description: event.nativeEvent.text})
  }
  componentDidMount(){
    if (this.props.postIncome !== null) {
      this.setState({
        loading: false
      });
    }

  }
  render(){

    const { goBack } = this.props.navigation;
    const BUTTONS = [
      'Invesment',
      'Salary',
    ];
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;
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
              <Title>Income</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}}>
            <Form onSubmit={()=>this.handleSubmit()}>
              <Item floatingLabel>
                <Label>Amount</Label>
                <Input
                  ref="amount"
                  name="amount"
                  onChange={(event) => { this._onChangeInputAmount(event) }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Description</Label>
                <Input
                  ref="description"
                  name="description"
                  onChange={(event) => { this._onChangeInputDescription(event) }}
                />
              </Item>
              <Item style={{marginTop: 10}}>
                <Label onPress={()=> ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: 'Category'
                  },
                  (buttonIndex) => {
                    this.setState({ category: BUTTONS[buttonIndex] });
                  }
                )}>Category</Label>
                <Input
                  placeholder=''
                  value={this.state.category}
                  onChange={(event) => { this._onChangeInputCategory(event) }}
                  ref="category"
                  name="category"
                />
              </Item>
              <Button type="submit" block style={{marginTop: 40}} onPress={() => { this._sendData() }}>
                { (this.state.loading) ? (<Spinner color='#FFF' />) : (<Text> Save </Text>)}
              </Button>
            </Form>
          </Content>
      </Container>
    )
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    incomeRequest : data => dispatch(incomeRequest(data))
  }
}

const mapsStateToProps = state => {
  return {
    postIncome: state
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Category)
