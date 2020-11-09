import {combineReducers} from 'redux'
import reducer from '../Reducers/reducer'


const allReducers = combineReducers({
    rootReducer: reducer
})

export default allReducers;
