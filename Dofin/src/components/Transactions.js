import React from 'react'
import { connect } from 'react-redux'
import {
  expenseRequestTotalByCategory, assignExpenseType
} from '../actions/expenseAction'

import {
  Button, Container, Content, Header, View,
  Left, Right, Body, Title, Text, Footer, FooterTab,
  Badge, Picker, Item, Input,
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FadeInView from './FadeInView'
import {
  Animated, Easing, Alert, Modal, TouchableWithoutFeedback
} from 'react-native';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',00'
}

class Transactions extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      month: new Date().getMonth()+6,
      year: new Date().getFullYear(),
      modalVisible: false,
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
    // const { transactions, month } = this.state
    // const index = transactions.findIndex(
    //   val => val._id.month === month)
    // const anims = transactions[index].categories.map(() => {
    //   return {
    //     left: new Animated.Value(100),
    //     opacity: new Animated.Value(0),
    //   }
    // })
    // this.setState({
    //   anims
    // })
  }

  componentDidMount() {
    // Animated.stagger(200,
    //   this.state.anims.map(anim => {
    //     return Animated.parallel([
    //       Animated.timing(
    //           anim.left, {toValue: 0, duration: 500}
    //         ),
    //       Animated.timing(
    //           anim.opacity, {toValue: 1, duration: 500,
    //             easing: Easing.inOut(Easing.quad)}
    //         )
    //     ])
    //   })
    // ).start()
  }

  componentDidUpdate() {
    // if (this.props.expense.data.totalByCategoryThisYear.length &&
    //   this.state.first) {
    //   this.setState({first: false}, () => {
    //     // const { transactions, month } = this.state
    //     const { month } = this.state
    //     const { totalByCategoryThisYear } = this.props.expense.data
    //     const transactions = assignExpenseType(totalByCategoryThisYear)
    //     const index = transactions.findIndex(
    //       val => val._id.month === month)
    //     const anims = transactions[index].categories.map(() => {
    //       return {
    //         left: new Animated.Value(100),
    //         opacity: new Animated.Value(0),
    //       }
    //     })
    //     this.setState({
    //       anims
    //     })
    //   })
    // }
  }

  onValueChange(value) {
    // Animated.parallel(
    //   this.state.anims.map(anim => {
    //     return Animated.parallel([
    //       Animated.timing(
    //           anim.left, {toValue: -100, duration: 200}
    //         ),
    //       Animated.timing(
    //           anim.opacity, {toValue: 0, duration: 200}
    //         )
    //     ])
    //   })
    // ).start()

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
        // Animated.stagger(200,
        //   this.state.anims.map(anim => {
        //     return Animated.parallel([
        //       Animated.timing(
        //           anim.left, {toValue: 0, duration: 500}
        //         ),
        //       Animated.timing(
        //           anim.opacity, {toValue: 1, duration: 500,
        //             easing: Easing.inOut(Easing.quad),}
        //         )
        //     ])
        //   })
        // ).start()
      })
    // }, 200)

  }

  renderBadge(category) {
    const { badge } = styles
    const { categories } = this.state
    const index = categories.findIndex(
      val => val.category === category)
    const categorySet = index === -1 ?
      {color: 'grey', icon: 'dots-horizontal'} : categories[index]
    return (
      <View style={{padding: 5}}>
        <View style={{...badge, backgroundColor: categorySet.color}}>
          <Icon name={categorySet.icon} size={15} color={'#fff'} />
        </View>
      </View>
    )
  }

  renderContent() {
    const { categoryMedia } = styles
    // const { transactions, month } = this.state
    const { month } = this.state
    const { totalByCategoryThisYear } = this.props.expense.data
    const transactions = assignExpenseType(totalByCategoryThisYear)
    const index = transactions.findIndex(
      val => val._id.month === month)
    const categories = index === -1 ? [] : transactions[index].categories

    // return categories.map((category, index) => (
    //   <Animated.View
    //     style={{
    //       left: this.state.anims[index].left,
    //       opacity: this.state.anims[index].opacity,
    //     }}
    //     key={index}
    //     >
    //     <View style={categoryMedia}>
    //       {this.renderBadge(category.category)}
    //       <View style={{paddingLeft: 5}}>
    //         <Text>{category.category}</Text>
    //         <Text>Rp {numberWithCommas(category.total_amount)}</Text>
    //       </View>
    //     </View>
    //   </Animated.View>
    // ))

      return categories.map((category, index) => (
        <View style={categoryMedia} key={index}>
          {this.renderBadge(category.category)}
          <View style={{paddingLeft: 5}}>
            <Text>{category.category}</Text>
            <Text>Rp {numberWithCommas(category.total_amount)}</Text>
          </View>
        </View>
      ))

  }

  renderTotalIncome() {
    // const { transactions, month } = this.state
    // const index = transactions.findIndex(
    //   val => val._id.month === month)
    // const totalAmount = index === -1 ? 0 : transactions[index].total_amount_income
    return (
      <Text style={{marginRight: 10}}>
        Rp {numberWithCommas(0)}
      </Text>
    )
  }

  renderTotalExpenses() {
    // const { transactions, month } = this.state
    const { month } = this.state
    const { totalByCategoryThisYear } = this.props.expense.data
    const transactions = assignExpenseType(totalByCategoryThisYear)
    const index = transactions.findIndex(
      val => val._id.month === month)
    const totalAmount = index === -1 ? 0 : transactions[index].total_amount_expense
    return (
      <Text style={{marginRight: 10}}>
        Rp -{numberWithCommas(totalAmount)}
      </Text>
    )
  }

  renderTotalBalance() {
    // const { transactions, month } = this.state
    const { month } = this.state
    const { totalByCategoryThisYear } = this.props.expense.data
    const transactions = assignExpenseType(totalByCategoryThisYear)
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

                  <Icon name="chevron-left" size={25} color="#fff" />
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
                              <Icon name='chevron-left' size={30} style={{color:"#2979FF"}} />
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
                              <Icon name='chevron-right' size={30} style={{color:"#2979FF"}} />
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
                              backgroundColor: '#2979FF'
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
              elevation: 4,
            }}>
            <Text
              onPress={() => {
                this.setState({child: 0})
              }}
              style={{
                color: this.state.child === 0 ? '#3F51B5' : '#666'
              }}>
              Recent
            </Text>
            <Text
              onPress={() => {
                this.setState({child: 1})
              }}
              style={{
                color: this.state.child === 1 ? '#3F51B5' : '#666'
              }}>
              Categories
            </Text>
            <Text
              onPress={() => {
                this.setState({child: 2})
              }}
              style={{
                color: this.state.child === 2 ? '#3F51B5' : '#666'
              }}>
              Detail
            </Text>

          </View>

          <Content>
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
    margin: 10,
    marginLeft: 5,
    marginBottom: 0,
    padding: 5,
  }
}

const mapStateToProps = state => ({
  expense: state.expense,
  income: state.income,
})

const mapDispatchToProps = dispatch => ({
  expenseRequestTotalByCategory: data => dispatch(expenseRequestTotalByCategory(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
// export default Transactions
