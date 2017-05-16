import React from 'react';
import {
  View,
  Text,
  Picker,
  AppState,
  Platform,
  StatusBar,
} from 'react-native';
import {
  Icon,
  Button
} from 'native-base';
import { connect } from 'react-redux';
import { getNotifRequest } from '../actions';

import PushController from './PushController';

class Notification extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getNotifications()
  }

  render() {
    const { notifications } = this.props
    return (
      <View>
        {
          notifications.map(notif => <Text>{notif}</Text>)
        }
      </View>
    );
  }
}


const styles = {

}

const mapStateToProps = state => {
  notifications: state.notification
}

const mapDispatchToProps = dispatch => {
  getNotifications: () => dispatch(getNotifRequest())
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
