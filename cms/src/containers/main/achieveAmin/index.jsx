import React, { Component } from 'react'
import { Tooltip, message, Table, Rate, Select  } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
// 页面中需要的actions
import { getUserList, updateUserAchievement,  } from './../../../redux/actions'
import './index.jsx'

const { Option } = Select
class AchieveAdmin extends Component {

	static propTypes = {
		actions: PropTypes.any,
		form: 	 PropTypes.any,
	}
	
	constructor(props) {
		super(props)
		this.state = {
			loading: false,     // 表格数据是否在加载
			pageNum: 1,         // 当前第一页
			pageSize: 5,		// 每页五组数据
			total: 0,		 	// 总记录数
			dataList:[], 		// 总数据存储
			valueArray1:['差评','及格','良好','优秀'],
			valueArray2:['及格','良好','优秀'],
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
    
	handleSelectStatusChange(value,record) {
		const params = { userId: record.id, value: value}
		const that = this
		that.props.actions.updateUserAchievement(params).then((res) => {
			if( res.status === 202 ) {
				message.success(res.data.msg)
				this.__initDatas()
			}
		}).catch((err) => {
			message.error('系统网络问题')
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
        title: '工作评价',
        dataIndex: 'scopeVal',
        key: 'scopeVal',
      },
      {
        title: '后台评价',
        dataIndex: 'value',
        key: 'value',
        render: (text,record) => {
        	const controls = []
        	controls.push(
	        	<Select key={record.id} defaultValue={ this.state.valueArray2[record.value] } 
	        	onChange={ (value) => this.handleSelectStatusChange(value,record) } style={{ width: 120, marginRight:10 }} >
		        	<Option value="2">优秀</Option>
		        	<Option value="1">良好</Option>
		        	<Option value="0">及格</Option>
	        	</Select>
			)
			return controls
        }
      },
      {
        title: '总评价',
        dataIndex: 'allScope',
        key: 'allScope',
        width:200,
        render: (text,record) => {
        	let comprehensiveVal = record.scope + record.value        
        	const controls = []
        	controls.push(<Rate key={record.id} disabled defaultValue={comprehensiveVal} />)
        	return controls
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
				scopeVal   : this.state.valueArray1[item.scope],
				scope      : item.scope,
				value      : item.value,
				allScope   : item.allScope
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

	render() {
		return (
			<div>
				<div className="g-search">
					<Tooltip placement="right" title="考核指标以每年总任务量占60%，后台评占40%" className="detailTips" >
					    温馨提示
					</Tooltip>
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
 		actions: bindActionCreators({ getUserList, updateUserAchievement } , dispatch)
 	})
)(AchieveAdmin)