import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
 } from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username : '',
      password : '',
    }
  }
  pressButton() {
    return true
  }

  _fbAuth() {
    console.log(LoginManager);
    LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        console.log('Login success' + result.grantedPermissions.toString());
      }
    }, function (error) {
      console.log('An error has occured: ' + error);
    })
  }

  render() {
    return(
      <View style={styles.loginWrapper}>
        <View style={styles.logoImageWrapper}>
          <Image
            style={styles.logoImage}
            source={{uri: 'https://maxcdn.icons8.com/Share/icon/Animals//dolphin1600.png'}}
          />
          <Text style={styles.title}>DoFin</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => this._fbAuth()}>
            <Text>Facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <StatusBar
            backgroundColor='#303F9F'
            barStyle='light-content'
          />
          <View>
            <TextInput
              placeholder= 'username'
              placeholderTextColor='rgba(255, 255, 255, 0.5)'
              style={styles.input}
              underlineColorAndroid='transparent'
              returnKeyType='next'
              onSubmitEditing={() => this.password.focus()}
              onChangeText={text => this.setState({username : text})}
            />
            <TextInput
              placeholder= 'password'
              secureTextEntry
              placeholderTextColor='rgba(255, 255, 255, 0.5)'
              style={styles.input}
              underlineColorAndroid='transparent'
              ref={(input) => this.password = input}
              onChangeText={text => this.setState({password : text})}
            />
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  loginWrapper: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  logoImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 20,
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    height: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: '#1565C0',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
};
export default SignIn
