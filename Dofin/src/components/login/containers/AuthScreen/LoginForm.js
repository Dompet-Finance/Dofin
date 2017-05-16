import React, { Component, PropTypes } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'
import FBSDK, { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {signInRequest} from '../../../../actions'

const USER_PROFILES = "user_profiles";


import {
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base';

class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      fullName: '',
      token: ""
    }
  }

  static navigationOptions = {
    header: null
  }

  _localSignInAndSetStorage(){
    this.props.signInRequest(this.state)
  }

  componentDidMount() {

  }

  _fbAuth() {
    let self = this
    LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            let accessToken = data.accessToken
            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error)
              } else {
                AsyncStorage.setItem(USER_PROFILES, JSON.stringify(result));
              }
            }

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email, name, picture.type(large)'
                  }
                }
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start()
          }
        )
      }
    }, function (error) {
      console.log('An error has occured: ' + error);
    })
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  render () {
    if (this.props.getUser !== 0) {
      let data = {
        email: this.props.getUser.email,
        name: this.props.getUser.name,
        picture: {
          data: {
            url: "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png"
          }
        }
      }
        AsyncStorage.setItem(USER_PROFILES, JSON.stringify(data));
        this.props.navigate.navigate("MainScreen")
    }
    AsyncStorage.getItem(USER_PROFILES).then((value) => {
      if (value !== null) {
        this.props.navigate.navigate("MainScreen")
      }else {
        return false
      }
    }).done();
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onLoginPress } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'email'}
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => this._localSignInAndSetStorage()}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Sign In'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            onPress={onSignupLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Not registered yet?'}
          </Text>
        </View>
        <Footer>
          <FooterTab>
              <Button full onPress={() => this._fbAuth()}>
                <Text style={{fontSize: 15, color: "#FFF", marginBottom: 5}}>SIGN IN WITH FACEBOOK</Text>
                <Icon name="logo-facebook" style={{fontSize: 25, color: "#FFF"}}/>
              </Button>
          </FooterTab>
        </Footer>
      </View>
    )
  }
}

const styles = {
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    signInRequest: data => dispatch(signInRequest(data))
  }
}

const mapsStateToProps = state => {
  return {
    getUser: state.user
  }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(LoginForm)
