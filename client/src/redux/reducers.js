/*
包含n个reducer函数的模块
reducer函数: 根据老的state和指定的action 生产新的state
 */
import {combineReducers} from 'redux'

function xxx(state=0,action) {
	return state;
}

function yyy(state=0,action) {
	return state;
}

export default combineReducers ({
	xxx,
	yyy
})
// 向外暴露接口的结构