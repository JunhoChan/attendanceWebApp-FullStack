import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Icon, Input, Tooltip, Divider, message, Table, Form, Modal } from 'antd'
import PropTypes from 'prop-types'
// 页面中需要的actions
import { getUserList, createUser, updateUser } from './../../../redux/actions'
import tools from './../../../utils/tools'

const FormItem = Form.Item
class UserAdmin extends Component {

	static propTypes = {
		actions: PropTypes.any,
		form: 	 PropTypes.any,
	}


	constructor(props) {
		super(props)
		this.state = {
			searchUsername: '', // 搜索的用户名
			loading: false,     // 表格数据是否在加载
			pageNum: 1,         // 当前第一页
			pageSize: 5,		// 每页五组数据
			total: 0,		 	// 总记录数
			dataList:[], 		// 总数据存储
			modalShow: false, // 添加/修改/查看 模态框是否显示
			modalLoading: false, // 添加/修改/查看 是否正在请求中
			operateType: 'add',  // 操作类型 add新增，up修改, see查看
		  	nowData: null, // 当前选中用户的信息，用于查看详情、修改
		}
	}

	componentDidMount() {
		this.__initDatas()
	}

	__initDatas() {
		const params = {}
		params.pageSize = this.state.pageSize
		params.pageNum = this.state.pageNum
		this.setState({ loading: true }) // 更新状态
		this.props.actions.getUserList(params).then((res) => {
		  if(res.status === 200) {
			  	this.setState({
					dataList: res.data.data,
					total: res.data.total
				})

		  }	else {
		  		 message.error('系统故障！')
		  }
		  this.setState({ loading: false })
		})
	}

	// 点击搜索
	onSearch() {
		console.log(1)
	}

	// 模态框关闭
	onClose() {
		this.setState({
			modalShow: false,
		})
	}

	/**
     * 添加/修改/查看 模态框出现
     * @item: 当前选中的那条数据
     * @type: add添加/up修改/see查看
     * **/
     onModalShow(data, type) {
     	const { form } = this.props
     	if( type === 'add' ) {
     		form.resetFields()
     	} else {
     		form.setFieldsValue({
     			formWorkName : data.username,
                formPassword : data.password,
                formPhone	 : data.phone,		
     		})
     	}
     	this.setState({
            modalShow: true,
            operateType: type,
            nowData: data,  		
     	})
     }


	// 构建字段
	makeColumns() {
      const columns = [{
        title: '序号',
        dataIndex: 'serial',
        key: 'serial',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '登录地点',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
      },
      {
      	title: '操作',
        key: 'control',
        width: 100,
        render: (text, record) => {
        	const controls = []
        	controls.push(
        		<span key="0" className="control-btn green" onClick={() => this.onModalShow(record, 'see') }>
	                <Tooltip placement="top" title="查看">
	                    <Icon type="eye" />
	                </Tooltip>
	            </span>
        	)
        	controls.push(
        		<span key="1" className="control-btn blue" onClick={() => this.onModalShow(record, 'up') }>
                    <Tooltip placement="top" title="修改">
                        <Icon type="edit" />
                    </Tooltip>
                 </span>
        	)	

        	const results = []
        	controls.forEach((item,index) => {
        		if(index) {
        			results.push(<Divider key={`line${index}`} type="vertical" />)
        		}
        		results.push(item)
        	})
        	return results;
        }
      }]
      return columns;
	}

	// 构建table数据
	makeDatas(data) {
		return data.map((item,index) => {
			return {
				key:index,
				id:item.userId,
				serial:index + ( this.state.pageNum - 1 )  * this.state.pageSize + 1,
				username   : item.username,
				password   : item.password,
				phone      : item.phone   ,
				location   : item.location,
				createdTime: item.createdTime
 			}
		})
	}

	// 页面改变
	async onTablePageChange(Num, Size) {
		await this.setState({
			pageNum:  Num,         // 当前第一页
			pageSize: Size,		// 每页五组数据
		})
		this.__initDatas()
	}

