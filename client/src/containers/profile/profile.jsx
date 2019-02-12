
import React,{Component} from 'react'
import { Button, Toast } from 'antd-mobile'
// import {connect} from 'react-redux'

export default class Profile extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	userExitLogin() {
		sessionStorage.removeItem('userInfo')
		Toast.success('退出成功', 1);
		this.props.history.replace('/login')
	}	

	render () {
		return (
			<div style={{width:'100vw', height:'100%', marginTop:'40vh' }}>
				<Button type="primary" onClick={this.userExitLogin.bind(this)}>注销</Button>
			</div>
		)
	}

}
