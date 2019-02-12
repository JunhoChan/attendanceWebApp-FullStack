/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import {combineReducers} from 'redux'

const initState = {
	userInfo: null, // 当前用户信息
	msg:''        ,  // 显示错误消息
}

function user (state=initState, action) {
  	return {...state}
}


export default combineReducers({
	user
})
