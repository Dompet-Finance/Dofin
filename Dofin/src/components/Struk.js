import React, {Component} from 'react';
import {
  Container, Content, Text, Header, Icon, View, Left, Button,
  Body, Title, Right, Form, Item, Label, Input, Segment, ActionSheet,
  Thumbnail, Spinner, Picker, Badge
} from 'native-base';
import {
  ListView, CameraRoll, Image, Dimensions, Modal, ScrollView,
  TouchableHighlight, Alert, DatePickerAndroid, TouchableWithoutFeedback,
  TextInput, Keyboard, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import FadeInView from './FadeInView'

import { expenseRequest, placesRequest, getRequestCategory } from '../actions';
import {
  resetErrorMessage, resetSuccessMessage
} from '../actions/expenseAction';
import {
  resetItems
} from '../actions/cameraAction';
import Camera from './Camera'
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class FormStruk extends Component {
  constructor(props){
    super(props)
    this.state = {
      amount: '',
      date: '',
      dateText: '',
      description: '',
      items: [{item: '', price: ''}],
      itemSlot: [0],
      category: 'Personal Expense',
      categoryIcon: 'account',
      categoryColor: 'grey',
      location: '',
      photos: '',
      images: [],
      modalVisible: false,
      loading: false,
      isButtonDisabled: false,
      categories: [
        {category: 'Personal Expense', icon: 'account', color: 'grey'},
      ],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  }

  watchID: ?number = null;

  static navigationOptions = {
    header: null
  }

  componenWillMount() {
  }

  componentDidMount() {
    this.props.getRequestCategory()
    // navigator.geolocation.getCurrentPosition(
    //  (position) => {
    //    var initialPosition = JSON.stringify(position);
    //    this.setState({initialPosition});
    //  },
    //  (error) => alert(JSON.stringify(error)),
    //    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    //  );
    //  this.watchID = navigator.geolocation.watchPosition((position) => {
    //    var lastPosition = JSON.stringify(position);
    //    this.setState({lastPosition});
    //    this.props.placesRequest(JSON.parse(this.state.lastPosition))
    //  });
  }
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
  }

  _onChangeInputAmount(amount){
    this.setState({ amount })
  }

  _onChangeInputCategory(category){
    this.setState({ category })
  }

  _onChangeInputItems(items){
    this.setState({ items })
  }

  _onChangeInputDescription(description){
    this.setState({ description })
  }

  _onChangeInputLocation(location){
    this.setState({ location })
  }

  _onChangeInputPhotos(photos){
    this.setState({ photos: photos.node.image.uri })
  }

  _sendData() {
    const { amount, date, description } = this.state

    if (!amount.length) {
      return alert('Amount field is required')
    }
    // alert(date.length)
    // console.log(typeof date);
    if (date === '') {
      return alert('Date field is required')
    }
    if (!description.length) {
      return alert('Description field is required')
    }
    // check items


    this.setState({loading: true, isButtonDisabled: true})
    this.props.expenseRequest({
      record_by   : '59169da29a208a785ad2e99c',
      amount      : +amount || 0,
      description : this.state.description,
      items       : this.state.items,
      category    : this.state.category,
      date        : new Date(),
      location    : this.state.location,
    })
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  getPhotos() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then((r) => {
      this.setState({images: r.edges})
    })
  }
  setIndex(index) {
    this.setState({ index })
  }

  componentDidUpdate() {
    // success
    if (this.props.expense.successMessage) {
      this.props.resetSuccessMessage(),
      Alert.alert(
        'Success',
        this.props.expense.successMessage,
        [
          {text: 'OK', onPress: () => {
            this.setState({
              amount: '',
              date: '',
              dateText: '',
              description: '',
              items: [{item: '', price: ''}],
              itemSlot: [0],
              category: 'Personal Expense',
              categoryIcon: 'account',
              categoryColor: 'grey',
              location: 'location',
              loading: false,
              isButtonDisabled: false
            })
          }},
        ]
      )
    }

    if (this.props.expense.errorMessage) {
      this.props.resetErrorMessage(),
      Alert.alert(
        'Error',
        this.props.expense.errorMessage,
        [
          {text: 'OK', onPress: () => {
            this.setState({loading: false, isButtonDisabled: false})
          }},
        ]
      )
    }

    if (this.props.camera.getItems.length) {
      let items = this.props.camera.getItems.slice()
      let itemSlot = Array(items.length).fill(0)
      let amount = items.reduce((total, unit) => total + unit.price, 0).toString()
      this.props.resetItems()
      this.setState({amount, items, itemSlot})
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

  renderItems() {
    if (this.props.camera.loading)
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 2,
            marginBottom: 15,
          }}
          >
            <Spinner color={'#2979FF'} />
            <Text
              style={{
                color: '#666'
              }}
              >
              Please wait a moment..
            </Text>
        </View>
      )

    let inputContainer = {
      flexDirection: 'row',
      paddingLeft: 16,
    }
    let inputItem = {
      borderBottomWidth: 1,
      borderColor: '#ddd',
      marginRight: 10,
    }
    let inputPrice = {
      width: 120,
      borderBottomWidth: 1,
      borderColor: '#ddd',
      marginRight: 5,
    }

    const { itemSlot } = this.state
    return (
      <View style={{
          borderTopWidth: 3,
          borderBottomWidth: 3,
          borderColor: '#eee',
          paddingTop: 10,
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 16,
        }}>
        {itemSlot.map((val, index) => {
          return (
            <View style={inputContainer} key={index} >
              <Input
                style={inputItem}
                name="item1"
                placeholder="Item Name"
                value={this.state.items[index].item}
                onChangeText={text => {
                  let items = this.state.items.map((item, indexState) => {
                      if (indexState === index)
                        return {item: text, price: item.price}
                      return item
                    })
                  this.setState({items})
                }}
              />
              <Item style={inputPrice}>
                <Icon name="calculator" style={{color:"grey"}} />
                <Input
                  name="item1"
                  placeholder="Price"
                  keyboardType = 'numeric'
                  value={this.state.items[index].price.toString()}
                  onChangeText={text => {
                    // must number in string
                    text = /^\d+/.test(''+text) ? ''+text : ''
                    let items = this.state.items.map((item, indexState) => {
                        if (indexState === index)
                          return {item: item.item, price: text}
                        return item
                      })
                    this.setState({items})
                  }}
                />
              </Item>
              <View style={{marginTop: 15, marginRight: 5}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    let itemName = this.state.items[index].item
                    Alert.alert(
                      `Delete item '${itemName}'`,
                      'Are you sure?',
                      [
                        {text: 'Yes', onPress: () => {
                          let items = this.state.items.filter((item, indexState) =>
                            indexState !== index)
                          let itemSlot = this.state.itemSlot.slice()
                          itemSlot.pop()
                          this.setState({items, itemSlot})
                        }},
                        {text: 'No'}
                      ],
                      {
                        cancelable: false
                      }
                    )

                  }}
                  >
                <IconC name="close" size={20} style={{color:"red"}} />
                </TouchableWithoutFeedback>
              </View>

            </View>
          )
        })}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <Button
            light
            style={{width: 100, justifyContent: 'center'}}
            onPress={() => {
              let items = [...this.state.items, {item: '', price: ''}]
              this.setState({items, itemSlot: [...itemSlot, 0]})
            }}
            >
              <Icon name="add-circle" style={{color:"#2196F3"}} />
          </Button>
          <Button
            success
            style={{width: 100, justifyContent: 'center'}}
            onPress={() => {
              let amount = this.state.items.reduce((total, unit) => total + (unit.price === '' ? 0: +unit.price), 0).toString()
              this.setState({amount})
              alert(JSON.stringify(this.props.categories))
            }}
            >
              <Icon name="calculator" style={{color:"#fff"}} />
          </Button>
          <Button
            warning
            style={{width: 100, justifyContent: 'center'}}
            onPress={() => {
              Alert.alert(
                `Delete all`,
                'All items will be deleted, continue?',
                [
                  {text: 'Yes', onPress: () => {
                    this.setState({
                      items: [{item: '', price: ''}],
                      itemSlot: [0],
                    })
                  }},
                  {text: 'No'}
                ],
                {
                  cancelable: false
                }
              )
            }}
            >
              <Icon name="trash" style={{color:"#fff"}} />
          </Button>
        </View>

      </View>
    )
  }

  renderBadge(category) {
    const { badge } = styles
    return (
      <View style={{padding: 5}}>
        <View style={{...badge, backgroundColor: category.color}}>
          <IconC name={category.icon} size={20} color={'#fff'} />
        </View>
      </View>
    )
  }

  render(){
    const { goBack } = this.props.navigation
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
    const { width } = Dimensions.get('window')
    // console.log(this.props.camera);
    const { categoryMedia } = styles
    const { places } = this.props
    let placesData = []
    if (this.props.places !== 0) {
      places.map((place) => {
        placesData.push(place.placeName);
      })
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(placesData)
    return (

      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left >
              <Button transparent style={{width: 40}}
                onPress={() => goBack()}
                >
                  <Icon name='ios-arrow-back-outline' />
              </Button>
            </Left>
            <Body>
              <Title>
                New Expense
              </Title>

            </Body>
            <Right>
            </Right>
          </Header>


          <Content style={{display: 'flex'}} padder>
            <View>
              <Form>
                <Item inlineLabel>
                  <Icon name="ios-cash" style={{color:"#2196F3"}} />
                  <Input
                    name="amount"
                    value={this.state.amount.toString()}
                    onChangeText={text => this._onChangeInputAmount(text)}
                    placeholder="Amount"
                    keyboardType = 'numeric'
                  />
                </Item>

                <Item>
                  <Icon name='calendar' style={{color:"#2196F3"}} />
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
                  <Icon name='create' style={{color:"#2196F3"}} />
                  <Input
                    name="description"
                    value={this.state.description}
                    onChangeText={text => this._onChangeInputDescription(text)}
                    placeholder="Description"
                  />
                </Item>

                <Item>
                  <Icon name='cart' style={{color:"#2196F3"}} />
                  <Input
                    name="item"
                    disabled
                    onChangeText={text => this._onChangeInputItems(text)}
                    placeholder="Items:"
                  />
                  <View>
                    <Camera />
                  </View>
                </Item>

                {this.renderItems()}

                <View
                  style={{
                    paddingLeft: 0,
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => this.setState({modalVisible: true})}
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
                      <View style={{justifyContent: 'center', marginRight: 10}}>
                        <IconC
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

                        {this.props.categories === undefined ? (
                          <TouchableWithoutFeedback
                            onPress={() => {
                              this.setState({
                                modalVisible: false,
                                category: 'Personal Expense',
                                categoryIcon: 'account',
                                categoryColor: 'grey',
                              })
                            }}>
                            <View style={categoryMedia}>
                              {this.renderBadge({
                                icon: 'account',
                                color: 'grey',
                              })}
                              <View style={{paddingLeft: 5, justifyContent: 'center'}}>
                                <Text>Personal Expense</Text>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        ) : this.props.categories.map((category, index) => (
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
                            <View style={categoryMedia}>
                              {this.renderBadge({
                                icon: category.icon,
                                color: category.color,
                              })}
                              <View style={{paddingLeft: 5, justifyContent: 'center'}}>
                                <Text>{category.category}</Text>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        ))}

                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                </Modal>

                <Button
                  style={{marginTop: 30, marginBottom: 30}}
                  full success
                  disabled={this.state.isButtonDisabled}
                  onPress={() => this._sendData()}
                  >
                    {this.state.loading && <Spinner color={'#fff'} />}
                    {!this.state.loading && <Text style={{fontSize: 17}}>Save</Text>}
                </Button>
              </Form>
            </View>
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
  },
  photos: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryMedia: {
    flexDirection: 'row',
    marginLeft: 5,
    paddingTop: 3,
  },
  badge: {
    width: 34,
    height: 34,
    backgroundColor: 'grey',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    backgroundColor: '#4FC3F7',
    marginBottom: 10,
    marginLeft: 5,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    expenseRequest: newExpense => dispatch(expenseRequest(newExpense)),
    resetErrorMessage: () => dispatch(resetErrorMessage()),
    resetSuccessMessage: () => dispatch(resetSuccessMessage()),
    resetItems: () => dispatch(resetItems()),
    placesRequest: position => dispatch(placesRequest(position)),
    getRequestCategory: () => dispatch(getRequestCategory()),
  }
}

const mapStateToProps = state => {
  return {
    camera: state.camera,
    expense: state.expense,
    places: state.places,
    categories: state.category.categories,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStruk)
