
import React,{Component} from 'react'
import { NavBar, Icon, Tabs, WhiteSpace, Badge, Card, WingBlank, Button, Toast } from 'antd-mobile'
import Axios from './../../assets/config/axios'
import './index.css'
const tabs = [
  { title: <Badge>待完成工作</Badge> },
  { title: <Badge>已完成工作</Badge> },
]

export default class Message extends Component {
	
	
	constructor(props) {
		super(props)
		this.state = {
			dataList: [], // 存储数据
			status: 1,
			statusIns: ['','工作中','待核实','已完成'],
			userInfo:{},
		}
	}

	componentDidMount() {

		this.__initData()
	}

	async __initData() {
		const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))[0];
		await this.setState({ userInfo: this.state.userInfo })
		const params = { worker: userInfo.username, status: this.state.status }
		Axios.get('getUserAllWork',{params: params}).then((res) => {
			this.setState({ dataList: res.data })
		}).catch((err) => {
			console.log(err)
		})

	}

	// 切换工作任务
	async tabSelectedChange(index) {
		if(index === 0) {
			await this.setState({ status: 1, })
			this.__initData()
		} else {
			await this.setState({ status: 3, })
			this.__initData()
		}
	}

	// 完成任务
	handleComplishWork(workId) {
	 	const params = {id: workId, status:2}
		Axios.put('works/666', params).then((res) => {
			if(res.status === 202) {
				Toast.success(res.data.msg)
				this.__initData()
			}
		}).catch((err) => {
			Toast.fail('网络问题!')
		})
	}

	render () {
		return (
			<div>
				 <NavBar
				      mode="light"
				      icon={<Icon type="left" />}
				      onLeftClick={() =>  this.props.history.replace('/index')}
				    >任务管理</NavBar>
				<div>
					    <Tabs tabs={tabs}
					      initialPage={0}
					      onChange={(tab, index) => {this.tabSelectedChange(index)}}
					    >
					      <div style={{ height: '88vh', backgroundColor: '#fff', overflowX: 'hidden', overflowY: 'scroll', }}>
					      		{ this.state.dataList.map((item,index) => {
					      				return(
								      		<WingBlank size="lg" key={item.id}>
											    <WhiteSpace size="lg" />
												    <Card>
												      <Card.Header
												        title={item.workName}
												        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
												        extra={<Badge text={this.state.statusIns[item.status]} />}
												      />
												      <Card.Body>
												        <div>{item.workContent}</div>
												      </Card.Body>
												      <Card.Footer 
												      	content={ item.status === 1 ? <Button type="primary" size="small" style={{width:'20vw'}}
												      	 onClick={()=> this.handleComplishWork(item.id) }>完成</Button> : ''}
												      	extra={<div>{item.createTime}</div>} />
												    </Card>
												<WhiteSpace size="lg" />
											</WingBlank>
					      				)
					      		  }) 
					      		}
					      </div>
					      <div style={{ height: '88vh', backgroundColor: '#fff' }}>
					        		{ this.state.dataList.map((item,index) => {
					      				return(
								      		<WingBlank size="lg" key={item.id}>
											    <WhiteSpace size="lg" />
												    <Card>
												      <Card.Header
												        title={item.workName}
												        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
												        extra={<Badge text={this.state.statusIns[item.status]} />}
												      />
												      <Card.Body>
												        <div>{item.workContent}</div>
												      </Card.Body>
												      <Card.Footer content="" extra={<div>{item.createTime}</div>} />
												    </Card>
												<WhiteSpace size="lg" />
											</WingBlank>
					      				)
					      		  }) 
					      		}
					      </div>
					    </Tabs>
					    <WhiteSpace />
				</div>

			</div>	
		)
	}

}