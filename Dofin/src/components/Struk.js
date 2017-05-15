import React, {Component} from 'react';
import {
  Container, Content, Text, Header, Icon, View, Left, Button,
  Body, Title, Right, Form, Item, Label, Input, Segment, ActionSheet,
  Thumbnail, Spinner, Picker,
} from 'native-base';
import {
  ListView, CameraRoll, Image, Dimensions, Modal, ScrollView,
  TouchableHighlight, Alert,
} from 'react-native';
import { connect } from 'react-redux';

import FadeInView from './FadeInView'

import { expenseRequest } from '../actions';
import {
  resetErrorMessage, resetSuccessMessage
} from '../actions/expenseAction';
import Camera from './Camera'

class FormStruk extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'Struk',
      active: '',
      amount: '',
      category: 'category1',
      items: [],
      description: '',
      location: 'location',
      photos: '',
      images: [],
      modalVisible: false,
      loading: false,
      isButtonDisabled: false,
    }
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    // console.log(this.props.expense);
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
    this.setState({loading: true, isButtonDisabled: true})
    this.props.expenseRequest({
      record_by   : '59169da29a208a785ad2e99c',
      amount      : +this.state.amount || 0,
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
            this.setState({loading: false, isButtonDisabled: false})
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
    // if (this.state.items.length == 0) {
    //   this.setState({items: this.props.camera[0]})
    // } else {
    //   console.log('stop the update');
    // }
    // console.log(this.state.items);
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

    return (
      <FadeInView style={{width: '100%', height: '100%'}}>
        <Container style={{backgroundColor: '#fff'}}>
            <Header>
              <Left>
                <Button transparent
                  onPress={() => goBack()}
                  >
                    <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>
                  New Expense
                </Title>
              </Body>
            </Header>

            <Content style={{display: 'flex'}} padder>
            {(this.state.page === 'Struk') && (
              <View>
                <Form>
                  <Item inlineLabel>
                    <Icon name="ios-cash" style={{color:"#2979FF"}} />
                    <Input
                      name="amount"
                      value={this.state.amount.toString()}
                      onChangeText={text => this._onChangeInputAmount(text)}
                      placeholder="Amount"
                      keyboardType = 'numeric'
                    />

                  </Item>
                  <Item>
                    <Icon name='cart' style={{color:"#2979FF"}} />
                    <Input
                      name="item"
                      onChangeText={text => this._onChangeInputItems(text)}
                      placeholder="Item"
                    />
                  </Item>
                  <Item>
                    <Icon name='create' style={{color:"#2979FF"}} />
                    <Input
                      name="description"
                      value={this.state.description}
                      onChangeText={text => this._onChangeInputDescription(text)}
                      placeholder="Description"
                    />
                  </Item>
                  <Item>
                    <Icon name='cube' style={{color:"#2979FF"}}/>


                  </Item>
                  <Item>
                    <Icon name='pin' style={{color:"#2979FF"}} />
                    <Input
                      name="location"
                      onChangeText={text => this._onChangeInputLocation(text)}
                      placeholder="Location"/>
                  </Item>
                  <Item>
                    <Icon name='calendar' style={{color:"#2979FF"}} />
                    <Input placeholder="Date"/>
                  </Item>
                  <Button
                    full success
                    disabled={this.state.isButtonDisabled}
                    onPress={() => this._sendData()}>
                    {this.state.loading && <Spinner color={'#fff'} />}
                    {!this.state.loading && <Text> Add Transaction </Text>}
                  </Button>
                </Form>

                <Picker
                  style={{color: '#000'}}
                  selectedValue={'1'}
                  onValueChange={value => this.onValueChange(value)}
                  mode="dialog">
                  <Item label="Januari" value="1" ><Text> Add Transaction </Text>
                  </Item>
                  <Item label="Februari" value="2" />
                  <Item label="Maret" value="3" />
                  <Item label="April" value="4" />
                  <Item label="Mei" value="5" />
                  <Item label="Juni" value="6" />
                  <Item label="Juli" value="7" />
                  <Item label="Agustus" value="8" />
                  <Item label="September" value="9" />
                  <Item label="Oktober" value="10" />
                  <Item label="November" value="11" />
                  <Item label="Desember" value="12" />
                </Picker>
              </View>
            )}

            </Content>
            {(this.state.page === 'Struk') && (
              <Camera />
            )}
        </Container>
      </FadeInView>
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
};

const mapDispatchToProps = dispatch => {
  return {
    expenseRequest: newExpense => dispatch(expenseRequest(newExpense)),
    resetErrorMessage: () => dispatch(resetErrorMessage()),
    resetSuccessMessage: () => dispatch(resetSuccessMessage())
  }
}

const mapStateToProps = state => {
  return {
    camera: state.camera,
    expense: state.expense,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStruk)
