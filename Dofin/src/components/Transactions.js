import React from 'react'
import { connect } from 'react-redux'
import {
  expenseRequestTotalByCategory, assignExpenseType, deleteExpenseById
} from '../actions/expenseAction'
import {
  incomeRequestTotalByCategory, assignIncomeType, deleteIncomeById
} from '../actions/incomeAction'
import {
  joinByCategory, joinDetail
} from '../actions/transactionAction'
import {getRequestCategory} from '../actions';
import {
  Button, Container, Content, Header, View,
  Left, Right, Body, Title, Text, Footer, FooterTab,
  Badge, Picker, Item, Input, Icon as IconN, Card
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FadeInView from './FadeInView'
import {
  Animated, Easing, Alert, Modal, TouchableWithoutFeedback
} from 'react-native';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',00'
}
function dateLocal(date) {
  let newDate = new Date(date)
  let d = ('0'+newDate.getDate()).slice(1)
  let m = ('0'+(newDate.getMonth()+1)).slice(1)
  let y = newDate.getFullYear()
  return `${d}/${m}/${y}`
}
function compare(a, b) {
  if (a.category.toLowerCase() < b.category.toLowerCase()) {
    return -1;
  }
  if (a.category.toLowerCase() > b.category.toLowerCase()) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
function compareDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

class Transactions extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      month: new Date().getMonth()+1,
      year: new Date().getFullYear(),
      modalVisible: false,
      modalVisibleDelete: false,
      child: 1,
      first: true,
      categories: [{
        category: 'Food',
        icon: 'silverware-variant',
        color: 'orange',
      },{
        category: 'Clothing',
        icon: 'tshirt-crew',
        color: 'green',
      },{
        category: 'Cloth',
        icon: 'tshirt-crew',
        color: 'brown',
      },{
        category: 'Salary',
        icon: 'cash',
        color: 'teal',
      },{
        category: 'New',
        icon: 'cash',
        color: 'teal',
      }],
      anims: []
    }
  }

  componentWillMount() {
    this.props.expenseRequestTotalByCategory({
      id: '59169da29a208a785ad2e99c'
    })
    this.props.incomeRequestTotalByCategory({
      id: '59169da29a208a785ad2e99c'
    })
    this.props.getRequestCategory()
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  onValueChange(value) {

    // const { transactions, month } = this.state
    const { month } = this.state
    const { totalByCategoryThisYear } = this.props.expense.data
    const transactions = assignExpenseType(totalByCategoryThisYear)
    const index = transactions.findIndex(
      val => val._id.month === +value) // tricky
    const anims = index === -1 ? [] : transactions[index].categories.map(() => {
      return {
        left: new Animated.Value(100),
        opacity: new Animated.Value(0),
      }
    })

    // setTimeout(() => {
      this.setState({
        month: +value,
        anims
      }, () => {

      })

  }

  renderBadge(category) {
    const { badge } = styles
    const { categories } = this.props
    const index = categories.findIndex(
      val => val.category === category)
    const categorySet = index === -1 ?
      {color: 'grey', icon: 'dots-horizontal'} : categories[index]
    return (
      <View style={{padding: 5}}>
        <View style={{...badge, backgroundColor: categorySet.color}}>
          <Icon name={categorySet.icon} size={20} color={'#fff'} />
        </View>
      </View>
    )
  }

  renderContent() {
    const { categoryMedia } = styles
    // const { transactions, month } = this.state
    const { month } = this.state
    // const { totalByCategoryThisYear } = this.props.expense.data
    const transactions = this.props.incomeExpenses
    const index = transactions.findIndex(
      val => val._id.month === month)
    const categories = index === -1 ? [] : transactions[index].categories

    const recent = this.props.incomeExpensesDetail

    if (this.state.child === 1)
      return categories.sort(compare).map((category, index) => (
        <Card style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={categoryMedia} key={index}>
            {this.renderBadge(category.category)}
            <View style={{paddingLeft: 5}}>
              <Text>{category.category}</Text>
              <Text
                style={{
                  color: category.type === 'income' ? 'green':'red'
                }}
                >
                Rp {numberWithCommas(category.total_amount)}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', marginRight: 5}}>
            <Icon name='chevron-right' size={20} style={{color:"#fff"}} />
          </View>
        </Card>
      ))

    if (this.state.child === 0)
      return recent.sort(compareDate).map((data, index) => (
        <Card
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: index === recent.length-1 ? 17:5,
          }}
          >
            <View style={categoryMedia} key={index}>
              {this.renderBadge(data.category)}
              <View style={{paddingLeft: 5}}>
                <Text>Category: {data.category}</Text>
                <Text>{dateLocal(data.date)}</Text>
                <Text>{data.description}</Text>
                <Text>Total Item: {data.totalItem === 0 ? 'none': data.totalItem}</Text>
                <Text>Rp {numberWithCommas(data.amount)}</Text>
              </View>
            </View>
            <View style={{justifyContent: 'flex-start', marginRight: 5}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  alert()
                }}
                >
                  <View
                    style={{
                      height: 0,
                      width: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                    }}
                    >
                      <Icon name='border-color' size={20} style={{color:"#2196F3"}} />
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  Alert.alert(
                    `Delete ${data.type}`,
                    `Data ${data.description} ${dateLocal(data.date)} ${data.amount} will be deleted, are you sure?`,
                    [
                      {text: 'Cancel'},
                      {text: 'OK', onPress: () => {
                        if (data.type === 'expense') {
                          this.props.deleteExpenseById({id: data._id})
                          this.props.expenseRequestTotalByCategory({
                            id: '59169da29a208a785ad2e99c'
                          })
                        }
                        if (data.type === 'income') {
                          this.props.deleteIncomeById({id: data._id})
                          this.props.incomeRequestTotalByCategory({
                            id: '59169da29a208a785ad2e99c'
                          })
                        }
                      }},

                    ],
                    {
                      cancelable: false
                    }
                  )
                }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                    }}
                    >
                      <Icon name='delete' size={20} style={{color:"#ccc"}} />
                  </View>

              </TouchableWithoutFeedback>

            </View>
        </Card>
      ))

  }

  renderTotalIncome() {
    // const { transactions, month } = this.state
    const { month } = this.state
    const transactions = this.props.incomeExpenses
    const index = transactions.findIndex(
      val => val._id.month === month)
    const totalAmount = index === -1 ? 0 : transactions[index].total_amount_income
    return (
      <Text style={{marginRight: 10, color: 'green'}}>
        Rp {numberWithCommas(totalAmount)}
      </Text>
    )
  }

  renderTotalExpenses() {
    // const { transactions, month } = this.state
    const { month } = this.state
    // const { totalByCategoryThisYear } = this.props.expense.data
    const transactions = this.props.incomeExpenses
    const index = transactions.findIndex(
      val => val._id.month === month)
    const totalAmount = index === -1 ? 0 : transactions[index].total_amount_expense
    return (
      <Text style={{marginRight: 10, color: 'red'}}>
        Rp -{numberWithCommas(totalAmount)}
      </Text>
    )
  }

  renderTotalBalance() {
    // const { transactions, month } = this.state
    const { month } = this.state
    // const { totalByCategoryThisYear } = this.props.expense.data
    const transactions = this.props.incomeExpenses
    const index = transactions.findIndex(
      val => val._id.month === month)
    let balance = 0

    if (index !== -1) {
      let totalIncome = transactions[index].hasOwnProperty('total_amount_income') ?
        transactions[index].total_amount_income : 0
      let totalExpenses = transactions[index].hasOwnProperty('total_amount_expense') ?
        transactions[index].total_amount_expense : 0
      balance = totalIncome - totalExpenses
    }

    return (
      <Text>
        Balance Rp {numberWithCommas(balance)}
      </Text>
    )
  }

  render() {
    const {
      footer, footerView, footerLast, badge, categoryMedia
    } = styles
    const { goBack } = this.props.navigation;
    return (
      <FadeInView style={{width: '100%', height: '100%'}}>
        <Container style={{backgroundColor: '#fff'}}>
          <Header style={{backgroundColor: "#2196F3"}}>
            <Left>
              <Button
                transparent
                onPress={() => goBack()}
                >
                  <IconN name='ios-arrow-back-outline' />
              </Button>
            </Left>
            <Body>
              <Title>
                Transactions
              </Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this.setState({modalVisible: true})
                }}
                >
                <Icon name="filter-variant" size={25} color="#fff" />
              </Button>
            </Right>
          </Header>

          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({modalVisible: false})}
            >

            <TouchableWithoutFeedback
              onPress={() => this.setState({modalVisible: false})}
              >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  height: '100%'
                }}
                onPress={() => this.setState({modalVisible: false})}>

                <TouchableWithoutFeedback>
                  <View
                    style={{
                      width: '85%',
                      backgroundColor: 'white',
                      borderRadius: 2,
                      elevation: 10,
                      display: 'flex',
                      padding: 15,
                      paddingTop: 0,
                    }}>

                      <View
                        style={{
                          height: 80,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}>

                          <TouchableWithoutFeedback
                            onPress={() => {
                              this.setState({
                                year: this.state.year-1
                              })
                            }}>
                              <Icon name='chevron-left' size={30} style={{color:"#2196F3"}} />
                          </TouchableWithoutFeedback>
                          <Text
                            style={{
                              fontSize: 20,
                            }}>
                            {this.state.year}
                          </Text>
                          <TouchableWithoutFeedback
                            onPress={() => {
                              this.setState({
                                year: this.state.year+1
                              })
                            }}>
                              <Icon name='chevron-right' size={30} style={{color:"#2196F3"}} />
                          </TouchableWithoutFeedback>
                      </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      {Array(12).fill().map((n, index) => (
                        <TouchableWithoutFeedback
                          key={index}
                          onPress={() => {
                            this.setState({
                              month: index+1,
                              modalVisible: false,
                            })
                          }}>
                          <View
                            style={{
                              width: '46%',
                              height: 45,
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: 5,
                              borderWidth: 1,
                              borderColor: '#eee',
                              borderRadius: 4,
                              elevation: 2,
                              backgroundColor: '#2196F3'
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#fff',
                              }}>
                              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agt', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      ))}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>

          </Modal>

          <View
            style={{
              height: 50,
              backgroundColor: '#eee',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              elevation: 3,
            }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({child: 0})

                }}
                >
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        color: this.state.child === 0 ? '#3F51B5' : '#666'
                      }}>
                      Recent
                    </Text>
                  </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({child: 1})

                }}
                >
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        color: this.state.child === 1 ? '#3F51B5' : '#666'
                      }}>
                      Categories
                    </Text>
                  </View>
              </TouchableWithoutFeedback>

          </View>

          <Content style={{padding: 5, marginBottom: 0}}>
            {this.renderContent()}
          </Content>

          <Footer
            style={footer}>
            <FooterTab style={{backgroundColor: '#fff'}}>
              <View style={footerView}>
                <Icon name="cash-multiple" size={20} color="green" style={{marginLeft: 10}} />
                  {this.renderTotalIncome()}
              </View>
              <View style={footerView}>
                <Icon name="cash-multiple" size={20} color="red" style={{marginLeft: 10}} />
                  {this.renderTotalExpenses()}
              </View>
            </FooterTab>
          </Footer>

          <Footer style={footer}>
            {this.renderTotalBalance()}
          </Footer>

        </Container>
      </FadeInView>
    )
  }
}

const styles = {
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 15,
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
    backgroundColor: 'grey',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryMedia: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    padding: 5,
    paddingLeft: 0,
  }
}

const mapStateToProps = state => ({
  expense: state.expense,
  income: state.income,
  incomeExpensesDetail: joinDetail(state.income, state.expense),
  incomeExpenses: joinByCategory(state.income, state.expense),
  categories: state.category.categories,
})

const mapDispatchToProps = dispatch => ({
  expenseRequestTotalByCategory: data => dispatch(expenseRequestTotalByCategory(data)),
  incomeRequestTotalByCategory: data => dispatch(incomeRequestTotalByCategory(data)),
  deleteExpenseById: data => dispatch(deleteExpenseById(data)),
  deleteIncomeById: data => dispatch(deleteIncomeById(data)),
  getRequestCategory: () => dispatch(getRequestCategory()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
// export default Transactions
