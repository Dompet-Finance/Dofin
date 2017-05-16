import React, { Component, PropTypes } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'
import { connect } from 'react-redux';

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'

import {signUpRequest} from '../../../../actions'
const USER_PROFILES = "user_profiles";

class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
    }
  }

  onSignupPress(){
    this.props.signUpRequest(this.state)
    let data = {
      email: this.state.email,
      name: this.state.name,
      picture: {
        data: {
          url: "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png"
        }
      }
    }
    AsyncStorage.setItem(USER_PROFILES, JSON.stringify(data));
    this.props.navigate.navigate("MainScreen")
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
    const { name, email, password } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    const isValid = email !== '' && password !== '' && name !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.usernameInputRef = ref}
            placeholder={'Name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ name: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.usernameInputRef = ref}
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
              onPress={() => this.onSignupPress()}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'Create Account'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Already have an account?'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})

const mapsDispatchToProps = dispatch => {
  return {
    signUpRequest: data => dispatch(signUpRequest(data))
  }
}



export default connect(null, mapsDispatchToProps)(SignupForm)
