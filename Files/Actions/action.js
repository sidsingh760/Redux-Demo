
import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
} from 'react-native';



const changeTitleOfLable = (updatedName) => {
    return dispatch =>
    {
        dispatch({type: 'CHANGE_STATE', payload: updatedName})
    }
}

export default changeTitleOfLable;



