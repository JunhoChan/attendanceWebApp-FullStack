import React,{Component} from 'react'
import { Grid, NoticeBar, WhiteSpace, Toast, Modal } from 'antd-mobile'
import Axios from './../../assets/config/axios'
import './index.css'
let indexData = require('./data.json')
indexData.forEach( (item) => {
			item.icon = require('./images/' + item.icon)
})

export default class Main extends Component {
	

	constructor(props) {
		super(props)
		this.state = {
			notifyMessage: '', // 通告信息
			modal2: false, // modal状态显示
			achievementStatus: ['碌碌无为','还算过得去','超过59%之人','还能更上一步','超神不解释'],
			userInfo:{},
		}
	}

	componentDidMount() {
		this.__initData()
	}


	// 签到与跳转页面
	userSignInOrChangePage(url) {
		if(url === '/signIn') {
		 	this.userSignIn()
		} else if(url === '/myScope'){
			this.setState({ modal2: true })
		}else 
		{
			this.props.history.replace(url)
		}
	}

	userSignIn(){
		const username = JSON.parse(window.sessionStorage.getItem('userInfo'))[0].username
		const params = {username: username}
		Axios.get('numberSignIn',{params:params}).then((res) => {
			if(res.status === 200) {
				Toast.info(res.data.msg)
			}
		}).catch( err => {
			Toast.fail('网络异常!')
		})
	}
	
	async __initData() {
		await this.setState({
			userInfo: JSON.parse(window.sessionStorage.getItem('userInfo'))[0]
		})
		Axios.get('getNotifyMessage').then((res) => {
			if(res.status === 200) {
				this.setState({ notifyMessage : res.data[0].notifyContent })
			}
		}).catch((err)=> {
			console.log(err)
		})
	}

	onClose() {
		this.setState({ modal2: false})
	}

	render () {
		return (
			<div className="indexContainer">
				    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
				      公告:{this.state.notifyMessage}
				    </NoticeBar>
				    <WhiteSpace size="lg" />
				<div className="indexIns"><i className="iconRedDot"></i>办公管理</div>
				<Grid data={indexData} onClick={_el => this.userSignInOrChangePage(_el.urlDetail) } />
				<Modal
			          popup
			          visible={this.state.modal2}
			          onClose={() => this.onClose()}
			          animationType="slide-up"
			          afterClose={() => {}}
			    >
			    <div style={{height:'20rem'}} className="Index-flex-center">
			    	<div style={{color:'#999',fontSize:'2rem',fontWeight:'700'}}>我的评价</div>
			    	<div>今年被评为<span style={{color:'orange'}}> {this.state.achievementStatus[this.state.userInfo.scope + this.state.userInfo.value]}</span> 之人</div>
			    </div>
			    </Modal>
			</div>
		)
	}
}