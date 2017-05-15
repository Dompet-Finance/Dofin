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
  Card
} from 'native-base';

import {incomeRequest, getRequestCategory} from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class FormIncome extends Component {
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
    this.props.navigation.navigate("MainScreen")
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
    this.props.getRequestCategory()
  }
  render(){
    const {categories} = this.props.postCategory
    let cat = []
    if (categories !== undefined) {
      categories.map((category) => {
        cat.push(category.category)
      })
    }
    const {categoryMedia} = styles
    const { goBack } = this.props.navigation;
    const BUTTONS = cat;
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;
    return (
      <Container>
          <Header style={{backgroundColor: "#2196F3"}}>
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
              <Card>
                <Item>
                  <Icon name="logo-usd"/>
                  <Input
                    ref="amount"
                    name="amount"
                    placeholder="amount"
                    keyboardType="numeric"
                    onChange={(event) => { this._onChangeInputAmount(event) }}
                  />
                </Item>
                <Item>
                  <Icon name="md-create"/>
                  <Input
                    ref="description"
                    name="description"
                    placeholder="description"
                    onChange={(event) => { this._onChangeInputDescription(event) }}
                  />
                </Item>
                <Item style={{marginTop: 10}}>
                  <Icon name="md-copy" onPress={()=> ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      destructiveButtonIndex: DESTRUCTIVE_INDEX,
                      title: 'Category'
                    },
                    (buttonIndex) => {
                      this.setState({ category: BUTTONS[buttonIndex] });
                    }
                  )}/>
                  <Input
                    placeholder='category'
                    value={this.state.category}
                    onChange={(event) => { this._onChangeInputCategory(event) }}
                    ref="category"
                    name="category"
                  />
                </Item>
              </Card>

              <Button type="submit" block style={{marginTop: 40}} onPress={() => { this._sendData() }}>
                { (this.state.loading) ? (<Spinner color='#FFF' />) : (<Text> Save </Text>)}
              </Button>
            </Form>
          </Content>
      </Container>
    )
  }
}
const styles = {
  categoryMedia: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
    padding: 5,
    backgroundColor: '#ccc'
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    incomeRequest       : data => dispatch(incomeRequest(data)),
    getRequestCategory  : () => dispatch(getRequestCategory())
  }
}

const mapsStateToProps = state => {
  return {
    postIncome: state,
    postCategory: state.category
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(FormIncome)
