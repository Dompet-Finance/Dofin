import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Icon,
  View,
  Left,
  Button,
  Body,
  Title,
  Right,
  ActionSheet,
  Form,
  Item,
  Label,
  Input
} from 'native-base';

class FormIncome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_income: ''
    }
  }
  static navigationOptions = {
    header: null
  }
  render(){
    const { goBack } = this.props.navigation;
    const BUTTONS = [
      'Invesment',
      'Salary',
      'Cancel',
    ];
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;
    return (
      <Container>
          <Header>
            <Left>
              <Button transparent
                onPress={() => goBack()}
              >
                  <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Income</Title>
            </Body>
            <Right>
              <Button transparent>
              </Button>
            </Right>
          </Header>
          <Content style={{display: 'flex'}}>
            <Form>
              <Item inlineLabel>
                <Label>Nominal</Label>
                <Input />
              </Item>
              <Item inlineLabel last>
                <Label onPress={()=> ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: 'Testing ActionSheet'
                  },
                  (buttonIndex) => {
                    this.setState({ category_income: BUTTONS[buttonIndex] });
                  }
                  )}>Cat Income</Label>
                <Input
                  placeholder=''
                    value={this.state.category_income}
                />
              </Item>
            </Form>
            <Button primary style={{alignItems: 'center'}}><Text> Save </Text></Button>
          </Content>
      </Container>
    )
  }
}

export default FormIncome
