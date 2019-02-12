import React, { Component } from 'react'
import { DatePicker, Tooltip, Select, message, Table, } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
// 页面中需要的actions
import { getAttendanceDatasList, upAttendanceState } from './../../../redux/actions'
import './index.scss'



const { Option } = Select
class AttendAdmin extends Component {
	
	static propTypes = {
		actions: PropTypes.any,
		form: 	 PropTypes.any,		
	}

	constructor(props) {
		super(props)
		this.state = {
			loading: false,     // 表格数据是否在加载
			pageNum: 1,         // 当前第一页
			pageSize: 4,		// 每页五组数据
			total: 0,		 	// 总记录数
			dataList:[], 		// 总数据存储
			currentDate:'',		// 当前日期
			currentWorkInfo:['休息','工作中','请假','缺勤'], // 实际工作状态
			type:'join',            // 出勤类型 join miss
 		}
	}

	componentDidMount() {
		this.__initData()
	}

	async __initData() {
		if( !this.state.currentDate ) await this.setState({ currentDate: this.getCurrentDate() })
		const params = {}
		params.pageSize = this.state.pageSize
		params.pageNum = this.state.pageNum
		params.currentDate = this.state.currentDate
		params.type = this.state.type
		this.setState({ loading: true }) // 更新状态
		this.props.actions.getAttendanceDatasList(params).then((res) => {
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

	// 获取当天日期
	getCurrentDate() {
		const dateObject = new Date(),
		 	  day=dateObject.getDate() < 9 ? `0${dateObject.getDate()}` : dateObject.getDate(),
			  month=dateObject.getMonth() + 1 < 9 ?  `0${dateObject.getMonth()+1}` : dateObject.getMonth() + 1 ,
		 	  year=dateObject.getFullYear()
		let dateStr = year + "-" + month + "-" + day
		return dateStr
	}

	// 日期选择器改变
	async onDateChange(date, dateString) {
		await this.setState({ currentDate : dateString })
		this.__initData()
	}

	// 出勤选择改变
	async handleSelectChange(value) {
		await this.setState({  type : value })
		this.__initData()
	}

	// 处理单个选择改变
	handleSelectStatusChange(value, record) {
		const params = {}
		params.id = record.id
		params.workStatus = value
		this.props.actions.upAttendanceState(params).then((res) => {
		  if(res.status === 202) {
			 message.success('修改成功')
			 this.__initData()
		  }
		}).catch((err) => {
			message.error('系统故障！')
		})
	}

	// 页面改变
	async onTablePageChange(Num, Size) {
		await this.setState({
			pageNum:  Num,         // 当前第一页
			pageSize: Size,		// 每页五组数据
		})
		this.__initData()
	}

	// 构建字段
	makeColumns() {
		 const columns = [
			 	  {
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
		        	title: '打卡时间',
		        	dataIndex: 'signInTime',
		        	key: 'signInTime',	      
		          },
				  {
		        	title: '打卡地点',
		        	dataIndex: 'signInLocation',
		        	key: 'signInLocation',	      
		          },
	 			  {
		        	title: '下班时间',
		        	dataIndex: 'exitTime',
		        	key: 'exitTime',	      
		          },	          
		      	  {
		        	title: '当日工作状态',
		        	key: 'workStatus',
		        	width: 150,
					render: (text, record) => {
						const controls = []
						if( this.getCurrentDate() === record.createTime ) {
							controls.push(
								<Select key={record.id} defaultValue={this.state.currentWorkInfo[record.workStatus] } 
									onChange={ (value) => this.handleSelectStatusChange(value,record) } style={{ width: 120, marginRight:10 }} >
								      <Option value="0">休息</Option>
								      <Option value="1">工作中</Option>
								      <Option value="2">请假</Option>
								      <Option value="3">缺勤</Option>
								</Select>
							)						
						} else {
							controls.push(<span key="2">{this.state.currentWorkInfo[record.workStatus]}</span>)
						}
						return controls
					}		
				  }  
	          ]
	    return columns;
	}

	// 构建table数据
	makeDatas(data) {
		if( !data ) return data
		return data.map((item,index) => {
			return {
					key            : index,
					id             : item.id,
					serial         : index + ( this.state.pageNum - 1 )  * this.state.pageSize + 1,
					username       : item.username,
					signInTime     : item.signInTime || '暂未打卡',
					signInLocation : item.signInLocation,
					exitTime	   : item.exitTime || '暂未信息',
					workStatus     : item.workStatus,
					createTime     : item.createTime,
 			}
		})
	}


	render() {
		return (
			<div>
				<div className="g-search">
					<span>考勤时段&nbsp;&nbsp;&nbsp;</span>
					<DatePicker  onChange={this.onDateChange.bind(this)} defaultValue={moment(this.getCurrentDate(), 'YYYY-MM-DD')} />
					<Tooltip placement="topLeft" title="默认展示信息以当天出勤为主" className="detailTips">
					    温馨提示
					</Tooltip>

					<span className="attendance-search-wrapper">
						<Select defaultValue="join" style={{ width: 120, marginRight:10 }} 	onChange={this.handleSelectChange.bind(this)}>
						      <Option value="join">出勤</Option>
						      <Option value="miss">缺勤</Option>
						</Select>
					</span>

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
			    				
			</div>
		)
	}
}



// 设置state 与 actions 异步 dispatch
export default connect(
 	(state) => ({
 	}),
 	(dispatch) => ({
 		actions: bindActionCreators({ getAttendanceDatasList, upAttendanceState } , dispatch)
 	})
)(AttendAdmin)