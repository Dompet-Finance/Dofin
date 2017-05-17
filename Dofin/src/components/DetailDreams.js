import React, {Component} from 'react';
import {
  Text,
  View,
  Container,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  Content,
  Icon,
  ActionSheet,
  ListItem,
  Card,
  Spinner
} from 'native-base';
import {
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {getDreamRequest, deleteDreamRequest} from '../actions';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';

class DetailDreams extends Component {
  constructor(props){
    super(props)
    this.state={
      actions:"",
      show: false
    }

  }
  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    this.props.getDreamRequest()
  }

  componentDidUpdate(){
    this.props.getDreamRequest()
  }

  actions(actions, data){
    // if (actions === "Detail") {
    //   this.props.navigation.navigate("SingleDream", {data: data})
    // }else
    if (actions === "Edit") {
      this.props.navigation.navigate("EditDream", {data: data})
    }else if (actions === "Delete") {
      Alert.alert(
        'Are you sure?',
        '',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => {
            this.props.deleteDreamRequest(data)
            this.props.getDreamRequest()
          }},
        ]
      )
    }
    this.setState({ actions: actions });
  }
  render(){
    const {dream} = this.props.getDream
    const { goBack } = this.props.navigation;
    const BUTTONS = ["Edit", "Delete"];
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;
    return (
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
              <Left>
                <Button transparent
                  onPress={() => this.props.navigation.navigate("MainScreen")}
                >
                    <Icon name='ios-arrow-back-outline' />
                </Button>
              </Left>
              <Body>
                  <Title>My Dreams</Title>
              </Body>
              <Right>
                  <Button transparent onPress={()=>this.props.navigation.navigate('Dream')}>
                    <IconCustom name="border-color" size={25} style={{color: "#FFF"}}/>
                  </Button>
              </Right>
          </Header>
          <Content>
            {(dream !== "") ? dream.map((myDream) => {
              return (
                <Card key={myDream.dream}>
                  <ListItem icon>
                    <Left>
                      <Button iconLeft style={{borderRadius: 120, backgroundColor: "#2196F3"}}>
                          <Icon name="ios-walk-outline" style={{fontSize: 25, marginLeft: 9}}/>
                      </Button>
                    </Left>
                    <Body>
                        <Text>{myDream.dream}</Text>
                        <Text note>{myDream.description}</Text>
                    </Body>
                    <Right>
                      <Icon name="ios-apps" onPress={()=> ActionSheet.show(
                          {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            title: 'Actions'
                          },
                          (buttonIndex) => {
                            this.actions(actions=BUTTONS[buttonIndex], data=myDream)
                          }
                        )}/>
                    </Right>
                  </ListItem>
                </Card>
              )
            })
            : <Spinner color='#68A57B' />}

          </Content>
      </Container>
    )
  }
}
const mapsStateToProps = state => {
  return {
    getDream: state
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    getDreamRequest   : () => dispatch(getDreamRequest()),
    deleteDreamRequest: (data) => dispatch(deleteDreamRequest(data))
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(DetailDreams)
