import React, { Component } from 'react'
import { Pagination, Button, Icon, Input, Collapse, Modal, Form, TreeSelect, message, Timeline,  } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
// 页面中需要的actions
import { getWorkerList, createWork, getWorkDatasList, updateWorkStatus } from './../../../redux/actions'

import './index.scss'

const Panel = Collapse.Panel

// 折叠板风格
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 20,
  border: 0,
  overflow: 'hidden',
}

// 表格类型转换
const FormItem = Form.Item
const { TextArea } = Input


class WorkAdmin extends Component {
	
	static propTypes = {
		actions: PropTypes.any,
		form: 	 PropTypes.any,
	}

	constructor(props) {
		super(props)
		this.state = {
			searchWorkname: '', // 搜索工作名称
			pageNum: 1, // 第一页
			pageSize: 3, //每页展示3组数据
			total: 0, // 任务总量
			workDatas: [], // 任务数据
			modalShow: false, // 添加/修改/查看 模态框是否显示
			modalLoading: false, // 添加/修改/查看 是否正在请求中
			operateType: 'add',  // 操作类型 add新增，up修改, see查看
		  	nowData: null, // 当前选中任务的信息，用于查看详情、修改
		  	value:'',
		  	TreeWorkerDatas: [], // 委派工作人员的数据
		  	workStatus:['','待完成','待跟进','已完成'],
		  	workStatusColor:['','red','orange','green'],
		}
	}

	componentDidMount() {
		this.__initDatas()
	}

	// 初始化数据
	__initDatas() {
		this.getWorkerList()
		this.getWorkList()
	}

	// 获取工作人员名单
	async getWorkerList() {
		this.props.actions.getWorkerList().then((res) => {
				if( res.data.code === 200 ) {
					this.setState({ TreeWorkerDatas: res.data.data })
				}
			}).catch((err) => {
				message.error('系统故障！')
		})	
	}

	// 获取工作列表
	getWorkList() {
		const params = { pageNum: this.state.pageNum, pageSize: this.state.pageSize }
		this.props.actions.getWorkDatasList(params).then((res) => {
				if( res.status === 200 ) {
					this.setState({ workDatas: res.data.data, total: res.data.total })
				}
				console.log(this.state.workDatas)
			}).catch((err) => {
				message.error('系统故障！')
		})	
	}

	onSearch() {
		console.log('搜索!')
	}	

	/** 模态框确定 **/
	onOk() {
		const that = this
		const { form } = that.props
		form.validateFields([
			'formWorkName',
			'formWorkDesc',
			'formAssignWorker',
		],(err,values) => {
			if(err) return false;
			that.setState({ modalLoading: true })
			// 获取表格中的值
			const params = {
				workName: values.formWorkName,		// 工作名臣
                workContent: values.formWorkDesc,      // 工作详情
                worker: values.formAssignWorker || '', // 委派人 可以为空
			}
			if(that.state.operateType === 'add') {
				that.props.actions.createWork(params).then((res) => {
					if( res.status === 201 ) {
						message.success('新增任务成功');
						that.onClose()
					}
					that.setState({ modalLoading: false })
				}).catch((err) => {
					that.setState({ modalLoading: false })
				})
			} else {

			}
		})
	}

	onClose() {
		this.setState({
			modalShow: false
		})
	}

	/**
     * 添加/修改/查看 模态框出现
     * @item: 当前选中的那条数据
     * @type: add添加/up修改
     * **/
	onModalShow(data,type) {
		const { form } = this.props
		if( type === 'add' ) {
			form.resetFields()
		} else {
			form.setFieldsValue({
     			formWorkName         : data.workname,
                formWorkDesc         : data.workdesc,
                formAssignWorker	 : data.assignworker,		
     		})
		}
		this.setState({
			modalShow: true
		})
		
	}

	// 折叠板回调函数
	callback(key) {
		console.log(key)
	}

	// 时间轴
	makeTimeline (arr) {
		const items = []
		arr.forEach((item,index) => {
			items.push(
				 <Timeline.Item key={index} >{item}</Timeline.Item>
			)	
		})
		return items
	}

