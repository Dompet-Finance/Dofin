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
  ActionSheet,
  ListItem,
  Card,
  Spinner
} from 'native-base';
import {connect} from 'react-redux';
import {getRequestCategory, deleteRequestCategory} from '../actions';

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
  actions(actions, data){
    let _id = this.props.getCategory.category._id
    let dataToDelete = {
      id: _id,
      category: data.category
    }
    if (actions === "Detail") {
      this.props.navigation.navigate("SingleCategory", {data: data})
    }else if (actions === "Edit") {
      this.props.navigation.navigate("EditCategory", {data: data, user_id: this.props.getCategory.category._id})
    }else if (actions === "Delete") {
      this.props.deleteRequestCategory(dataToDelete)
      this.props.navigation.navigate("Main")
      // let conf = confirm("Are you sure?")
      // if (conf) {
      //   this.props.deleteDreamRequest(data)
      // }else {
      //   return false;
      // }
    }
    this.setState({ actions: actions });
  }
  render(){
    const {category} = this.props.getCategory
    const { goBack } = this.props.navigation;
    const BUTTONS = ["Detail", "Edit", "Delete"];
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;
    return (
      <Container>

          <Header>
              <Left>
                <Button transparent
                  onPress={() => this.props.navigation.navigate("MainScreen")}
                >
                    <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                  <Title>List Category</Title>
              </Body>
              <Right>
                  <Button transparent>
                  </Button>
              </Right>
          </Header>
          <Content>
            {(category.categories !== undefined) ? category.categories.map((cat) => {
              return (
                <Card key={cat._id}>
                  <ListItem icon>
                    <Left>
                      <Icon name="ios-walk-outline" />
                    </Left>
                    <Body>
                       <Text>{cat.category}</Text>
                    </Body>
                    <Right>
                      <Icon name="ios-apps" onPress={()=> ActionSheet.show(
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
                    </Right>
                  </ListItem>
                </Card>
              )
            })
            : <Spinner color='#68A57B' />}

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
