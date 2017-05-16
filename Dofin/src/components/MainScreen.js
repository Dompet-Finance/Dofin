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
} from 'native-base';
import {
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  AsyncStorage,
  StatusBar
  AppState,
  Platform,
} from "react-native";
import PieChart from 'react-native-pie-chart';
import {connect} from 'react-redux';
import {
  getIncomeRequest, getDreamRequest,
  getExpenseRequestById, getTotalAmountByMonthById,
  getExpenseTotalByMonthRequest,
  getTotalAmountByCategoryThisYearById,
  notifRequest
} from '../actions';
import PushNotification from 'react-native-push-notification';
import IconBadge from 'react-native-icon-badge';

import HeaderDrawer from './HeaderDrawer';
import PushController from './PushController';
import PushNotifications from './PushNotifications';

const ACCESS_TOKEN = "access_token";


class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        active: false,
        showToast: false,
        income: '',
        seconds: 1,
        appState: AppState.currentState,
        notifications: []
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
    this.props.getIncomeRequest();
    this.props.getDreamRequest();
    this.props.getExpenseRequestById();
    AsyncStorage.getItem(ACCESS_TOKEN).then((value) => {
      if (value === null) {
        this.props.navigation.navigate("Main")
      }else {
        console.log(value);
        return false
      }
    }).done();
  }
  componentDidMount(){
    this.props.getIncomeRequest();
    this.props.getDreamRequest();
    // this.props.getExpenseTotalByMonthRequest();
    this.props.getExpenseRequestById();
    // this.props.getTotalAmountByCategoryThisYearById();
    AsyncStorage.getItem(ACCESS_TOKEN).then((value) => {
      if (value === null) {
        this.props.navigation.navigate("Main")
      }else {
        console.log(value);
        return false
      }
    }).done();
    if (this.state.appState === 'active' && this.props.getIncome > 100000000000) {
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
      this.props.notifRequest(message)
    }
  }
  _getTotal(arr) {
    var sums = {}, counts = {}, results = [], category;
    for (var i = 0; i < arr.length; i++) {
        category = arr[i].category;
        if (!(category in sums)) {
            sums[category] = 0;
            counts[category] = 0;
        }
        sums[category] += arr[i].amount;
        counts[category]++;
    }
    return sums;
  }
  render(){

    const chart_wh      = 250
    const sliceColor    = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800', '#E91E63', '#F44336', '#9C27B0', '#2196F3', '#03A9F4', '#009688', '#8BC34A', '#FFC107']
    let totalExpenses   = 0
    let dataCalculate   = []
    let color = []
    let uniqueCategory
    if (this.props.getExpense !== 0) {
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
      uniqueCategory = [...new Set(data.map(item => item.category))];
      cat.map((calculateAmount, index) => {
        dataCalculate.push(calculateAmount)
      })

      for (var i = 0; i < uniqueCategory.length; i++) {
        let objColor = {}
        objColor.category = uniqueCategory[i]
        objColor.color = sliceColor[i]
        color.push(objColor)
      }
    }
    const series = Object.values(this._getTotal(dataCalculate))
    const { navigate }  = this.props.navigation;
    const totalIncome   = this.props.getIncome
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
      <Container>
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

                {(this.state.notifications.length !== 0) && (
                  <IconBadge
                    MainElement={
                      <Button
                        transparent
                        onPress={ () => navigate('PushNotifications', {notifications: this.state.notifications})}
                      >
                        <Icon name="md-notifications"/>
                      </Button>
                    }
                    BadgeElement={
                      <Text style={{color:'#FFFFFF'}}>{this.state.notifications.length}</Text>
                    }

                    IconBadgeStyle={
                      {width:15,
                      height:15,
                      backgroundColor: '#b71c1c'}
                    }
                  />
                )}
                {(this.state.notifications.length === 0) && (
                  <Button
                    transparent
                    onPress={ () => navigate('PushNotifications', {notifications: this.state.notifications})}
                  >
                    <Icon name="md-notifications"/>
                  </Button>
                )}
                  <PushController />
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
                <Icon active name="ios-calculator" style={{color:"#2196F3"}}/>
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
                    <Text>Rp. {totalIncome.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
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
                    <Icon active name="ios-pie-outline" style={{color:"#2196F3"}}/>
                   <Text style={{fontSize: 20, fontWeight: '400'}}>Expenses chart</Text>
                   <Right>
                      <Text>All Category</Text>
                   </Right>
                 </CardItem>
                 {(color !== undefined) ? (color.map((dataColor, index) => {
                   return (
                     <View key={dataColor.color}>
                      <Icon name="ios-cog-outline" style={{color: dataColor.color}}/>
                      <Text>{dataColor.category}: {Math.ceil(series[index] / totalExpenses * 100)} %</Text>
                     </View>
                   )
                 })) : <Text>No data</Text>}
                 <CardItem style={{justifyContent: "center"}}>
                   <TouchableOpacity>
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
    getIncome : state.income,
    getDream  : state,
    getExpense: state.expense
  }
}

const mapsDispatchToProps = dispatch => {
  return {
<<<<<<< 56e988d3483a65562e5aac637596c9a133f21838
    getIncomeRequest                    : () => dispatch(getIncomeRequest()),
    getDreamRequest                     : () => dispatch(getDreamRequest()),
    getExpenseRequestById               : () => dispatch(getExpenseRequestById()),
    getExpenseTotalByMonthRequest       : () => dispatch(getExpenseTotalByMonthRequest()),
    getTotalAmountByCategoryThisYearById: () => dispatch(getTotalAmountByCategoryThisYearById())
=======
    getIncomeRequest      : () => dispatch(getIncomeRequest()),
    getDreamRequest       : () => dispatch(getDreamRequest()),
    getExpenseRequestById : () => dispatch(getExpenseRequestById()),
    getExpenseTotalByMonthRequest     : () => dispatch(getExpenseTotalByMonthRequest())
    notifRequest          : notif => dispatch(notifRequest(notif))
>>>>>>> google places, notifications, fab and login styling
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(MainScreen)
