import React, {Component} from 'react';
import {ScrollView} from 'native-base';
import {
  Container,
  Content,
  ListItem,
  Text,
  Header,
  Icon,
  View,
  Left,
  Button,
  Body,
  Title,
  Right,
  Fab,
  Card,
  CardItem,
  Drawer,
  Toast
} from 'native-base';
import PieChart from 'react-native-pie-chart';
import {connect} from 'react-redux';
import {getIncomeRequest} from '../actions';


class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        active: false,
        showToast: false,
        income: ''
    };
  }
  static navigationOptions = {
    header: null
  }
  closeDrawer() {
    this.drawer._root.close()
  };
  openDrawer() {
    this.drawer._root.open()
  };
  componentDidMount(){
    this.props.getIncomeRequest()
  }
  componentWillUnmount(){
    if (this.props.postIncome !== null) {
      Toast.show({
        text: 'New Income has been update!',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
  }

  drawer(){
    return (
      <Drawer>
        ref={(ref) => this._drawer = ref}
        type='displace'
        content={<View style={{backgroundColor: '#000', height: 1000}} />}
        onClose={this.closeDrawer.bind(this)}
        onOpen={this.openDrawer.bind(this)}
        openDrawerOffset={100}
      </Drawer>
    )
  }
  render(){

    const chart_wh = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
    const { navigate } = this.props.navigation;
    const {income} = this.props.getIncome;
    return (
      <Container>
          <Header>
              <Left>
                <Button transparent
                  onPress={()=>navigate('Drawer')}
                >
                    <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                  <Title>Dofin</Title>
              </Body>
              <Right>
                  <Button transparent>
                  </Button>
              </Right>
          </Header>
          <Content>
            <Card>
              <CardItem header>
                <Text style={{fontSize: 24, fontWeight: '400'}}>Overview</Text>
              </CardItem>

                <CardItem>
                 <Text>Accounts</Text>
                 <Right>
                    <Text>Rp. 2.000.000</Text>
                 </Right>
                </CardItem>

                <CardItem>
                 <Text>Income</Text>
                 <Right>
                    <Text>Rp. {income.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                 </Right>
               </CardItem>

               <CardItem>
                <Text>Expenses</Text>
                <Right>
                   <Text>Rp. 2.000.000</Text>
                </Right>
              </CardItem>
             </Card>

             <Card>
               <CardItem header>
                 <Text style={{fontSize: 24, fontWeight: '400'}}>Expenses by category</Text>
               </CardItem>
               <CardItem>
                <PieChart
                  chart_wh={150}
                  series={series}
                  sliceColor={sliceColor}
                />
                <Right style={{marginTop: -100, marginRight: 10}}>
                   <Text>All Category</Text>
                </Right>
               </CardItem>
              </Card>
          </Content>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ marginLeft: 10 }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
              <Icon name="add" />
            <Button
              style={{ backgroundColor: '#34A34F' }}
              onPress={()=>navigate('Income')}
            >
                <Icon name="logo-usd" />
            </Button>
            <Button
              style={{ backgroundColor: '#DD5144' }}
              onPress={()=>navigate('Struk')}
            >
                <Icon name="ios-pricetags-outline" />
            </Button>
          </Fab>
      </Container>
    )
  }
}

const mapsStateToProps = state => {
  return {
    postIncome: state,
    getIncome: state
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    getIncomeRequest: () => dispatch(getIncomeRequest())
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(MainScreen)
