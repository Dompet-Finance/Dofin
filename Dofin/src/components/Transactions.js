import React from 'react'
// import { connect } from 'react-redux'
// import { expenseAllRequest } from '../action'

import {
  Button, Container, Content, Header, View,
  Left, Right, Body, Title, Text, Footer, FooterTab,
  Badge, Picker, Item,
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FadeInView from './FadeInView'
import {
  Animated, Easing, Alert
} from 'react-native';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',00'
}

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      month: new Date().getMonth()+1,
      transactions: [
        {
          "_id": {
            "month": 5
          },
          "total_amount_income": 100000,
          "total_amount_expense": 33333,
          "categories": [
            {
              "category": "Food",
              "total_amount": 11111,
              "type": "expense"
            },
            {
              "category": "Clothing",
              "total_amount": 22222,
              "type": "expense"
            },
            {
              "category": "Salary",
              "total_amount": 100000,
              "type": "income"
            },
          ]
        },
        {
          "_id": {
            "month": 6
          },
          "total_amount_income": 100000,
          "total_amount_expense": 11111,
          "categories": [
            {
              "category": "Food",
              "total_amount": 11111,
              "type": "expense"
            },
            {
              "category": "Salary",
              "total_amount": 100000,
              "type": "income"
            },
          ]
        },
        {
          "_id": {
            "month": 7
          },
          "total_amount_income": 100000,
          "total_amount_expense": 99999,
          "categories": [
            {
              "category": "Food",
              "total_amount": 33333,
              "type": "expense"
            },
            {
              "category": "Food",
              "total_amount": 33333,
              "type": "expense"
            },
            {
              "category": "Food",
              "total_amount": 33333,
              "type": "expense"
            },
            {
              "category": "Salary",
              "total_amount": 100000,
              "type": "income"
            },
          ]
        }
      ],
      categories: [{
        category: 'Food',
        icon: 'silverware-variant',
        color: 'orange',
      },{
        category: 'Clothing',
        icon: 'tshirt-crew',
        color: 'green',
      },{
        category: 'Salary',
        icon: 'cash',
        color: 'teal',
      }],
      anims: []
    }
  }

  componentWillMount() {
    const { transactions, month } = this.state
    const index = transactions.findIndex(
      val => val._id.month === month)
    const anims = transactions[index].categories.map(() => {
      return {
        left: new Animated.Value(100),
        opacity: new Animated.Value(0),
      }
    })
    this.setState({
      anims
    })
  }

  componentDidMount() {
    Animated.stagger(200,
      this.state.anims.map(anim => {
        return Animated.parallel([
          Animated.timing(
              anim.left, {toValue: 0, duration: 500}
            ),
          Animated.timing(
              anim.opacity, {toValue: 1, duration: 500,
                easing: Easing.inOut(Easing.quad),}
            )
        ])
      })
    ).start()
  }

  onValueChange(value) {
    Animated.parallel(
      this.state.anims.map(anim => {
        return Animated.parallel([
          Animated.timing(
              anim.left, {toValue: -100, duration: 200}
            ),
          Animated.timing(
              anim.opacity, {toValue: 0, duration: 200}
            )
        ])
      })
    ).start()

    const { transactions, month } = this.state
    const index = transactions.findIndex(
      val => val._id.month === +value) // tricky
    const anims = index === -1 ? [] : transactions[index].categories.map(() => {
      return {
        left: new Animated.Value(100),
        opacity: new Animated.Value(0),
      }
    })

    setTimeout(() => {
      this.setState({
        month: +value,
        anims
      }, () => {
        Animated.stagger(200,
          this.state.anims.map(anim => {
            return Animated.parallel([
              Animated.timing(
                  anim.left, {toValue: 0, duration: 500}
                ),
              Animated.timing(
                  anim.opacity, {toValue: 1, duration: 500,
                    easing: Easing.inOut(Easing.quad),}
                )
            ])
          })
        ).start()
      })
    }, 200)

  }

  renderBadge(category) {
    const { badge } = styles
    const { categories } = this.state
    const index = categories.findIndex(
      val => val.category === category)
    const categorySet = categories[index]
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
    const { transactions, month } = this.state
    const index = transactions.findIndex(
      val => val._id.month === month)
    const categories = index === -1 ? [] : transactions[index].categories

    return categories.map((category, index) => (
      <Animated.View
        style={{
          left: this.state.anims[index].left,
          opacity: this.state.anims[index].opacity,
        }}
        key={index}
        >
        <View style={categoryMedia}>
          {this.renderBadge(category.category)}
          <View style={{paddingLeft: 5}}>
            <Text>{category.category}</Text>
            <Text>Rp {numberWithCommas(category.total_amount)}</Text>
          </View>
        </View>
      </Animated.View>
    ))
  }

  renderTotalIncome() {
    const { transactions, month } = this.state
    const index = transactions.findIndex(
      val => val._id.month === month)
    const totalAmount = index === -1 ? 0 : transactions[index].total_amount_income
    return (
      <Text style={{marginRight: 10}}>
        Rp {numberWithCommas(totalAmount)}
      </Text>
    )
  }

  renderTotalExpenses() {
    const { transactions, month } = this.state
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
    const { transactions, month } = this.state
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

    return (
      <FadeInView style={{width: '100%', height: '100%'}}>
        <Container>
          <Header>
            <Left>
              <Button
                transparent>
                  <Icon name="menu" size={30} color="#fff" />
              </Button>
            </Left>
            <Body>
              <Title>Transactions</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => Alert.alert(
                  'Alert Title',
                  'alertMessage',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                  ]
                )}
                >
                <Icon name="filter-variant" size={30} color="#fff" />
              </Button>
            </Right>
          </Header>

          <View style={{backgroundColor: '#3F51B5'}}>
            <Picker
              style={{color: 'white'}}
              selectedValue={this.state.month.toString()}
              onValueChange={value => this.onValueChange(value)}
              mode="dialog">
              <Item label="Januari" value="1" />
              <Item label="Februari" value="2" />
              <Item label="Maret" value="3" />
              <Item label="April" value="4" />
              <Item label="Mei" value="5" />
              <Item label="Juni" value="6" />
              <Item label="Juli" value="7" />
              <Item label="Agustus" value="8" />
              <Item label="September" value="9" />
              <Item label="Oktober" value="10" />
              <Item label="November" value="11" />
              <Item label="Desember" value="12" />
            </Picker>

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

// const mapStateToProps = state => ({
//   expenses: state.expenses,
//   income: state.income,
// })

// const mapDispatchToProps = dispatch => ({
//   expenseGet: dispatch(expenseGet()),
//   incomeGet: dispatch(incomeGet()),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
export default Transactions