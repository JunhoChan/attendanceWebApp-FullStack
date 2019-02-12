import Index from './../Index/index'
import Message from './../message/message'
import Profile from './../profile/profile'
import MyWork from './../myWork/myWork'

const localRoute =  [
		{
	      path: '/index', // 路由路径
	      component: Index,
	      title: '主页',
	      icon: 'zhuye',
	      text: '主页',
	      show: true
	    },
		{
	      path: '/message', // 路由路径
	      component: Message,
	      title: '消息',
	      icon: 'message',
	      text: '消息',
	      show: true
	    },
		{
	      path: '/profile', // 路由路径
	      component: Profile,
	      title: '个人',
	      icon: 'profile',
	      text: '个人',
	      show: true
	    },
		{
	      path: '/myWork', // 路由路径
	      component: MyWork,
	      title: '个人',
	      show: false
	    } 
]



export default localRoute