import React from 'react';
import ReactDOM from 'react-dom';
// import {Button} from 'antd-mobile';
// import {Provider} from 'react-redux'
// import store from './redux/store'

import {HashRouter, Route, Switch} from 'react-router-dom'
// components
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'


ReactDOM.render(
		<HashRouter>
	    	<Switch>
		    	<Route path='/register' component={Register}/>
		        <Route path='/login' component={Login}/>
		        <Route component={Main}/>{/*默认路由组件*/}
	    	</Switch>
	    </HashRouter>
	, document.getElementById('root'));
