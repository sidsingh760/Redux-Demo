import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput
} from 'react-native';
import {connect} from 'react-redux'
import changeTitleOfLable from '../Files/Actions/action'

class HomeVC extends Component{

    state = {
        'inputName' : 'H.A.PATEL'
    }

    render (){
        return(
            <View style = {{flex:1,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 0}}

                    onChangeText={text => {
                        this.setState({
                            'inputName': text
                        })
                        console.log(text)
                    }
                    }
                    value={this.state.inputName}
                />


                <Text>  Hello !!! {this.props.userName}</Text>
                <Button
                    onPress={()=>this.props.changeUserName(this.state.inputName)}
                    title="Change State"
                />
            </View>
        )
    }
}


const mapStatesToComponent = (state) => {
    return({
        userName: state.rootReducer.userName
    })
}

const mapDispatchToComponent = (dispatch) => {
    return({
        changeUserName: (updatedName) => {
                dispatch(changeTitleOfLable(updatedName))
        }
    })
}
export default  connect(mapStatesToComponent,mapDispatchToComponent)(HomeVC);
