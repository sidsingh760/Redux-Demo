import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import HomeVC from '../Files/HomeVC'
import {Provider} from 'react-redux';
import store from '../Files/Store/store'


const rootVC =()=> {
    return(
        <Provider store={store}>
            <HomeVC/>
        </Provider>
    )
}

export default rootVC;
