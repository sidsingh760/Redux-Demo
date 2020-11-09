/* eslint-disable no-unused-vars,no-trailing-spaces */

// ========================================================
// Import Packages
// ========================================================
import React from 'react'
import {Alert} from 'react-native'
import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Common/Auth'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {AuthActions, isProcessing, getError} from '../../Redux/Reducers/AuthReducer'
import {SettingActions} from '../../Redux/Reducers/SettingReducer'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action
  switch (type) {
    case localActions.SIGNUP:
      dispatch(AuthActions.signup(action[AUTH_ENTITIES.EMAIL], action[AUTH_ENTITIES.PASSWORD], action[COMMON_ENTITIES.NAVIGATOR], dispatch))
      break

    case localActions.LOGIN:
      dispatch(AuthActions.login(action[AUTH_ENTITIES.EMAIL], action[AUTH_ENTITIES.PASSWORD], action[COMMON_ENTITIES.NAVIGATOR], dispatch, false))
      break

    case localActions.HIDE_ERROR:
      dispatch(AuthActions.disableError())
      break

    case localActions.FORGOT_PASSWORD:
      dispatch(SettingActions.forgotPassword(action[COMMON_ENTITIES.NAVIGATOR], dispatch))
      break
    default:
      // console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  HIDE_ERROR: 'HIDE_ERROR',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD'
}

// Todo:-
// get authentication 'type' via props via navigation stack
const mapStateToProps = (state, props) => {
  const processing = isProcessing(state.auth)
  const error = getError(state.auth)
  let type = props[AUTH_ENTITIES.AUTH_TYPE]
  let errorObj = (error && (error.error || error)) || undefined
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    isProcessing: processing,

    errorObj: errorObj,

    type: type === AUTH_ENTITIES.SIGNUP ? localActions.SIGNUP : localActions.LOGIN,

    heading: type === AUTH_ENTITIES.SIGNUP ? 'Welcome! What\'s your email?' : 'Welcome! Enter your email.'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
  }
}

// ========================================================
// Connect & Export
// ========================================================

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
