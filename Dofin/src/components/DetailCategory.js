import React, {Component} from 'react';
import {
  Text, View, Container, Header, Left, Button, Body,
  Title, Right, Content, Icon, ActionSheet, ListItem, Card,
  Spinner
} from 'native-base';
import {
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {getRequestCategory, deleteRequestCategory} from '../actions';
import IconCustom from 'react-native-vector-icons/MaterialCommunityIcons';

function sortByCategory(a, b) {
  if (a.category.toLowerCase() < b.category.toLowerCase()) {
    return -1;
  }
  if (a.category.toLowerCase() > b.category.toLowerCase()) {
    return 1;
  }
  return 0;
}

class DetailDreams extends Component {
  constructor(props){
    super(props)
    this.state={
      actions:"",
      show: false
    }

  }
  static navigationOptions = {
    header: null
  }
  componentDidMount(){
    this.props.getRequestCategory()
  }

  actions(actions, data) {
    let _id = this.props.getCategory.category._id
    let dataToDelete = {
      id: _id,
      category: data.category
    }
    // if (actions === "Detail") {
    //   this.props.navigation.navigate("SingleCategory", {data: data})
    // }else
    if (actions === "Edit") {
      this.props.navigation.navigate("EditCategory", {data: data, user_id: this.props.getCategory.category._id})
    }else if (actions === "Delete") {
      Alert.alert(
        'Are you sure?',
        '',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => {
            this.props.deleteRequestCategory(dataToDelete)
            // this.props.navigation.navigate("DetailCategory")
          }},
        ]
      )
    }
    this.setState({ actions: actions });
  }

  renderBadge(category) {
    const badge = {
      width: 34,
      height: 34,
      backgroundColor: 'grey',
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
    }
    return (
      <View style={{padding: 5}}>
        <View style={{...badge, backgroundColor: category.color}}>
          <IconCustom name={category.icon} size={20} color={'#fff'} />
        </View>
      </View>
    )
  }

  renderList() {
    const { category } = this.props.getCategory
    const BUTTONS = ["Edit", "Delete"];
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;

    if (category.categories !== undefined) {
      return category.categories.sort(sortByCategory).map((cat) => {
        return (
          <Card key={cat._id}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                }}
                >
                  {this.renderBadge({
                    icon: cat.icon,
                    color: cat.color,
                  })}
                  <View style={{paddingLeft: 5, justifyContent: 'center'}}>
                    <Text>{cat.category}</Text>
                  </View>
              </View>
              <View style={{justifyContent: 'center', marginRight: 15}}>
                <Icon
                  name="ios-apps"
                  style={{fontSize: 20, color: '#ccc'}}
                  onPress={()=> ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      destructiveButtonIndex: DESTRUCTIVE_INDEX,
                      title: 'Actions'
                    },
                    (buttonIndex) => {
                      this.actions(actions=BUTTONS[buttonIndex], data=cat)
                    }
                  )}/>
              </View>
            </View>
          </Card>
        )
      })
    } else {
      return (<Spinner color='#68A57B' />)
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header style={{backgroundColor: "#2196F3"}}>
          <Left>
            <Button transparent
              style={{width: 30, justifyContent: 'center'}}
              onPress={() => this.props.navigation.navigate("MainScreen")}
              >
                <Icon name='ios-arrow-back-outline' />
            </Button>
          </Left>
          <Body><Title>List Category</Title></Body>
          <Right>
            <Button transparent
              style={{marginTop: 5}}
              onPress={()=>this.props.navigation.navigate("Category")}
              >
                <IconCustom name="border-color" size={25} style={{color: "#FFF"}}/>
            </Button>
          </Right>
        </Header>
        <Content style={{padding: 5}}>
          {this.renderList()}
        </Content>
      </Container>
    )
  }
}

const mapsStateToProps = state => {
  return {
    getCategory: state
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    getRequestCategory   : () => dispatch(getRequestCategory()),
    deleteRequestCategory: (data) => dispatch(deleteRequestCategory(data))
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(DetailDreams)
