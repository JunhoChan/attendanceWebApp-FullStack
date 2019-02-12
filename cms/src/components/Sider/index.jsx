import React, { Component } from 'react'
import { Layout, Icon, Menu } from 'antd'
import { Link } from 'react-router-dom'
import ImgLogo from './../../assets/logo.png'

import './index.scss'


const { Sider } = Layout
const { SubMenu, Item } = Menu
export default class SiderBox extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			chosedKey  : [],
			openKeys   : []
		}
	}

	 /** 菜单展开和关闭时触发 **/
    onOpenChange(keys) {
        this.setState({
            openKeys: keys,
        })
    }

	render() {
		return (
            <Sider
                width={256}
                className="sider"
                trigger={null}
                collapsible
                collapsed={false}
            >
                <div className="menuLogo" >
                	<Link to="/">
                        <img src={ImgLogo} alt="Logo" />
                        <div>React-Admin</div>
                    </Link>    
                </div>

                 <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    defaultSelectedKeys={['1']}
                    selectedKeys={this.state.chosedKey}
                    onOpenChange={(e) => this.onOpenChange(e)}
                >
    				<Item key="home">
					    <Link to={'/'}>
					        <Icon type="home" />
					        <span>首页</span>
					    </Link>
					</Item>
					<SubMenu key="sub1" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
						<Item key='1'><Link to={'/useradmin'}>用户管理</Link></Item>
						<Item key='2'><Link to={'/workAdmin'}>任务管理</Link></Item>
						<Item key='3'><Link to={'/attendAdmin'}>考勤管理</Link></Item>
						<Item key='4'><Link to={'/achieveAmin'}>绩效管理</Link></Item>
						<Item key='5'><Link to={'/notifyAdmin'}>消息通知管理</Link></Item>
						<Item key='6'><Link to={'/statAdmin'}>统计分析管理</Link></Item>
					</SubMenu>
                </Menu>               
            </Sider>
		)
	}
}