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
  Thumbnail,
  Spinner
} from 'native-base';
import {
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  AsyncStorage,
  StatusBar
} from "react-native";
import PieChart from 'react-native-pie-chart';
import {connect} from 'react-redux';
import {
  getIncomeRequest, getDreamRequest,
  getExpenseRequestById, getTotalAmountByMonthById,
  getExpenseTotalByMonthRequest,
  getTotalAmountByCategoryThisYearById
} from '../actions';
import {
  getIncomeRequestById
} from '../actions/incomeAction'
import HeaderDrawer from './HeaderDrawer';
import moment from 'moment';

const ACCESS_TOKEN = "access_token";
const USER_PROFILES = "user_profiles";

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
  componentWillMount(){
    // this.props.getIncomeRequest();
    this.props.getIncomeRequestById({id: '59169da29a208a785ad2e99c'});
    this.props.getDreamRequest();
    this.props.getExpenseRequestById();
  }
  componentDidMount(){
    // this.props.getIncomeRequest();
    this.props.getDreamRequest();
    this.props.getExpenseRequestById();
    AsyncStorage.getItem(USER_PROFILES).then((value) => {
      if (value === null) {
        this.props.navigation.navigate("Main")
      }else {
        return false
      }
    }).done();
  }

  render(){
    const { navigate }  = this.props.navigation;
    // const totalIncome   = this.props.getIncome
    let totalExpenses   = 0
    let dateFormat
    if (this.props.getExpense !== 0) {
      this.props.getExpense.map((expenses, index) => {
        totalExpenses += expenses.amount
        dateFormat = expenses.date
      })

    }

    const totalIncome   = this.props.getIncome.reduce((total, value) => {
      return total + value.amount
    }, 0)

    const {dream}       = this.props.getDream
    const totalBalance  = totalIncome - totalExpenses;
    let dreamParse;
    let dreamParseDescription;
    let dreamParseTarget;
    try {
      dream.map((myDream) => {
        dreamParse = myDream.dream
        dreamParseDescription = myDream.description
        dreamParseTarget = myDream.target_value
      })
    } catch (e) {
      dreamParse = ''
      dreamParseDescription = ''
      dreamParseTarget = ''
    }

    let date = new Date(dateFormat);
    let avgExpensesPerDay = Math.ceil(totalExpenses / date.getDate())
    let avgIncomePerDay = Math.ceil(totalIncome / 30)
    let moneyBalancePerDay = avgIncomePerDay - avgExpensesPerDay
    let value = moneyBalancePerDay * 0.3
    let TargetDays = Math.ceil(dreamParseTarget / value)
    // console.log(moneyBalancePerDay);
    if (moneyBalancePerDay < 0) {
      colorDream = "#FF1744"
    }
    let navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <HeaderDrawer {...this.props} />
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={c => this.drawer = c}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
      >
      <View>
      </View>
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
              <Left>
                <Button transparent
                  onPress={ ()=> this.drawer.openDrawer()}
                >
                    <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                  <Title>Dashboard</Title>
              </Body>
              <Right>
              <Button
                transparent
                onPress={ () => navigate('PushNotifications', {notifications: this.state.notifications})}
              >
                <Icon name="md-notifications"/>
              </Button>
              </Right>
          </Header>
          <Content>
          {(dreamParse !== undefined) ? (
              <Card>
                <CardItem header itemDivider>
                  {(dreamParse === "") ? (
                    <Spinner color='#2196F3'/>
                  ) : (
                    <View>
                      <Text style={{fontSize: 20, fontWeight: '500'}}><Icon name="ios-bulb" style={{fontSize: 30, color: colorDream}}/> {dreamParse.toUpperCase()}</Text>
                      <Button transparent>
                          <Text>Rp. {dreamParseTarget.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                      </Button>
                    </View>
                  )}
                  <Right>
                  {(dreamParseTarget === "") ? (
                    <Spinner color='#2196F3'/>
                  ) : (
                    <View>
                    {(moneyBalancePerDay < 0) ? (
                      <Text note> You spend more than you earn!</Text>
                    ) : (
                      <Text note> you can get it in {TargetDays} days</Text>
                    )}
                    </View>
                  )}

                  </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{height: 200, width: "100%"}} source={{uri: "https://cdn.tinybuddha.com/wp-content/uploads/2015/06/Boy-Reaching-for-Stars.png"}}/>
                </CardItem>
                <CardItem style={{justifyContent: "center", flex: 1, flexDirection: 'column'}}>
                  {(dreamParseDescription === "") ? (
                    <Spinner color='#2196F3'/>
                  ) : (
                    <Text note>{dreamParseDescription}</Text>
                  )}
                </CardItem>
              </Card>
          ) : <Spinner color='#68A57B' />}

            <Card>
              <CardItem header>
                <Text style={{fontSize: 20, fontWeight: '400'}}>Overview</Text>
              </CardItem>

                <CardItem>
                 <Text>Balance</Text>
                 <Right>
                    <Text style={{fontWeight: '500'}}>Rp. {totalBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                 </Right>
                </CardItem>
                <CardItem>
                 <Text>Income</Text>
                 <Right>
                    <Text style={{fontWeight: '500'}}>Rp. {totalIncome.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                 </Right>
               </CardItem>

               <CardItem>
                <Text>Expenses</Text>
                <Right>
                   <Text style={{fontWeight: '500'}}>Rp. {totalExpenses.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
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
      </DrawerLayoutAndroid>
    )
  }
}
// navigate to detail chart
//onPress={()=> navigate('DetailCharts', {category: uniqueCategory})}

const mapsStateToProps = state => {
  return {
    postIncome: state,
    getIncome : state.income.data.incomeById,
    getDream  : state,
    getExpense: state.expense.data.expensesById,
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    getIncomeRequest                    : () => dispatch(getIncomeRequest()),
    getDreamRequest                     : () => dispatch(getDreamRequest()),
    getExpenseRequestById               : () => dispatch(getExpenseRequestById()),
    getIncomeRequestById               : (data) => dispatch(getIncomeRequestById(data)),
    getExpenseTotalByMonthRequest       : () => dispatch(getExpenseTotalByMonthRequest()),
    getTotalAmountByCategoryThisYearById: () => dispatch(getTotalAmountByCategoryThisYearById())
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(MainScreen)
