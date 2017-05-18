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
import {getDreamRequest, deleteDreamRequest, deleteDream} from '../actions';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';

class DetailDreams extends Component {
  constructor(props){
    super(props)
    this.state={
      actions:"",
      trigger: false,
      show: false
    }

  }
  static navigationOptions = {
    header: null
  }

  componentWillMount(){
    this.props.getDreamRequest()
  }

  actions(actions, data){

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
            this.props.deleteDream(data)
          }},
        ]
      )

    }
  }

  renderBadge() {
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
        <View style={{...badge, backgroundColor: '#2196F3'}}>
          <Icon name="ios-walk-outline" style={{fontSize: 25, color: 'white'}}/>
        </View>
      </View>
    )
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
                  onPress={() => this.props.navigation.navigate('MainScreen')}
                >
                    <Icon name='ios-arrow-back-outline' />
                </Button>
              </Left>
              <Body>
                  <Title>My Dreams</Title>
              </Body>
              <Right>
                  <Button transparent style={{marginTop: 5}} onPress={()=>this.props.navigation.navigate('Dream')}>
                    <IconCustom name="border-color" size={25} style={{color: "#FFF"}}/>
                  </Button>
              </Right>
          </Header>
          <Content style={{padding: 5}}>
            {(dream !== []) ? dream.map((myDream) => {
              return (
                <Card key={myDream._id}>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 5,
                      }}
                      >
                        {this.renderBadge()}
                        <View style={{paddingLeft: 5, justifyContent: 'center'}}>
                          <Text>{myDream.dream}</Text>
                          <Text note>{myDream.description}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', marginRight: 15}}>
                      <Icon
                        name="ios-apps"
                        style={{fontSize: 20, color: '#ccc'}}
                        onPress={()=> ActionSheet.show(
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
                    </View>
                  </View>
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
    deleteDreamRequest: (data) => dispatch(deleteDreamRequest(data)),
    deleteDream: (data) => dispatch(deleteDream(data))
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(DetailDreams)
