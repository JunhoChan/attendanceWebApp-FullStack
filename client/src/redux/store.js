/*
redux最核心的管理对象
 */

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers' // reducers是一个reducer函数

// 向外默认暴露store对象
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))