import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createHashHistory'  // 锚点模式的history
import "antd/dist/antd.css"
// Common Container
import Login from './../containers/login/login'
import BasicLayout from './../layouts/index'

const history = createHistory()
export default class rootContainer extends Component {

	/** 跳转到某个路由之前触发 **/
	onEnter(Component, props) {
	    return <Component {...props} />
	}

	render() {
		return (
			<Router history={history}>
		        <Route render={(props) => {
		          return (
		            <Switch>
		              <Route path="/login" component={Login} />
		              <Route path="/"  render={(props) => this.onEnter(BasicLayout, props)} />
		            </Switch>
		          );
		        }}/>
	      </Router>
		)
	}
}