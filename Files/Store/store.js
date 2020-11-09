
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import allReducers from '../Reducers/index'

const store = createStore(
    allReducers,
    {},
    applyMiddleware(thunk)
)

export default store
