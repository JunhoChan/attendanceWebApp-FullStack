
import React,{Component} from 'react'
import io from 'socket.io-client'
import './index.css'

const socket = io('ws://localhost:8088')
export default class Message extends Component {
 	// message type

 	constructor(props) {
 		super(props)
 		this.state = {
 			msgDatasList: [],
 		}
 	}

 	componentDidMount() {
 		const that = this
 		const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))[0]
 		socket.emit('bindUserId',userInfo)
 		socket.on('receiveMessage',function(data){
 			that.addElementLi(data)
	    })
 	}

	// 添加dom
	addElementLi(msg) {
		let oUl = this.refs.oUl,
			oLi = document.createElement("li"),
			oAvator = document.createElement("span"), 
			oMessage = document.createElement("span")
		oLi.setAttribute("class","flex-start")
		oMessage.innerHTML = msg      // set response will be showed as text
		oAvator.innerHTML = '系统'
		oAvator.setAttribute("class","photo systemMessage")  // set className named as avator
        oMessage.setAttribute("class","message") //  message style
		oLi.appendChild(oAvator)
		oLi.appendChild(oMessage)
		oUl.appendChild(oLi)	
	}


 	// 发送消息
 	sendMessage() {
 		const myMessage = this.refs.myMessage.value
 		console.log(myMessage)
 		this.refs.myMessage.value = ''
 	}

 	// ul事件监听
 	ulClicked(e) {
 	   let msg = e.target.innerHTML
 	   let url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI(msg) 
	   let n = new Audio(url)
	   n.src = url;
	   n.play();
 	   e.stopPropagation()
 	}

	render () {
		return (
			<div style={{width:'100vw',height:'85vh',overflowX:'hidden',overflowY:'scroll'}}>
	    	    <div className="messageWrapper">
	    	    	<ul ref="oUl" onClick={this.ulClicked}>
	    	    	</ul>
	    	    </div>
			</div>
		)
	}

}
