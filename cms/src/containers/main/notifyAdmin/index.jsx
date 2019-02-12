import React, { Component } from 'react'
import {
  List, Avatar, message, Button
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { getNotifyMessage, updateNotifyMessage } from './../../../redux/actions'
import './index.scss'

const socket = io('ws://localhost:8088')
class NotifyAdmin extends Component {
	
    static propTypes = {
      actions: PropTypes.any,
    }

	constructor(props) {
		super(props)
		this.state = {
			userDatasList:[],
			selectUserId: -1,
			chatName:'',
			notifyMsg:'', // 公告消息
		}
	}

	componentDidMount() {
		this.__initDatas()
	}


	componentWillReceiveProps() {

	}

	componentWillUnmount() {
		socket.disconnect()
	}

	__initDatas() {
		const that = this
		socket.emit('CurrentOnlineUsers')
		socket.on('getCurrentOnlineUsers',function(data){
			console.log(data)
			that.setState({
				userDatasList: JSON.parse(data),
			})
	    })
	    this.getNotifyMessage()
	}

	getNotifyMessage() {
		this.props.actions.getNotifyMessage().then((res) => {
			this.setState({  notifyMsg: res.data[0].notifyContent })
		}).catch((err) => {
			console.log(err)
		})
	}

	handleInfiniteOnLoad() {
		return;
	}

	// 选中用户去聊天
	selectUserSendMsg(id,username) {
		this.setState({
				selectUserId: id, chatName:username
		})
	}

	// 发送信息
	sendMessageBtn() {
		if( !this.refs.sendMsg.value ){  message.error('发言不能为空!');  return;}
		if(this.state.selectUserId === -1) {  message.error('请选择聊天对象!');  return;}
		const msg = this.refs.sendMsg.value
		const params = {message: msg , type: 2} // 2 系统发出的消息
		params.userId = this.state.selectUserId
		this.addElementLi(params.message)
		this.refs.sendMsg.value = ''
		socket.emit('systemSendMessage',JSON.stringify(params))
	}

	// 添加dom
	addElementLi(oMsg) {
		let oUl = this.refs.oUl,
			oLi = document.createElement("li"),
			oAvator = document.createElement("span"), 
			oMessage = document.createElement("span")
		oLi.setAttribute("class","flex-row-re")
		oMessage.innerHTML = oMsg      // set response will be showed as text
		oAvator.innerHTML = '我'
		oAvator.setAttribute("class","photo")  // set className named as avator
        oMessage.setAttribute("class","message") //  message style
		oLi.appendChild(oAvator)
		oLi.appendChild(oMessage)
		oUl.appendChild(oLi)	
	}

	// input值改变处理
	handleInputVal(e) {
		this.setState({notifyMsg: e.target.value})
	}

	// 修改公告
	changeMessage() {
		const params = {}
		const that = this
		params.notifyContent = this.state.notifyMsg
		this.props.actions.updateNotifyMessage(params).then((res) => {
			if(res.status === 202) {
				message.success('公告修改成功!')
				that.getNotifyMessage()
			}
		}).catch((err) => {
			message.error('服务器出现问题!')
		})
	}

	render() {
		return (
		<div>
			<div className="flex mb20" >
				<input type="text" onChange={(event)=> this.handleInputVal(event)} className="notifyMessage" value={this.state.notifyMsg} />
				<Button style={{marginLeft:'20px'}} type="primary" 
							onClick={() =>this.changeMessage()}>修改公告</Button>
			</div>
			<div className="flex w100">
				<div className="demo-infinite-container">
					<div>当前Online用户列表</div>
			        <InfiniteScroll
			          initialLoad={false}
			          pageStart={0}
			          loadMore={this.handleInfiniteOnLoad}
			          useWindow={false}
			        >
			          <List
			            dataSource={this.state.userDatasList}
			            renderItem={item => (
			              <List.Item key={item.id}>
			                <List.Item.Meta
			                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
			                  title={<button onClick={() => this.selectUserSendMsg(item.userId,item.username) }>{item.username}</button>}
			                />
			              </List.Item>
			            )}
			          >
			          </List>
			        </InfiniteScroll>
			    </div>
			    <div className="demo-message-container">
			    	<div style={{position:'absolute', top:'0',}}>
			    		{this.state.chatName? `当前与聊天${this.state.chatName}聊天中` : '当前无人聊天状态' }
			    	</div>
			    	<ul ref="oUl">
	    	    	</ul>
			    	<div className="sendMessage-wrapper">
			    		<input type="text" maxLength="50" ref="sendMsg" />
			    		<button onClick={() => this.sendMessageBtn()}>Send</button>
			    	</div>
			    </div>
			</div>
		</div>	
		)
	}
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    actions: bindActionCreators({  getNotifyMessage, updateNotifyMessage, } , dispatch)
  })
)(NotifyAdmin)