/* eslint-disable no-unused-vars,no-trailing-spaces */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TextInput, Alert, Dimensions, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator, TouchableOpacity }
  from 'react-native'
import CustomNav
  from '../../Containers/Common/CustomNav'
import { reduxForm, Field, change }
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {COMMON_ENTITIES, DEVICE_LOGICAL_RESOLUTION}
  from '../../Utility/Mapper/Common'
import { KeyboardAwareScrollView }
  from 'react-native-keyboard-aware-scroll-view'
import GravityCapsule
  from '../Utility/GravityCapsule'
import Fonts
  from '../../Themes/Fonts'
import LWTextInput
  from '../Utility/LWFormInput'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
import {validateEmail, validatePassword, validatePasswordSchema}
  from '../../Utility/Transforms/Validator'
import _
  from 'lodash'
import Colors from '../../Themes/Colors'
import { localActions } from '../../Containers/Common/Auth'
// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.AUTH,
  destroyOnUnmount: false
})

// ========================================================
// Core Component
// ========================================================

class Auth extends Component {

  // --------------------------------------------------------
  // Lifecycle methods

  constructor (props) {
    super(props)
    this.state = {
      showPassword: false,
      _emailError: false,
      _passwordError: false,
      passwordSchema: undefined
    }
    const {height, width} = Dimensions.get('window')
    const isIPhoneX = height === DEVICE_LOGICAL_RESOLUTION.IPHONE_DEVICE_X.height && width === DEVICE_LOGICAL_RESOLUTION.IPHONE_DEVICE_X.width
    this.isX = isIPhoneX
  }

  // --------------------------------------------------------
  // Action handlers
  componentWillMount () {
    // this.props.initialize()
  }

  componentWillUnmount () {
    // this.props.destroy()
  }

  togglePasswordVisibility () {
    this.setState(prevstate => {
      return {showPassword: !prevstate.showPassword}
    })
  }

  hideError () {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: localActions.HIDE_ERROR})
  }

  markError (inputType, error) {
    switch (inputType) {
      case AUTH_ENTITIES.EMAIL:
        this.setState({_emailError: error})
        break
      case AUTH_ENTITIES.PASSWORD:
        this.setState({_passwordError: error})
        break
      default:
        this.setState({
          _emailError: false,
          _passwordError: false
        })
    }
  }

  markPasswordSchema (val) {
    let schema = validatePasswordSchema(val)
    this.setState({passwordSchema: schema})
  }

  validate (type, val) {
    switch (type) {
      case AUTH_ENTITIES.EMAIL:
        if (validateEmail(val)) {
          this.markError(AUTH_ENTITIES.EMAIL, true)
          return 'Correct Email Needed'
        } else {
          this.markError(AUTH_ENTITIES.EMAIL, false)
          return undefined
        }
      case AUTH_ENTITIES.PASSWORD:
        this.markPasswordSchema(val)
        if (validatePassword(val)) {
          this.markError(AUTH_ENTITIES.PASSWORD, true)
          return 'MIN 6 Char pass needed'
        } else {
          this.markError(AUTH_ENTITIES.PASSWORD, false)
          return undefined
        }
    }
  }

  navigateToNext (data) {
    const {localActions, handleLocalAction, handleSubmit, navigator, isProcessing, type} = this.props
    if (/\s/.test(data[AUTH_ENTITIES.PASSWORD])) {
      Alert.alert('Signup Error', 'Password did not confirm with policy: \nPassword must not contain space')
      return
    }
    handleLocalAction({
      type: localActions.SIGNUP,
      [AUTH_ENTITIES.EMAIL]: this.props[AUTH_ENTITIES.EMAIL],
      [AUTH_ENTITIES.PASSWORD]: data[AUTH_ENTITIES.PASSWORD],
      [COMMON_ENTITIES.NAVIGATOR]: navigator
    })
  }

  resetEmail () {
    const {localActions, handleLocalAction, navigator} = this.props
    handleLocalAction({
      type: localActions.FORGOT_PASSWORD,
      [COMMON_ENTITIES.NAVIGATOR]: navigator
    })
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    return (
      <View style={styles.screen.h2.containerStyle}>
        <Text style={{ ...styles.text.mainHeader, alignSelf: 'center', marginBottom: 20 }}>
          Let’s create a password.
        </Text>
        <Text style={{ ...styles.text.header, alignSelf: 'center', fontWeight: 'normal' }}>
          {'Your password helps protect you and\nyour family’s information.'}
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    const {handleSubmit, type} = this.props
    return (
      <View>
        <Text
          style={{ ...styles.text.information, alignSelf: 'flex-end', color: Colors.fontGray }}
          onPress={() => this.togglePasswordVisibility()}>
          Show Password
        </Text>
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 20}}>
          <Field
            name={AUTH_ENTITIES.PASSWORD}
            isLabel
            label='Password'
            whiteBackground
            accessible
            accessibilityLabel={'password'}
            returnKeyType='next'
            onSubmitEditing={handleSubmit(data => this.navigateToNext(data))}
            component={LWTextInput}
            secureTextEntry={!this.state.showPassword}
            placeholderText='Password'
            validate={val => this.validate(AUTH_ENTITIES.PASSWORD, val)}
            isError={this.state._passwordError}
            extraTextStyle={{fontSize: (this.state.showPassword) ? 16 : 15}} />
        </View>
        <Text style={{ ...styles.text.title, textAlign: 'left', color: Colors.fontGray }}>
          To ensure your security we need at least ten characters.
        </Text>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit, isProcessing} = this.props
    const isX = this.isX || false
    return (
      <GravityCapsule floatValue={isX ? 20 : 10} keyboardExtraGap={27}>
        <TouchableOpacity
          disabled={isProcessing}
          style={{ ...styles.bottomNavigator.containerStyle, shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: {height: 10, width: 0}, marginHorizontal: 20 }}
          onPress={_.debounce(_.bind(handleSubmit(data => this.navigateToNext(data)), this), 500, {'leading': true, 'trailing': false})}>
          <Text style={styles.bottomNavigator.textStyle}>Continue</Text>
        </TouchableOpacity>
      </GravityCapsule>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    const {errorObj, isProcessing, type, navigator} = this.props
    let email = this.props[AUTH_ENTITIES.EMAIL]
    // if (errorObj) {
    //   Alert.alert(errorObj.code,
    //     errorObj.message,
    //     [
    //       {text: 'OK', onPress: () => this.hideError()}
    //     ],
    //     { cancelable: false }
    //   )
    // }
    //
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
        <CustomNav navigator={navigator} leftButtonPresent leftFoo={change(FORM_TYPES.AUTH, AUTH_ENTITIES.EMAIL, email)} title={'Sign Up'} titlePresent />
        <ProcessingIndicator isProcessing={isProcessing} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.screen.containers.root}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extraScrollHeight={100}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode='interactive'
          keyboardShouldPersistTaps='handled'
        >
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {this.renderHeading()}
            {this.renderFormContainer()}
          </View>
        </KeyboardAwareScrollView>
        {this.renderNextButton()}
      </View>
    )
  }

}

Auth.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-native-navigation
  navigator: PropTypes.object.isRequired,

  isProcessing: PropTypes.bool.isRequired,

  // type of authentication 'Login' or 'SignUp'
  type: PropTypes.string.isRequired,

  // heading as per signup/login
  heading: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(Auth))

export default Screen
