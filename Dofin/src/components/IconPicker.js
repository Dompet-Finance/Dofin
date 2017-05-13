import React from 'react'
// import { connect } from 'react-redux'
// import { action } from '../action'

import {
  Button, Container, Text,
  Content, View,
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class IconPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      icons: [
        'account', 'account-multiple', 'airballoon', 'album',
        'baby-buggy', 'bank', 'beach', 'book', 'bus', 'cake-variant',
        'camera', 'car', 'cart', 'cash', 'cash-multiple', 'cat',
        'cellphone-android', 'city', 'coffee', 'content-cut', 'creation',
        'crown', 'delete', 'desktop-mac', 'diamond', 'dice-5', 'email',
        'emoticon', 'emoticon-cool', 'emoticon-sad', 'ferry', 'filmstrip',
        'fish', 'flag', 'flash', 'flask-empty', 'flower', 'food', 'food-apple',
        'food-fork-drink', 'gamepad-variant', 'gas-station', 'gift',
        'guitar-acoustic', 'heart', 'headphones', 'help', 'home-variant',
        'hotel', 'information', 'itunes', 'laptop-windows', 'lightbulb-on',
        'phone', 'printer', 'rocket', 'school', 'silverware-variant', 'soccer',
        'sofa', 'star', 'trophy', 'tshirt-crew'
      ]
    }
  }

  selectIcon(name) {
    // this.props.selectIcon(name)
    // alert(name)
  }

  render() {
    const { container, box } = styles

    return (
      <Container >
        <Content>
          <View style={container}>
            {this.state.icons.map((name, index) => (
              <Button
                transparent
                key={index}
                onPress={() => this.selectIcon(name)}
                style={box}
                >
                  <Icon name={name} size={25} color={'#777'} />
              </Button>
            ))}
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 5,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    height: 60,
    padding: 0,
    margin: 5,
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

// export default connect(mapStateToProps, mapDispatchToProps)(IconPicker)
export default IconPicker