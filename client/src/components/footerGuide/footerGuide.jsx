import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class footerGuide extends Component {
	
	static propTypes = {
		navList: PropTypes.array.isRequired  // 检验格式是否正确
	}	


	render () {
		let {navList} = this.props
		const path = this.props.location.pathname
				// 过滤不需要的导航的页面
		navList = navList.filter(nav => nav.show )

		return (
			<div style={{position: 'fixed', height: '100%', width: '100%', bottom: '0'
				, zIndex: '-1' }}>
				<TabBar>
					{
						navList.map((nav) => (
				            <Item key={nav.path}
				                  title={nav.text}
				                  icon={{uri: require(`./images/${nav.icon}.png`)}}
				                  selectedIcon={{uri: require(`./images/${nav.icon}@selected.png`)}}
				                  selected={path===nav.path}
				                  onPress={() => this.props.history.replace(nav.path)}/>
				          ))
					}
				</TabBar>
			</div>	
		)
	}


}


// 向外暴露withRouter()包装产生的组件
// 内部会向组件中传入一些路由组件特有的属性: history/location/math
export default withRouter(footerGuide)