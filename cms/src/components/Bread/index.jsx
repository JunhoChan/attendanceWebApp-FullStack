import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import './index.scss'

export default class BreadBox extends Component {
	
	static propTypes = {
		location: PropTypes.any,
	}	

	constructor(props) {
		super(props)
		this.state = {
			Items: ['用户管理','任务管理','考勤管理','绩效管理','消息通知管理','统计分析管理']
		}
	}

	makeBread(location) {
		let CurrentBread = ['系统管理'], 
			{ pathname } =     location,
				breads   = []
		// 也可以存放在数组 然后indexOf 找到当前位置	
		switch(pathname) {
			case '/useradmin':
				CurrentBread.push(this.state.Items[0])
												break
			case '/workAdmin': 
				CurrentBread.push(this.state.Items[1])
												break
			case '/attendAdmin': 
				CurrentBread.push(this.state.Items[2])
												break													
			case '/achieveAmin': 
				CurrentBread.push(this.state.Items[3])
												break													
			case '/notifyAdmin': 
				CurrentBread.push(this.state.Items[4])
												break	
			case '/statAdmin': 
				CurrentBread.push(this.state.Items[5])
												break	
			default: break;							
		}

		CurrentBread.forEach((item,index) => {
				breads.push(<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>);
		})	
		return breads
	}

	render() {
		return (
			 <div className="bread">
                <Icon className="icon" type="environment-o" />
                <Breadcrumb>
                   { this.makeBread( this.props.location ) }
                </Breadcrumb>
            </div>
		)
	}
}