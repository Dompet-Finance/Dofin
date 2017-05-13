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
import {Modal, TouchableHighlight} from 'react-native';

import {postRequestCategory} from '../actions';
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
      category: '',
      icon: '',
      color: '',
      icon_name: '',
      loading: false,
      selectedColor: '',
      modalColorVisible: false,
      modalIconVisible: false
    }
  }
  static navigationOptions = {
    header: null
  }
  _sendData(){
    this.setState({
      loading: !this.state.visible
    });
    this.props.navigation.navigate("Main")
    this.props.postRequestCategory(this.state)
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
              <Title>Category</Title>
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
                  <Icon active name='ios-list' placeholder="category" style={{marginRight: 13}}/>
                  <Input
                    ref="category"
                    name="category"
                    onChange={(event) => { this._onChangeInputCategory(event) }}
                  />
                </Item>
                <Item>
                  <Icon active name='ios-color-palette' onPress={()=> this.openModalColor()}/>
                  <Input placeholder={this.state.color} disabled/>
                </Item>
                <Item>
                  <Icon active name='ios-color-filter-outline' onPress={()=> this.openModalIcon()}/>
                  <Input placeholder={this.state.icon_name} disabled/>
                </Item>
              </Card>
              <Button type="submit" block style={{marginTop: 40}} onPress={() => { this._sendData() }}>
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
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <Container>
                <Content>
                    <Card>
                      <CardItem>
                       <Icon active name="logo-linkedin" style={{fontSize: 30,color:"red"}}/>
                       <Text>Linkedin</Text>
                       <Right>
                        <Button bordered success onPress={()=>this.chooseIconPicker({icon: "logo-linkedin", name: "Linkedin"})}>
                            <Text>Choose</Text>
                        </Button>
                       </Right>
                     </CardItem>
                   </Card>
                   <Card>
                     <CardItem>
                      <Icon active name="md-mail-open" style={{fontSize: 30,color:"green"}}/>
                      <Text>Mail</Text>
                      <Right>
                       <Button bordered success onPress={()=>this.chooseIconPicker({icon: "md-mail-open", name: "Mail"})}>
                           <Text>Choose</Text>
                       </Button>
                      </Right>
                    </CardItem>
                  </Card>
                  <Card>
                    <CardItem>
                     <Icon active name="ios-man" style={{fontSize: 30,color:"blue"}}/>
                     <Text>Man</Text>
                     <Right>
                      <Button bordered success onPress={()=>this.chooseIconPicker({icon: "ios-man", name: "Man"})}>
                          <Text>Choose</Text>
                      </Button>
                     </Right>
                   </CardItem>
                 </Card>
                </Content>
            </Container>
          </Modal>
      </Container>
    )
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
