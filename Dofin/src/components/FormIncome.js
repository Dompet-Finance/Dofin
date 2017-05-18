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
import { Alert, Keyboard, DatePickerAndroid } from 'react-native';
import {incomeRequest, getRequestCategory, getIncome} from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class FormIncome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      category: '',
      description: '',
      dateText: '',
      date: '',
      loading: false,
    }
  }
  static navigationOptions = {
    header: null
  }
  _sendData(){

    Alert.alert(
      'Are you sure?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'OK', onPress: () => {
          const { amount, category, description } = this.state
            this.setState({
              loading: !this.state.visible
            });

            this.props.incomeRequest(this.state)
            this.props.navigation.navigate("MainScreen")
            this.props.getIncome(this.state)

        }},
      ]
    )
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
  showDatePicker(stateKey, options) {
    const showPicker = async (stateKey, options) => {
      try {
        var newState = {};
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action === DatePickerAndroid.dismissedAction) {
          newState[stateKey + 'Text'] = 'dismissed';
        } else {
          var date = new Date(year, month, day);
          newState['dateText'] = `${day}/${month+1}/${year}`
          newState['date'] = date;
        }
        this.setState(newState);
      } catch ({code, message}) {
        console.warn(`Error in example '${stateKey}': `, message);
      }
    };
    showPicker(stateKey, options)
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
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button transparent
                onPress={() => goBack()}
              >
                  <Icon name='ios-arrow-back-outline' />
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
          <Content style={{display: 'flex'}} padder>
            <Form onSubmit={()=>this.handleSubmit()}>
                <Item>
                  <Icon name="logo-usd" style={{color: "#2196F3"}}/>
                  <Input
                    ref="amount"
                    name="amount"
                    placeholder="amount"
                    keyboardType="numeric"
                    onChange={(event) => { this._onChangeInputAmount(event) }}
                  />
                </Item>
                <Item>
                  <Icon name="md-create" style={{color: "#2196F3"}}/>
                  <Input
                    ref="description"
                    name="description"
                    placeholder="description"
                    onChange={(event) => { this._onChangeInputDescription(event) }}
                  />
                </Item>
                <Item style={{marginTop: 10}}>
                  <Icon name="md-copy" style={{color: "#2196F3"}} onPress={()=> ActionSheet.show(
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
                <Item>
                  <Icon name='calendar' style={{color: "#2196F3"}} />
                  <Input
                    value={this.state.dateText}
                    onFocus={() => {
                      Keyboard.dismiss()
                      this.showDatePicker('simple',
                        {date: new Date()}
                      )}
                    }
                    placeholder="Date"/>
                </Item>

              <Button type="submit" block style={{marginTop: 40, backgroundColor: "#2196F3"}} onPress={() => { this._sendData() }}>
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
    getRequestCategory  : () => dispatch(getRequestCategory()),
    getIncome  : () => dispatch(getIncome())
  }
}

const mapsStateToProps = state => {
  return {
    postIncome: state,
    postCategory: state.category
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(FormIncome)
