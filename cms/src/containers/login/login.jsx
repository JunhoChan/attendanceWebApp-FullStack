import React , { Component } from 'react'
import CanvasBack from './../../components/CanvasBack'
import { Form, Input, Button, Icon, Checkbox } from 'antd'
import LogoImg from './../../assets/logo.png'
import tools from './../../utils/tools'
import Vcode from 'react-vcode'


import './index.scss'

const FormItem = Form.Item
class Login extends Component {
	
	constructor(props) {
		super(props)
			this.state = {
				loading: false, // 是否处于正在登录状态
				rememberPassword: false, // 是否记住密码
				codeValue: '00000', // 当前验证码的值
				show: false,  // 加载完毕时触发动画
			}
	}

	onVcodeChange(oldCode) {
		const form = this.props.form
		form.setFieldsValue({
			vcode: oldCode
		})
		this.setState({
			codeValue: oldCode,
		})
	}

	onRemember(event) {
		this.setState({
          rememberPassword: event.target.checked,
      })
	}

	onSubmit() {
		const form = this.props.form
		form.validateFields((error,values) => {
			if(error) return;
			this.setState({	loading: true })
			if( values.username === "admin" && values.password === "123456" ) {
				console.log('登录成功')
			}else {
				console.log('登录失败')
			}
		})
	}


	render() {
		const me = this
		const { getFieldDecorator  } = this.props.form
		return (
			<div className="page">
				<div className="canvasBox">
					<CanvasBack row={12} col={8} />
				</div>
				<div className="loginBox show all_trans5">
					<Form>
						<div className="title">
		                  <img src={LogoImg} alt="logo"/>
		                  <span>React-Admin</span>
			            </div>
			            <div>
			              <FormItem>
			                  {getFieldDecorator('username', {
			                      rules: [{max: 12, message: '最大长度为12位字符'}, {required: true, whitespace: true, message: '请输入用户名'}],
			                  })(
			                      <Input
			                        prefix={<Icon type="user" style={{ fontSize: 13 }} />}
			                        size="large"
			                        id="username"   // 为了获取焦点
			                        placeholder="admin/user"
			                        onPressEnter={() => this.onSubmit()}
			                      />
			                  )}
			              </FormItem>
			              <FormItem>
			                  {getFieldDecorator('password', {
			                      rules: [{ required: true, message: '请输入密码' },{max: 18, message: '最大长度18个字符'}],
			                  })(
			                      <Input
			                        prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
			                        size="large"
			                        type="password"
			                        placeholder="123456/123456"
			                        onPressEnter={() => this.onSubmit()}
			                      />
			                  )}
			              </FormItem>
						  <FormItem>
			              	{getFieldDecorator('vcode', {
			                  rules: [
			                   { validator: (rule, value, callback) => {
			                       const v = tools.trim(value);
			                       if (v) {
			                          if (v.length > 4) {
			                           callback('验证码为4位字符');
			                         } else if (v.toLowerCase() !== me.state.codeValue.toLowerCase()){
			                           callback('验证码错误');
			                         } else {
			                           callback();
			                         }
			                       } else {
			                         callback('请输入验证码');
			                       }
			                     }}
			                   ],
			                 })(
			                   <Input
			                     style={{ width:'200px' }}
			                     size="large"
			                     id="vcode"   // 为了获取焦点
			                     placeholder="请输入验证码"
			                     onPressEnter={() => this.onSubmit()}
			                   />
			                 )}
			                 <Vcode
			                   height={40}
			                   width={150}
			                   onChange={(code) => this.onVcodeChange(code)}
			                   className="vcode"
			                   options={{
			                     lines: 16,
			                   }}
			                 />
			              </FormItem>
			              <div style={{ lineHeight: '40px' }}>
			                <Checkbox className="remember" checked={this.state.rememberPassword} onChange={(e) => this.onRemember(e)}>记住密码</Checkbox>
			                <Button
			                    className="submit-btn"
			                    size="large"
			                    type="primary"
			                    loading={this.state.loading}
			                    onClick={() => this.onSubmit()}
			                >
			                    {this.state.loading ? '请稍后' : '登录'}
			                </Button>
			              </div>            
			            </div>
					</Form>
				</div>
			</div>
		)
	}
}

const LoginFormWrapper = Form.create({ name: 'user_login' })(Login);
export default LoginFormWrapper