	// 确定工作完成
	comfirmWorkComplishWork(workId) {
		const params = {id: workId, status: 3 }
		this.props.actions.updateWorkStatus(params).then((res) => {
			if(res.status === 202) {
				message.success(res.data.msg)
				this.getWorkList()
			}
		}).catch((err) => {
			message.error('系统故障！')
		})
	}

	// 渲染panel
	renderMultiplePanel() {
		const items = []
		this.state.workDatas.map((item,index) => {
			let currentWorkCondition = item.statusIns.split(',')
			items.push(
				<Panel header={(
							 	<div>
									<span className="workName">{item.workName}</span>
								    <span className={`workStatus border ${this.state.workStatusColor[item.status]}`}>
								    	{this.state.workStatus[item.status]}</span>
							    </div>
							  )}
					key={index} style={customPanelStyle}
				>
					<div className="workContent flex">
						<span>{item.workContent}</span>
						<span className="flex flex-col">
							<div className="mb10">工作进度</div>
							<Timeline>
							    { this.makeTimeline(currentWorkCondition) }
							</Timeline>

							{ item.status !== 3 ? <Button style={{width:'110px',height:'40px',}}
								onClick={() => this.comfirmWorkComplishWork(item.id)}>确定完成</Button>: '' }
						</span>

					</div>
				</Panel>
			)
			return item;
		},this);
		return items;
	}

	// 页面改变
	async onChangePage( Num, Size ){
		await this.setState({
			pageNum:  Num,         // 当前第一页
			pageSize: Size,		// 每页五组数据
		})
		this.getWorkList()
	}


	render() {
		// 获取字段参数
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
	                      <li><Button type="primary" onClick={() => this.onModalShow(null, 'add') }><Icon type="plus-circle-o" />添加任务</Button></li>
	                </ul>
	                <ul className="search-ul">
	                	<li><Input placeholder="请输入用户名" onChange={(e) => console.log(e) } value={this.state.searchWorkname}/></li>
	                	<li><Button icon="search" type="primary" onClick={() => this.onSearch()}>搜索</Button></li>
	                </ul>
			  </div>

			  <div className="diy-table">
					<Collapse
					    bordered={false}
					    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
					>
						{ 
							(this.state.workDatas.length === 0) ? null : this.renderMultiplePanel()
						}
					</Collapse>
					<Pagination className="w100 flex flex-je"
						total={this.state.total}
						onChange={this.onChangePage.bind(this)}
						pageSize={this.state.pageSize}		  
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
	                      label="工作名称"
	                      {...formItemLayout}
	                   >
	                      {getFieldDecorator('formWorkName', {
	                          initialValue: undefined,
	                          rules: [
	                              {required: true, whitespace: true, message: '必填'},
	                              {max: 12, message: '最多输入12位字符'}
	                          ],
	                      })(
	                          <Input placeholder="任务名称" disabled={ this.state.operateType === 'up' }/>
	                      )}
	                  </FormItem>
	                  <FormItem label="工作详情" {...formItemLayout}>
			              {getFieldDecorator('formWorkDesc', {
			                initialValue: undefined,
			                rules: [
			                {required: true, whitespace: true, message: '必填'},
			                { max: 100, message: '最多输入100个字符' }],
			              })(<TextArea rows={4} disabled={this.state.operateType === 'see'} placeholoder="请输入描述" autosize={{ minRows: 2, maxRows: 6 }} />)}
			          </FormItem>

			          <FormItem label="指派人员" {...formItemLayout}>
			              {getFieldDecorator('formAssignWorker', {
			                initialValue: undefined,
			                rules: [{ max: 20, message: '工作人员' }],
			              })(
			              <TreeSelect
							        style={{ width: 300 }}
							        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							        treeData={this.state.TreeWorkerDatas}
							        placeholder="指派人员(可不选)"
							        treeDefaultExpandAll
						   />
			              )}
			          </FormItem>

                  </Form>
              </Modal>  
			</div>
		)
	}
}

// 新建表格数据链接
const WorkAdminWrapper = Form.create({ name: 'works_page' })(WorkAdmin);

// 设置state 与 actions 异步 dispatch
export default connect(
 	(state) => ({
 	}),
 	(dispatch) => ({
 		actions: bindActionCreators({  getWorkerList, createWork, getWorkDatasList, updateWorkStatus,  } , dispatch)
 	})
)(WorkAdminWrapper)