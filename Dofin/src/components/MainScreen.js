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
  Toast,
  Thumbnail
} from 'native-base';
import {
  Image,
  TouchableOpacity
} from "react-native";
import PieChart from 'react-native-pie-chart';
import {connect} from 'react-redux';
import {getIncomeRequest, getDreamRequest, getExpenseRequestById} from '../actions';


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
    this.props.getIncomeRequest();
    this.props.getDreamRequest();
    // this.props.getExpenseRequest();
    this.props.getExpenseRequestById();
  }
  render(){
    const chart_wh      = 250
    const series        = []
    const sliceColor    = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

    let totalExpenses = 0
    if (this.props.getExpense !== 0) {
      this.props.getExpense.map((expenses) => {
        series.push(expenses.amount)
        totalExpenses += expenses.amount
      })
    }

    const { navigate }  = this.props.navigation;
    const totalIncome   = this.props.getIncome.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    const {dream}       = this.props.getDream
    const totalBalance  = this.props.getIncome - totalExpenses;

    let dreamParse;
    try {
      dream.map((myDream) => {
        dreamParse = myDream.dream
      })
    } catch (e) {
      dreamParse = ''
    }

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
            <TouchableOpacity onPress={()=> navigate('DetailDreams')}>
              <Card>
                <CardItem header itemDivider >
                  <Icon active name="ios-body-outline" style={{color:"#2196F3"}}/>
                  <Text style={{fontSize: 20, fontWeight: '400'}}>My Dream</Text>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{height: 200, width: "100%"}} source={{uri: "https://cdn.tinybuddha.com/wp-content/uploads/2015/06/Boy-Reaching-for-Stars.png"}}/>
                </CardItem>
                <CardItem style={{justifyContent: "center"}}>
                  <Text style={{fontSize: 25, fontWeight: '500'}}>"{dreamParse}"</Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <Card>
              <CardItem header>
                <Icon active name="ios-calculator" style={{color:"#009688"}}/>
                <Text style={{fontSize: 20, fontWeight: '400'}}>Overview</Text>
              </CardItem>

                <CardItem>
                 <Text>Balance</Text>
                 <Right>
                    <Text>Rp. {totalBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                 </Right>
                </CardItem>

                <CardItem>
                 <Text>Income</Text>
                 <Right>
                    <Text>Rp. {totalIncome}</Text>
                 </Right>
               </CardItem>

               <CardItem>
                <Text>Expenses</Text>
                <Right>
                   <Text>Rp. {totalExpenses.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                </Right>
              </CardItem>
             </Card>

             <Card>
               <CardItem header>
                  <Icon active name="ios-pie-outline" style={{color:"#F44336"}}/>
                 <Text style={{fontSize: 20, fontWeight: '400'}}>Expenses chart</Text>
                 <Right>
                    <Text>All Category</Text>
                 </Right>
               </CardItem>
               <CardItem style={{justifyContent: "center"}}>
               <TouchableOpacity onPress={()=> navigate('DetailCharts')}>
                  <PieChart
                    chart_wh={150}
                    series={series}
                    sliceColor={sliceColor}
                  />
                </TouchableOpacity>
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
              style={{ backgroundColor: '#CDDC39' }}
              onPress={()=>navigate('Category')}
            >
                <Icon name="ios-apps-outline" />
            </Button>
            <Button
              style={{ backgroundColor: '#CDDC39' }}
              onPress={()=>navigate('Dream')}
            >
                <Icon name="ios-glasses-outline" />
            </Button>
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
    getIncome : state.income,
    getDream  : state,
    getExpense: state.expense
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    getIncomeRequest      : () => dispatch(getIncomeRequest()),
    getDreamRequest       : () => dispatch(getDreamRequest()),
    getExpenseRequestById : () => dispatch(getExpenseRequestById()),
    // getExpenseRequest     : () => dispatch(getExpenseRequest())
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(MainScreen)