	/** 模态框确定 **/
	onOk() {
		const { form } = this.props
		const that = this
		form.validateFields([
			'formUsername',
            'formPassword',
            'formPhone',
		],(err,values) => {
			if(err)	return false;
			that.setState({ modalLoading: true })
			// 获取表格中的值
			const params = {
				name: values.formUsername,
                psw: values.formPassword,
                phone: values.formPhone,
			}
			// 查看是修改还是新增
			if(that.state.operateType === 'add') {
				that.props.actions.createUser(params).then((res) => {
					if( res.status === 201 ) {
						message.success('新增成功');
						that.__initDatas()
						that.onClose()
					}
					that.setState({ modalLoading: false })
				}).catch((err) => {
					that.setState({ modalLoading: false })
				})
			}else {
				params.id = that.state.nowData.id
				that.props.actions.updateUser(params).then((res) => {
					if( res.status === 202 ) {
						message.success('更新成功');
						that.__initDatas()
						that.onClose()
					}
					that.setState({ modalLoading: false })
				}).catch( (err) => {
					that.setState({ modalLoading: false })
				})
			}
		

		})

	}

	render() {

		const { getFieldDecorator  } = this.props.form
		// 表格样式布局
		const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },		
		}

		return (
			<div>

			  <div className="g-search">
				  	<ul className="search-func">
	                      <li><Button type="primary" onClick={() => this.onModalShow(null, 'add') }><Icon type="plus-circle-o" />添加用户</Button></li>
	                </ul>
	                <ul className="search-ul">
	                	<li><Input placeholder="请输入用户名" onChange={(e) => console.log(e) } value={this.state.searchUsername}/></li>
	                	<li><Button icon="search" type="primary" onClick={() => this.onSearch()}>搜索</Button></li>
	                </ul>
			  </div>

			  <div className="diy-table">
					<Table
	                    columns={this.makeColumns()}
	                    loading={this.state.loading}
	                    dataSource={this.makeDatas(this.state.dataList)}
	                    pagination={{
	                        total: this.state.total,
	                        current: this.state.pageNum,
	                        pageSize: this.state.pageSize,
	                        showQuickJumper: true,
	                        showTotal: (total, range) => `共 ${total} 条数据`,
	                        onChange: (page, pageSize) => this.onTablePageChange(page, pageSize)
	                    }}
	                />			  	
			  </div>

			  {/* 新增&修改&查看 模态框 */}
              <Modal
                  title={{ add: '新增', up: '修改', see: '查看' }[this.state.operateType]}
                  visible={this.state.modalShow}
                  onOk={() => this.onOk()}
                  onCancel={() => this.onClose()}
                  confirmLoading={this.state.modalLoading}>

                  <Form>
	                  <FormItem
	                      label="用户名"
	                      {...formItemLayout}
	                   >
	                      {getFieldDecorator('formUsername', {
	                          initialValue: undefined,
	                          rules: [
	                              {required: true, whitespace: true, message: '必填'},
	                              {max: 12, message: '最多输入12位字符'}
	                          ],
	                      })(
	                          <Input placeholder="请输入用户名" disabled={this.state.operateType === 'see' || this.state.operateType === 'up' }/>
	                      )}
	                  </FormItem>

	                  <FormItem
                        label="密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('formPassword', {
                            initialValue: undefined,
                            rules: [
                                {required: true, whitespace: true, message: '必填'},
                                {min: 6, message: '最少输入6位字符'},
                                {max: 18, message: '最多输入18位字符'}
                            ],
                        })(
                            <Input type="password" placeholder="请输入密码" disabled={this.state.operateType === 'see'}/>
                        )}
                    </FormItem>

           			<FormItem
                        label="电话"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('formPhone', {
                            initialValue: undefined,
                            rules: [
                             	{required: true, whitespace: true, message: '必填'},	
                                { validator: (rule, value, callback) => {
                                    const v = value;
                                    if (v) {
                                        if (!tools.checkPhone(v)) {
                                            callback('请输入有效的手机号码');
                                        }
                                    }
                                    callback();
                                }},
                            ],
                        })(
                            <Input placeholder="请输入手机号" disabled={this.state.operateType === 'see'}/>
                        )}
                    </FormItem>

                  </Form>

              </Modal>

			</div>
		)
	}

}

// 新建表格数据链接
const UserAdminWrapper = Form.create({ name: 'users_page' })(UserAdmin);

// 设置state 与 actions 异步 dispatch
export default connect(
 	(state) => ({
 	}),
 	(dispatch) => ({
 		actions: bindActionCreators({ getUserList, createUser, updateUser } , dispatch)
 	})
)(UserAdminWrapper)