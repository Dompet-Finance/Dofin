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
import {getDreamRequest, getExpenseRequestById} from '../actions';

class DetailCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    this.props.getExpenseRequestById();
  }

  static navigationOptions = {
    header: null
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
    const sliceColor    = ['#2196F3','#FFEB3B', '#4CAF50', '#FF9800', '#E91E63', '#F44336', '#9C27B0', '#2196F3', '#03A9F4', '#009688', '#8BC34A', '#FFC107','#F44336']
    let dataCalculate   = []
    let totalExpenses   = 0
    let color = []
    if (this.props.getExpense.data.expensesById !== null) {
      let data = []
      let cat = []
      this.props.getExpense.data.expensesById.map((expenses, index) => {
        totalExpenses += expenses.amount
        data.push(expenses)
        let obj = {}
        obj.category = expenses.category
        obj.amount = expenses.amount
        cat.push(obj)
      })
      cat.map((calculateAmount, index) => {
          dataCalculate.push(calculateAmount)
      })

      let uniqueCategory = [...new Set(data.map(item => item.category))];

      for (var i = 0; i < uniqueCategory.length; i++) {
        let objColor = {}
        objColor.category = uniqueCategory[i]
        objColor.color = sliceColor[i]
        color.push(objColor)
      }

    }
    const series = Object.values(this._getTotal(dataCalculate))

    const {dream} = this.props.getDream
    const { goBack } = this.props.navigation;
    const { footer, footerView, footerLast, badge, categoryMedia} = styles
    return (
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
              <Left>
                <Button transparent
                  onPress={() => goBack()}
                >
                    <Icon name='ios-arrow-back-outline' />
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
          <Content style={{padding: 5}}>
            <Card style={{margin: 5}}>
            <CardItem header>
              <Text style={{fontSize: 20, fontWeight: '400', fontFamily: "Roboto"}}>Expense chart</Text>
              <Right>
                 <Text>All Category</Text>
              </Right>
            </CardItem>
            {(color !== undefined) ? (color.map((dataColor, index) => {
              return (
                <View key={dataColor.color}
                  style={{
                    margin: 2,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                <Icon name="ios-cog-outline"
                 style={{
                   color: dataColor.color,
                   fontSize: 15,
                   margin: 10,
                 }}/>
                <Text>{dataColor.category.toLowerCase()}: {Math.ceil(series[index] / totalExpenses * 100)} %</Text>
                </View>
              )
            })) : <Text>No data</Text>}
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
    getDream: state,
    getExpense: state.expense
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    getDreamRequest: () => dispatch(getDreamRequest()),
    getExpenseRequestById : () => dispatch(getExpenseRequestById()),
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(DetailCharts)
