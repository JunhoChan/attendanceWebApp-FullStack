import React, { Component } from 'react'
import { Layout, Tooltip, Icon, Popover, Spin, Badge } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'

const { Header } = Layout 
export default class HeaderBox extends Component {
	
	render() {
		return (
			<Header className="header">
				<Tooltip
                    placement="bottom"
                    title="收起菜单">
                    <Icon
                        className="trigger flex-none fold"
                        type={'menu-unfold'}
                    />
                </Tooltip>
                <div className="rightBox flex-auto flex-row flex-je flex-ac">
                	<Tooltip
                        placement="bottom"
                        title="全屏">
                        <div className="full">
                            <Icon
                                className="icon flex-none"
                                type="arrows-alt"
                            />
                        </div>
                    </Tooltip>
                    <Popover
                        placement="bottomRight"
                        popupClassName="headerPopover"
                        arrowPointAtCenter={true}
                        content={
                            <Spin spinning={true} delay={0}>
                            	暂未更新
                            </Spin>
                        }
                        trigger="click"
                    >
                        <Tooltip
                            placement="bottom"
                            title={`8条新信息`}>
                                <div className="full">
                                    <Badge count="8" offset={[-2,10]} >
                                        <Icon
                                            className="icon flex-none"
                                            type='bell'
                                        />
                                    </Badge>
                                </div>
                        </Tooltip>
                    </Popover>
                    {
                     	( 
                     		<Tooltip
                                placement="bottom"
                                title="点击登录">
                                <div className="full">
                                    <Link to="/login">未登录</Link>
                                </div>
                            </Tooltip> )	
                    }
                </div>
			</Header>
		)
	}
}