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
  StatusBar,
  AppState,
  Platform
} from "react-native";
import PieChart from 'react-native-pie-chart';
import {connect} from 'react-redux';
import {
  getIncomeRequest, getDreamRequest,
  getExpenseRequestById, getTotalAmountByMonthById,
  getExpenseTotalByMonthRequest,
  getTotalAmountByCategoryThisYearById, getIncomeRequestById
} from '../actions';

import PushNotification from 'react-native-push-notification';

import HeaderDrawer from './HeaderDrawer';
import moment from 'moment';

import PushController from './PushController';
import PushNotifications from './PushNotifications';

const ACCESS_TOKEN = "access_token";
const USER_PROFILES = "user_profiles";

class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        active: false,
        showToast: false,
        income: '',
        pushNotif: false,
        seconds: 1,
        appState: AppState.currentState,
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
  pushNotificationAction(){
    let date = new Date(Date.now() + (this.state.seconds * 1000));
    let message = "It seems you have a lot of expenses lately"

    if (Platform.OS === 'ios') {
      date = date.toISOString();
    }

    PushNotification.localNotificationSchedule({
      message,
      date,
      foreground: true,
    });
  }

  componentWillMount(){
    this.props.getDreamRequest();
  }

  componentDidMount(){
    this.props.getIncomeRequestById({id: "59169da29a208a785ad2e99c"});
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
    //const totalIncome   = this.props.getIncome
    const {dream}       = this.props.getDream
    let totalExpenses   = 0
    let dateFormat
    if (this.props.getExpense !== 0) {
      this.props.getExpense.map((expenses, index) => {
        totalExpenses += expenses.amount
        dateFormat = expenses.date
      })

    let dataCalculate   = []
    let color = []
    let uniqueCategory
    if (this.props.getExpense.length !== 0 && this.props.getIncome !== 0) {
      let data = []
      let cat = []
      this.props.getExpense.map((expenses, index) => {
        totalExpenses += expenses.amount
        data.push(expenses)
        let obj = {}
        obj.category = expenses.category
        obj.amount = expenses.amount
        cat.push(obj)
      })

      if (this.state.appState === 'active' && totalExpenses >= (this.props.getIncome * 0.4) && this.state.pushNotif === false) {
        this.setState({ pushNotif: true})
      }
    }

    const totalIncome   = this.props.getIncome.reduce((total, value) => {
      return total + value.amount
    }, 0)
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
    if (moneyBalancePerDay < 0) {
      colorDream = "#607D8B"
    }else{
      colorDream = "#FDD835"
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
        <StatusBar
          backgroundColor="#2196F3"
          barStyle="light-content"
        />
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
                {(this.state.pushNotif === true) ? (
                  <Button
                    transparent
                    onPress={ () => this.pushNotificationAction()}
                  >
                    <Icon name="md-notifications" style={{color: "red"}}/>
                  </Button>
                ) : (
                  <Button
                    transparent
                    onPress={ () => {}}
                  >
                    <Icon name="md-notifications" />
                  </Button>
                )}

                <PushController />
              </Right>
          </Header>
          <Content >
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
                    <Image style={{height: 150, width: "100%"}} source={{uri: "https://cdn.tinybuddha.com/wp-content/uploads/2015/06/Boy-Reaching-for-Stars.png"}}/>
                </CardItem>
                <CardItem style={{justifyContent: "center", flex: 1, flexDirection: 'column'}}>
                  {(dreamParseDescription === "") ? (
                    <Spinner color='#2196F3'/>
                  ) : (
                    <Text note>{dreamParseDescription}</Text>
                  )}
                </CardItem>
              </Card>
          ) : <View><Text>No Dreams Available</Text></View>}

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
            style={{ backgroundColor: '#2196F3'}}
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
    )}
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
    getIncomeRequestById                : (data) => dispatch(getIncomeRequestById(data)),
    getExpenseTotalByMonthRequest       : () => dispatch(getExpenseTotalByMonthRequest()),
    getTotalAmountByCategoryThisYearById: () => dispatch(getTotalAmountByCategoryThisYearById())
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(MainScreen)
