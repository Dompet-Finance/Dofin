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
  Spinner,
  CardItem,
  TouchableOpacity,
  Picker,
  Item
} from 'native-base';
import {connect} from 'react-redux';
import PieChart from 'react-native-pie-chart';
import {getDreamRequest} from '../actions';

class DetailDreams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: 1,

    }
  }

  onValueChange(value) {
    this.setState({month: +value})
  }

  static navigationOptions = {
    header: null
  }
  render(){
    const chart_wh = 250
    const series = [123, 321, 123, 789, 1000]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
    const {dream} = this.props.getDream
    const { goBack } = this.props.navigation;
    const { footer, footerView, footerLast, badge, categoryMedia} = styles
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
                  <Title>Expense Chart</Title>
              </Body>
              <Right>
                  <Button transparent>
                  </Button>
              </Right>
          </Header>
          <Content>
            <View style={{backgroundColor: '#3F51B5'}}>
              <Picker
                style={{color: 'white'}}
                selectedValue={this.state.month.toString()}
                onValueChange={value => this.onValueChange(value)}
                mode="dialog">
                <Item label="Investment" value="1" />
                <Item label="Salary" value="2" />

             </Picker>
            </View>
            <Card>
              <CardItem header>
                <Text style={{fontSize: 24, fontWeight: '400'}}>Expenses chart</Text>
                <Right>
                   <Text>All Category</Text>
                </Right>
              </CardItem>
              <CardItem style={{justifyContent: "center"}}>
                 <PieChart
                   chart_wh={150}
                   series={series}
                   sliceColor={sliceColor}
                 />
              </CardItem>
             </Card>

          </Content>
      </Container>
    )
  }
}

const styles = {
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLast: {
    flex: 1,
    alignItems: 'center',
  },
  badge: {
    width: 34,
    height: 34,
    backgroundColor: 'red',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryMedia: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
    padding: 5,
    backgroundColor: '#ccc'
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
