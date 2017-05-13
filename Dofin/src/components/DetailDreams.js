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
import {connect} from 'react-redux';
import {getDreamRequest} from '../actions';

class DetailDreams extends Component {
  constructor(props){
    super(props)
    this.state={
      actions:""
    }

  }
  static navigationOptions = {
    header: null
  }
  actions(actions, data){
    // console.log(data);
    if (actions === "Detail") {
      this.props.navigation.navigate("SingleDream", {data: data})
    }
    this.setState({ actions: actions });
  }
  render(){
    const {dream} = this.props.getDream
    const { goBack } = this.props.navigation;
    const BUTTONS = ["Detail", "Edit", "Delete"];
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;
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
                  <Title>My Dreams</Title>
              </Body>
              <Right>
                  <Button transparent>
                  </Button>
              </Right>
          </Header>
          <Content>
            {(dream.length !== 0) ? dream.map((myDream) => {
              return (
                <Card key={myDream._id}>
                  <ListItem icon>
                    <Left>
                      <Icon name="ios-walk-outline" />
                    </Left>
                    <Body>
                       <Text>{myDream.dream}</Text>
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
    getDreamRequest: () => dispatch(getDreamRequest())
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(DetailDreams)
