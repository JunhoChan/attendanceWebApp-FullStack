import React,{Component} from 'react'
import {WingBlank,WhiteSpace, Button,List,InputItem } from 'antd-mobile'

import './index.css'
import pswIcon from './psw.png'
export default class Register extends Component {

	// 存贮状态
	state =  {
		username: '',
		password: ''
	}

	// 处理输入发生改变的回调
	handleChange = (name, value) => {
		this.setState({
			[name]: value
		})
	}

	//	点击注册按钮
	register = () => {
		console.log(this.state)
	}

	render () {
		return (
		<div className="register">
			<List className="pt30">
				<InputItem placeholder="账号"  onChange={val=> this.handleChange('username', val)}>
					<div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
				</InputItem>
				<WhiteSpace />
				<InputItem placeholder="密码" 
							type="password"
							 onChange={val=> this.handleChange('password', val)} >
					<div style={{ backgroundImage: 'url('+ pswIcon +')', backgroundSize: 'cover', height: '22px', width: '22px' }} />
				</InputItem>    
			</List>	

			<WhiteSpace />
			<WingBlank>
					<Button type="primary" onClick={this.register}>登录</Button>
			</WingBlank>

			<div>
				<span className="fb left">忘记密码?</span>
				<span className="right">注册</span>
			</div>
		</div>
		)
	}
}