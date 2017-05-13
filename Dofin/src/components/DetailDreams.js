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
  ListItem,
  Card,
  Spinner
} from 'native-base';
import {connect} from 'react-redux';
import {getDreamRequest} from '../actions';

class DetailDreams extends Component {
  static navigationOptions = {
    header: null
  }
  render(){
    const {dream} = this.props.getDream
    // console.log(dream);
    // let dreamParse;
    // try {
    //   dream.map((myDream) => {
    //     dreamParse = myDream.dream
    //   })
    // } catch (e) {
    //   dreamParse = ''
    // }
    const { goBack } = this.props.navigation;
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
