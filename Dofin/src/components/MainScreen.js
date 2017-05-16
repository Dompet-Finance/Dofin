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
import HeaderDrawer from './HeaderDrawer';

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
    this.props.getIncomeRequest();
    this.props.getDreamRequest();
    this.props.getExpenseRequestById();

  }
  componentDidMount(){
    this.props.getIncomeRequest();
    this.props.getDreamRequest();
    // this.props.getExpenseTotalByMonthRequest();
    this.props.getExpenseRequestById();
    // this.props.getTotalAmountByCategoryThisYearById();
    AsyncStorage.getItem(USER_PROFILES).then((value) => {
      if (value === null) {
        this.props.navigation.navigate("Main")
      }else {
        return false
      }
    }).done();
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
    let totalExpenses   = 0
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
    }
    const { navigate }  = this.props.navigation;
    const totalIncome   = this.props.getIncome
    const {dream}       = this.props.getDream
    const totalBalance  = this.props.getIncome - totalExpenses;
    let dreamParse;
    let dreamParseDescription;
    try {
      dream.map((myDream) => {
        dreamParse = myDream.dream
        dreamParseDescription = myDream.description
      })
    } catch (e) {
      dreamParse = ''
      dreamParseDescription = ''
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
            <TouchableOpacity onPress={()=> navigate('DetailDreams')}>
              <Card>
                <CardItem header itemDivider >
                  <Text style={{fontSize: 20, fontWeight: '400', fontFamily: 'Roboto'}}>My Dream</Text>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{height: 200, width: "100%"}} source={{uri: "https://cdn.tinybuddha.com/wp-content/uploads/2015/06/Boy-Reaching-for-Stars.png"}}/>
                </CardItem>
                <CardItem style={{justifyContent: "center", flex: 1, flexDirection: 'column'}}>
                  <Text style={{fontSize: 22, fontWeight: '500'}}>"{dreamParse.toUpperCase()}"</Text>
                  <Text note >{dreamParseDescription}</Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
          ) : <Text>No Dream Available</Text>}

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
    getIncome : state.income,
    getDream  : state,
    getExpense: state.expense.data.expensesById
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    getIncomeRequest                    : () => dispatch(getIncomeRequest()),
    getDreamRequest                     : () => dispatch(getDreamRequest()),
    getExpenseRequestById               : () => dispatch(getExpenseRequestById()),
    getExpenseTotalByMonthRequest       : () => dispatch(getExpenseTotalByMonthRequest()),
    getTotalAmountByCategoryThisYearById: () => dispatch(getTotalAmountByCategoryThisYearById())
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(MainScreen)
