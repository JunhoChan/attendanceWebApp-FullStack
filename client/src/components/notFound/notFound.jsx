
import React,{Component} from 'react'
import {Button} from 'antd-mobile'

export default class Profile extends Component {
	render () {
		return (
			<div>
				<h2>抱歉，找不到该页面!</h2>
				<Button type="primary"
					onClick={() => this.props.history.replace("/index")}>返回首页</Button>
			</div>
		)
	}

}