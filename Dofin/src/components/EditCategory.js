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
  Picker,
  Spinner,
  Card,
  CardItem
} from 'native-base';
import {Modal, TouchableHighlight, Alert} from 'react-native';

import {updateRequestCategory} from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      old_category: '',
      icon: '',
      color: '',
      _id: '',
      user_id: '',
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
      ]
    }
  }
  static navigationOptions = {
    header: null
  }
  _sendData(){
    let self = this
    Alert.alert(
      'Are you sure?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'OK', onPress: () => {
          self.setState({
            loading: !this.state.visible
          });
          self.props.navigation.navigate("DetailCategory", {data: self.props.navigation.state.params.data})
          self.props.updateRequestCategory(this.state)
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

    this.setState({
      category      : this.props.navigation.state.params.data.category,
      old_category  : this.props.navigation.state.params.data.category,
      icon          : this.props.navigation.state.params.data.icon,
      _id           : this.props.navigation.state.params.data._id,
      color         : this.props.navigation.state.params.data.color,
      user_id       : this.props.navigation.state.params.user_id
    });
  }
  render(){
    const { container, box } = styles
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;
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
              <Title>Category</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}} padder>
            <Form onSubmit={()=>this.handleSubmit()}>
                <Item>
                  <Icon name='ios-list' style={{color:"#2979FF"}}/>
                  <Input
                    ref="category"
                    name="category"
                    placeholder="Category"
                    value={this.state.category}
                    onChange={(event) => { this._onChangeInputCategory(event) }}
                  />
                </Item>
                <Item>
                  <Icon name='ios-color-palette' onPress={()=> this.openModalColor()} style={{color:"#2979FF"}}/>
                  <Input value={this.state.color} placeholder="Color" disabled/>
                </Item>
                <Item>
                  <Icon name='ios-color-filter-outline' onPress={()=> this.openModalIcon()} style={{color:"#2979FF"}}/>
                  <Input value={this.state.icon} placeholder="Icon" disabled/>
                </Item>
              <Button type="submit" block style={{marginTop: 40, backgroundColor: "#2196F3"}} onPress={() => { this._sendData() }}>
              { (this.state.loading) ? (<Spinner color='#FFF' />) : (<Text> Save </Text>)}
              </Button>
            </Form>

          </Content>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalColorVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <Container>
                <Content>
                    <Card>
                      <CardItem>
                       <Icon active name="ios-color-palette" style={{fontSize: 30,color:"red"}}/>
                       <Text>Red</Text>
                       <Right>
                        <Button bordered success onPress={()=>this.chooseColorPicker("red")}>
                            <Text>Choose</Text>
                        </Button>
                       </Right>
                     </CardItem>
                   </Card>
                   <Card>
                     <CardItem>
                      <Icon active name="ios-color-palette" style={{fontSize: 30,color:"green"}}/>
                      <Text>Green</Text>
                      <Right>
                       <Button bordered success onPress={()=>this.chooseColorPicker("green")}>
                           <Text>Choose</Text>
                       </Button>
                      </Right>
                    </CardItem>
                  </Card>
                  <Card>
                    <CardItem>
                     <Icon active name="ios-color-palette" style={{fontSize: 30,color:"blue"}}/>
                     <Text>Blue</Text>
                     <Right>
                      <Button bordered success onPress={()=>this.chooseColorPicker("blue")}>
                          <Text>Choose</Text>
                      </Button>
                     </Right>
                   </CardItem>
                 </Card>
                </Content>
            </Container>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalIconVisible}
            onRequestClose={() => goBack()}
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
    updateRequestCategory : data => dispatch(updateRequestCategory(data))
  }
}

const mapsStateToProps = state => {
  return {
    postIncome: state,
    postCategory: state.category
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(EditCategory)
