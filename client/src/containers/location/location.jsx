
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile';




class Location extends Component {
    
	constructor(props) {
		super(props)
		this.state = {
			position: '当前没有定位',
		}
	}
	
	componentDidMount() {
		this.__initDatas()
	}

	__initDatas() {
		const that = this
		const AMap = window.AMap
		var map = new AMap.Map('container', {
		        resizeEnable: true
		    });
		    AMap.plugin('AMap.Geolocation', function() {
		        var geolocation = new AMap.Geolocation({
		            enableHighAccuracy: false,//是否使用高精度定位，默认:true
		            timeout: 10000,           //超过10秒后停止定位，默认：5s
		            buttonPosition:'RB',     //定位按钮的停靠位置
		            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		            zoomToAccuracy: true,     //定位成功后是否自动调整地图视野到定位点

		        });
		        map.addControl(geolocation);
		        geolocation.getCurrentPosition(function(status,result){
		            if(status === 'complete'){
		                onComplete(result)
		            }else{
		                onError(result)
		            }
		        });
		    });
		    //解析定位结果
		    function onComplete(data) {
		        console.log('定位成功')
		        that.setState({ position: data.formattedAddress })
		    }
		    //解析定位错误信息
		    function onError(data) {
		    	console.log('定位失败')
		    	console.log('失败原因排查信息:' + data.message)
		    }
	}

	// 更新当日地理位置
	

	render () {

		return (
			<div>
				 <NavBar
				      mode="light"
				      icon={<Icon type="left" />}
				      onLeftClick={() => this.props.history.push("/index") }
				    >实时位置</NavBar>
					<div id='container' style={{width:"100%",height:"90vh"}}></div>
			</div>

		)
	}

}

export default withRouter(Location)