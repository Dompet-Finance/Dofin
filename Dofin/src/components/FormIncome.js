import React, {Component} from 'react';
import {
  Container, Content, Text, Header, Icon, View, Left, Button, Body,
  Title, Right, ActionSheet, Form, Item, Label, Input, Spinner, Card
} from 'native-base';
import { Alert, Keyboard, DatePickerAndroid, TouchableWithoutFeedback, Modal } from 'react-native';
import { incomeRequest, getRequestCategory, getIncome, getIncomeRequestById } from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';

function sortByCategory(a, b) {
  if (a.category.toLowerCase() < b.category.toLowerCase()) {
    return -1;
  }
  if (a.category.toLowerCase() > b.category.toLowerCase()) {
    return 1;
  }
  return 0;
}

class FormIncome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      category: 'Personal Income',
      categoryColor: 'grey',
      categoryIcon: 'account',
      description: '',
      dateText: '',
      date: '',
      loading: false,
      modalVisible: false,
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
            this.props.getIncomeRequestById({id: "59169da29a208a785ad2e99c"});
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

  componentWillMount() {

  }

  componentDidMount(){
    this.props.getRequestCategory()
    if (this.props.postIncome !== null) {
      this.setState({
        loading: false
      });
    }
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

  renderBadge(category) {
    const badge = {
      width: 34,
      height: 34,
      backgroundColor: 'grey',
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
    }
    return (
      <View style={{padding: 5}}>
        <View style={{...badge, backgroundColor: category.color}}>
          <IconCustom name={category.icon} size={20} color={'#fff'} />
        </View>
      </View>
    )
  }

  render(){
    const {categories} = this.props.postCategory
    let cat = []
    if (categories !== undefined) {
      categories.map((category) => {
        cat.push(category)
      })
    }
    // alert(JSON.stringify(this.props.categories))
    const {categoryMedia} = styles
    const { goBack } = this.props.navigation;

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
                  <View style={{width: 30}}>
                    <IconCustom name="currency-usd" size={22} style={{color:"#2196F3"}} />
                  </View>
                  <Input
                    ref="amount"
                    name="amount"
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={this.state.amount}
                    onChange={(event) => { this._onChangeInputAmount(event) }}
                  />
                </Item>

                <Item>
                  <View style={{width: 30}}>
                    <IconCustom name="calendar" size={22} style={{color:"#2196F3"}} />
                  </View>
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

                <Item>
                  <View style={{width: 30}}>
                    <IconCustom name="border-color" size={22} style={{color:"#2196F3"}} />
                  </View>
                  <Input
                    ref="description"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={(event) => { this._onChangeInputDescription(event) }}
                  />
                </Item>

                <View
                  style={{
                    paddingLeft: 0,
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.setState({modalVisible: true})

                    }}
                    >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={categoryMedia}>
                        {this.renderBadge({
                          icon: this.state.categoryIcon,
                          color: this.state.categoryColor})
                        }
                        <View style={{paddingLeft: 5, justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 17,
                              color: '#333'}}
                            >
                            {this.state.category}
                          </Text>
                        </View>
                      </View>
                      <View style={{
                          justifyContent: 'center',
                          marginRight: 10,
                          marginTop: 4,
                        }}
                        >
                        <IconCustom
                          name='chevron-down'
                          size={20}
                          style={{
                            color:"#2196F3"
                          }}
                          />
                    </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <Modal
                  animationType={'fade'}
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => this.setState({modalVisible: false})}
                  >

                  <TouchableWithoutFeedback
                    onPress={() => this.setState({modalVisible: false})}
                    >
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        height: '100%'
                      }}
                      onPress={() => this.setState({modalVisible: false})}>

                      <View
                        style={{
                          width: '85%',
                          backgroundColor: 'white',
                          borderRadius: 2,
                          elevation: 10,
                          display: 'flex',
                          paddingRight: 5,
                          paddingBottom: 5,
                      }}>

                      {this.props.categories === undefined ? (<Text></Text>) :
                        this.props.categories.map((category, index) => {
                          return (
                            <TouchableWithoutFeedback
                              key={index}
                              onPress={() => {
                                this.setState({
                                  modalVisible: false,
                                  category: category.category,
                                  categoryIcon: category.icon,
                                  categoryColor: category.color,
                                })
                              }}>
                              <View style={{
                                  flexDirection: 'row',
                                  margin: 0,
                                  marginBottom: 0,
                                  paddingTop: 5,
                                  paddingLeft: 2,
                              }}>
                                {this.renderBadge({
                                  icon: category.icon,
                                  color: category.color,
                                })}
                                <View style={{paddingLeft: 5, justifyContent: 'center'}}>
                                  <Text>{category.category}</Text>
                                </View>
                              </View>
                            </TouchableWithoutFeedback>
                          )
                        })
                      }

                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                </Modal>


              <Button type="submit" block style={{marginTop: 40, backgroundColor: "#2196F3"}} onPress={() => { this._sendData() }}>
                { (this.state.loading) ? (<Spinner color='#FFF' />) : (
                  <Text style={{fontSize: 17}}> Save </Text>
                )}
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
    margin: 0,
    marginBottom: 0,
    paddingTop: 5,
    paddingLeft: 2,
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    incomeRequest       : data => dispatch(incomeRequest(data)),
    getRequestCategory  : () => dispatch(getRequestCategory()),
    getIncome  : () => dispatch(getIncome()),
    getIncomeRequestById                : (data) => dispatch(getIncomeRequestById(data)),
  }
}

const mapsStateToProps = state => {
  return {
    postIncome: state,
    postCategory: state.category,
    categories: state.category.categories,
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(FormIncome)
