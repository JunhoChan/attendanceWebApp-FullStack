import React, { Component } from 'react'
import { message } from 'antd'
import { Bar as BarChart } from 'react-chartjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
// 页面中需要的actions
import { getWorkComprehensiveStat } from './../../../redux/actions'

class StatAdmin extends Component {

   static propTypes = {
     actions: PropTypes.any,
     form:    PropTypes.any,
   }

   constructor(props) {
      super(props)
      this.state = {
        workPublishedDatas: [0,0,0,0,0],
      }
   }

   componentWillMount() {
      this.__initData()
   }

   __initData() {
      this.props.actions.getWorkComprehensiveStat().then( res => {
          if( res.status === 200 ) {
              this.setState({ workPublishedDatas: res.data })
          }
      }).catch(err=> {
          message.error('系统故障!')
      })
   }


    render() {
        const data = {
          labels: ['周一', '周二', '周三', '周四', '周五'],
          datasets: [{
            label: 'My First dataset',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            data: this.state.workPublishedDatas,
          }],
        };
        const options = {
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
            }],
          },
        };
        return (
          <div>
              <span>
                <div>上周任务发布量</div>
                <BarChart data={data} options={options} width="800" height="400" />
              </span>
          </div>
        );
      }
}


// 设置state 与 actions 异步 dispatch
export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    actions: bindActionCreators({ getWorkComprehensiveStat } , dispatch)
  })
)(StatAdmin)