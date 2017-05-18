import React, {Component} from 'react';
import {
  Container, Content, Text, Header,  Icon, View, Left, Button,
  Body, Title, Right, ActionSheet, Form, Item, Label, Input,
  Picker, Spinner, Card, CardItem
} from 'native-base';
import {
  Modal, TouchableHighlight, Alert, Keyboard, TouchableWithoutFeedback
} from 'react-native';

import { postRequestCategory } from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      icon: 'account',
      color: 'grey',
      icon_name: '',
      loading: false,
      selectedColor: '',
      modalColorVisible: false,
      modalIconVisible: false,
      icons: [
        'account', 'account-multiple', 'airballoon', 'album',
        'baby-buggy', 'bank', 'beach', 'book', 'bus', 'cake-variant',
        'camera', 'car', 'cart', 'cash', 'cash-multiple', 'cat',
        'cellphone-android', 'city', 'coffee', 'content-cut', 'creation',
        'crown', 'delete', 'desktop-mac', 'diamond', 'dice-5', 'email',
        'emoticon', 'emoticon-cool', 'emoticon-sad', 'ferry', 'filmstrip',
        'fish', 'flag', 'flash', 'flask-empty', 'flower', 'food', 'food-apple',
        'food-fork-drink', 'gamepad-variant', 'gas-station', 'gift',
        'guitar-acoustic', 'heart', 'headphones', 'help', 'home-variant',
        'hotel', 'information', 'itunes', 'laptop-windows', 'lightbulb-on',
        'phone', 'printer', 'rocket', 'school', 'silverware-variant', 'soccer',
        'sofa', 'star', 'trophy', 'tshirt-crew'
      ],
      colors: [
        '#EC407A', '#AB47BC', '#5C6BC0', '#42A5F5', '#26C6DA', '#66BB6A', '#D4E157', '#FFA726', '#8D6E63', '#BDBDBD', '#D50000', '#AA00FF', '#304FFE', '#00BFA5', '#64DD17', '#FFD600', '#FF3D00', '#212121'
      ],
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
          this.setState({
            loading: !this.state.visible
          });
          // this.props.navigation.navigate("DetailCategory")
          this.props.navigation.goBack()
          this.props.postRequestCategory(this.state)
        }},
      ]
    )
  }
  _onChangeInputCategory(event){
    this.setState({category: event.nativeEvent.text})
  }

  onValueChangeColor (value: string) {
    this.setState({
        selectedColor : value
    });
  }
  openModalColor() {
    this.setState({modalColorVisible: true});
  }
  openModalIcon() {
    this.setState({modalIconVisible: true});
  }
  chooseColorPicker(color){
    this.setState({modalColorVisible: false, color: color});
  }
  chooseIconPicker(data){
    this.setState({modalIconVisible: false, icon: data.icon, icon_name: data.name});
  }
  componentDidMount(){
    if (this.props.postIncome !== null) {
      this.setState({
        loading: false
      });
    }
  }

  render(){
    const { container, box } = styles
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;
    let icon
    let color
    try {
      icon = params.icon
      color = params.color
    } catch (e) {
      icon = ""
      color = ""
    }
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header style={{backgroundColor: "#2196F3"}}>
          <Left>
            <Button transparent
              onPress={() => navigate("DetailCategory")}
              >
                <Icon name='ios-arrow-back-outline' />
            </Button>
          </Left>
          <Body><Title>New Category</Title></Body>
          <Right>
          </Right>
        </Header>

          <Content style={{display: 'flex'}} padder>
            <Form onSubmit={()=>this.handleSubmit()}>
              <Item inlineLabel>
                <View style={{width: 30}}>
                  <IconCustom name="apps" size={22} style={{color:"#2196F3"}} />
                </View>
                <Input
                  ref="category"
                  name="category"
                  placeholder="Category"
                  value={this.state.category}
                  onChange={(event) => { this._onChangeInputCategory(event) }}
                />
              </Item>
              <Item>
                <TouchableWithoutFeedback
                  style={{
                    padding: 0
                  }}
                  onPress={() => this.openModalColor()}
                  >
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableWithoutFeedback>
                      <View
                        style={{
                          width: 30,
                          justifyContent: 'center',
                        }}
                        >
                        <IconCustom name="palette" size={22} style={{color:"#2196F3"}} />
                      </View>
                    </TouchableWithoutFeedback>
                    <Input disabled
                      style={{width: '60%'}}
                      placeholder="Color"
                      />
                    <View style={{justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 22,
                          width: 22,
                          backgroundColor: this.state.color,
                          borderRadius: 11,
                          marginRight: 10,
                        }}>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Item>
              <Item>
                <TouchableWithoutFeedback
                  style={{
                    padding: 0
                  }}
                  onPress={() => this.openModalIcon()}
                  >
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableWithoutFeedback>
                      <View
                        style={{
                          width: 30,
                          marginLeft: 1,
                          justifyContent: 'center',
                        }}
                        >
                          <IconCustom name="pencil-circle-outline" size={22} style={{color:"#2196F3"}} />
                      </View>
                    </TouchableWithoutFeedback>

                    <Input disabled
                      placeholder="Icon"
                      />
                    <View
                      style={{
                        justifyContent: 'center',
                        paddingRight: 10,
                      }}
                      >
                        <IconCustom name={this.state.icon} size={22} style={{color:"#2196F3"}} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Item>
              <Button
                type="submit"
                block
                style={{
                  marginTop: 40,
                  backgroundColor: "#2196F3"
                }}
                onPress={() => { this._sendData() }}
                >
                  {(this.state.loading)?(<Spinner color='#FFF' />):
                  (
                    <Text style={{fontSize: 17}}>
                      Save
                    </Text>
                  )}
              </Button>
            </Form>

          </Content>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalColorVisible}
            onRequestClose={() => this.setState({modalColorVisible: false})}
            >
            <Container>
              <Content style={{padding: 20}}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {this.state.colors.map(color => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.setState({
                          color,
                          modalColorVisible: false,
                        })
                      }}>
                        <View
                          style={{
                            height: 44,
                            width: 44,
                            backgroundColor: color,
                            borderRadius: 22,
                            margin: 10,
                          }}>
                        </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </Content>
            </Container>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalIconVisible}
            onRequestClose={() => this.setState({modalIconVisible: false})}
            >
            <Container>
                <Content>
                  <View style={container}>
                    {this.state.icons.map((name, index) => (
                      <Button
                        transparent
                        key={index}
                        onPress={()=>this.chooseIconPicker({icon: name, name: name})}
                        style={box}
                        >
                          <IconCustom name={name} size={25} color={'#777'} />
                      </Button>
                    ))}
                  </View>
                </Content>
            </Container>
          </Modal>
      </Container>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 5,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    height: 60,
    padding: 0,
    margin: 5,
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    postRequestCategory : data => dispatch(postRequestCategory(data))
  }
}

const mapsStateToProps = state => {
  return {
    postIncome: state,
    postCategory: state.category
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Category)
