import React,{Component} from 'react'
import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import Axios from './../../assets/config/axios'
import PropTypes from 'prop-types'

class Login extends Component {
	

	static propTypes = {
		form: 	 PropTypes.any,
	}

	constructor(props) {
		super(props)
		this.state = {
			loginLoading: false,  // 按钮加载
			disabledBtn:  false,  // 按钮不能按
		}
	}

	// 用户登录 userLogin
	async onLogin() {
		const { form } = this.props
		const that = this
		// const that = this
		form.validateFields([
			'username',
			'password'
		],(err,values)=> {
			if( !values.username || !values.password ) {
					Toast.fail('账号和密码不能为空!')
					return false;
			}
			this.setState({ loginLoading: true, disabledBtn:true })
			const params = values
			Axios.post('userLogin',params).then((res) => {
				if(res.data.data) {
					Toast.success(res.data.msg)
					window.sessionStorage.setItem('userInfo',JSON.stringify(res.data.data))
					that.setState({ loginLoading: false, disabledBtn: false  })
					that.props.history.replace('/index')
				} else {
					Toast.fail(res.data.msg)
					that.setState({ loginLoading: false, disabledBtn: false  })
				}
			}).catch((err) => {
				Toast.fail('服务器问题!')
				that.setState({ loginLoading: false, disabledBtn: false  })
			})
		})
	}

	render () {
	 	 const { getFieldProps } = this.props.form
		  return (
			  <div>
			  	<List renderHeader={() => '用户登录'} style={{marginTop:'20vh'}}>
		          <InputItem
		            {...getFieldProps('username')}
		            placeholder="用户名"
		          >
		            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
		          </InputItem>	
		          <InputItem
		            {...getFieldProps('password')}
		            type="password"
		            maxLength="12"
		            placeholder="密码"
		          >
		            <div style={{ backgroundImage: 'url(http://img5.imgtn.bdimg.com/it/u=1869715222,3512888351&fm=26&gp=0.jpg)', backgroundSize: 'cover', height: '18px', width: '18px' }} />
		          </InputItem>		                    
		        </List>
		        <WhiteSpace size='md' />
		        <Button type="primary" loading={this.state.loginLoading} onClick={this.onLogin.bind(this)} 
		        	disabled={this.state.disabledBtn}>登录</Button>
		  	  </div>
		  )
	  }
}

const LoginWrapper = createForm()(Login);
export default LoginWrapper