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
import {
  Alert
} from 'react-native';
import {dreamRequest} from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class FormDream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dream: '',
      description: '',
      target_value: '',
      loading: false,
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
          const { dream, description, target_value } = self.state
          if ((dream === "") || (description === "") || (target_value === "")) {
            return alert('All field is required!')
          }else {
            self.setState({
              loading: !self.state.visible
            });
            self.props.navigation.navigate("DetailDreams")
            self.props.dreamRequest(self.state)
          }
        }},
      ]
    )

  }
  _onChangeInputDream(event){
    this.setState({dream: event.nativeEvent.text})
  }
  _onChangeInputDescription(event){
    this.setState({description: event.nativeEvent.text})
  }
  _onChangeInputTargetValue(event){
    this.setState({target_value: event.nativeEvent.text})
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
    const { navigate } = this.props.navigation;
    return (
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button transparent
                onPress={() => navigate("DetailDreams")}
              >
                  <Icon name='ios-arrow-back-outline' />
              </Button>
            </Left>
            <Body>
              <Title>My Dream</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}} padder>
            <Form onSubmit={()=>this.handleSubmit()}>
                <Item inlineLabel>
                  <Icon name='ios-moon-outline' style={{color:"#2979FF"}}/>
                  <Input
                    ref="dream"
                    name="dream"
                    placeholder="Dream"
                    onChange={(event) => { this._onChangeInputDream(event) }}
                  />

                </Item>
                <Item >
                  <Icon name='md-create' style={{color:"#2979FF"}}/>
                  <Input
                    ref="description"
                    name="description"
                    placeholder="Description"
                    onChange={(event) => { this._onChangeInputDescription(event) }}
                  />
                </Item>
                <Item >
                  <Icon name='logo-usd' style={{color:"#2979FF"}}/>
                  <Input
                    ref="target_value"
                    name="target_value"
                    placeholder="Target Value"
                    keyboardType="numeric"
                    onChange={(event) => { this._onChangeInputTargetValue(event) }}
                  />
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

const mapsDispatchToProps = dispatch => {
  return {
    dreamRequest : data => dispatch(dreamRequest(data))
  }
}

const mapsStateToProps = state => {
  return {
    postDream: state
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(FormDream)
